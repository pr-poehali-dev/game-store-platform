export interface Game {
  id: number;
  title: string;
  platform: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  rating: number;
  release_year: number;
  discount?: number;
  isHot?: boolean;
  isNew?: boolean;
  region?: string;
  franchise?: string;
  fullDescription?: string;
  consoleModels?: string;
}

export const initialGames: Game[] = [
  { id: 1, title: 'Call of Duty: Modern Warfare III', platform: 'Both', price: 4299, description: 'Легендарный шутер возвращается', image_url: '/img/a0b7d964-bec6-4f1d-b165-f7cf0b2ed7e0.jpg', category: 'Shooter', rating: 8.7, release_year: 2023, isHot: true, isNew: true, franchise: 'Call of Duty', fullDescription: 'Погрузитесь в новую захватывающую кампанию и многопользовательский режим. Знакомые герои, новые угрозы и эпические сражения в легендарной серии шутеров.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 2, title: 'Call of Duty: Black Ops Cold War', platform: 'Both', price: 3999, description: 'Холодная война шпионов', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1985810/header.jpg', category: 'Shooter', rating: 8.5, release_year: 2020, discount: 35, franchise: 'Call of Duty', fullDescription: 'Шпионский триллер времен холодной войны. Секретные операции, интриги и динамичный мультиплеер с режимом зомби.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 3, title: 'Call of Duty: Warzone', platform: 'Both', price: 0, description: 'Battle Royale от Activision', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg', category: 'Shooter', rating: 8.3, release_year: 2020, franchise: 'Call of Duty', fullDescription: 'Бесплатная королевская битва на 150 игроков. Стройте команду, выживайте и станьте последними на поле боя.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 4, title: 'Call of Duty: Vanguard', platform: 'Both', price: 3599, description: 'Вторая мировая война', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1962663/header.jpg', category: 'Shooter', rating: 7.9, release_year: 2021, discount: 50, franchise: 'Call of Duty', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 5, title: 'Battlefield 2042', platform: 'Both', price: 3299, description: 'Футуристический многопользовательский шутер', image_url: '/img/cd7c28ad-80b4-47e7-8d56-ac5cda302ed9.jpg', category: 'Shooter', rating: 7.8, release_year: 2021, discount: 45, franchise: 'Battlefield', fullDescription: 'Масштабные сражения будущего на огромных картах. 128 игроков, динамичная погода и разрушаемое окружение.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 6, title: 'Battlefield V', platform: 'Both', price: 2499, description: 'Вторая мировая война', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/header.jpg', category: 'Shooter', rating: 8.2, release_year: 2018, discount: 65, franchise: 'Battlefield', consoleModels: 'PS4, Xbox One' },
  { id: 7, title: 'Battlefield 1', platform: 'Both', price: 1999, description: 'Первая мировая война', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1238840/header.jpg', category: 'Shooter', rating: 8.6, release_year: 2016, discount: 75, franchise: 'Battlefield', consoleModels: 'PS4, Xbox One' },
  { id: 8, title: 'Battlefield 4', platform: 'Both', price: 1499, description: 'Современная война', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1238860/header.jpg', category: 'Shooter', rating: 8.8, release_year: 2013, discount: 80, franchise: 'Battlefield', consoleModels: 'PS4, Xbox One' },

  { id: 9, title: 'Grand Theft Auto V', platform: 'Both', price: 2999, description: 'Культовый криминальный боевик', image_url: '/img/a6da2765-7900-4901-8258-cf1da55c7533.jpg', category: 'Action', rating: 9.6, release_year: 2013, discount: 40, isHot: true, franchise: 'GTA', fullDescription: 'Три героя, один город. Грабежи, гонки и открытый мир Лос-Сантоса. Легендарная игра с постоянными обновлениями GTA Online.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 10, title: 'Grand Theft Auto IV', platform: 'Both', price: 1499, description: 'История иммигранта в Либерти-Сити', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/12210/header.jpg', category: 'Action', rating: 9.3, release_year: 2008, discount: 70, franchise: 'GTA', consoleModels: 'PS4, Xbox One' },
  { id: 11, title: 'Grand Theft Auto: San Andreas', platform: 'Both', price: 999, description: 'Классика серии', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/12120/header.jpg', category: 'Action', rating: 9.5, release_year: 2004, discount: 75, franchise: 'GTA', consoleModels: 'PS4, Xbox One' },
  { id: 12, title: 'Red Dead Redemption 2', platform: 'Both', price: 3499, description: 'Эпический вестерн от Rockstar', image_url: '/img/a3c43d42-ab3d-4413-8046-9f305bb7ed2d.jpg', category: 'Action', rating: 9.8, release_year: 2018, discount: 35, isHot: true, franchise: 'Red Dead', fullDescription: 'История банды Ван дер Линде в Диком Западе. Невероятная графика, живой мир и захватывающий сюжет о чести и выживании.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 13, title: 'The Last of Us Part I', platform: 'PlayStation', price: 3999, description: 'Ремейк постапокалиптического шедевра', image_url: '/img/86c50d40-14db-43cb-9317-6bb7bd4d8ef9.jpg', category: 'Action', rating: 9.5, release_year: 2022, region: 'TR/IN/UA', isHot: true, franchise: 'The Last of Us', fullDescription: 'Джоэл и Элли в путешествии через разрушенную Америку. Полностью переработанная графика и геймплей для PS5.', consoleModels: 'PS5' },
  { id: 14, title: 'The Last of Us Part II', platform: 'PlayStation', price: 3599, description: 'Продолжение легендарной истории', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg', category: 'Action', rating: 9.3, release_year: 2020, region: 'TR/IN/UA', franchise: 'The Last of Us', fullDescription: 'Мрачная история мести в постапокалиптическом мире. Эмоциональный сюжет и революционный геймплей.', consoleModels: 'PS4, PS5' },

  { id: 15, title: 'Halo Infinite', platform: 'Xbox', price: 2999, description: 'Легендарный шутер возвращается', image_url: '/img/e6875465-c2cc-4d7a-b988-6fbf6d3fb920.jpg', category: 'Shooter', rating: 8.5, release_year: 2021, discount: 40, franchise: 'Halo', fullDescription: 'Мастер Чиф против новой угрозы. Открытый мир, кооператив и легендарный мультиплеер серии Halo.', consoleModels: 'Xbox One, Xbox Series X/S' },
  { id: 16, title: 'Halo: The Master Chief Collection', platform: 'Xbox', price: 2499, description: 'Все части серии в одном издании', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/976730/header.jpg', category: 'Shooter', rating: 9.2, release_year: 2019, discount: 50, franchise: 'Halo', consoleModels: 'Xbox One, Xbox Series X/S' },
  { id: 17, title: 'Halo 5: Guardians', platform: 'Xbox', price: 1999, description: 'Космическая эпопея', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1064221/header.jpg', category: 'Shooter', rating: 8.3, release_year: 2015, discount: 60, franchise: 'Halo', consoleModels: 'Xbox One' },

  { id: 18, title: 'God of War Ragnarök', platform: 'PlayStation', price: 4299, description: 'Эпический финал скандинавской саги', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg', category: 'Action', rating: 9.6, release_year: 2022, region: 'TR/IN/UA', isHot: true, isNew: true, franchise: 'God of War', fullDescription: 'Кратос и Атрей против богов Асгарда. Рагнарёк близок, и только вы можете изменить судьбу миров.', consoleModels: 'PS4, PS5' },
  { id: 19, title: 'God of War (2018)', platform: 'PlayStation', price: 3499, description: 'Перерождение легендарной серии', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg', category: 'Action', rating: 9.5, release_year: 2018, discount: 30, region: 'TR/IN/UA', franchise: 'God of War', consoleModels: 'PS4, PS5' },

  { id: 20, title: 'Spider-Man 2', platform: 'PlayStation', price: 4499, description: 'Два Человека-паука в одной игре', image_url: '/img/3c2d6349-3e60-45f2-b2f8-50451618885f.jpg', category: 'Action', rating: 9.4, release_year: 2023, region: 'TR/IN/UA', isNew: true, isHot: true, franchise: 'Spider-Man', fullDescription: 'Питер Паркер и Майлз Моралес объединяются против Венома. Новые способности, враги и невероятный Нью-Йорк.', consoleModels: 'PS5' },
  { id: 21, title: 'Spider-Man: Miles Morales', platform: 'PlayStation', price: 3299, description: 'Новый герой Нью-Йорка', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817190/header.jpg', category: 'Action', rating: 9.0, release_year: 2020, discount: 35, region: 'TR/IN/UA', franchise: 'Spider-Man', consoleModels: 'PS4, PS5' },
  { id: 22, title: 'Spider-Man Remastered', platform: 'PlayStation', price: 3499, description: 'Классика с улучшенной графикой', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg', category: 'Action', rating: 9.2, release_year: 2018, discount: 30, region: 'TR/IN/UA', franchise: 'Spider-Man', consoleModels: 'PS5' },

  { id: 23, title: 'Uncharted 4', platform: 'PlayStation', price: 2999, description: 'Последнее приключение Нейтана Дрейка', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/header.jpg', category: 'Adventure', rating: 9.5, release_year: 2016, discount: 40, region: 'TR/IN/UA', franchise: 'Uncharted', fullDescription: 'Поиски пиратских сокровищ в захватывающем финале серии. Киноматографический сюжет и невероятные виды.', consoleModels: 'PS4, PS5' },
  { id: 24, title: 'Uncharted: The Lost Legacy', platform: 'PlayStation', price: 2299, description: 'Новые герои, новые сокровища', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1659421/header.jpg', category: 'Adventure', rating: 8.8, release_year: 2017, discount: 50, region: 'TR/IN/UA', franchise: 'Uncharted', consoleModels: 'PS4, PS5' },

  { id: 25, title: 'Horizon Forbidden West', platform: 'PlayStation', price: 4199, description: 'Запретный Запад полон тайн', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2420110/header.jpg', category: 'Action', rating: 9.2, release_year: 2022, region: 'TR/IN/UA', isNew: true, franchise: 'Horizon', fullDescription: 'Элой исследует новые земли, полные опасных машин. Подводные локации, летающие звери и эпическая история.', consoleModels: 'PS4, PS5' },
  { id: 26, title: 'Horizon Zero Dawn', platform: 'PlayStation', price: 2499, description: 'Начало легендарной серии', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg', category: 'Action', rating: 9.0, release_year: 2017, discount: 60, region: 'TR/IN/UA', franchise: 'Horizon', consoleModels: 'PS4, PS5' },

  { id: 27, title: 'Ghost of Tsushima', platform: 'PlayStation', price: 3999, description: 'Самурайская легенда острова Цусима', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/header.jpg', category: 'Action', rating: 9.5, release_year: 2020, region: 'TR/IN/UA', isHot: true, franchise: 'Ghost of Tsushima', fullDescription: 'Феодальная Япония 1274 года. Станьте призраком и защитите остров от монголов. Красивейшая игра поколения.', consoleModels: 'PS4, PS5' },

  { id: 28, title: 'Ratchet & Clank: Rift Apart', platform: 'PlayStation', price: 3799, description: 'Межпространственные приключения', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1895880/header.jpg', category: 'Action', rating: 9.1, release_year: 2021, region: 'TR/IN/UA', franchise: 'Ratchet & Clank', consoleModels: 'PS5' },

  { id: 29, title: 'Bloodborne', platform: 'PlayStation', price: 2499, description: 'Готический хоррор от FromSoftware', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2207050/header.jpg', category: 'RPG', rating: 9.6, release_year: 2015, discount: 50, region: 'TR/IN/UA', fullDescription: 'Проклятый город Ярнам полон чудовищ. Быстрые бои, викторианская атмосфера и безумные боссы.', consoleModels: 'PS4, PS5' },

  { id: 30, title: 'Demons Souls Remake', platform: 'PlayStation', price: 3999, description: 'Легенда FromSoftware возрождается', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2207040/header.jpg', category: 'RPG', rating: 9.3, release_year: 2020, discount: 35, region: 'TR/IN/UA', fullDescription: 'Полностью переработанная классика. Сложные боссы, мрачный мир и потрясающая графика PS5.', consoleModels: 'PS5' },

  { id: 31, title: 'Final Fantasy XVI', platform: 'PlayStation', price: 4299, description: 'Эпическая JRPG с драконами', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2515020/header.jpg', category: 'RPG', rating: 9.0, release_year: 2023, region: 'TR/IN/UA', isNew: true, franchise: 'Final Fantasy', consoleModels: 'PS5' },
  { id: 32, title: 'Final Fantasy VII Remake', platform: 'PlayStation', price: 3799, description: 'Ремейк легендарной RPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1462040/header.jpg', category: 'RPG', rating: 8.9, release_year: 2020, discount: 40, region: 'TR/IN/UA', franchise: 'Final Fantasy', consoleModels: 'PS4, PS5' },

  { id: 33, title: 'Resident Evil 4 Remake', platform: 'Both', price: 3599, description: 'Ремейк хоррора 2023', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg', category: 'Horror', rating: 9.5, release_year: 2023, discount: 25, franchise: 'Resident Evil', consoleModels: 'PS4, PS5, Xbox Series X/S' },
  { id: 34, title: 'Resident Evil Village', platform: 'Both', price: 2999, description: 'Хоррор в румынской деревне', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/header.jpg', category: 'Horror', rating: 8.9, release_year: 2021, discount: 45, franchise: 'Resident Evil', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 35, title: 'Resident Evil 2 Remake', platform: 'Both', price: 2499, description: 'Зомби в Раккун-Сити', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/883710/header.jpg', category: 'Horror', rating: 9.4, release_year: 2019, discount: 60, franchise: 'Resident Evil', consoleModels: 'PS4, Xbox One' },

  { id: 36, title: 'Assassins Creed Valhalla', platform: 'Both', price: 3299, description: 'Эпическая сага о викингах', image_url: '/img/184683a6-cd3f-4748-8100-fabe1e2601e0.jpg', category: 'Action', rating: 8.6, release_year: 2020, discount: 45, franchise: 'Assassins Creed', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 37, title: 'Assassins Creed Origins', platform: 'Both', price: 2499, description: 'Древний Египет и пирамиды', image_url: '/img/aa893926-0c7b-4bf4-bc47-74f28c5ec10a.jpg', category: 'Action', rating: 8.8, release_year: 2017, discount: 65, franchise: 'Assassins Creed', consoleModels: 'PS4, Xbox One' },
  { id: 38, title: 'Assassins Creed Odyssey', platform: 'Both', price: 2799, description: 'Древняя Греция и мифы', image_url: '/img/0508de41-e4fb-485b-a21c-a74a80a93e02.jpg', category: 'Action', rating: 8.7, release_year: 2018, discount: 60, franchise: 'Assassins Creed', consoleModels: 'PS4, Xbox One' },
  { id: 39, title: 'Assassins Creed Mirage', platform: 'Both', price: 3199, description: 'Возвращение к истокам серии', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2608970/header.jpg', category: 'Action', rating: 8.5, release_year: 2023, discount: 30, isNew: true, franchise: 'Assassins Creed', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 40, title: 'Elden Ring', platform: 'Both', price: 3799, description: 'Шедевр FromSoftware', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg', category: 'RPG', rating: 9.7, release_year: 2022, discount: 30, isHot: true, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 41, title: 'Dark Souls III', platform: 'Both', price: 2499, description: 'Темное фэнтези', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg', category: 'RPG', rating: 9.5, release_year: 2016, discount: 70, franchise: 'Dark Souls', consoleModels: 'PS4, Xbox One' },
  { id: 42, title: 'Sekiro: Shadows Die Twice', platform: 'Both', price: 2999, description: 'Самурайский экшен', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg', category: 'Action', rating: 9.6, release_year: 2019, discount: 55, consoleModels: 'PS4, Xbox One' },

  { id: 43, title: 'Cyberpunk 2077', platform: 'Both', price: 2999, description: 'Найт-Сити ждет вас', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg', category: 'RPG', rating: 8.8, release_year: 2020, discount: 40, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 44, title: 'The Witcher 3', platform: 'Both', price: 1999, description: 'Эпическая RPG о ведьмаке', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg', category: 'RPG', rating: 9.8, release_year: 2015, discount: 60, franchise: 'The Witcher', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 45, title: 'Forza Horizon 5', platform: 'Xbox', price: 2999, description: 'Гоночный симулятор в Мексике', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg', category: 'Racing', rating: 9.2, release_year: 2021, discount: 35, franchise: 'Forza', consoleModels: 'Xbox One, Xbox Series X/S' },
  { id: 46, title: 'Forza Motorsport', platform: 'Xbox', price: 3499, description: 'Реалистичные гонки', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2440510/header.jpg', category: 'Racing', rating: 8.6, release_year: 2023, isNew: true, franchise: 'Forza', consoleModels: 'Xbox Series X/S' },

  { id: 47, title: 'Gears 5', platform: 'Xbox', price: 2499, description: 'Культовый шутер от Microsoft', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097840/header.jpg', category: 'Shooter', rating: 8.7, release_year: 2019, discount: 50, franchise: 'Gears of War', consoleModels: 'Xbox One, Xbox Series X/S' },

  { id: 48, title: 'Starfield', platform: 'Xbox', price: 3999, description: 'Космическая RPG Bethesda', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg', category: 'RPG', rating: 8.6, release_year: 2023, discount: 30, isNew: true, consoleModels: 'Xbox Series X/S' },

  { id: 49, title: 'Gran Turismo 7', platform: 'PlayStation', price: 3999, description: 'Гоночный симулятор для PS', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2918430/header.jpg', category: 'Racing', rating: 8.9, release_year: 2022, region: 'TR/IN/UA', franchise: 'Gran Turismo', consoleModels: 'PS4, PS5' },

  { id: 50, title: 'Mortal Kombat 11', platform: 'Both', price: 2999, description: 'Брутальный файтинг', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/976310/header.jpg', category: 'Fighting', rating: 8.8, release_year: 2019, discount: 65, franchise: 'Mortal Kombat', consoleModels: 'PS4, Xbox One' },
  { id: 51, title: 'Mortal Kombat 1', platform: 'Both', price: 3599, description: 'Перезапуск серии', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header.jpg', category: 'Fighting', rating: 8.6, release_year: 2023, discount: 30, isNew: true, franchise: 'Mortal Kombat', consoleModels: 'PS5, Xbox Series X/S' },

  { id: 52, title: 'Street Fighter 6', platform: 'Both', price: 3499, description: 'Легендарный файтинг', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/header.jpg', category: 'Fighting', rating: 9.1, release_year: 2023, discount: 25, franchise: 'Street Fighter', consoleModels: 'PS4, PS5, Xbox Series X/S' },

  { id: 53, title: 'Tekken 8', platform: 'Both', price: 3999, description: 'Новая глава легенды', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg', category: 'Fighting', rating: 9.2, release_year: 2024, isNew: true, isHot: true, franchise: 'Tekken', consoleModels: 'PS5, Xbox Series X/S' },

  { id: 54, title: 'NBA 2K25', platform: 'Both', price: 3499, description: 'Баскетбольный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2338770/header.jpg', category: 'Sports', rating: 7.9, release_year: 2024, discount: 20, isNew: true, franchise: 'NBA 2K', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 55, title: 'EA Sports FC 24', platform: 'Both', price: 3299, description: 'Футбольный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg', category: 'Sports', rating: 8.1, release_year: 2023, discount: 35, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 56, title: 'Dying Light 2', platform: 'Both', price: 3199, description: 'Зомби-паркур в открытом мире', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/534380/header.jpg', category: 'Action', rating: 8.5, release_year: 2022, discount: 50, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 57, title: 'It Takes Two', platform: 'Both', price: 2299, description: 'Кооперативное приключение', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg', category: 'Adventure', rating: 9.6, release_year: 2021, discount: 45, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 58, title: 'Diablo IV', platform: 'Both', price: 3999, description: 'Легендарная ARPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/header.jpg', category: 'RPG', rating: 8.9, release_year: 2023, discount: 25, franchise: 'Diablo', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 59, title: 'Hogwarts Legacy', platform: 'Both', price: 3499, description: 'Магический мир Гарри Поттера', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg', category: 'RPG', rating: 8.9, release_year: 2023, discount: 30, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 60, title: 'Baldurs Gate 3', platform: 'Both', price: 3999, description: 'Эпическая RPG по D&D', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg', category: 'RPG', rating: 9.8, release_year: 2023, isHot: true, franchise: 'Baldurs Gate', consoleModels: 'PS5, Xbox Series X/S' },

  { id: 61, title: 'Alan Wake 2', platform: 'Both', price: 3799, description: 'Психологический хоррор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1282730/header.jpg', category: 'Horror', rating: 9.3, release_year: 2023, isNew: true, franchise: 'Alan Wake', consoleModels: 'PS5, Xbox Series X/S' },

  { id: 62, title: 'Dead Space Remake', platform: 'Both', price: 3299, description: 'Космический хоррор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1693980/header.jpg', category: 'Horror', rating: 9.3, release_year: 2023, discount: 35, franchise: 'Dead Space', consoleModels: 'PS5, Xbox Series X/S' },

  { id: 63, title: 'Silent Hill 2 Remake', platform: 'Both', price: 3999, description: 'Ремейк классического хоррора', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2124490/header.jpg', category: 'Horror', rating: 9.5, release_year: 2024, isNew: true, isHot: true, franchise: 'Silent Hill', consoleModels: 'PS5, Xbox Series X/S' },

  { id: 64, title: 'Persona 5 Royal', platform: 'Both', price: 3299, description: 'Легендарная JRPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/header.jpg', category: 'RPG', rating: 9.7, release_year: 2019, discount: 35, franchise: 'Persona', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 65, title: 'Monster Hunter World', platform: 'Both', price: 2499, description: 'Охота на гигантских монстров', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg', category: 'Action', rating: 9.0, release_year: 2018, discount: 65, franchise: 'Monster Hunter', consoleModels: 'PS4, Xbox One' },

  { id: 66, title: 'Doom Eternal', platform: 'Both', price: 2299, description: 'Брутальный шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg', category: 'Shooter', rating: 9.2, release_year: 2020, discount: 65, franchise: 'Doom', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 67, title: 'Metro Exodus', platform: 'Both', price: 2499, description: 'Постапокалиптический шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/412020/header.jpg', category: 'Shooter', rating: 8.8, release_year: 2019, discount: 70, franchise: 'Metro', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 68, title: 'Far Cry 6', platform: 'Both', price: 2999, description: 'Революция в тропиках', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header.jpg', category: 'Shooter', rating: 8.3, release_year: 2021, discount: 60, franchise: 'Far Cry', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 69, title: 'Rainbow Six Siege', platform: 'Both', price: 1999, description: 'Тактический шутер 5v5', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg', category: 'Shooter', rating: 8.9, release_year: 2015, discount: 70, franchise: 'Rainbow Six', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  { id: 70, title: 'Returnal', platform: 'PlayStation', price: 3499, description: 'Космический рогалик', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1649240/header.jpg', category: 'Action', rating: 9.0, release_year: 2021, region: 'TR/IN/UA', consoleModels: 'PS5' },

  { id: 71, title: 'Xbox Game Pass Ultimate', platform: 'Xbox', price: 899, description: 'Месяц подписки + Game Pass', image_url: 'https://compass-ssl.xbox.com/assets/c4/80/c480ca8d-7623-4b36-841b-ddbc14f8145f.jpg', category: 'Subscription', rating: 0, release_year: 2024, consoleModels: 'Xbox' },
  { id: 72, title: 'PlayStation Plus Extra', platform: 'PlayStation', price: 999, description: 'Месяц подписки PS Plus', image_url: 'https://gmedia.playstation.com/is/image/SIEPDC/ps-plus-extra-hero-art-01-en-13sep21', category: 'Subscription', rating: 0, release_year: 2024, region: 'TR/IN/UA', consoleModels: 'PlayStation' },
];