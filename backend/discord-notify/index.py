import json
import os
from typing import Dict, Any
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send Discord notifications for tournament events and registrations
    Args: event - dict with httpMethod, body containing tournament data
          context - object with request_id, function_name attributes
    Returns: HTTP response dict with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    webhook_url = os.environ.get('DISCORD_WEBHOOK_URL')
    
    if not webhook_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Discord webhook not configured'})
        }
    
    notification = json.loads(event.get('body', '{}'))
    
    embed = None
    
    if notification.get('type') == 'registration':
        embed = {
            'title': '🎮 Новая регистрация на турнир!',
            'description': f"**{notification.get('userName', 'Игрок')}** зарегистрировался на турнир",
            'color': 0x00ff00,
            'fields': [
                {
                    'name': '🏆 Турнир',
                    'value': notification.get('tournamentTitle', 'Неизвестный турнир'),
                    'inline': True
                },
                {
                    'name': '💰 Призовой фонд',
                    'value': f"{notification.get('prizePool', 0):,}₽".replace(',', ' '),
                    'inline': True
                },
                {
                    'name': '👥 Участники',
                    'value': f"{notification.get('participants', 0)}/{notification.get('maxParticipants', 0)}",
                    'inline': True
                }
            ],
            'footer': {
                'text': f"ID турнира: {notification.get('tournamentId', 0)}"
            },
            'timestamp': json.dumps(None)
        }
        
        if notification.get('userDiscord'):
            embed['fields'].append({
                'name': '📱 Discord пользователя',
                'value': notification.get('userDiscord'),
                'inline': False
            })
            
    elif notification.get('type') == 'start':
        embed = {
            'title': '🚀 Турнир начинается!',
            'description': f"Турнир **{notification.get('tournamentTitle', 'Неизвестный')}** скоро стартует!",
            'color': 0xff006b,
            'fields': [
                {
                    'name': '📅 Старт',
                    'value': notification.get('startDate', 'Скоро'),
                    'inline': True
                },
                {
                    'name': '💰 Призовой фонд',
                    'value': f"{notification.get('prizePool', 0):,}₽".replace(',', ' '),
                    'inline': True
                },
                {
                    'name': '👥 Участники',
                    'value': f"{notification.get('participants', 0)}/{notification.get('maxParticipants', 0)}",
                    'inline': True
                }
            ],
            'footer': {
                'text': 'Удачи всем участникам! 🎯'
            }
        }
        
    elif notification.get('type') == 'update':
        embed = {
            'title': '📢 Обновление турнира',
            'description': notification.get('message', 'Информация о турнире обновлена'),
            'color': 0x5856d6,
            'fields': [
                {
                    'name': '🏆 Турнир',
                    'value': notification.get('tournamentTitle', 'Неизвестный турнир'),
                    'inline': False
                }
            ]
        }
    
    if not embed:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Invalid notification type'})
        }
    
    payload = {
        'username': 'GodStoreGame Tournaments',
        'avatar_url': 'https://cdn-icons-png.flaticon.com/512/2956/2956879.png',
        'embeds': [embed]
    }
    
    try:
        req = Request(
            webhook_url,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        with urlopen(req) as response:
            response_data = response.read()
            
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Notification sent to Discord'})
        }
        
    except HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Discord API error', 'details': error_body})
        }
    except URLError as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Failed to send notification', 'details': str(e.reason)})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Failed to send notification', 'details': str(e)})
        }
