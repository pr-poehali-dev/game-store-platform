import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление реферальной программой - получение статистики и приглашение друзей
    Args: event - dict с httpMethod, queryStringParameters (user_id)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с данными реферальной программы или статусом приглашения
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn: str = os.environ.get('DATABASE_URL', '')
    
    if method == 'GET':
        params = event.get('queryStringParameters', {})
        user_id: int = int(params.get('user_id', 1))
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        cur.execute('''
            SELECT referral_code, loyalty_points
            FROM users 
            WHERE id = %s
        ''', (user_id,))
        user_data = cur.fetchone()
        
        cur.execute('''
            SELECT 
                r.id,
                r.referral_code,
                r.referred_email,
                r.status,
                r.bonus_amount,
                r.bonus_paid,
                r.created_at,
                r.completed_at,
                u.name as referred_name
            FROM referrals r
            LEFT JOIN users u ON r.referred_user_id = u.id
            WHERE r.referrer_user_id = %s
            ORDER BY r.created_at DESC
        ''', (user_id,))
        referrals = cur.fetchall()
        
        cur.execute('''
            SELECT 
                bonus_type,
                amount,
                description,
                created_at
            FROM referral_bonuses
            WHERE user_id = %s
            ORDER BY created_at DESC
        ''', (user_id,))
        bonuses = cur.fetchall()
        
        total_earned: float = sum(float(b['amount']) for b in bonuses)
        total_referrals: int = len(referrals)
        completed_referrals: int = len([r for r in referrals if r['status'] == 'completed'])
        pending_referrals: int = len([r for r in referrals if r['status'] == 'pending'])
        
        cur.close()
        conn.close()
        
        result = {
            'user': {
                'referral_code': user_data['referral_code'],
                'loyalty_points': float(user_data['loyalty_points'])
            },
            'stats': {
                'total_referrals': total_referrals,
                'completed_referrals': completed_referrals,
                'pending_referrals': pending_referrals,
                'total_earned': total_earned
            },
            'referrals': [
                {
                    'id': r['id'],
                    'code': r['referral_code'],
                    'email': r['referred_email'],
                    'name': r['referred_name'],
                    'status': r['status'],
                    'bonus': float(r['bonus_amount']),
                    'paid': r['bonus_paid'],
                    'created_at': r['created_at'].isoformat() if r['created_at'] else None,
                    'completed_at': r['completed_at'].isoformat() if r['completed_at'] else None
                }
                for r in referrals
            ],
            'bonuses': [
                {
                    'type': b['bonus_type'],
                    'amount': float(b['amount']),
                    'description': b['description'],
                    'date': b['created_at'].isoformat() if b['created_at'] else None
                }
                for b in bonuses
            ],
            'program_info': {
                'signup_bonus': 500,
                'first_purchase_bonus': 1000,
                'referral_discount': 10,
                'description': 'Приглашай друзей и получай 500₽ за каждого зарегистрировавшегося + 1000₽ когда они совершат первую покупку!'
            }
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result, ensure_ascii=False)
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        user_id: int = body_data.get('user_id', 1)
        action: str = body_data.get('action', '')
        
        if action == 'invite':
            email: str = body_data.get('email', '')
            
            conn = psycopg2.connect(dsn)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            cur.execute('SELECT referral_code FROM users WHERE id = %s', (user_id,))
            user_data = cur.fetchone()
            referral_code: str = user_data['referral_code']
            
            timestamp: str = datetime.now().strftime('%H%M%S')
            new_code: str = f"R{user_id}{timestamp}"[:20]
            
            cur.execute('''
                INSERT INTO referrals 
                (referrer_user_id, referral_code, referred_email, status, created_at)
                VALUES (%s, %s, %s, 'pending', CURRENT_TIMESTAMP)
                RETURNING id
            ''', (user_id, new_code, email))
            
            new_referral_id = cur.fetchone()['id']
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({
                    'success': True,
                    'referral_id': new_referral_id,
                    'invite_link': f'https://godstore.game/register?ref={new_code}',
                    'message': f'Приглашение отправлено на {email}'
                }, ensure_ascii=False)
            }
        
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Unknown action'})
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }