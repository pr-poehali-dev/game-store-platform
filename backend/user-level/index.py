import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получить уровень и достижения пользователя
    Args: event с httpMethod (GET/POST), headers (X-User-Id)
    Returns: HTTP response с уровнем, опытом, достижениями
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
        cursor.execute('''
            INSERT INTO t_p1573360_game_store_platform.user_levels (user_id)
            VALUES (%s)
            ON CONFLICT (user_id) DO NOTHING
        ''', (user_id,))
        
        cursor.execute('''
            SELECT level, experience_points, total_spent, purchases_count
            FROM t_p1573360_game_store_platform.user_levels
            WHERE user_id = %s
        ''', (user_id,))
        
        row = cursor.fetchone()
        level_data = {
            'level': row[0] if row else 'bronze',
            'experience_points': row[1] if row else 0,
            'total_spent': float(row[2]) if row and row[2] else 0,
            'purchases_count': row[3] if row else 0
        }
        
        level_thresholds = {
            'bronze': {'min': 0, 'max': 999, 'discount': 0, 'next': 'silver'},
            'silver': {'min': 1000, 'max': 4999, 'discount': 5, 'next': 'gold'},
            'gold': {'min': 5000, 'max': 14999, 'discount': 10, 'next': 'platinum'},
            'platinum': {'min': 15000, 'max': 999999, 'discount': 15, 'next': None}
        }
        
        current_level = level_data['level']
        level_info = level_thresholds.get(current_level, level_thresholds['bronze'])
        
        cursor.execute('''
            SELECT achievement_type, achieved_at, metadata
            FROM t_p1573360_game_store_platform.user_achievements
            WHERE user_id = %s
            ORDER BY achieved_at DESC
            LIMIT 20
        ''', (user_id,))
        
        achievements = []
        for ach_row in cursor.fetchall():
            achievements.append({
                'type': ach_row[0],
                'achieved_at': ach_row[1].isoformat() if ach_row[1] else None,
                'metadata': ach_row[2] if ach_row[2] else {}
            })
        
        cursor.close()
        conn.close()
        
        result = {
            **level_data,
            'level_info': level_info,
            'achievements': achievements
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result)
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
