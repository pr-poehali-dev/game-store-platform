"""
Business: API для лутбоксов и розыгрышей с призами
Args: event с httpMethod, body; context с request_id
Returns: HTTP response с лутбоксами или результатом открытия
"""

import json
import os
import random
from typing import Dict, Any
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
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
    conn = psycopg2.connect(dsn)
    
    try:
        user_id = int(event.get('headers', {}).get('X-User-Id', 1))
        
        if method == 'GET':
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT l.*,
                           CASE 
                               WHEN uc.next_available_at IS NULL OR uc.next_available_at <= NOW() 
                               THEN TRUE 
                               ELSE FALSE 
                           END as is_available,
                           uc.next_available_at
                    FROM lootboxes l
                    LEFT JOIN user_lootbox_cooldowns uc ON l.id = uc.lootbox_id AND uc.user_id = %s
                    ORDER BY l.price ASC, l.rarity
                """, (user_id,))
                lootboxes = cur.fetchall()
                
                for lb in lootboxes:
                    if lb.get('created_at'):
                        lb['created_at'] = lb['created_at'].isoformat()
                    if lb.get('next_available_at'):
                        lb['next_available_at'] = lb['next_available_at'].isoformat()
                
                cur.execute("""
                    SELECT * FROM user_lootbox_history
                    WHERE user_id = %s
                    ORDER BY opened_at DESC
                    LIMIT 50
                """, (user_id,))
                history = cur.fetchall()
                
                for h in history:
                    if h.get('opened_at'):
                        h['opened_at'] = h['opened_at'].isoformat()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'lootboxes': lootboxes,
                        'history': history
                    })
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            lootbox_id = body_data['lootbox_id']
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT * FROM user_lootbox_cooldowns
                    WHERE user_id = %s AND lootbox_id = %s
                    AND next_available_at > NOW()
                """, (user_id, lootbox_id))
                cooldown = cur.fetchone()
                
                if cooldown:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'error': 'Лутбокс ещё на перезарядке',
                            'next_available': cooldown['next_available_at'].isoformat()
                        })
                    }
                
                cur.execute("""
                    SELECT * FROM lootbox_items WHERE lootbox_id = %s
                """, (lootbox_id,))
                items = cur.fetchall()
                
                if not items:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Лутбокс не найден'})
                    }
                
                total_probability = sum(float(item['probability']) for item in items)
                rand_value = random.uniform(0, total_probability)
                cumulative = 0.0
                won_item = None
                
                for item in items:
                    cumulative += float(item['probability'])
                    if rand_value <= cumulative:
                        won_item = item
                        break
                
                if not won_item:
                    won_item = items[0]
                
                cur.execute("""
                    INSERT INTO user_lootbox_history 
                    (user_id, lootbox_id, item_won_type, item_won_id, item_won_name, value_won)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (user_id, lootbox_id, won_item['item_type'], won_item['item_id'], 
                      won_item['item_name'], won_item['value']))
                
                cur.execute("""
                    SELECT cooldown_hours FROM lootboxes WHERE id = %s
                """, (lootbox_id,))
                cooldown_hours = cur.fetchone()['cooldown_hours']
                next_available = datetime.now() + timedelta(hours=cooldown_hours)
                
                cur.execute("""
                    INSERT INTO user_lootbox_cooldowns (user_id, lootbox_id, last_opened_at, next_available_at)
                    VALUES (%s, %s, NOW(), %s)
                    ON CONFLICT (user_id, lootbox_id) 
                    DO UPDATE SET last_opened_at = NOW(), next_available_at = %s
                """, (user_id, lootbox_id, next_available, next_available))
                
                if won_item['item_type'] == 'discount':
                    cur.execute("""
                        UPDATE user_balance
                        SET bonus_points = bonus_points + %s
                        WHERE user_id = %s
                    """, (won_item['value'], user_id))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'won_item': {
                            'type': won_item['item_type'],
                            'name': won_item['item_name'],
                            'value': won_item['value']
                        },
                        'next_available': next_available.isoformat()
                    })
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        conn.close()
