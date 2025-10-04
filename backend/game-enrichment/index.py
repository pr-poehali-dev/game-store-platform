"""
Business: Обогащение данных игр из RAWG API (обложки, разработчики, издатели, рейтинги)
Args: event с queryStringParameters game_id; context с request_id
Returns: HTTP response с обновлёнными данными игры
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    api_key = os.environ.get('RAWG_API_KEY')
    dsn = os.environ.get('DATABASE_URL')
    
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'RAWG_API_KEY not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    
    try:
        params = event.get('queryStringParameters') or {}
        action = params.get('action', 'enrich_game')
        
        if action == 'enrich_game':
            game_id = params.get('game_id')
            if not game_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'game_id required'})
                }
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM games WHERE id = %s", (game_id,))
                game = cur.fetchone()
                
                if not game:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Game not found'})
                    }
                
                search_query = urllib.parse.quote(game['title'])
                url = f"https://api.rawg.io/api/games?key={api_key}&search={search_query}&page_size=1"
                
                with urllib.request.urlopen(url, timeout=10) as response:
                    data = json.loads(response.read().decode())
                    
                    if data.get('results') and len(data['results']) > 0:
                        rawg_game = data['results'][0]
                        
                        cover_url = rawg_game.get('background_image', game['image_url'])
                        rating = rawg_game.get('rating', game['rating'])
                        
                        developers = ', '.join([d['name'] for d in rawg_game.get('developers', [])]) if rawg_game.get('developers') else game.get('developer', 'Unknown')
                        publishers = ', '.join([p['name'] for p in rawg_game.get('publishers', [])]) if rawg_game.get('publishers') else game.get('publisher', 'Unknown')
                        
                        if not developers or developers.strip() == '':
                            developers = game.get('developer', 'Unknown')
                        if not publishers or publishers.strip() == '':
                            publishers = game.get('publisher', 'Unknown')
                        
                        cur.execute("""
                            UPDATE games 
                            SET image_url = %s, 
                                rating = %s,
                                developer = %s,
                                publisher = %s
                            WHERE id = %s
                            RETURNING *
                        """, (cover_url, rating, developers, publishers, game_id))
                        
                        updated_game = cur.fetchone()
                        conn.commit()
                        
                        return {
                            'statusCode': 200,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({
                                'success': True,
                                'game': dict(updated_game),
                                'rawg_data': {
                                    'name': rawg_game.get('name'),
                                    'rating': rawg_game.get('rating'),
                                    'metacritic': rawg_game.get('metacritic')
                                }
                            })
                        }
                    else:
                        return {
                            'statusCode': 404,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({
                                'error': 'Game not found in RAWG',
                                'game_title': game['title']
                            })
                        }
        
        elif action == 'enrich_all':
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT id, title FROM games LIMIT 50")
                games = cur.fetchall()
                
                enriched_count = 0
                for game in games:
                    try:
                        search_query = urllib.parse.quote(game['title'])
                        url = f"https://api.rawg.io/api/games?key={api_key}&search={search_query}&page_size=1"
                        
                        with urllib.request.urlopen(url, timeout=5) as response:
                            data = json.loads(response.read().decode())
                            
                            if data.get('results') and len(data['results']) > 0:
                                rawg_game = data['results'][0]
                                
                                cover_url = rawg_game.get('background_image')
                                rating = rawg_game.get('rating')
                                developers = ', '.join([d['name'] for d in rawg_game.get('developers', [])])
                                publishers = ', '.join([p['name'] for p in rawg_game.get('publishers', [])])
                                
                                if cover_url and developers:
                                    cur.execute("""
                                        UPDATE games 
                                        SET image_url = %s, 
                                            rating = %s,
                                            developer = %s,
                                            publisher = %s
                                        WHERE id = %s
                                    """, (cover_url, rating, developers, publishers, game['id']))
                                    enriched_count += 1
                    except Exception:
                        continue
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'enriched_count': enriched_count,
                        'total_games': len(games)
                    })
                }
        
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid action'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        conn.close()