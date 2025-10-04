import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any, Optional

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Получить обложку игры из RAWG API по названию
    Args: event с httpMethod, queryStringParameters (game_name)
    Returns: HTTP response с URL обложки
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
    game_name: str = params.get('game_name', '').strip()
    
    if not game_name:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'game_name parameter required'})
        }
    
    api_key = os.environ.get('RAWG_API_KEY', '')
    
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'RAWG_API_KEY not configured'})
        }
    
    search_query = urllib.parse.quote(game_name)
    url = f'https://api.rawg.io/api/games?key={api_key}&search={search_query}&page_size=1'
    
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            
            if not data.get('results'):
                return {
                    'statusCode': 404,
                    'headers': {'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Game not found'})
                }
            
            game = data['results'][0]
            
            result = {
                'id': game.get('id'),
                'name': game.get('name'),
                'cover_image': game.get('background_image'),
                'rating': game.get('rating'),
                'metacritic': game.get('metacritic'),
                'released': game.get('released'),
                'platforms': [p['platform']['name'] for p in game.get('platforms', [])[:3]]
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
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
