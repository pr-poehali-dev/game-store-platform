import json
import os
import psycopg2
import secrets
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка игр в подарок друзьям
    Args: event с httpMethod (GET/POST), headers (X-User-Id), body
    Returns: HTTP response с подарочным кодом
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
    
    headers = event.get('headers', {})
    user_id = headers.get('x-user-id') or headers.get('X-User-Id')
    
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'X-User-Id header required'})
        }
    
    dsn = os.environ.get('DATABASE_URL', '')
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            cursor.execute('''
                SELECT g.id, g.recipient_email, g.game_id, g.gift_code, 
                       g.message, g.created_at, g.redeemed_at,
                       gm.title as game_title
                FROM t_p1573360_game_store_platform.gifts g
                JOIN t_p1573360_game_store_platform.games gm ON g.game_id = gm.id
                WHERE g.sender_id = %s
                ORDER BY g.created_at DESC
            ''', (user_id,))
            
            gifts = []
            for row in cursor.fetchall():
                gifts.append({
                    'id': row[0],
                    'recipient_email': row[1],
                    'game_id': row[2],
                    'gift_code': row[3],
                    'message': row[4],
                    'created_at': row[5].isoformat() if row[5] else None,
                    'redeemed': row[6] is not None,
                    'game_title': row[7]
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'gifts': gifts})
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            game_id = body_data.get('game_id')
            recipient_email = body_data.get('recipient_email')
            message = body_data.get('message', '')
            
            if not game_id or not recipient_email:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'game_id and recipient_email required'})
                }
            
            gift_code = 'GIFT-' + secrets.token_urlsafe(12).upper()
            
            cursor.execute('''
                INSERT INTO t_p1573360_game_store_platform.gifts
                (sender_id, recipient_email, game_id, gift_code, message)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
            ''', (user_id, recipient_email, game_id, gift_code, message))
            
            gift_id = cursor.fetchone()[0]
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({
                    'id': gift_id,
                    'gift_code': gift_code,
                    'message': 'Gift created successfully'
                })
            }
        
        cursor.close()
        conn.close()
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    except Exception as e:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
