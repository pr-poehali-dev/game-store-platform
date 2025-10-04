"""
Business: API для управления турнирами и лидербордами
Args: event с httpMethod, queryStringParameters, body; context с request_id
Returns: HTTP response с турнирами, лидербордом или результатом операции
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

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
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            action = params.get('action', 'list_tournaments')
            
            if action == 'list_tournaments':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("""
                        SELECT t.*, g.title as game_title,
                               (SELECT COUNT(*) FROM tournament_participants WHERE tournament_id = t.id) as participants_count
                        FROM tournaments t
                        LEFT JOIN games g ON t.game_id = g.id
                        ORDER BY t.start_date DESC
                        LIMIT 20
                    """)
                    tournaments = cur.fetchall()
                    
                    for t in tournaments:
                        if t['start_date']:
                            t['start_date'] = t['start_date'].isoformat()
                        if t['end_date']:
                            t['end_date'] = t['end_date'].isoformat()
                        if t['created_at']:
                            t['created_at'] = t['created_at'].isoformat()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'tournaments': tournaments})
                    }
            
            elif action == 'leaderboard':
                category = params.get('category', 'total_spent')
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("""
                        SELECT l.*, u.name, u.email
                        FROM leaderboard l
                        JOIN users u ON l.user_id = u.id
                        WHERE l.category = %s
                        ORDER BY l.rank ASC
                        LIMIT 100
                    """, (category,))
                    leaders = cur.fetchall()
                    
                    for l in leaders:
                        if l.get('updated_at'):
                            l['updated_at'] = l['updated_at'].isoformat()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'leaderboard': leaders, 'category': category})
                    }
            
            elif action == 'tournament_details':
                tournament_id = int(params.get('tournament_id', 0))
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("""
                        SELECT t.*, g.title as game_title
                        FROM tournaments t
                        LEFT JOIN games g ON t.game_id = g.id
                        WHERE t.id = %s
                    """, (tournament_id,))
                    tournament = cur.fetchone()
                    
                    if tournament:
                        if tournament['start_date']:
                            tournament['start_date'] = tournament['start_date'].isoformat()
                        if tournament['end_date']:
                            tournament['end_date'] = tournament['end_date'].isoformat()
                        if tournament['created_at']:
                            tournament['created_at'] = tournament['created_at'].isoformat()
                    
                    cur.execute("""
                        SELECT tp.*, u.name, u.email
                        FROM tournament_participants tp
                        JOIN users u ON tp.user_id = u.id
                        WHERE tp.tournament_id = %s
                        ORDER BY tp.score DESC
                        LIMIT 100
                    """, (tournament_id,))
                    participants = cur.fetchall()
                    
                    for p in participants:
                        if p.get('joined_at'):
                            p['joined_at'] = p['joined_at'].isoformat()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'tournament': tournament,
                            'participants': participants
                        })
                    }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            user_id = int(event.get('headers', {}).get('X-User-Id', 1))
            
            if action == 'join_tournament':
                tournament_id = body_data['tournament_id']
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO tournament_participants (tournament_id, user_id, score)
                        VALUES (%s, %s, 0)
                        ON CONFLICT (tournament_id, user_id) DO NOTHING
                        RETURNING id
                    """, (tournament_id, user_id))
                    result = cur.fetchone()
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'success': True,
                            'message': 'Вы успешно зарегистрированы в турнире!'
                        })
                    }
            
            elif action == 'update_score':
                tournament_id = body_data['tournament_id']
                score = body_data['score']
                with conn.cursor() as cur:
                    cur.execute("""
                        UPDATE tournament_participants
                        SET score = score + %s
                        WHERE tournament_id = %s AND user_id = %s
                        RETURNING score
                    """, (score, tournament_id, user_id))
                    new_score = cur.fetchone()
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'success': True,
                            'new_score': new_score[0] if new_score else 0
                        })
                    }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        conn.close()
