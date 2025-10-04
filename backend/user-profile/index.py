import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: User profile and purchase history API
    Args: event with httpMethod, queryStringParameters (email)
          context with request_id
    Returns: HTTP response with user profile, orders, subscriptions, library
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Email',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            email = params.get('email', 'demo@godstore.game')
            
            cursor.execute('''
                SELECT id, email, name, phone, created_at, last_login, 
                       is_verified, avatar_url, total_spent, loyalty_points
                FROM users
                WHERE email = %s
            ''', (email,))
            
            user = cursor.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User not found'})
                }
            
            user_id = user['id']
            
            cursor.execute('''
                SELECT o.id, o.order_number, o.status, o.total_amount, 
                       o.discount_amount, o.promo_code, o.payment_method, 
                       o.created_at, o.completed_at,
                       json_agg(json_build_object(
                           'item_type', oi.item_type,
                           'item_name', oi.item_name,
                           'quantity', oi.quantity,
                           'price', oi.price
                       )) as items
                FROM orders o
                LEFT JOIN order_items oi ON o.id = oi.order_id
                WHERE o.user_id = %s
                GROUP BY o.id
                ORDER BY o.created_at DESC
            ''', (user_id,))
            
            orders = cursor.fetchall()
            
            cursor.execute('''
                SELECT id, subscription_name, platform, start_date, 
                       end_date, is_active, auto_renew
                FROM user_subscriptions
                WHERE user_id = %s
                ORDER BY is_active DESC, end_date DESC
            ''', (user_id,))
            
            subscriptions = cursor.fetchall()
            
            cursor.execute('''
                SELECT id, game_id, game_title, platform, 
                       purchase_date, activation_status, account_email
                FROM user_library
                WHERE user_id = %s
                ORDER BY purchase_date DESC
            ''', (user_id,))
            
            library = cursor.fetchall()
            
            cursor.execute('''
                UPDATE users
                SET last_login = CURRENT_TIMESTAMP
                WHERE id = %s
            ''', (user_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'user': dict(user),
                    'orders': [dict(o) for o in orders],
                    'subscriptions': [dict(s) for s in subscriptions],
                    'library': [dict(l) for l in library],
                    'stats': {
                        'total_orders': len(orders),
                        'active_subscriptions': len([s for s in subscriptions if s['is_active']]),
                        'games_owned': len(library)
                    }
                }, default=str)
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            user_email = body_data.get('email', 'demo@godstore.game')
            
            cursor.execute('SELECT id FROM users WHERE email = %s', (user_email,))
            user = cursor.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User not found'})
                }
            
            user_id = user['id']
            
            if action == 'toggle_auto_renew':
                subscription_id = body_data.get('subscription_id')
                
                cursor.execute('''
                    UPDATE user_subscriptions
                    SET auto_renew = NOT auto_renew
                    WHERE id = %s AND user_id = %s
                    RETURNING auto_renew
                ''', (subscription_id, user_id))
                
                result = cursor.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'auto_renew': result['auto_renew'] if result else False
                    })
                }
            
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Unknown action'})
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cursor.close()
        conn.close()
