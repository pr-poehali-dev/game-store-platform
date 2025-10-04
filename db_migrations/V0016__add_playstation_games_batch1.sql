UPDATE t_p1573360_game_store_platform.games 
SET image_url = '/img/f5dbef09-0d3d-4316-8634-22f292363945.jpg'
WHERE title = 'Uncharted: The Lost Legacy';

UPDATE t_p1573360_game_store_platform.games 
SET image_url = '/img/df6aaee0-77a2-40bc-896c-ca5169f51311.jpg'
WHERE title LIKE '%Assassin%Mirage%';

INSERT INTO t_p1573360_game_store_platform.games 
(title, description, price, platform, category, rating, image_url, release_year, discount) VALUES

('Horizon Forbidden West', 'Продолжение приключений Элой в мире постапокалипсиса с машинами-динозаврами', 3499, 'PlayStation', 'Action', 9.0, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 2022, 15),
('Ratchet & Clank: Rift Apart', 'Приключения Рэтчета и Клэнка с порталами между мирами на PS5', 2999, 'PlayStation', 'Action', 9.1, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', 2021, 20),
('Demon''s Souls Remake', 'Ремейк классической souls-игры с потрясающей графикой на PS5', 3499, 'PlayStation', 'RPG', 9.2, 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800', 2020, 10),
('Returnal', 'Roguelike шутер от третьего лица с зацикленным временем', 2499, 'PlayStation', 'Action', 8.6, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 2021, 25),
('Ghost of Tsushima Director''s Cut', 'Самурайское приключение в феодальной Японии с расширением Ики', 3299, 'PlayStation', 'Action', 9.4, 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800', 2021, 18),

('Uncharted 4: A Thief''s End', 'Финальное приключение Натана Дрейка в поисках пиратских сокровищ', 1999, 'PlayStation', 'Action', 9.3, 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800', 2016, 30),
('Uncharted: The Nathan Drake Collection', 'Трилогия ремастеров первых частей Uncharted', 1499, 'PlayStation', 'Action', 8.8, 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800', 2015, 35),
('Horizon Zero Dawn Complete Edition', 'Первая часть приключений Элой с дополнением The Frozen Wilds', 1999, 'PlayStation', 'Action', 9.1, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 2017, 40),

('Gran Turismo 7', 'Самый реалистичный автосимулятор для PlayStation с сотнями машин', 3799, 'PlayStation', 'Racing', 8.9, 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800', 2022, 12),
('MLB The Show 24', 'Бейсбольный симулятор с карьерным режимом и онлайн-лигами', 2499, 'PlayStation', 'Sports', 8.4, 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', 2024, 0),

('Final Fantasy XVI', 'Новая часть легендарной JRPG серии с динамичной боевкой', 3999, 'PlayStation', 'RPG', 8.8, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', 2023, 15),
('Final Fantasy VII Rebirth', 'Вторая часть ремейка культовой FF7 с открытым миром', 4499, 'PlayStation', 'RPG', 9.2, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', 2024, 5),
('Persona 5 Royal', 'Расширенное издание лучшей JRPG с стильной графикой', 2499, 'PlayStation', 'RPG', 9.5, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 2020, 25),

('Resident Evil Village', 'Хоррор от первого лица в румынской деревне с вампирами', 2499, 'PlayStation', 'Horror', 8.7, 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800', 2021, 30),
('Resident Evil 4 Remake', 'Ремейк классического хоррора с улучшенной графикой', 2999, 'PlayStation', 'Horror', 9.3, 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800', 2023, 20),
('The Quarry', 'Интерактивная история ужасов в летнем лагере', 1999, 'PlayStation', 'Horror', 8.1, 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800', 2022, 35),

('Gran Turismo Sport', 'Онлайн гоночный симулятор с киберспортивными чемпионатами', 1299, 'PlayStation', 'Racing', 8.3, 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800', 2017, 45),
('Driveclub', 'Аркадный гоночный симулятор с динамической погодой', 999, 'PlayStation', 'Racing', 7.9, 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800', 2014, 50),

('Astro Bot Rescue Mission', 'Платформер для PS VR с роботом Астро', 1499, 'PlayStation', 'Platformer', 9.0, 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800', 2018, 40),
('LittleBigPlanet 3', 'Творческий платформер с редактором уровней', 899, 'PlayStation', 'Platformer', 8.2, 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800', 2014, 55);
