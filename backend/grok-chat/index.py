import json
import os
from typing import Dict, Any
import http.client

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: AI помощник для консультации по играм через Grok
    Args: event - dict с httpMethod, body (question, game_title)
          context - объект с request_id
    Returns: HTTP response с ответом от Grok AI
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    question: str = body_data.get('question', '')
    game_title: str = body_data.get('game_title', '')
    
    if not question:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Question is required'})
        }
    
    knowledge_base = {
        'call of duty': 'Call of Duty - легендарная серия военных шутеров. Modern Warfare III включает кампанию и мультиплеер с новыми картами и режимами. Отлично подходит для любителей динамичных сражений.',
        'battlefield': 'Battlefield - масштабные сражения с разрушаемым окружением. До 128 игроков одновременно. Идеально для командной игры.',
        'gta': 'Grand Theft Auto - открытый мир, криминальные истории. GTA V включает 3 персонажей и онлайн-режим. Одна из лучших игр всех времен.',
        'spider-man': 'Spider-Man - эксклюзив PlayStation. Великолепная графика, захватывающий сюжет и невероятная механика движения по городу.',
        'god of war': 'God of War - эпическое приключение по скандинавской мифологии. Кратос и Атрей в борьбе с богами. Одна из лучших игр для PlayStation.',
        'halo': 'Halo - культовая серия шутеров для Xbox. Космические битвы, Мастер Чиф и захватывающий мультиплеер.',
        'assassin': 'Assassins Creed - исторические приключения ассасинов. Valhalla погружает в эпоху викингов, Origins - в Древний Египет.',
        'elden ring': 'Elden Ring - шедевр от FromSoftware. Огромный открытый мир, сложные боссы и глубокий геймплей. Игра года 2022.',
    }
    
    question_lower = question.lower()
    game_lower = game_title.lower() if game_title else ''
    
    answer = None
    for key, value in knowledge_base.items():
        if key in question_lower or key in game_lower:
            answer = value
            break
    
    if not answer:
        if 'выбрать' in question_lower or 'посоветуй' in question_lower:
            answer = 'У нас отличный выбор игр для PlayStation и Xbox! Рекомендую обратить внимание на хиты: Call of Duty Modern Warfare III, Spider-Man 2, God of War Ragnarök, Elden Ring. Что вам больше нравится - шутеры, экшн или RPG?'
        elif 'цена' in question_lower or 'стоимость' in question_lower:
            answer = 'Цены на игры от 999₽ до 4499₽. У многих игр действуют скидки до 80%! Все игры покупаются на ваш аккаунт PlayStation или Xbox.'
        elif 'скидк' in question_lower or 'акци' in question_lower:
            answer = 'Сейчас действуют скидки на множество игр! Battlefield, GTA, Assassins Creed и многие другие со скидками до 75%.'
        else:
            answer = 'Я консультант магазина консольных игр. Могу рассказать о любой игре, помочь с выбором или ответить на вопросы о ценах и платформах!'
    
    if game_title and not answer:
        answer = f'Отличный выбор! {game_title} доступна на PlayStation и Xbox. Чем могу помочь с этой игрой?'
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'answer': answer,
            'game_title': game_title
        }, ensure_ascii=False)
    }