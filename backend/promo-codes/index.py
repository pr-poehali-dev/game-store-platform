import json
import os
from typing import Dict, Any, Optional
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Validate and apply promo codes for discounts
    Args: event with httpMethod, body (code, userIdentifier), queryStringParameters
          context with request_id
    Returns: HTTP response with promo code validation result
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
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            code = body_data.get('code', '').strip().upper()
            user_id = body_data.get('userIdentifier', 'anonymous')
            purchase_amount = float(body_data.get('purchaseAmount', 0))
            
            if not code:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Промокод не указан'})
                }
            
            cursor.execute('''
                SELECT id, code, discount_percent, max_uses, current_uses, 
                       valid_from, valid_until, is_active, min_purchase_amount, description
                FROM promo_codes
                WHERE UPPER(code) = %s
            ''', (code,))
            
            promo = cursor.fetchone()
            
            if not promo:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Промокод не найден'})
                }
            
            if not promo['is_active']:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Промокод деактивирован'})
                }
            
            now = datetime.now()
            if promo['valid_from'] and promo['valid_from'] > now:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Промокод еще не активен'})
                }
            
            if promo['valid_until'] and promo['valid_until'] < now:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Срок действия промокода истек'})
                }
            
            if promo['max_uses'] and promo['current_uses'] >= promo['max_uses']:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Промокод исчерпан'})
                }
            
            if promo['min_purchase_amount'] and purchase_amount < float(promo['min_purchase_amount']):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'error': f'Минимальная сумма покупки: {promo["min_purchase_amount"]}₽'
                    })
                }
            
            cursor.execute('''
                SELECT COUNT(*) as count
                FROM promo_code_usage
                WHERE promo_code_id = %s AND user_identifier = %s
            ''', (promo['id'], user_id))
            
            usage = cursor.fetchone()
            if usage and usage['count'] > 0:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Вы уже использовали этот промокод'})
                }
            
            cursor.execute('''
                UPDATE promo_codes
                SET current_uses = current_uses + 1
                WHERE id = %s
            ''', (promo['id'],))
            
            cursor.execute('''
                INSERT INTO promo_code_usage (promo_code_id, user_identifier)
                VALUES (%s, %s)
            ''', (promo['id'], user_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'code': promo['code'],
                    'discount': promo['discount_percent'],
                    'description': promo['description']
                })
            }
        
        if method == 'GET':
            cursor.execute('''
                SELECT code, discount_percent, description, 
                       valid_until, max_uses, current_uses, is_active
                FROM promo_codes
                WHERE is_active = true
                  AND (valid_until IS NULL OR valid_until > CURRENT_TIMESTAMP)
                  AND (max_uses IS NULL OR current_uses < max_uses)
                ORDER BY discount_percent DESC
            ''')
            
            promos = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'promos': [dict(p) for p in promos]
                }, default=str)
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cursor.close()
        conn.close()
