import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получить историю цен игры для графика
    Args: event с httpMethod (GET), queryStringParameters (game_id)
    Returns: HTTP response с историей цен за последние 30 дней
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters') or {}
    game_id = params.get('game_id')
    
    if not game_id:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'game_id required'})
        }
    
    dsn = os.environ.get('DATABASE_URL', '')
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cursor = conn.cursor()
    
    try:
        cursor.execute('''
            SELECT price, discount_percent, recorded_at
            FROM t_p1573360_game_store_platform.price_history
            WHERE game_id = %s 
            AND recorded_at >= CURRENT_DATE - INTERVAL '30 days'
            ORDER BY recorded_at ASC
        ''', (game_id,))
        
        history = []
        for row in cursor.fetchall():
            history.append({
                'price': float(row[0]) if row[0] else 0,
                'discount': row[1],
                'date': row[2].isoformat() if row[2] else None
            })
        
        cursor.execute('''
            SELECT MIN(price) as min_price, MAX(price) as max_price, AVG(price) as avg_price
            FROM t_p1573360_game_store_platform.price_history
            WHERE game_id = %s
        ''', (game_id,))
        
        stats_row = cursor.fetchone()
        stats = {
            'min_price': float(stats_row[0]) if stats_row and stats_row[0] else 0,
            'max_price': float(stats_row[1]) if stats_row and stats_row[1] else 0,
            'avg_price': float(stats_row[2]) if stats_row and stats_row[2] else 0
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
            'body': json.dumps({
                'history': history,
                'stats': stats
            })
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
