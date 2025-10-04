import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление списком желаний пользователя
    Args: event с httpMethod (GET/POST/DELETE), headers (X-User-Id), body
    Returns: HTTP response со списком желаний
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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
                SELECT w.id, w.game_id, w.notify_on_sale, w.added_at,
                       g.title, g.price, g.discount, g.platform
                FROM t_p1573360_game_store_platform.wishlist w
                JOIN t_p1573360_game_store_platform.games g ON w.game_id = g.id
                WHERE w.user_id = %s
                ORDER BY w.added_at DESC
            ''', (user_id,))
            
            rows = cursor.fetchall()
            wishlist = []
            for row in rows:
                wishlist.append({
                    'id': row[0],
                    'game_id': row[1],
                    'notify_on_sale': row[2],
                    'added_at': row[3].isoformat() if row[3] else None,
                    'game': {
                        'title': row[4],
                        'price': float(row[5]) if row[5] else 0,
                        'discount': row[6],
                        'platform': row[7]
                    }
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
                'body': json.dumps({'wishlist': wishlist})
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            game_id = body_data.get('game_id')
            notify_on_sale = body_data.get('notify_on_sale', True)
            
            if not game_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'game_id required'})
                }
            
            cursor.execute('''
                INSERT INTO t_p1573360_game_store_platform.wishlist 
                (user_id, game_id, notify_on_sale)
                VALUES (%s, %s, %s)
                ON CONFLICT (user_id, game_id) DO UPDATE
                SET notify_on_sale = EXCLUDED.notify_on_sale
                RETURNING id
            ''', (user_id, game_id, notify_on_sale))
            
            wishlist_id = cursor.fetchone()[0]
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'id': wishlist_id, 'message': 'Added to wishlist'})
            }
        
        if method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            game_id = params.get('game_id')
            
            if not game_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'game_id required'})
                }
            
            cursor.execute('''
                DELETE FROM t_p1573360_game_store_platform.wishlist
                WHERE user_id = %s AND game_id = %s
            ''', (user_id, game_id))
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Removed from wishlist'})
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
