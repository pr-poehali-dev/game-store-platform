-- Добавление колонки для хранения цен конкурентов
ALTER TABLE games ADD COLUMN competitor_prices JSONB DEFAULT '[]'::jsonb;

-- Обновление цен конкурентов для популярных игр
UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 4999},
  {"store": "Epic Games", "price": 4799},
  {"store": "Plati.ru", "price": 4500}
]'::jsonb WHERE title = 'Elden Ring';

UPDATE games SET competitor_prices = '[
  {"store": "PlayStation Store", "price": 3999},
  {"store": "Plati.ru", "price": 3700},
  {"store": "Gabes.ru", "price": 3600}
]'::jsonb WHERE title = 'Cyberpunk 2077';

UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 3999},
  {"store": "Instant Gaming", "price": 3800},
  {"store": "Plati.ru", "price": 3650}
]'::jsonb WHERE title = 'Hogwarts Legacy';

UPDATE games SET competitor_prices = '[
  {"store": "PlayStation Store", "price": 4499},
  {"store": "Plati.ru", "price": 4200},
  {"store": "Gabes.ru", "price": 4100}
]'::jsonb WHERE title = 'Baldur''s Gate 3';

UPDATE games SET competitor_prices = '[
  {"store": "PlayStation Store", "price": 4999},
  {"store": "Plati.ru", "price": 4700},
  {"store": "GameKeys", "price": 4600}
]'::jsonb WHERE title = 'Final Fantasy XVI';

UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 2999},
  {"store": "Epic Games", "price": 2899},
  {"store": "Plati.ru", "price": 2800}
]'::jsonb WHERE title = 'Resident Evil 4 Remake';

UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 3499},
  {"store": "Epic Games", "price": 3399},
  {"store": "Plati.ru", "price": 3200}
]'::jsonb WHERE title = 'Alan Wake 2';

UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 4999},
  {"store": "Battle.net", "price": 4899},
  {"store": "Plati.ru", "price": 4700}
]'::jsonb WHERE title = 'Call of Duty: Modern Warfare III';

UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 4499},
  {"store": "PlayStation Store", "price": 4399},
  {"store": "Plati.ru", "price": 4200}
]'::jsonb WHERE title = 'Mortal Kombat 1';

UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 3999},
  {"store": "PlayStation Store", "price": 3899},
  {"store": "Plati.ru", "price": 3700}
]'::jsonb WHERE title = 'Street Fighter 6';

UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 4999},
  {"store": "Plati.ru", "price": 4800},
  {"store": "GameKeys", "price": 4700}
]'::jsonb WHERE title = 'Tekken 8';

UPDATE games SET competitor_prices = '[
  {"store": "Battle.net", "price": 3999},
  {"store": "Plati.ru", "price": 3800},
  {"store": "Steam", "price": 3900}
]'::jsonb WHERE title = 'Diablo IV';

UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 3999},
  {"store": "PlayStation Store", "price": 3899},
  {"store": "Plati.ru", "price": 3700}
]'::jsonb WHERE title = 'Star Wars Jedi: Survivor';

UPDATE games SET competitor_prices = '[
  {"store": "PlayStation Store", "price": 4999},
  {"store": "Plati.ru", "price": 4700},
  {"store": "Gabes.ru", "price": 4600}
]'::jsonb WHERE title = 'Spider-Man 2';

UPDATE games SET competitor_prices = '[
  {"store": "Steam", "price": 3499},
  {"store": "Epic Games", "price": 3399},
  {"store": "Plati.ru", "price": 3200}
]'::jsonb WHERE title = 'Dead Space Remake';