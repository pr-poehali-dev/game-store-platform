-- Добавление популярных игр 2024-2025 года

-- Блокбастеры 2024-2025
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Elden Ring', 'Both', 4499, 'Эпическая RPG от FromSoftware и Джорджа Мартина. Исследуйте огромный открытый мир Междуземья, сражайтесь с боссами и создавайте свою легенду.', '/img/688bfa46-7c19-40ed-8cf3-b71585f045d6.jpg', 'RPG', 9.5, 2024),
('Cyberpunk 2077', 'Both', 3999, 'Погрузитесь в неоновый мир Найт-Сити. Киберпанк-RPG с открытым миром, уникальными персонажами и захватывающей историей от CD Projekt RED.', '/img/ca90e177-dae9-4848-a7e3-88bb1ed88ba5.jpg', 'RPG', 8.8, 2024),
('Hogwarts Legacy', 'Both', 4299, 'Станьте студентом Хогвартса в 1800-х годах. Изучайте магию, исследуйте замок, сражайтесь с темными силами во вселенной Гарри Поттера.', '/img/96067ee6-028e-43a6-8404-5f4a10af6a2d.jpg', 'RPG', 8.9, 2024),
('Baldur''s Gate 3', 'PlayStation', 4199, 'Грандиозная RPG по вселенной Dungeons & Dragons. Создавайте партию героев, принимайте судьбоносные решения в эпическом приключении.', '/img/e730184d-e4fd-4c85-a450-b494f553f772.jpg', 'RPG', 9.7, 2024),
('Final Fantasy XVI', 'PlayStation', 4599, 'Новая глава легендарной серии Final Fantasy. Эпическая история, зрелищные битвы с Эйконами и захватывающий сюжет от Square Enix.', '/img/a80e285d-a1b0-4d47-9ccc-a1c38691e28e.jpg', 'RPG', 8.7, 2024),
('Resident Evil 4 Remake', 'Both', 3799, 'Ремейк культового хоррора. Леон Кеннеди в деревне зомби - улучшенная графика, новая механика и классическая атмосфера ужаса.', '/img/61fb67d0-6dcd-4b85-8b00-dad63cde9507.jpg', 'Хоррор', 9.2, 2024),
('Alan Wake 2', 'Both', 3899, 'Психологический хоррор от Remedy Entertainment. Погрузитесь в кошмарный мир между реальностью и вымыслом.', '/img/ba1b4f7a-1e80-43d2-89a2-c198f5808179.jpg', 'Хоррор', 9.0, 2024),
('Zelda: Tears of the Kingdom', 'Xbox', 4699, 'Продолжение легендарной Breath of the Wild. Новые способности Линка, парящие острова и невероятные приключения в Хайруле.', '/img/fe281027-5253-440d-9fdc-8a7ba07d814c.jpg', 'Приключения', 9.8, 2024);

-- Популярные экшены и шутеры
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Call of Duty: Modern Warfare III', 'Both', 4999, 'Новая часть легендарной серии шутеров. Масштабные мультиплеерные сражения, режим Zombies и захватывающая кампания.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 'Шутер', 8.5, 2024),
('Mortal Kombat 1', 'Both', 3699, 'Перезапуск культовой файтинг-серии. Новая временная линия, возвращение классических персонажей и жестокие файталити.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', 'Файтинг', 8.6, 2024),
('Street Fighter 6', 'Both', 3899, 'Шестая часть легендарного файтинга. Новая система боя, World Tour режим и возвращение любимых бойцов.', 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800', 'Файтинг', 9.1, 2024),
('Tekken 8', 'Both', 4199, 'Новое поколение King of Iron Fist Tournament. Революционная графика, агрессивный геймплей и история клана Мисима.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', 'Файтинг', 8.9, 2025),
('Diablo IV', 'Both', 4399, 'Возвращение в мрачный мир Санктуария. ARPG от Blizzard с открытым миром, тёмной атмосферой и бесконечной охотой за лутом.', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', 'RPG', 8.7, 2024),
('Star Wars Jedi: Survivor', 'Both', 4299, 'Продолжение приключений Кэла Кестиса. Новые планеты, улучшенный световой меч и эпическая история в далёкой-далёкой галактике.', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800', 'Экшен', 8.8, 2024),
('Dead Space Remake', 'Both', 3799, 'Ремейк культового космического хоррора. Инженер Айзек Кларк против нежити на космической станции Ишимура.', 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800', 'Хоррор', 9.0, 2024);

-- Спортивные и гоночные игры
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('EA Sports FC 24', 'Both', 3999, 'Новое название FIFA. Официальные лиги, реалистичный геймплей HyperMotionV и Ultimate Team с вашими любимыми футболистами.', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', 'Спорт', 8.3, 2024),
('NBA 2K25', 'Both', 3899, 'Лучший баскетбольный симулятор. MyCareer, MyTeam, реалистичная графика и все звёзды NBA сезона 2024-2025.', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', 'Спорт', 8.4, 2025),
('Gran Turismo 7', 'PlayStation', 4299, 'Легендарный автосимулятор для PlayStation. Сотни реальных автомобилей, фотореалистичная графика и легендарные трассы.', 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800', 'Гонки', 9.0, 2024),
('F1 24', 'Both', 3699, 'Официальная игра Формулы-1 сезона 2024. Все команды, пилоты и трассы чемпионата мира.', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800', 'Гонки', 8.5, 2024);

-- Приключения и платформеры
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Super Mario Bros. Wonder', 'Xbox', 3999, 'Новое 2D приключение Марио. Революционный геймплей с эффектом Wonder, новые миры и классическое веселье Nintendo.', 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800', 'Платформер', 9.3, 2024),
('Pikmin 4', 'Xbox', 3799, 'Четвёртая часть стратегии-приключения. Командуйте армией пикминов, исследуйте загадочную планету и решайте головоломки.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 'Приключения', 8.7, 2024),
('Lies of P', 'Both', 3599, 'Souls-like по мотивам Пиноккио. Мрачный стимпанк-мир, сложные битвы и история о становлении человеком.', 'https://images.unsplash.com/photo-1556438758-8d49568ce18e?w=800', 'Экшен', 8.8, 2024),
('Armored Core VI', 'Both', 3999, 'Возвращение легендарной серии меха-экшенов от FromSoftware. Кастомизация роботов и зрелищные битвы.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 'Экшен', 8.6, 2024);

-- Стратегии и симуляторы
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Cities: Skylines II', 'Both', 3299, 'Лучший градостроительный симулятор нового поколения. Создавайте мегаполисы с детальной экономикой и транспортом.', 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', 'Симулятор', 8.2, 2024),
('Manor Lords', 'Xbox', 2999, 'Средневековый градостроительный симулятор. Стройте деревни, управляйте экономикой и ведите армии в тактических сражениях.', 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800', 'Стратегия', 8.5, 2024),
('Starfield: Shattered Space', 'Xbox', 2499, 'Масштабное DLC для космической RPG. Новая планета Va''ruun, тёмные культы и загадочные артефакты.', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', 'RPG', 8.3, 2024);

-- Indie хиты
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Hollow Knight: Silksong', 'Both', 2499, 'Долгожданное продолжение Hollow Knight. Играйте за Хорнет в новом королевстве, полном тайн и опасностей.', 'https://images.unsplash.com/photo-1556438758-8d49568ce18e?w=800', 'Платформер', 9.4, 2025),
('Hades II', 'Both', 2299, 'Продолжение roguelike от Supergiant Games. Новая героиня, новые боги Олимпа и ещё более затягивающий геймплей.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 'Экшен', 9.2, 2025),
('Cocoon', 'Both', 1999, 'Атмосферная головоломка от создателя Limbo и Inside. Путешествуйте между мирами внутри сфер.', 'https://images.unsplash.com/photo-1556438758-8d49568ce18e?w=800', 'Головоломка', 8.9, 2024),
('Sea of Stars', 'Both', 2199, 'Ретро-RPG вдохновлённая классикой SNES. Пошаговые бои, красивый пиксель-арт и захватывающее приключение.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', 'RPG', 9.0, 2024);

-- Эксклюзивы PlayStation
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Stellar Blade', 'PlayStation', 3999, 'Стильный sci-fi экшен эксклюзивно для PS5. Воительница EVE против инопланетных захватчиков Земли.', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800', 'Экшен', 8.5, 2024),
('Rise of the Ronin', 'PlayStation', 4199, 'Самурайский экшен от Team Ninja. Открытый мир Японии XIX века, выбор стороны конфликта и зрелищные бои.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 'Экшен', 8.3, 2024),
('Helldivers 2', 'PlayStation', 2999, 'Кооперативный шутер про космодесант. Защищайте демократию в галактике вместе с друзьями!', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 'Шутер', 8.7, 2024),
('Spider-Man 2', 'PlayStation', 4799, 'Два Человека-Паука против Венома. Открытый Нью-Йорк, новые костюмы и способности, эпическая история от Insomniac.', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800', 'Экшен', 9.3, 2024);

-- Эксклюзивы Xbox
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Fable', 'Xbox', 4299, 'Перезапуск легендарной RPG-серии. Сказочный мир Альбиона, юмор, выбор морали и невероятные приключения.', 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800', 'RPG', 8.8, 2025),
('Perfect Dark', 'Xbox', 3999, 'Возвращение культового шпионского шутера. Современная графика, стелс-экшен и история агента Джоанны Дарк.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 'Шутер', 8.5, 2025),
('Avowed', 'Xbox', 4199, 'Фэнтези RPG от Obsidian во вселенной Pillars of Eternity. Магия, мечи и глубокий сюжет от мастеров жанра.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 'RPG', 8.6, 2025),
('Indiana Jones', 'Xbox', 4499, 'Приключения легендарного археолога от MachineGames. Загадки древних цивилизаций и зрелищный экшен.', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800', 'Приключения', 8.7, 2025);

-- Мультиплеерные хиты
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Overwatch 2', 'Both', 0, 'Бесплатный командный шутер от Blizzard. Уникальные герои, динамичные бои 5 на 5 и постоянные обновления.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 'Шутер', 8.2, 2024),
('Apex Legends', 'Both', 0, 'Королевская битва с героями и способностями. Динамичный геймплей, командная работа и регулярные сезоны.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 'Шутер', 8.4, 2024),
('Fortnite', 'Both', 0, 'Главная королевская битва планеты. Стройте, сражайтесь, сотрудничайте с Marvel, Star Wars и другими франшизами.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 'Шутер', 8.0, 2024),
('Warzone 2.0', 'Both', 0, 'Бесплатная королевская битва Call of Duty. Огромная карта, режим DMZ и интеграция с Modern Warfare III.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 'Шутер', 8.1, 2024);

-- Ремейки и ремастеры
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Tomb Raider I-III Remastered', 'Both', 2499, 'Трилогия классической Лары Крофт в новой графике. Переключайтесь между олдскулом и ремастером на лету.', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800', 'Приключения', 8.4, 2024),
('Prince of Persia: The Lost Crown', 'Both', 2999, 'Возрождение легендарной серии. Метроидвания с персидской мифологией, паркуром и временными силами.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 'Платформер', 8.8, 2024),
('Paper Mario: TTYD', 'Xbox', 3799, 'Ремейк культовой RPG про бумажного Марио. Пошаговые бои, юмор и путешествие за Кристальными Звёздами.', 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800', 'RPG', 9.1, 2024),
('The Last of Us Part II Remastered', 'PlayStation', 3999, 'Расширенное издание шедевра Naughty Dog. Улучшенная графика для PS5, новые режимы и потерянные уровни.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', 'Экшен', 9.5, 2024);

-- Хоррор хиты
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Silent Hill 2 Remake', 'PlayStation', 4299, 'Ремейк культового психологического хоррора. Джеймс Сандерленд возвращается в туманный Сайлент Хилл.', 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800', 'Хоррор', 9.1, 2025),
('STALKER 2', 'Xbox', 3999, 'Возвращение в Зону отчуждения. Атмосферный шутер с элементами survival и открытым миром Чернобыля.', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', 'Шутер', 8.6, 2025),
('Dead Island 2', 'Both', 3599, 'Зомби-апокалипсис в солнечной Калифорнии. Кооператив, крафт оружия и безумный экшен против орд мертвецов.', 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800', 'Экшен', 7.9, 2024);
