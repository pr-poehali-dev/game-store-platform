import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление кешбэком и бонусными баллами пользователя
    Args: event с httpMethod (GET/POST), headers (X-User-Id), body
    Returns: HTTP response с балансом кешбэка и бонусов
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
                INSERT INTO t_p1573360_game_store_platform.user_balance (user_id)
                VALUES (%s)
                ON CONFLICT (user_id) DO NOTHING
            ''', (user_id,))
            
            cursor.execute('''
                SELECT cashback_balance, bonus_points, updated_at
                FROM t_p1573360_game_store_platform.user_balance
                WHERE user_id = %s
            ''', (user_id,))
            
            row = cursor.fetchone()
            result = {
                'cashback_balance': float(row[0]) if row and row[0] else 0,
                'bonus_points': row[1] if row else 0,
                'updated_at': row[2].isoformat() if row and row[2] else None
            }
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps(result)
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            amount = body_data.get('amount', 0)
            
            if action == 'add_cashback':
                cursor.execute('''
                    INSERT INTO t_p1573360_game_store_platform.user_balance (user_id, cashback_balance)
                    VALUES (%s, %s)
                    ON CONFLICT (user_id) DO UPDATE
                    SET cashback_balance = t_p1573360_game_store_platform.user_balance.cashback_balance + EXCLUDED.cashback_balance,
                        updated_at = CURRENT_TIMESTAMP
                ''', (user_id, amount))
            
            elif action == 'add_bonus':
                cursor.execute('''
                    INSERT INTO t_p1573360_game_store_platform.user_balance (user_id, bonus_points)
                    VALUES (%s, %s)
                    ON CONFLICT (user_id) DO UPDATE
                    SET bonus_points = t_p1573360_game_store_platform.user_balance.bonus_points + EXCLUDED.bonus_points,
                        updated_at = CURRENT_TIMESTAMP
                ''', (user_id, int(amount)))
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Balance updated'})
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
