import { gameCovers } from './gameCovers';

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
  reviewCount?: number;
  avgReviewRating?: number;
  developer: string;
  publisher: string;
}

export const initialGames: Game[] = [
  { id: 1, title: 'Call of Duty: Modern Warfare III', platform: 'Both', price: 4299, description: 'Легендарный шутер возвращается', image_url: '/img/36482244-6d19-4c94-aaad-64a3828fa165.jpg', category: 'Shooter', rating: 8.7, release_year: 2023, isHot: true, isNew: true, franchise: 'Call of Duty', fullDescription: 'Погрузитесь в новую захватывающую кампанию и многопользовательский режим. Знакомые герои, новые угрозы и эпические сражения в легендарной серии шутеров.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', reviewCount: 4, avgReviewRating: 4.75, developer: 'Infinity Ward', publisher: 'Activision', competitorPrices: [
    { store: 'Steam', price: 4999 },
    { store: 'Battle.net', price: 4899 },
    { store: 'Plati.ru', price: 4700 }
  ] },
  { id: 2, title: 'Call of Duty: Black Ops Cold War', platform: 'Both', price: 3999, description: 'Холодная война шпионов', image_url: '/img/5f01360f-fc89-40dc-bcd7-a1ed991ff7fa.jpg', category: 'Shooter', rating: 8.5, release_year: 2020, discount: 35, franchise: 'Call of Duty', fullDescription: 'Шпионский триллер времен холодной войны. Секретные операции, интриги и динамичный мультиплеер с режимом зомби.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Infinity Ward', publisher: 'Activision' },
  { id: 3, title: 'Call of Duty: Warzone', platform: 'Both', price: 0, description: 'Battle Royale от Activision', image_url: '/img/9ababba3-922c-481f-a542-21f8ee16898b.jpg', category: 'Shooter', rating: 8.3, release_year: 2020, franchise: 'Call of Duty', fullDescription: 'Бесплатная королевская битва на 150 игроков. Стройте команду, выживайте и станьте последними на поле боя.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Infinity Ward', publisher: 'Activision' },
  { id: 4, title: 'Call of Duty: Vanguard', platform: 'Both', price: 3599, description: 'Вторая мировая война', image_url: '/img/03aa9ff5-e819-4414-b211-46a0ea1b831e.jpg', category: 'Shooter', rating: 7.9, release_year: 2021, discount: 50, franchise: 'Call of Duty', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Infinity Ward', publisher: 'Activision' },

  { id: 5, title: 'Battlefield 2042', platform: 'Both', price: 3299, description: 'Футуристический многопользовательский шутер', image_url: '/img/a1f019ec-c237-45ac-9bf7-6708dfc079b7.jpg', category: 'Shooter', rating: 7.8, release_year: 2021, discount: 45, franchise: 'Battlefield', fullDescription: 'Масштабные сражения будущего на огромных картах. 128 игроков, динамичная погода и разрушаемое окружение.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'DICE', publisher: 'Electronic Arts' },
  { id: 6, title: 'Battlefield V', platform: 'Both', price: 2499, description: 'Вторая мировая война', image_url: '/img/bdebfdc2-b617-4818-8c33-8ca9e87134f4.jpg', category: 'Shooter', rating: 8.2, release_year: 2018, discount: 65, franchise: 'Battlefield', consoleModels: 'PS4, Xbox One', developer: 'DICE', publisher: 'Electronic Arts' },
  { id: 7, title: 'Battlefield 1', platform: 'Both', price: 1999, description: 'Первая мировая война', image_url: '/img/64c4d675-e860-49ec-afe3-90ad2e4537f5.jpg', category: 'Shooter', rating: 8.6, release_year: 2016, discount: 75, franchise: 'Battlefield', consoleModels: 'PS4, Xbox One', developer: 'DICE', publisher: 'Electronic Arts' },
  { id: 8, title: 'Battlefield 4', platform: 'Both', price: 1499, description: 'Современная война', image_url: '/img/64c4d675-e860-49ec-afe3-90ad2e4537f5.jpg', category: 'Shooter', rating: 8.8, release_year: 2013, discount: 80, franchise: 'Battlefield', consoleModels: 'PS4, Xbox One', developer: 'DICE', publisher: 'Electronic Arts' },

  { id: 9, title: 'Grand Theft Auto V', platform: 'Both', price: 2999, description: 'Культовый криминальный боевик', image_url: '/img/a6da2765-7900-4901-8258-cf1da55c7533.jpg', category: 'Action', rating: 9.6, release_year: 2013, discount: 40, isHot: true, franchise: 'GTA', fullDescription: 'Три героя, один город. Грабежи, гонки и открытый мир Лос-Сантоса. Легендарная игра с постоянными обновлениями GTA Online.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Rockstar North', publisher: 'Rockstar Games' },
  { id: 10, title: 'Grand Theft Auto IV', platform: 'Both', price: 1499, description: 'История иммигранта в Либерти-Сити', image_url: '/img/f5f64843-7518-46dd-9dc4-e3cdbd45d72e.jpg', category: 'Action', rating: 9.3, release_year: 2008, discount: 70, franchise: 'GTA', consoleModels: 'PS4, Xbox One', developer: 'Rockstar North', publisher: 'Rockstar Games' },
  { id: 11, title: 'Grand Theft Auto: San Andreas', platform: 'Both', price: 999, description: 'Классика серии', image_url: '/img/f5f64843-7518-46dd-9dc4-e3cdbd45d72e.jpg', category: 'Action', rating: 9.5, release_year: 2004, discount: 75, franchise: 'GTA', consoleModels: 'PS4, Xbox One', developer: 'Rockstar North', publisher: 'Rockstar Games' },
  { id: 12, title: 'Red Dead Redemption 2', platform: 'Both', price: 3499, description: 'Эпический вестерн от Rockstar', image_url: '/img/28c6b1a8-018a-4607-8722-f312a3316508.jpg', category: 'Action', rating: 9.8, release_year: 2018, discount: 35, isHot: true, franchise: 'Red Dead', fullDescription: 'История банды Ван дер Линде в Диком Западе. Невероятная графика, живой мир и захватывающий сюжет о чести и выживании.', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Rockstar Studios', publisher: 'Rockstar Games' },

  { id: 13, title: 'The Last of Us Part I', platform: 'PlayStation', price: 3999, description: 'Ремейк постапокалиптического шедевра', image_url: '/img/86c50d40-14db-43cb-9317-6bb7bd4d8ef9.jpg', category: 'Action', rating: 9.5, release_year: 2022, region: 'TR/IN/UA', isHot: true, franchise: 'The Last of Us', fullDescription: 'Джоэл и Элли в путешествии через разрушенную Америку. Полностью переработанная графика и геймплей для PS5.', consoleModels: 'PS5', developer: 'Naughty Dog', publisher: 'Sony Interactive Entertainment' },
  { id: 14, title: 'The Last of Us Part II', platform: 'PlayStation', price: 3599, description: 'Продолжение легендарной истории', image_url: '/img/1bd82791-b335-4164-ac5d-40783f17c505.jpg', category: 'Action', rating: 9.3, release_year: 2020, region: 'TR/IN/UA', franchise: 'The Last of Us', fullDescription: 'Мрачная история мести в постапокалиптическом мире. Эмоциональный сюжет и революционный геймплей.', consoleModels: 'PS4, PS5', reviewCount: 3, avgReviewRating: 4.67, developer: 'Naughty Dog', publisher: 'Sony Interactive Entertainment' },

  { id: 15, title: 'Halo Infinite', platform: 'Xbox', price: 2999, description: 'Легендарный шутер возвращается', image_url: '/img/e6875465-c2cc-4d7a-b988-6fbf6d3fb920.jpg', category: 'Shooter', rating: 8.5, release_year: 2021, discount: 40, franchise: 'Halo', fullDescription: 'Мастер Чиф против новой угрозы. Открытый мир, кооператив и легендарный мультиплеер серии Halo.', consoleModels: 'Xbox One, Xbox Series X/S', reviewCount: 2, avgReviewRating: 3.5, developer: '343 Industries', publisher: 'Xbox Game Studios' },
  { id: 16, title: 'Halo: The Master Chief Collection', platform: 'Xbox', price: 2499, description: 'Все части серии в одном издании', image_url: '/img/14fcf207-7862-4026-810c-870638a48689.jpg', category: 'Shooter', rating: 9.2, release_year: 2019, discount: 50, franchise: 'Halo', consoleModels: 'Xbox One, Xbox Series X/S', developer: '343 Industries', publisher: 'Xbox Game Studios' },
  { id: 17, title: 'Halo 5: Guardians', platform: 'Xbox', price: 1999, description: 'Космическая эпопея', image_url: '/img/f8c5e6e3-c72b-4577-8d33-7228fcb19de0.jpg', category: 'Shooter', rating: 8.3, release_year: 2015, discount: 60, franchise: 'Halo', consoleModels: 'Xbox One', developer: '343 Industries', publisher: 'Xbox Game Studios' },

  { id: 18, title: 'God of War Ragnarök', platform: 'PlayStation', price: 4299, description: 'Эпический финал скандинавской саги', image_url: '/img/71858dad-6361-4f27-a846-78618fda9bed.jpg', category: 'Action', rating: 9.6, release_year: 2022, region: 'TR/IN/UA', isHot: true, isNew: true, franchise: 'God of War', fullDescription: 'Кратос и Атрей против богов Асгарда. Рагнарёк близок, и только вы можете изменить судьбу миров.', consoleModels: 'PS4, PS5', reviewCount: 3, avgReviewRating: 4.67, developer: 'Santa Monica Studio', publisher: 'Sony Interactive Entertainment' },
  { id: 19, title: 'God of War (2018)', platform: 'PlayStation', price: 3499, description: 'Перерождение легендарной серии', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'Action', rating: 9.5, release_year: 2018, discount: 30, region: 'TR/IN/UA', franchise: 'God of War', consoleModels: 'PS4, PS5', developer: 'Santa Monica Studio', publisher: 'Sony Interactive Entertainment' },

  { id: 20, title: 'Spider-Man 2', platform: 'PlayStation', price: 4499, description: 'Два Человека-паука в одной игре', image_url: '/img/3c2d6349-3e60-45f2-b2f8-50451618885f.jpg', category: 'Action', rating: 9.4, release_year: 2023, region: 'TR/IN/UA', isNew: true, isHot: true, franchise: 'Spider-Man', fullDescription: 'Питер Паркер и Майлз Моралес объединяются против Венома. Новые способности, враги и невероятный Нью-Йорк.', consoleModels: 'PS5', reviewCount: 3, avgReviewRating: 4.67, developer: 'Insomniac Games', publisher: 'Sony Interactive Entertainment', competitorPrices: [
    { store: 'PlayStation Store', price: 4999 },
    { store: 'Plati.ru', price: 4700 },
    { store: 'Gabes.ru', price: 4600 }
  ] },
  { id: 21, title: 'Spider-Man: Miles Morales', platform: 'PlayStation', price: 3299, description: 'Новый герой Нью-Йорка', image_url: '/img/4697066b-f275-4b13-9773-484e002c3064.jpg', category: 'Action', rating: 9.0, release_year: 2020, discount: 35, region: 'TR/IN/UA', franchise: 'Spider-Man', consoleModels: 'PS4, PS5', developer: 'Insomniac Games', publisher: 'Sony Interactive Entertainment' },
  { id: 22, title: 'Spider-Man Remastered', platform: 'PlayStation', price: 3499, description: 'Классика с улучшенной графикой', image_url: '/img/096e2e38-f715-4784-ad67-4649f485e6fb.jpg', category: 'Action', rating: 9.2, release_year: 2018, discount: 30, region: 'TR/IN/UA', franchise: 'Spider-Man', consoleModels: 'PS5', developer: 'Insomniac Games', publisher: 'Sony Interactive Entertainment' },

  { id: 23, title: 'Uncharted 4', platform: 'PlayStation', price: 2999, description: 'Последнее приключение Нейтана Дрейка', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Adventure', rating: 9.5, release_year: 2016, discount: 40, region: 'TR/IN/UA', franchise: 'Uncharted', fullDescription: 'Поиски пиратских сокровищ в захватывающем финале серии. Киноматографический сюжет и невероятные виды.', consoleModels: 'PS4, PS5', developer: 'Naughty Dog', publisher: 'Sony Interactive Entertainment' },
  { id: 24, title: 'Uncharted: The Lost Legacy', platform: 'PlayStation', price: 2299, description: 'Новые герои, новые сокровища', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Adventure', rating: 8.8, release_year: 2017, discount: 50, region: 'TR/IN/UA', franchise: 'Uncharted', consoleModels: 'PS4, PS5', developer: 'Naughty Dog', publisher: 'Sony Interactive Entertainment' },

  { id: 25, title: 'Horizon Forbidden West', platform: 'PlayStation', price: 4199, description: 'Запретный Запад полон тайн', image_url: '/img/302ece44-f5d4-4231-a52f-090c25f0c485.jpg', category: 'Action', rating: 9.2, release_year: 2022, region: 'TR/IN/UA', isNew: true, franchise: 'Horizon', fullDescription: 'Элой исследует новые земли, полные опасных машин. Подводные локации, летающие звери и эпическая история.', consoleModels: 'PS4, PS5', developer: 'Guerrilla Games', publisher: 'Sony Interactive Entertainment', versions: [
    { id: 'horizon-fw-v1', name: 'Standard PS4', price: 2999, description: 'Для PlayStation 4', platform: 'PlayStation', region: 'TR/IN/UA' },
    { id: 'horizon-fw-v2', name: 'Standard PS5', price: 4299, description: 'Версия для PS5', platform: 'PlayStation', region: 'TR/IN/UA' },
    { id: 'horizon-fw-v3', name: 'Complete Edition PS5', price: 4999, description: 'PS5 + DLC Burning Shores', platform: 'PlayStation', region: 'TR/IN/UA' }
  ] },
  { id: 26, title: 'Horizon Zero Dawn', platform: 'PlayStation', price: 2499, description: 'Начало легендарной серии', image_url: '/img/c2c75e22-3395-4e81-9ed0-8d5cc86fd7ea.jpg', category: 'Action', rating: 9.0, release_year: 2017, discount: 60, region: 'TR/IN/UA', franchise: 'Horizon', consoleModels: 'PS4, PS5', developer: 'Guerrilla Games', publisher: 'Sony Interactive Entertainment' },

  { id: 27, title: 'Ghost of Tsushima', platform: 'PlayStation', price: 3999, description: 'Самурайская легенда острова Цусима', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'Action', rating: 9.5, release_year: 2020, region: 'TR/IN/UA', isHot: true, franchise: 'Ghost of Tsushima', fullDescription: 'Феодальная Япония 1274 года. Станьте призраком и защитите остров от монголов. Красивейшая игра поколения.', consoleModels: 'PS4, PS5', developer: 'Sucker Punch Productions', publisher: 'Sony Interactive Entertainment', versions: [
    { id: 'ghost-tsushima-v1', name: 'PS4 версия', price: 2799, description: 'Для PlayStation 4', platform: 'PlayStation', region: 'TR/IN/UA' },
    { id: 'ghost-tsushima-v2', name: 'PS5 версия', price: 3999, description: "Director's Cut для PS5 с островом Ики", platform: 'PlayStation', region: 'TR/IN/UA' }
  ] },

  { id: 28, title: 'Ratchet & Clank: Rift Apart', platform: 'PlayStation', price: 3799, description: 'Межпространственные приключения', image_url: '/img/0d2c400f-e318-49ed-b91e-4df56421b7b8.jpg', category: 'Action', rating: 9.1, release_year: 2021, region: 'TR/IN/UA', franchise: 'Ratchet & Clank', consoleModels: 'PS5', developer: 'Insomniac Games', publisher: 'Sony Interactive Entertainment' },

  { id: 29, title: 'Bloodborne', platform: 'PlayStation', price: 2499, description: 'Готический хоррор от FromSoftware', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'RPG', rating: 9.6, release_year: 2015, discount: 50, region: 'TR/IN/UA', fullDescription: 'Проклятый город Ярнам полон чудовищ. Быстрые бои, викторианская атмосфера и безумные боссы.', consoleModels: 'PS4, PS5', developer: 'FromSoftware', publisher: 'Sony Interactive Entertainment' },

  { id: 30, title: 'Demons Souls Remake', platform: 'PlayStation', price: 3999, description: 'Легенда FromSoftware возрождается', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'RPG', rating: 9.3, release_year: 2020, discount: 35, region: 'TR/IN/UA', fullDescription: 'Полностью переработанная классика. Сложные боссы, мрачный мир и потрясающая графика PS5.', consoleModels: 'PS5', developer: 'FromSoftware', publisher: 'Sony Interactive Entertainment' },

  { id: 31, title: 'Final Fantasy XVI', platform: 'PlayStation', price: 4299, description: 'Эпическая JRPG с драконами', image_url: '/img/da559ce3-efac-438c-b67a-3f6bcbc4e983.jpg', category: 'RPG', rating: 9.0, release_year: 2023, region: 'TR/IN/UA', isNew: true, franchise: 'Final Fantasy', consoleModels: 'PS5', developer: 'Square Enix', publisher: 'Square Enix', competitorPrices: [
    { store: 'PlayStation Store', price: 4999 },
    { store: 'Plati.ru', price: 4700 },
    { store: 'GameKeys', price: 4600 }
  ] },
  { id: 32, title: 'Final Fantasy VII Remake', platform: 'PlayStation', price: 3799, description: 'Ремейк легендарной RPG', image_url: '/img/eec7aeac-399b-45ea-a561-9ca479f40ecf.jpg', category: 'RPG', rating: 8.9, release_year: 2020, discount: 40, region: 'TR/IN/UA', franchise: 'Final Fantasy', consoleModels: 'PS4, PS5', developer: 'Square Enix', publisher: 'Square Enix' },

  { id: 33, title: 'Resident Evil 4 Remake', platform: 'Both', price: 3599, description: 'Ремейк хоррора 2023', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Horror', rating: 9.5, release_year: 2023, discount: 25, franchise: 'Resident Evil', consoleModels: 'PS4, PS5, Xbox Series X/S', developer: 'Capcom', publisher: 'Capcom', competitorPrices: [
    { store: 'Steam', price: 2999 },
    { store: 'Epic Games', price: 2899 },
    { store: 'Plati.ru', price: 2800 }
  ] },
  { id: 34, title: 'Resident Evil Village', platform: 'Both', price: 2999, description: 'Хоррор в румынской деревне', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Horror', rating: 8.9, release_year: 2021, discount: 45, franchise: 'Resident Evil', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Capcom', publisher: 'Capcom' },
  { id: 35, title: 'Resident Evil 2 Remake', platform: 'Both', price: 2499, description: 'Зомби в Раккун-Сити', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Horror', rating: 9.4, release_year: 2019, discount: 60, franchise: 'Resident Evil', consoleModels: 'PS4, Xbox One', developer: 'Capcom', publisher: 'Capcom' },

  { id: 36, title: 'Assassins Creed Valhalla', platform: 'Both', price: 3299, description: 'Эпическая сага о викингах', image_url: '/img/184683a6-cd3f-4748-8100-fabe1e2601e0.jpg', category: 'Action', rating: 8.6, release_year: 2020, discount: 45, franchise: 'Assassins Creed', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Ubisoft Montreal', publisher: 'Ubisoft' },
  { id: 37, title: 'Assassins Creed Origins', platform: 'Both', price: 2499, description: 'Древний Египет и пирамиды', image_url: '/img/aa893926-0c7b-4bf4-bc47-74f28c5ec10a.jpg', category: 'Action', rating: 8.8, release_year: 2017, discount: 65, franchise: 'Assassins Creed', consoleModels: 'PS4, Xbox One', developer: 'Ubisoft Montreal', publisher: 'Ubisoft' },
  { id: 38, title: 'Assassins Creed Odyssey', platform: 'Both', price: 2799, description: 'Древняя Греция и мифы', image_url: '/img/0508de41-e4fb-485b-a21c-a74a80a93e02.jpg', category: 'Action', rating: 8.7, release_year: 2018, discount: 60, franchise: 'Assassins Creed', consoleModels: 'PS4, Xbox One', developer: 'Ubisoft Montreal', publisher: 'Ubisoft' },
  { id: 39, title: 'Assassins Creed Mirage', platform: 'Both', price: 3199, description: 'Возвращение к истокам серии', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'Action', rating: 8.5, release_year: 2023, discount: 30, isNew: true, franchise: 'Assassins Creed', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Ubisoft Montreal', publisher: 'Ubisoft' },

  { id: 40, title: 'Elden Ring', platform: 'Both', price: 3799, description: 'Шедевр FromSoftware', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'RPG', rating: 9.7, release_year: 2022, discount: 30, isHot: true, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'FromSoftware', publisher: 'Bandai Namco', competitorPrices: [
    { store: 'Steam', price: 4999 },
    { store: 'Epic Games', price: 4799 },
    { store: 'Plati.ru', price: 4500 }
  ], versions: [
    { id: 'elden-ring-v1', name: 'Standard Edition', price: 2999, description: 'Базовая версия игры' },
    { id: 'elden-ring-v2', name: 'Deluxe Edition', price: 3799, description: 'Включает артбук и саундтрек', platform: 'Both' }
  ] },
  { id: 41, title: 'Dark Souls III', platform: 'Both', price: 2499, description: 'Темное фэнтези', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'RPG', rating: 9.5, release_year: 2016, discount: 70, franchise: 'Dark Souls', consoleModels: 'PS4, Xbox One', developer: 'FromSoftware', publisher: 'Bandai Namco' },
  { id: 42, title: 'Sekiro: Shadows Die Twice', platform: 'Both', price: 2999, description: 'Самурайский экшен', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'Action', rating: 9.6, release_year: 2019, discount: 55, consoleModels: 'PS4, Xbox One', developer: 'FromSoftware', publisher: 'Activision' },

  { id: 43, title: 'Cyberpunk 2077', platform: 'Both', price: 2999, description: 'Найт-Сити ждет вас', image_url: '/img/f5f64843-7518-46dd-9dc4-e3cdbd45d72e.jpg', category: 'RPG', rating: 8.8, release_year: 2020, discount: 40, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'CD Projekt Red', publisher: 'CD Projekt', competitorPrices: [
    { store: 'PlayStation Store', price: 3999 },
    { store: 'Plati.ru', price: 3700 },
    { store: 'Gabes.ru', price: 3600 }
  ], versions: [
    { id: 'cyberpunk-v1', name: 'Standard Edition', price: 2199, description: 'Базовая версия игры' },
    { id: 'cyberpunk-v2', name: 'Ultimate Edition', price: 3299, description: 'Все DLC + Phantom Liberty', platform: 'Both' }
  ] },
  { id: 44, title: 'The Witcher 3', platform: 'Both', price: 1999, description: 'Эпическая RPG о ведьмаке', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'RPG', rating: 9.8, release_year: 2015, discount: 60, franchise: 'The Witcher', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'CD Projekt Red', publisher: 'CD Projekt' },

  { id: 45, title: 'Forza Horizon 5', platform: 'Xbox', price: 2999, description: 'Гоночный симулятор в Мексике', image_url: '/img/eef2a698-532d-4f11-8882-9f04ce5e8bf5.jpg', category: 'Racing', rating: 9.2, release_year: 2021, discount: 35, franchise: 'Forza', consoleModels: 'Xbox One, Xbox Series X/S', reviewCount: 2, avgReviewRating: 5.0, developer: 'Playground Games', publisher: 'Xbox Game Studios' },
  { id: 46, title: 'Forza Motorsport', platform: 'Xbox', price: 3499, description: 'Реалистичные гонки', image_url: '/img/eef2a698-532d-4f11-8882-9f04ce5e8bf5.jpg', category: 'Racing', rating: 8.6, release_year: 2023, isNew: true, franchise: 'Forza', consoleModels: 'Xbox Series X/S', developer: 'Playground Games', publisher: 'Xbox Game Studios' },

  { id: 47, title: 'Gears 5', platform: 'Xbox', price: 2499, description: 'Культовый шутер от Microsoft', image_url: '/img/64c4d675-e860-49ec-afe3-90ad2e4537f5.jpg', category: 'Shooter', rating: 8.7, release_year: 2019, discount: 50, franchise: 'Gears of War', consoleModels: 'Xbox One, Xbox Series X/S', developer: 'The Coalition', publisher: 'Xbox Game Studios' },

  { id: 48, title: 'Starfield', platform: 'Xbox', price: 3999, description: 'Космическая RPG Bethesda', image_url: '/img/14fcf207-7862-4026-810c-870638a48689.jpg', category: 'RPG', rating: 8.6, release_year: 2023, discount: 30, isNew: true, consoleModels: 'Xbox Series X/S', reviewCount: 4, avgReviewRating: 4.75, developer: 'Bethesda Game Studios', publisher: 'Bethesda Softworks' },

  { id: 49, title: 'Gran Turismo 7', platform: 'PlayStation', price: 3999, description: 'Гоночный симулятор для PS', image_url: '/img/eef2a698-532d-4f11-8882-9f04ce5e8bf5.jpg', category: 'Racing', rating: 8.9, release_year: 2022, region: 'TR/IN/UA', franchise: 'Gran Turismo', consoleModels: 'PS4, PS5', developer: 'Polyphony Digital', publisher: 'Sony Interactive Entertainment' },

  { id: 50, title: 'Mortal Kombat 11', platform: 'Both', price: 2999, description: 'Брутальный файтинг', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Fighting', rating: 8.8, release_year: 2019, discount: 65, franchise: 'Mortal Kombat', consoleModels: 'PS4, Xbox One', developer: 'NetherRealm Studios', publisher: 'Warner Bros. Interactive Entertainment' },
  { id: 51, title: 'Mortal Kombat 1', platform: 'Both', price: 3599, description: 'Перезапуск серии', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Fighting', rating: 8.6, release_year: 2023, discount: 30, isNew: true, franchise: 'Mortal Kombat', consoleModels: 'PS5, Xbox Series X/S', developer: 'NetherRealm Studios', publisher: 'Warner Bros. Interactive Entertainment', competitorPrices: [
    { store: 'Steam', price: 4499 },
    { store: 'PlayStation Store', price: 4399 },
    { store: 'Plati.ru', price: 4200 }
  ] },

  { id: 52, title: 'Street Fighter 6', platform: 'Both', price: 3499, description: 'Легендарный файтинг', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Fighting', rating: 9.1, release_year: 2023, discount: 25, franchise: 'Street Fighter', consoleModels: 'PS4, PS5, Xbox Series X/S', developer: 'Capcom', publisher: 'Capcom', competitorPrices: [
    { store: 'Steam', price: 3999 },
    { store: 'PlayStation Store', price: 3899 },
    { store: 'Plati.ru', price: 3700 }
  ] },

  { id: 53, title: 'Tekken 8', platform: 'Both', price: 3999, description: 'Новая глава легенды', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Fighting', rating: 9.2, release_year: 2024, isNew: true, isHot: true, franchise: 'Tekken', consoleModels: 'PS5, Xbox Series X/S', developer: 'Bandai Namco', publisher: 'Bandai Namco', competitorPrices: [
    { store: 'Steam', price: 4999 },
    { store: 'Plati.ru', price: 4800 },
    { store: 'GameKeys', price: 4700 }
  ] },

  { id: 54, title: 'NBA 2K25', platform: 'Both', price: 3499, description: 'Баскетбольный симулятор', image_url: '/img/e7d53a4a-4e69-430e-9274-cf85aa61b690.jpg', category: 'Sports', rating: 7.9, release_year: 2024, discount: 20, isNew: true, franchise: 'NBA 2K', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Visual Concepts', publisher: '2K Sports' },

  { id: 55, title: 'EA Sports FC 24', platform: 'Both', price: 3299, description: 'Футбольный симулятор', image_url: '/img/e7d53a4a-4e69-430e-9274-cf85aa61b690.jpg', category: 'Sports', rating: 8.1, release_year: 2023, discount: 35, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'EA Sports', publisher: 'Electronic Arts' },

  { id: 56, title: 'Dying Light 2', platform: 'Both', price: 3199, description: 'Зомби-паркур в открытом мире', image_url: '/img/d583f402-2809-4625-87fc-8b89a21bd876.jpg', category: 'Action', rating: 8.5, release_year: 2022, discount: 50, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Techland', publisher: 'Techland' },

  { id: 57, title: 'It Takes Two', platform: 'Both', price: 2299, description: 'Кооперативное приключение', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Adventure', rating: 9.6, release_year: 2021, discount: 45, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Hazelight Studios', publisher: 'Electronic Arts' },

  { id: 58, title: 'Diablo IV', platform: 'Both', price: 3999, description: 'Легендарная ARPG', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'RPG', rating: 8.9, release_year: 2023, discount: 25, franchise: 'Diablo', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Blizzard Entertainment', publisher: 'Blizzard Entertainment', competitorPrices: [
    { store: 'Battle.net', price: 3999 },
    { store: 'Plati.ru', price: 3800 },
    { store: 'Steam', price: 3900 }
  ] },

  { id: 59, title: 'Hogwarts Legacy', platform: 'Both', price: 3499, description: 'Магический мир Гарри Поттера', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'RPG', rating: 8.9, release_year: 2023, discount: 30, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Avalanche Software', publisher: 'Warner Bros. Interactive Entertainment', competitorPrices: [
    { store: 'Steam', price: 3999 },
    { store: 'Instant Gaming', price: 3800 },
    { store: 'Plati.ru', price: 3650 }
  ] },

  { id: 60, title: 'Baldurs Gate 3', platform: 'Both', price: 3999, description: 'Эпическая RPG по D&D', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'RPG', rating: 9.8, release_year: 2023, isHot: true, franchise: 'Baldurs Gate', consoleModels: 'PS5, Xbox Series X/S', developer: 'Larian Studios', publisher: 'Larian Studios', competitorPrices: [
    { store: 'PlayStation Store', price: 4499 },
    { store: 'Plati.ru', price: 4200 },
    { store: 'Gabes.ru', price: 4100 }
  ], versions: [
    { id: 'baldurs-gate-v1', name: 'Standard Edition', price: 2799, description: 'Полная игра' },
    { id: 'baldurs-gate-v2', name: 'Digital Deluxe', price: 3499, description: 'Артбук, саундтрек, маски дайсов', platform: 'Both' }
  ] },

  { id: 61, title: 'Alan Wake 2', platform: 'Both', price: 3799, description: 'Психологический хоррор', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Horror', rating: 9.3, release_year: 2023, isNew: true, franchise: 'Alan Wake', consoleModels: 'PS5, Xbox Series X/S', developer: 'Remedy Entertainment', publisher: 'Epic Games Publishing', competitorPrices: [
    { store: 'Steam', price: 3499 },
    { store: 'Epic Games', price: 3399 },
    { store: 'Plati.ru', price: 3200 }
  ] },

  { id: 62, title: 'Dead Space Remake', platform: 'Both', price: 3299, description: 'Космический хоррор', image_url: '/img/14fcf207-7862-4026-810c-870638a48689.jpg', category: 'Horror', rating: 9.3, release_year: 2023, discount: 35, franchise: 'Dead Space', consoleModels: 'PS5, Xbox Series X/S', developer: 'Motive Studio', publisher: 'Electronic Arts', competitorPrices: [
    { store: 'Steam', price: 3499 },
    { store: 'Epic Games', price: 3399 },
    { store: 'Plati.ru', price: 3200 }
  ] },

  { id: 63, title: 'Silent Hill 2 Remake', platform: 'Both', price: 3999, description: 'Ремейк классического хоррора', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Horror', rating: 9.5, release_year: 2024, isNew: true, isHot: true, franchise: 'Silent Hill', consoleModels: 'PS5, Xbox Series X/S', developer: 'Bloober Team', publisher: 'Konami' },

  { id: 64, title: 'Persona 5 Royal', platform: 'Both', price: 3299, description: 'Легендарная JRPG', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'RPG', rating: 9.7, release_year: 2019, discount: 35, franchise: 'Persona', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Atlus', publisher: 'Atlus' },

  { id: 65, title: 'Monster Hunter World', platform: 'Both', price: 2499, description: 'Охота на гигантских монстров', image_url: '/img/68ef54ae-d485-4597-92b6-2834432a1ff9.jpg', category: 'Action', rating: 9.0, release_year: 2018, discount: 65, franchise: 'Monster Hunter', consoleModels: 'PS4, Xbox One', developer: 'Capcom', publisher: 'Capcom' },

  { id: 66, title: 'Doom Eternal', platform: 'Both', price: 2299, description: 'Брутальный шутер', image_url: '/img/64c4d675-e860-49ec-afe3-90ad2e4537f5.jpg', category: 'Shooter', rating: 9.2, release_year: 2020, discount: 65, franchise: 'Doom', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'id Software', publisher: 'Bethesda Softworks' },

  { id: 67, title: 'Metro Exodus', platform: 'Both', price: 2499, description: 'Постапокалиптический шутер', image_url: '/img/d583f402-2809-4625-87fc-8b89a21bd876.jpg', category: 'Shooter', rating: 8.8, release_year: 2019, discount: 70, franchise: 'Metro', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: '4A Games', publisher: 'Deep Silver' },

  { id: 68, title: 'Far Cry 6', platform: 'Both', price: 2999, description: 'Революция в тропиках', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Shooter', rating: 8.3, release_year: 2021, discount: 60, franchise: 'Far Cry', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Ubisoft Montreal', publisher: 'Ubisoft' },

  { id: 69, title: 'Rainbow Six Siege', platform: 'Both', price: 1999, description: 'Тактический шутер 5v5', image_url: '/img/64c4d675-e860-49ec-afe3-90ad2e4537f5.jpg', category: 'Shooter', rating: 8.9, release_year: 2015, discount: 70, franchise: 'Rainbow Six', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S', developer: 'Ubisoft Montreal', publisher: 'Ubisoft' },

  { id: 70, title: 'Returnal', platform: 'PlayStation', price: 3499, description: 'Космический рогалик', image_url: '/img/14fcf207-7862-4026-810c-870638a48689.jpg', category: 'Action', rating: 9.0, release_year: 2021, region: 'TR/IN/UA', consoleModels: 'PS5', developer: 'Housemarque', publisher: 'Sony Interactive Entertainment' },

  { id: 71, title: 'Days Gone', platform: 'PlayStation', price: 2799, description: 'Выживание в мире зомби', image_url: '/img/d583f402-2809-4625-87fc-8b89a21bd876.jpg', category: 'Action', rating: 8.5, release_year: 2019, discount: 45, region: 'TR/IN/UA', consoleModels: 'PS4, PS5', developer: 'Bend Studio', publisher: 'Sony Interactive Entertainment' },

  { id: 72, title: 'Death Stranding', platform: 'Both', price: 2499, description: 'Уникальный опыт от Кодзимы', image_url: '/img/14fcf207-7862-4026-810c-870638a48689.jpg', category: 'Action', rating: 8.9, release_year: 2019, discount: 50, consoleModels: 'PS4, PS5, Xbox Series X/S', developer: 'Kojima Productions', publisher: 'Sony Interactive Entertainment' },

  // FIGHTING GAMES
  { id: 73, title: 'Mortal Kombat 11', platform: 'Both', price: 2499, description: 'Легендарный файтинг с брутальными фаталити', image_url: '/img/56e8ef52-edb7-43be-bb6a-7f7180931d37.jpg', category: 'Fighting', rating: 8.4, release_year: 2019, discount: 60, publisher: 'Warner Bros', developer: 'NetherRealm Studios', consoleModels: 'PS4, Xbox One' },
  { id: 74, title: 'Tekken 8', platform: 'Both', price: 3999, description: 'Новейший файтинг серии Tekken', image_url: '/img/f683a558-4b50-4822-ae02-9fb0fad8c0cb.jpg', category: 'Fighting', rating: 8.8, release_year: 2024, publisher: 'Bandai Namco', developer: 'Bandai Namco', isNew: true, isHot: true, consoleModels: 'PS5, Xbox Series X/S' },
  { id: 75, title: 'Street Fighter 6', platform: 'Both', price: 3499, description: 'Революционный файтинг от Capcom', image_url: '/img/4a7fe2d3-6c2f-489e-a9ef-a8476f22ebd0.jpg', category: 'Fighting', rating: 8.9, release_year: 2023, publisher: 'Capcom', developer: 'Capcom', isNew: true, consoleModels: 'PS4, PS5, Xbox Series X/S' },
  { id: 76, title: 'Mortal Kombat 1', platform: 'Both', price: 3799, description: 'Перезапуск легендарной серии', image_url: '/img/56e8ef52-edb7-43be-bb6a-7f7180931d37.jpg', category: 'Fighting', rating: 8.2, release_year: 2023, publisher: 'Warner Bros', developer: 'NetherRealm Studios', isNew: true, consoleModels: 'PS5, Xbox Series X/S' },
  { id: 77, title: 'Injustice 2', platform: 'Both', price: 1999, description: 'Файтинг с супергероями DC', image_url: '/img/56e8ef52-edb7-43be-bb6a-7f7180931d37.jpg', category: 'Fighting', rating: 8.5, release_year: 2017, publisher: 'Warner Bros', developer: 'NetherRealm Studios', discount: 70, consoleModels: 'PS4, Xbox One' },

  // RPG GAMES
  { id: 78, title: 'Diablo IV', platform: 'Both', price: 3999, description: 'Темное фэнтези action-RPG', image_url: '/img/c0b4b910-03ec-4877-b226-40d316c6b4a1.jpg', category: 'RPG', rating: 8.6, release_year: 2023, publisher: 'Blizzard', developer: 'Blizzard Entertainment', isNew: true, isHot: true, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 79, title: 'Destiny 2: The Final Shape', platform: 'Both', price: 2999, description: 'Sci-fi шутер с RPG элементами', image_url: '/img/fba64a3f-3e5e-4543-8e8b-65d7eeb11484.jpg', category: 'Shooter', rating: 8.7, release_year: 2024, publisher: 'Bungie', developer: 'Bungie', isNew: true, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 80, title: 'Monster Hunter Rise', platform: 'Both', price: 2799, description: 'Охота на гигантских монстров', image_url: '/img/da9d0f0a-452c-4f61-995d-bd8c2208b97c.jpg', category: 'RPG', rating: 8.5, release_year: 2022, publisher: 'Capcom', developer: 'Capcom', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 81, title: 'Dragon Age: Inquisition', platform: 'Both', price: 1499, description: 'Эпическое фэнтези RPG от BioWare', image_url: '/img/c0b4b910-03ec-4877-b226-40d316c6b4a1.jpg', category: 'RPG', rating: 8.9, release_year: 2014, publisher: 'Electronic Arts', developer: 'BioWare', discount: 75, consoleModels: 'PS4, Xbox One' },
  { id: 82, title: 'Mass Effect Legendary Edition', platform: 'Both', price: 2499, description: 'Трилогия космической саги', image_url: '/img/c0b4b910-03ec-4877-b226-40d316c6b4a1.jpg', category: 'RPG', rating: 9.1, release_year: 2021, publisher: 'Electronic Arts', developer: 'BioWare', discount: 50, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  // PLAYSTATION EXCLUSIVES
  { id: 83, title: 'Ratchet & Clank: Rift Apart', platform: 'PlayStation', price: 3499, description: 'Межпространственное приключение', image_url: '/img/b3bfc3fa-95ee-4d6c-ab24-b11924f983b2.jpg', category: 'Action', rating: 9.0, release_year: 2021, publisher: 'Sony Interactive', developer: 'Insomniac Games', region: 'TR/IN/UA', isHot: true, consoleModels: 'PS5' },
  { id: 84, title: 'Gran Turismo 7', platform: 'PlayStation', price: 3999, description: 'Легендарный гоночный симулятор', image_url: '/img/7d062ba2-e68c-44d4-843a-eac7123726cc.jpg', category: 'Racing', rating: 8.7, release_year: 2022, publisher: 'Sony Interactive', developer: 'Polyphony Digital', region: 'TR/IN/UA', consoleModels: 'PS4, PS5' },
  { id: 85, title: 'Horizon Forbidden West', platform: 'PlayStation', price: 3799, description: 'Приключение с роботами-динозаврами', image_url: '/img/f23fe460-a12c-4df0-81c4-f3035d877e99.jpg', category: 'Action', rating: 9.1, release_year: 2022, publisher: 'Sony Interactive', developer: 'Guerrilla Games', region: 'TR/IN/UA', isHot: true, consoleModels: 'PS4, PS5' },
  { id: 86, title: 'Ghost of Tsushima Director\'s Cut', platform: 'PlayStation', price: 3499, description: 'Эпос о самурае в феодальной Японии', image_url: '/img/332b39a9-56a3-426e-9c5f-7cc8b7d5d920.jpg', category: 'Action', rating: 9.4, release_year: 2020, publisher: 'Sony Interactive', developer: 'Sucker Punch', region: 'TR/IN/UA', isHot: true, consoleModels: 'PS4, PS5' },
  { id: 87, title: 'Returnal', platform: 'PlayStation', price: 2999, description: 'Roguelike шутер от Housemarque', image_url: '/img/d502f4ca-8cd1-443d-818c-7b822f69e0fe.jpg', category: 'Shooter', rating: 8.8, release_year: 2021, publisher: 'Sony Interactive', developer: 'Housemarque', region: 'TR/IN/UA', consoleModels: 'PS5' },
  { id: 88, title: 'Demon\'s Souls', platform: 'PlayStation', price: 3999, description: 'Ремейк классики от FromSoftware', image_url: '/img/7bf7729a-2cb0-44b7-abe6-601f476c99c7.jpg', category: 'RPG', rating: 9.2, release_year: 2020, publisher: 'Sony Interactive', developer: 'Bluepoint Games', region: 'TR/IN/UA', isHot: true, consoleModels: 'PS5' },
  { id: 89, title: 'Bloodborne', platform: 'PlayStation', price: 1999, description: 'Готический хоррор от FromSoftware', image_url: '/img/d8d0298c-42d4-48f9-a201-0d3023989d29.jpg', category: 'RPG', rating: 9.5, release_year: 2015, publisher: 'Sony Interactive', developer: 'FromSoftware', region: 'TR/IN/UA', discount: 50, consoleModels: 'PS4, PS5' },
  { id: 90, title: 'Horizon Zero Dawn', platform: 'PlayStation', price: 1999, description: 'Первая часть саги о роботах', image_url: '/img/f23fe460-a12c-4df0-81c4-f3035d877e99.jpg', category: 'Action', rating: 9.3, release_year: 2017, publisher: 'Sony Interactive', developer: 'Guerrilla Games', region: 'TR/IN/UA', discount: 60, consoleModels: 'PS4, PS5' },

  // XBOX EXCLUSIVES
  { id: 91, title: 'Gears 5', platform: 'Xbox', price: 2499, description: 'Война против Саранчи продолжается', image_url: '/img/91ec2804-153a-4aec-9ae3-9e51d77d827b.jpg', category: 'Shooter', rating: 8.6, release_year: 2019, publisher: 'Xbox Game Studios', developer: 'The Coalition', discount: 50, consoleModels: 'Xbox One, Xbox Series X/S' },
  { id: 92, title: 'Gears of War 4', platform: 'Xbox', price: 1499, description: 'Возвращение легендарной серии', image_url: '/img/91ec2804-153a-4aec-9ae3-9e51d77d827b.jpg', category: 'Shooter', rating: 8.4, release_year: 2016, publisher: 'Xbox Game Studios', developer: 'The Coalition', discount: 70, consoleModels: 'Xbox One, Xbox Series X/S' },
  { id: 93, title: 'Forza Motorsport', platform: 'Xbox', price: 3499, description: 'Новая эра гоночных симуляторов', image_url: '/img/eef2a698-532d-4f11-8882-9f04ce5e8bf5.jpg', category: 'Racing', rating: 8.5, release_year: 2023, publisher: 'Xbox Game Studios', developer: 'Turn 10 Studios', isNew: true, consoleModels: 'Xbox Series X/S' },
  { id: 94, title: 'Sea of Thieves', platform: 'Xbox', price: 1999, description: 'Пиратские приключения в открытом мире', image_url: '/img/91ec2804-153a-4aec-9ae3-9e51d77d827b.jpg', category: 'Adventure', rating: 8.3, release_year: 2018, publisher: 'Xbox Game Studios', developer: 'Rare', discount: 50, consoleModels: 'Xbox One, Xbox Series X/S' },
  { id: 95, title: 'Hellblade: Senua\'s Sacrifice', platform: 'Xbox', price: 1499, description: 'Психологический экшен о викингах', image_url: '/img/91ec2804-153a-4aec-9ae3-9e51d77d827b.jpg', category: 'Action', rating: 8.7, release_year: 2017, publisher: 'Xbox Game Studios', developer: 'Ninja Theory', discount: 60, consoleModels: 'Xbox One, Xbox Series X/S' },

  // SOULS-LIKE
  { id: 96, title: 'Dark Souls III', platform: 'Both', price: 2499, description: 'Легендарная souls-игра', image_url: '/img/aae47fc4-2edc-4f58-8a41-5c722fc9d663.jpg', category: 'RPG', rating: 9.4, release_year: 2016, publisher: 'Bandai Namco', developer: 'FromSoftware', discount: 50, isHot: true, consoleModels: 'PS4, Xbox One' },
  { id: 97, title: 'Sekiro: Shadows Die Twice', platform: 'Both', price: 2999, description: 'Шиноби в феодальной Японии', image_url: '/img/df26386c-fcd1-4176-9d99-9bb7e0177d7e.jpg', category: 'Action', rating: 9.6, release_year: 2019, publisher: 'Activision', developer: 'FromSoftware', isHot: true, consoleModels: 'PS4, Xbox One' },
  { id: 98, title: 'Dark Souls Remastered', platform: 'Both', price: 1999, description: 'Улучшенная версия классики', image_url: '/img/aae47fc4-2edc-4f58-8a41-5c722fc9d663.jpg', category: 'RPG', rating: 9.2, release_year: 2018, publisher: 'Bandai Namco', developer: 'FromSoftware', discount: 50, consoleModels: 'PS4, Xbox One' },
  { id: 99, title: 'Dark Souls II: Scholar of the First Sin', platform: 'Both', price: 1799, description: 'Вторая часть легендарной серии', image_url: '/img/aae47fc4-2edc-4f58-8a41-5c722fc9d663.jpg', category: 'RPG', rating: 8.8, release_year: 2015, publisher: 'Bandai Namco', developer: 'FromSoftware', discount: 60, consoleModels: 'PS4, Xbox One' },

  // ACTION GAMES
  { id: 100, title: 'Doom Eternal', platform: 'Both', price: 2499, description: 'Брутальный шутер против демонов', image_url: '/img/1bec6de2-2969-452d-b3de-5e600ebfe94e.jpg', category: 'Shooter', rating: 9.1, release_year: 2020, publisher: 'Bethesda', developer: 'id Software', discount: 50, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 101, title: 'Metro Exodus', platform: 'Both', price: 1999, description: 'Постапокалиптическая Россия', image_url: '/img/20dd76fe-8456-4f40-b408-db1106ca2eeb.jpg', category: 'Shooter', rating: 8.9, release_year: 2019, publisher: 'Deep Silver', developer: '4A Games', discount: 60, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 102, title: 'Death Stranding Director\'s Cut', platform: 'Both', price: 2999, description: 'Уникальный опыт от Кодзимы', image_url: '/img/b8953b43-5961-46d5-bb0b-93bdb391c53c.jpg', category: 'Action', rating: 8.7, release_year: 2021, publisher: 'Sony Interactive', developer: 'Kojima Productions', consoleModels: 'PS4, PS5, Xbox Series X/S' },
  { id: 103, title: 'Control Ultimate Edition', platform: 'Both', price: 1999, description: 'Паранормальный экшен от Remedy', image_url: '/img/a0137235-2fc9-41d7-9aba-2a05dd2d009e.jpg', category: 'Action', rating: 8.8, release_year: 2020, publisher: 'Remedy', developer: 'Remedy Entertainment', discount: 50, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 104, title: 'A Plague Tale: Requiem', platform: 'Both', price: 2799, description: 'Готическое приключение о крысах', image_url: '/img/a0137235-2fc9-41d7-9aba-2a05dd2d009e.jpg', category: 'Adventure', rating: 8.6, release_year: 2022, publisher: 'Focus Entertainment', developer: 'Asobo Studio', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 105, title: 'Dying Light 2', platform: 'Both', price: 2999, description: 'Паркур и зомби в открытом мире', image_url: '/img/d583f402-2809-4625-87fc-8b89a21bd876.jpg', category: 'Action', rating: 8.4, release_year: 2022, publisher: 'Techland', developer: 'Techland', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  // SPORTS & RACING
  { id: 106, title: 'F1 2024', platform: 'Both', price: 3499, description: 'Официальный симулятор Формулы-1', image_url: '/img/e7d53a4a-4e69-430e-9274-cf85aa61b690.jpg', category: 'Racing', rating: 8.5, release_year: 2024, publisher: 'Electronic Arts', developer: 'Codemasters', isNew: true, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 107, title: 'NBA 2K24', platform: 'Both', price: 3299, description: 'Лучший баскетбольный симулятор', image_url: '/img/e7d53a4a-4e69-430e-9274-cf85aa61b690.jpg', category: 'Sports', rating: 8.3, release_year: 2023, publisher: '2K Sports', developer: 'Visual Concepts', isNew: true, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 108, title: 'UFC 5', platform: 'Both', price: 3499, description: 'Симулятор смешанных единоборств', image_url: '/img/e7d53a4a-4e69-430e-9274-cf85aa61b690.jpg', category: 'Sports', rating: 8.4, release_year: 2023, publisher: 'Electronic Arts', developer: 'EA Sports', isNew: true, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 109, title: 'WRC 11', platform: 'Both', price: 2499, description: 'Ралли симулятор', image_url: '/img/eef2a698-532d-4f11-8882-9f04ce5e8bf5.jpg', category: 'Racing', rating: 8.2, release_year: 2022, publisher: 'Nacon', developer: 'KT Racing', discount: 40, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 110, title: 'Need for Speed Unbound', platform: 'Both', price: 2999, description: 'Уличные гонки и тюнинг', image_url: '/img/eef2a698-532d-4f11-8882-9f04ce5e8bf5.jpg', category: 'Racing', rating: 8.1, release_year: 2022, publisher: 'Electronic Arts', developer: 'Criterion Games', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  // STEALTH & ADVENTURE
  { id: 111, title: 'Hitman World of Assassination', platform: 'Both', price: 2999, description: 'Трилогия об Агенте 47', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Stealth', rating: 8.9, release_year: 2021, publisher: 'IO Interactive', developer: 'IO Interactive', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 112, title: 'Metal Gear Solid V', platform: 'Both', price: 1499, description: 'Тактический шпионский экшен', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Stealth', rating: 9.3, release_year: 2015, publisher: 'Konami', developer: 'Kojima Productions', discount: 70, consoleModels: 'PS4, Xbox One' },
  { id: 113, title: 'Dishonored 2', platform: 'Both', price: 1799, description: 'Стелс-экшен со сверхспособностями', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Stealth', rating: 8.8, release_year: 2016, publisher: 'Bethesda', developer: 'Arkane Studios', discount: 65, consoleModels: 'PS4, Xbox One' },
  { id: 114, title: 'Prey', platform: 'Both', price: 1499, description: 'Научная фантастика от Arkane', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Shooter', rating: 8.7, release_year: 2017, publisher: 'Bethesda', developer: 'Arkane Studios', discount: 70, consoleModels: 'PS4, Xbox One' },
  { id: 115, title: 'It Takes Two', platform: 'Both', price: 1999, description: 'Кооперативное приключение', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Adventure', rating: 9.0, release_year: 2021, publisher: 'Electronic Arts', developer: 'Hazelight Studios', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },

  // HORROR
  { id: 116, title: 'Dead Space Remake', platform: 'Both', price: 3299, description: 'Ремейк культового хоррора', image_url: '/img/14fcf207-7862-4026-810c-870638a48689.jpg', category: 'Horror', rating: 9.0, release_year: 2023, publisher: 'Electronic Arts', developer: 'Motive Studio', isNew: true, consoleModels: 'PS5, Xbox Series X/S' },
  { id: 117, title: 'The Callisto Protocol', platform: 'Both', price: 2499, description: 'Космический хоррор от создателей Dead Space', image_url: '/img/14fcf207-7862-4026-810c-870638a48689.jpg', category: 'Horror', rating: 7.8, release_year: 2022, publisher: 'Krafton', developer: 'Striking Distance', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 118, title: 'Outlast Trinity', platform: 'Both', price: 1499, description: 'Сборник хоррор-игр', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Horror', rating: 8.4, release_year: 2017, publisher: 'Red Barrels', developer: 'Red Barrels', discount: 60, consoleModels: 'PS4, Xbox One' },
  { id: 119, title: 'Little Nightmares II', platform: 'Both', price: 1799, description: 'Атмосферный платформер-хоррор', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Horror', rating: 8.6, release_year: 2021, publisher: 'Bandai Namco', developer: 'Tarsier Studios', discount: 50, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 120, title: 'Alien: Isolation', platform: 'Both', price: 1299, description: 'Выживание против Чужого', image_url: '/img/5b412a97-ac10-4981-82b0-0c4a751f8f57.jpg', category: 'Horror', rating: 9.1, release_year: 2014, publisher: 'Sega', developer: 'Creative Assembly', discount: 75, consoleModels: 'PS4, Xbox One' },

  // MORE ACTION & ADVENTURE
  { id: 121, title: 'Star Wars Jedi: Survivor', platform: 'Both', price: 3999, description: 'Приключения джедая Кэла Кестиса', image_url: '/img/790ed3f2-8fd6-4066-b89f-35d12a761314.jpg', category: 'Action', rating: 8.9, release_year: 2023, publisher: 'Electronic Arts', developer: 'Respawn Entertainment', isNew: true, isHot: true, consoleModels: 'PS5, Xbox Series X/S' },
  { id: 122, title: 'Star Wars Jedi: Fallen Order', platform: 'Both', price: 2499, description: 'Начало саги о джедае', image_url: '/img/790ed3f2-8fd6-4066-b89f-35d12a761314.jpg', category: 'Action', rating: 8.8, release_year: 2019, publisher: 'Electronic Arts', developer: 'Respawn Entertainment', discount: 50, consoleModels: 'PS4, Xbox One' },
  { id: 123, title: 'Titanfall 2', platform: 'Both', price: 999, description: 'Шутер с роботами-титанами', image_url: '/img/64c4d675-e860-49ec-afe3-90ad2e4537f5.jpg', category: 'Shooter', rating: 9.0, release_year: 2016, publisher: 'Electronic Arts', developer: 'Respawn Entertainment', discount: 80, consoleModels: 'PS4, Xbox One' },
  { id: 124, title: 'Apex Legends Champions Edition', platform: 'Both', price: 1999, description: 'Battle Royale в мире Titanfall', image_url: '/img/64c4d675-e860-49ec-afe3-90ad2e4537f5.jpg', category: 'Shooter', rating: 8.5, release_year: 2023, publisher: 'Electronic Arts', developer: 'Respawn Entertainment', consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
  { id: 125, title: 'Borderlands 3', platform: 'Both', price: 2499, description: 'Лутер-шутер с миллионами оружия', image_url: '/img/64c4d675-e860-49ec-afe3-90ad2e4537f5.jpg', category: 'Shooter', rating: 8.4, release_year: 2019, publisher: '2K Games', developer: 'Gearbox', discount: 50, consoleModels: 'PS4, PS5, Xbox One, Xbox Series X/S' },
];