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
}

export const initialGames: Game[] = [
  { id: 1, title: 'Baldurs Gate 3', platform: 'Both', price: 3999, description: 'Эпическая RPG по D&D', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg', category: 'RPG', rating: 9.8, release_year: 2023, isHot: true },
  { id: 2, title: 'Elden Ring', platform: 'Both', price: 3799, description: 'Темное фэнтези от FromSoftware', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg', category: 'RPG', rating: 9.7, release_year: 2022, discount: 25, isHot: true },
  { id: 3, title: 'The Witcher 3', platform: 'Both', price: 1499, description: 'Эпическая RPG о Геральте', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg', category: 'RPG', rating: 9.8, release_year: 2015, discount: 50 },
  { id: 4, title: 'Cyberpunk 2077', platform: 'Both', price: 2799, description: 'Футуристическая RPG в Найт-Сити', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg', category: 'RPG', rating: 8.7, release_year: 2020, discount: 30 },
  { id: 5, title: 'Red Dead Redemption 2', platform: 'Both', price: 2999, description: 'Вестерн от Rockstar', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg', category: 'Action', rating: 9.7, release_year: 2018, discount: 40 },
  { id: 6, title: 'GTA V', platform: 'Both', price: 1999, description: 'Культовый экшен с открытым миром', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg', category: 'Action', rating: 9.5, release_year: 2013, discount: 60 },
  { id: 7, title: 'Hogwarts Legacy', platform: 'Both', price: 3299, description: 'Магический мир Гарри Поттера', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg', category: 'RPG', rating: 8.8, release_year: 2023, discount: 20 },
  { id: 8, title: 'God of War', platform: 'PlayStation', price: 3999, description: 'Эпическое приключение Кратоса', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg', category: 'Action', rating: 9.5, release_year: 2022, region: 'TR/IN/UA', isHot: true },
  { id: 9, title: 'Resident Evil 4', platform: 'Both', price: 3299, description: 'Ремейк легендарного хоррора', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg', category: 'Horror', rating: 9.4, release_year: 2023, discount: 15 },
  { id: 10, title: 'Spider-Man Remastered', platform: 'PlayStation', price: 3499, description: 'Приключения Человека-паука', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg', category: 'Action', rating: 9.2, release_year: 2022, region: 'TR/IN/UA' },
  
  { id: 11, title: 'Starfield', platform: 'Xbox', price: 2999, description: 'Космическая RPG от Bethesda', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg', category: 'RPG', rating: 8.5, release_year: 2023, discount: 35 },
  { id: 12, title: 'Halo Infinite', platform: 'Xbox', price: 1999, description: 'Культовый шутер от 343 Industries', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg', category: 'Shooter', rating: 8.0, release_year: 2021, discount: 50 },
  { id: 13, title: 'Forza Horizon 5', platform: 'Xbox', price: 2499, description: 'Лучший гоночный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg', category: 'Racing', rating: 9.0, release_year: 2021, discount: 40 },
  { id: 14, title: 'Sea of Thieves', platform: 'Xbox', price: 1799, description: 'Пиратские приключения', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg', category: 'Adventure', rating: 8.5, release_year: 2018 },
  { id: 15, title: 'Gears 5', platform: 'Xbox', price: 1999, description: 'Шутер третьего лица', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097840/header.jpg', category: 'Shooter', rating: 8.3, release_year: 2019 },
  
  { id: 16, title: 'Horizon Forbidden West', platform: 'PlayStation', price: 3999, description: 'Постапокалиптическое приключение', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2420110/header.jpg', category: 'Action', rating: 9.1, release_year: 2022, region: 'TR/IN/UA', isNew: true },
  { id: 17, title: 'The Last of Us Part I', platform: 'PlayStation', price: 2999, description: 'Ремейк постапокалиптического хита', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg', category: 'Action', rating: 9.3, release_year: 2022, region: 'TR/IN/UA' },
  { id: 18, title: 'Ratchet & Clank: Rift Apart', platform: 'PlayStation', price: 3699, description: 'Платформер-экшен', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1895880/header.jpg', category: 'Action', rating: 9.0, release_year: 2023, region: 'TR/IN/UA' },
  { id: 19, title: 'Ghost of Tsushima', platform: 'PlayStation', price: 3999, description: 'Самурайский экшен', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2215430/header.jpg', category: 'Action', rating: 9.4, release_year: 2024, region: 'TR/IN/UA', isNew: true },
  { id: 20, title: 'Returnal', platform: 'PlayStation', price: 3299, description: 'Рогалик от Housemarque', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1649240/header.jpg', category: 'Action', rating: 8.8, release_year: 2023, region: 'TR/IN/UA' },
  
  { id: 21, title: 'Call of Duty: MW3', platform: 'Both', price: 4299, description: 'Легендарный шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/header.jpg', category: 'Shooter', rating: 8.2, release_year: 2023, isNew: true },
  { id: 22, title: 'Diablo IV', platform: 'Both', price: 3799, description: 'Легендарная ARPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/header.jpg', category: 'RPG', rating: 8.9, release_year: 2023, discount: 20 },
  { id: 23, title: 'EA Sports FC 24', platform: 'Both', price: 2999, description: 'Футбольный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg', category: 'Sports', rating: 7.8, release_year: 2023, discount: 30 },
  { id: 24, title: 'Assassins Creed Mirage', platform: 'Both', price: 3199, description: 'Возвращение к истокам', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2608970/header.jpg', category: 'Action', rating: 8.4, release_year: 2023, discount: 25 },
  { id: 25, title: 'Alan Wake 2', platform: 'Both', price: 3499, description: 'Психологический хоррор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1282730/header.jpg', category: 'Horror', rating: 9.0, release_year: 2023, isHot: true },
  
  { id: 26, title: 'Palworld', platform: 'Both', price: 1999, description: 'Покемоны с оружием', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1623730/header.jpg', category: 'Adventure', rating: 8.8, release_year: 2024, isNew: true, isHot: true },
  { id: 27, title: 'Tekken 8', platform: 'Both', price: 3799, description: 'Легендарный файтинг', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg', category: 'Fighting', rating: 9.1, release_year: 2024, isNew: true },
  { id: 28, title: 'Helldivers 2', platform: 'Both', price: 2499, description: 'Кооперативный шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/553850/header.jpg', category: 'Shooter', rating: 9.0, release_year: 2024, isNew: true, isHot: true },
  { id: 29, title: 'Lies of P', platform: 'Both', price: 2899, description: 'Soulslike по мотивам Пиноккио', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1627720/header.jpg', category: 'Action', rating: 8.6, release_year: 2023, discount: 20 },
  { id: 30, title: 'Dead Space Remake', platform: 'Both', price: 3199, description: 'Ремейк хоррора', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1693980/header.jpg', category: 'Horror', rating: 9.2, release_year: 2023, discount: 30 },
  
  { id: 31, title: 'Dark Souls III', platform: 'Both', price: 2499, description: 'Темное фэнтези', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg', category: 'RPG', rating: 9.4, release_year: 2016, discount: 70 },
  { id: 32, title: 'Sekiro', platform: 'Both', price: 2999, description: 'Самурайский экшен', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg', category: 'Action', rating: 9.5, release_year: 2019, discount: 50 },
  { id: 33, title: 'Doom Eternal', platform: 'Both', price: 1999, description: 'Брутальный шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg', category: 'Shooter', rating: 9.0, release_year: 2020, discount: 60 },
  { id: 34, title: 'Control', platform: 'Both', price: 1799, description: 'Паранормальный экшен', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/header.jpg', category: 'Action', rating: 8.7, release_year: 2019, discount: 75 },
  { id: 35, title: 'Death Stranding', platform: 'Both', price: 2499, description: 'От Хидео Кодзимы', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1850570/header.jpg', category: 'Adventure', rating: 8.5, release_year: 2019, discount: 50 },
  
  { id: 36, title: 'Monster Hunter World', platform: 'Both', price: 1999, description: 'Охота на монстров', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/582010/header.jpg', category: 'Action', rating: 8.9, release_year: 2018, discount: 65 },
  { id: 37, title: 'Persona 5 Royal', platform: 'Both', price: 3299, description: 'Японская RPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1687950/header.jpg', category: 'RPG', rating: 9.7, release_year: 2022, discount: 30 },
  { id: 38, title: 'Final Fantasy XVI', platform: 'PlayStation', price: 3999, description: 'Эпическая JRPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2515020/header.jpg', category: 'RPG', rating: 8.8, release_year: 2024, region: 'TR/IN/UA', isNew: true },
  { id: 39, title: 'Mortal Kombat 1', platform: 'Both', price: 3299, description: 'Файтинг', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1971870/header.jpg', category: 'Fighting', rating: 8.5, release_year: 2023, discount: 25 },
  { id: 40, title: 'Street Fighter 6', platform: 'Both', price: 3499, description: 'Легендарный файтинг', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/header.jpg', category: 'Fighting', rating: 9.0, release_year: 2023, discount: 20 },
  
  { id: 41, title: 'It Takes Two', platform: 'Both', price: 1999, description: 'Кооперативное приключение', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/header.jpg', category: 'Adventure', rating: 9.6, release_year: 2021, discount: 40 },
  { id: 42, title: 'A Way Out', platform: 'Both', price: 1499, description: 'Кооперативный экшен', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222700/header.jpg', category: 'Adventure', rating: 8.7, release_year: 2018, discount: 50 },
  { id: 43, title: 'Left 4 Dead 2', platform: 'Both', price: 499, description: 'Кооперативный зомби-шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/550/header.jpg', category: 'Shooter', rating: 9.5, release_year: 2009, discount: 80 },
  { id: 44, title: 'Portal 2', platform: 'Both', price: 399, description: 'Головоломка с порталами', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg', category: 'Puzzle', rating: 9.8, release_year: 2011, discount: 85 },
  { id: 45, title: 'Half-Life: Alyx', platform: 'Both', price: 2999, description: 'VR шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/546560/header.jpg', category: 'Shooter', rating: 9.6, release_year: 2020 },
  
  { id: 46, title: 'Minecraft', platform: 'Both', price: 1499, description: 'Легендарная песочница', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1794680/header.jpg', category: 'Adventure', rating: 9.0, release_year: 2011 },
  { id: 47, title: 'Terraria', platform: 'Both', price: 499, description: '2D приключения', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg', category: 'Adventure', rating: 9.3, release_year: 2011, discount: 50 },
  { id: 48, title: 'Stardew Valley', platform: 'Both', price: 599, description: 'Фермерский симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg', category: 'Simulation', rating: 9.5, release_year: 2016, discount: 20 },
  { id: 49, title: 'Valheim', platform: 'Both', price: 899, description: 'Викинги и выживание', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/892970/header.jpg', category: 'Adventure', rating: 9.2, release_year: 2021 },
  { id: 50, title: 'Subnautica', platform: 'Both', price: 1499, description: 'Подводное выживание', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/264710/header.jpg', category: 'Adventure', rating: 9.4, release_year: 2018, discount: 60 },
  
  { id: 51, title: 'Hollow Knight', platform: 'Both', price: 699, description: 'Инди-метроидвания', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg', category: 'Adventure', rating: 9.6, release_year: 2017, discount: 40 },
  { id: 52, title: 'Celeste', platform: 'Both', price: 499, description: 'Платформер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/504230/header.jpg', category: 'Adventure', rating: 9.4, release_year: 2018, discount: 50 },
  { id: 53, title: 'Hades', platform: 'Both', price: 1299, description: 'Рогалик', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg', category: 'Action', rating: 9.7, release_year: 2020, discount: 30 },
  { id: 54, title: 'Dead Cells', platform: 'Both', price: 899, description: 'Рогалик-метроидвания', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/588650/header.jpg', category: 'Action', rating: 9.2, release_year: 2018, discount: 50 },
  { id: 55, title: 'Cuphead', platform: 'Both', price: 799, description: 'Ретро-платформер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/268910/header.jpg', category: 'Action', rating: 9.0, release_year: 2017, discount: 25 },
  
  { id: 56, title: 'Factorio', platform: 'Both', price: 1499, description: 'Автоматизация и строительство', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/427520/header.jpg', category: 'Simulation', rating: 9.8, release_year: 2020 },
  { id: 57, title: 'RimWorld', platform: 'Both', price: 1699, description: 'Симулятор колонии', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/294100/header.jpg', category: 'Simulation', rating: 9.6, release_year: 2018 },
  { id: 58, title: 'Cities: Skylines', platform: 'Both', price: 1299, description: 'Градостроительный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/255710/header.jpg', category: 'Simulation', rating: 9.0, release_year: 2015, discount: 75 },
  { id: 59, title: 'Planet Zoo', platform: 'Both', price: 2299, description: 'Зоопарк-менеджер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/703080/header.jpg', category: 'Simulation', rating: 8.8, release_year: 2019, discount: 50 },
  { id: 60, title: 'The Sims 4', platform: 'Both', price: 1999, description: 'Симулятор жизни', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/header.jpg', category: 'Simulation', rating: 7.9, release_year: 2014, discount: 85 },
  
  { id: 61, title: 'Among Us', platform: 'Both', price: 299, description: 'Социальная дедукция', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg', category: 'Casual', rating: 8.0, release_year: 2018 },
  { id: 62, title: 'Fall Guys', platform: 'Both', price: 0, description: 'Батл-рояль с препятствиями', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1097150/header.jpg', category: 'Casual', rating: 7.8, release_year: 2020 },
  { id: 63, title: 'Rocket League', platform: 'Both', price: 0, description: 'Футбол на машинах', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg', category: 'Sports', rating: 8.9, release_year: 2015 },
  { id: 64, title: 'Overwatch 2', platform: 'Both', price: 0, description: 'Командный шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2357570/header.jpg', category: 'Shooter', rating: 8.2, release_year: 2022 },
  { id: 65, title: 'Apex Legends', platform: 'Both', price: 0, description: 'Battle Royale', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg', category: 'Shooter', rating: 8.7, release_year: 2019 },
  
  { id: 66, title: 'Counter-Strike 2', platform: 'Both', price: 0, description: 'Легендарный тактический шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg', category: 'Shooter', rating: 9.0, release_year: 2023 },
  { id: 67, title: 'Dota 2', platform: 'Both', price: 0, description: 'MOBA от Valve', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg', category: 'Strategy', rating: 8.8, release_year: 2013 },
  { id: 68, title: 'League of Legends', platform: 'Both', price: 0, description: 'Популярная MOBA', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322560/header.jpg', category: 'Strategy', rating: 8.5, release_year: 2009 },
  { id: 69, title: 'Warframe', platform: 'Both', price: 0, description: 'Кооперативный шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/230410/header.jpg', category: 'Shooter', rating: 8.6, release_year: 2013 },
  { id: 70, title: 'Path of Exile', platform: 'Both', price: 0, description: 'Хардкорная ARPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/238960/header.jpg', category: 'RPG', rating: 8.9, release_year: 2013 },
  
  { id: 71, title: 'Rainbow Six Siege', platform: 'Both', price: 1999, description: 'Тактический шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg', category: 'Shooter', rating: 8.7, release_year: 2015, discount: 70 },
  { id: 72, title: 'PUBG: Battlegrounds', platform: 'Both', price: 0, description: 'Оригинальная батл-рояль', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg', category: 'Shooter', rating: 8.3, release_year: 2017 },
  { id: 73, title: 'Battlefield 2042', platform: 'Both', price: 2499, description: 'Многопользовательский шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/header.jpg', category: 'Shooter', rating: 7.5, release_year: 2021, discount: 60 },
  { id: 74, title: 'Destiny 2', platform: 'Both', price: 0, description: 'Онлайн шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/header.jpg', category: 'Shooter', rating: 8.4, release_year: 2017 },
  { id: 75, title: 'Payday 2', platform: 'Both', price: 499, description: 'Кооперативные ограбления', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/218620/header.jpg', category: 'Shooter', rating: 8.5, release_year: 2013, discount: 90 },
  
  { id: 76, title: 'Civilization VI', platform: 'Both', price: 1999, description: 'Пошаговая стратегия', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg', category: 'Strategy', rating: 8.9, release_year: 2016, discount: 80 },
  { id: 77, title: 'Total War: WARHAMMER III', platform: 'Both', price: 2999, description: 'Стратегия в мире Warhammer', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1142710/header.jpg', category: 'Strategy', rating: 8.6, release_year: 2022, discount: 35 },
  { id: 78, title: 'Age of Empires IV', platform: 'Both', price: 1999, description: 'RTS классика', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1466860/header.jpg', category: 'Strategy', rating: 8.4, release_year: 2021, discount: 50 },
  { id: 79, title: 'XCOM 2', platform: 'Both', price: 1499, description: 'Тактическая стратегия', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/268500/header.jpg', category: 'Strategy', rating: 9.0, release_year: 2016, discount: 85 },
  { id: 80, title: 'StarCraft II', platform: 'Both', price: 0, description: 'Легендарная RTS', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1628650/header.jpg', category: 'Strategy', rating: 9.2, release_year: 2010 },
  
  { id: 81, title: 'Outlast', platform: 'Both', price: 799, description: 'Хоррор от первого лица', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/238320/header.jpg', category: 'Horror', rating: 8.5, release_year: 2013, discount: 80 },
  { id: 82, title: 'Resident Evil Village', platform: 'Both', price: 2999, description: 'Продолжение серии', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/header.jpg', category: 'Horror', rating: 8.8, release_year: 2021, discount: 40 },
  { id: 83, title: 'Silent Hill 2', platform: 'Both', price: 3499, description: 'Ремейк классического хоррора', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2124490/header.jpg', category: 'Horror', rating: 9.3, release_year: 2024, isNew: true },
  { id: 84, title: 'Amnesia: The Bunker', platform: 'Both', price: 1299, description: 'Хоррор-выживание', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1944430/header.jpg', category: 'Horror', rating: 8.3, release_year: 2023, discount: 30 },
  { id: 85, title: 'Phasmophobia', platform: 'Both', price: 699, description: 'Охота на призраков', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header.jpg', category: 'Horror', rating: 9.0, release_year: 2020 },
  
  { id: 86, title: 'Gran Turismo 7', platform: 'PlayStation', price: 3499, description: 'Гоночный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2918430/header.jpg', category: 'Racing', rating: 8.7, release_year: 2022, region: 'TR/IN/UA' },
  { id: 87, title: 'F1 24', platform: 'Both', price: 3299, description: 'Формула 1', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/header.jpg', category: 'Racing', rating: 8.2, release_year: 2024, isNew: true },
  { id: 88, title: 'Assetto Corsa', platform: 'Both', price: 899, description: 'Реалистичный гоночный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/244210/header.jpg', category: 'Racing', rating: 9.1, release_year: 2014, discount: 75 },
  { id: 89, title: 'Need for Speed Unbound', platform: 'Both', price: 2999, description: 'Уличные гонки', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1846380/header.jpg', category: 'Racing', rating: 7.9, release_year: 2022, discount: 50 },
  { id: 90, title: 'DiRT Rally 2.0', platform: 'Both', price: 1499, description: 'Ралли симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/690790/header.jpg', category: 'Racing', rating: 8.8, release_year: 2019, discount: 70 },
  
  { id: 91, title: 'NBA 2K24', platform: 'Both', price: 2999, description: 'Баскетбольный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2338770/header.jpg', category: 'Sports', rating: 7.5, release_year: 2023, discount: 60 },
  { id: 92, title: 'WWE 2K24', platform: 'Both', price: 2999, description: 'Рестлинг', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2479520/header.jpg', category: 'Sports', rating: 8.0, release_year: 2024, isNew: true },
  { id: 93, title: 'PES 2021', platform: 'Both', price: 1499, description: 'Футбол от Konami', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1259970/header.jpg', category: 'Sports', rating: 7.8, release_year: 2020, discount: 80 },
  { id: 94, title: 'Golf With Your Friends', platform: 'Both', price: 499, description: 'Мини-гольф', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/431240/header.jpg', category: 'Sports', rating: 8.4, release_year: 2020, discount: 50 },
  { id: 95, title: 'Tony Hawks Pro Skater 1+2', platform: 'Both', price: 1999, description: 'Скейтбординг', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2395210/header.jpg', category: 'Sports', rating: 8.9, release_year: 2020, discount: 50 },
  
  { id: 96, title: 'Escape from Tarkov', platform: 'Both', price: 2499, description: 'Хардкорный шутер', image_url: 'https://www.escapefromtarkov.com/themes/eft/images/social.jpg', category: 'Shooter', rating: 8.7, release_year: 2017 },
  { id: 97, title: 'Rust', platform: 'Both', price: 1999, description: 'Выживание и крафт', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg', category: 'Adventure', rating: 8.5, release_year: 2018 },
  { id: 98, title: 'DayZ', platform: 'Both', price: 2299, description: 'Зомби-выживание', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/221100/header.jpg', category: 'Adventure', rating: 7.9, release_year: 2018, discount: 40 },
  { id: 99, title: 'ARK: Survival Evolved', platform: 'Both', price: 1499, description: 'Динозавры и выживание', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/346110/header.jpg', category: 'Adventure', rating: 8.3, release_year: 2017, discount: 70 },
  { id: 100, title: 'The Forest', platform: 'Both', price: 899, description: 'Хоррор-выживание', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/242760/header.jpg', category: 'Horror', rating: 8.9, release_year: 2018, discount: 75 },
  
  { id: 101, title: 'Fortnite V-Bucks 1000', platform: 'Both', price: 500, description: 'Валюта Fortnite', image_url: 'https://cdn2.unrealengine.com/Fortnite%2Fblog%2Fv-bucks%2FBR05_News_FeaturedImage_VBucks-1920x1080-1920x1080-ec63c4e73e8edb0b26f0f38c0e8c01a0c551e617.jpg', category: 'Currency', rating: 0, release_year: 2024 },
  { id: 102, title: 'Valorant Points 1000', platform: 'Both', price: 500, description: 'Валюта Valorant', image_url: 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt5a87d9f08bd84c4e/5eb7cdc75611161f69390b2b/VP_1920x1080.jpg', category: 'Currency', rating: 0, release_year: 2024 },
  { id: 103, title: 'CS2 Prime Status', platform: 'Both', price: 799, description: 'Prime статус CS2', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg', category: 'Upgrade', rating: 0, release_year: 2024 },
  { id: 104, title: 'Xbox Game Pass Ultimate', platform: 'Xbox', price: 899, description: 'Месяц подписки Xbox', image_url: 'https://compass-ssl.xbox.com/assets/c4/80/c480ca8d-7623-4b36-841b-ddbc14f8145f.jpg', category: 'Subscription', rating: 0, release_year: 2024 },
  { id: 105, title: 'PlayStation Plus Extra', platform: 'PlayStation', price: 999, description: 'Месяц подписки PS', image_url: 'https://gmedia.playstation.com/is/image/SIEPDC/ps-plus-extra-hero-art-01-en-13sep21', category: 'Subscription', rating: 0, release_year: 2024, region: 'TR/IN/UA' },
  
  { id: 106, title: 'Atomic Heart', platform: 'Both', price: 2499, description: 'Советский ретрофутуризм', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/668580/header.jpg', category: 'Action', rating: 8.1, release_year: 2023, discount: 40 },
  { id: 107, title: 'Metro Exodus', platform: 'Both', price: 1999, description: 'Постапокалипсис', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/412020/header.jpg', category: 'Shooter', rating: 8.6, release_year: 2019, discount: 75 },
  { id: 108, title: 'Dying Light 2', platform: 'Both', price: 2999, description: 'Зомби-паркур', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/534380/header.jpg', category: 'Action', rating: 8.3, release_year: 2022, discount: 50 },
  { id: 109, title: 'Back 4 Blood', platform: 'Both', price: 1999, description: 'Кооп-шутер от создателей L4D', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/924970/header.jpg', category: 'Shooter', rating: 7.8, release_year: 2021, discount: 70 },
  { id: 110, title: 'Evil West', platform: 'Both', price: 2299, description: 'Вампиры на Диком Западе', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1067310/header.jpg', category: 'Action', rating: 7.9, release_year: 2022, discount: 60 },
  
  { id: 111, title: 'Baldurs Gate II', platform: 'Both', price: 899, description: 'Классическая RPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/257350/header.jpg', category: 'RPG', rating: 9.6, release_year: 2000, discount: 75 },
  { id: 112, title: 'Disco Elysium', platform: 'Both', price: 1799, description: 'RPG-детектив', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/632470/header.jpg', category: 'RPG', rating: 9.7, release_year: 2019, discount: 60 },
  { id: 113, title: 'Divinity: Original Sin 2', platform: 'Both', price: 1999, description: 'Изометрическая RPG', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/435150/header.jpg', category: 'RPG', rating: 9.5, release_year: 2017, discount: 70 },
  { id: 114, title: 'Dragon Age: Inquisition', platform: 'Both', price: 1499, description: 'Фэнтези RPG от BioWare', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222690/header.jpg', category: 'RPG', rating: 8.8, release_year: 2014, discount: 80 },
  { id: 115, title: 'Mass Effect Legendary', platform: 'Both', price: 2999, description: 'Трилогия ремастер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1328670/header.jpg', category: 'RPG', rating: 9.4, release_year: 2021, discount: 65 },
  
  { id: 116, title: 'Stellaris', platform: 'Both', price: 1999, description: 'Космическая стратегия', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/281990/header.jpg', category: 'Strategy', rating: 8.9, release_year: 2016, discount: 75 },
  { id: 117, title: 'Hearts of Iron IV', platform: 'Both', price: 1799, description: 'Стратегия Второй мировой', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/394360/header.jpg', category: 'Strategy', rating: 8.7, release_year: 2016, discount: 75 },
  { id: 118, title: 'Europa Universalis IV', platform: 'Both', price: 1799, description: 'Историческая стратегия', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/236850/header.jpg', category: 'Strategy', rating: 8.8, release_year: 2013, discount: 75 },
  { id: 119, title: 'Crusader Kings III', platform: 'Both', price: 2499, description: 'Династическая стратегия', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/header.jpg', category: 'Strategy', rating: 9.0, release_year: 2020, discount: 50 },
  { id: 120, title: 'Frostpunk', platform: 'Both', price: 1299, description: 'Стратегия выживания', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/323190/header.jpg', category: 'Strategy', rating: 8.9, release_year: 2018, discount: 75 },
  
  { id: 121, title: 'No Mans Sky', platform: 'Both', price: 1999, description: 'Космическая песочница', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/275850/header.jpg', category: 'Adventure', rating: 8.6, release_year: 2016, discount: 50 },
  { id: 122, title: 'Starbound', platform: 'Both', price: 699, description: '2D космические приключения', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/211820/header.jpg', category: 'Adventure', rating: 8.4, release_year: 2016, discount: 60 },
  { id: 123, title: 'Satisfactory', platform: 'Both', price: 1799, description: 'Фабричный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/526870/header.jpg', category: 'Simulation', rating: 9.3, release_year: 2024, isNew: true },
  { id: 124, title: 'Oxygen Not Included', platform: 'Both', price: 1299, description: 'Космическая колония', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/457140/header.jpg', category: 'Simulation', rating: 9.1, release_year: 2019, discount: 50 },
  { id: 125, title: 'Kerbal Space Program', platform: 'Both', price: 1799, description: 'Космический симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/220200/header.jpg', category: 'Simulation', rating: 9.2, release_year: 2015, discount: 75 },
  
  { id: 126, title: 'Ori and the Will of the Wisps', platform: 'Both', price: 1499, description: 'Метроидвания', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/header.jpg', category: 'Adventure', rating: 9.5, release_year: 2020, discount: 50 },
  { id: 127, title: 'Ori and the Blind Forest', platform: 'Both', price: 999, description: 'Платформер-метроидвания', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/261570/header.jpg', category: 'Adventure', rating: 9.4, release_year: 2015, discount: 75 },
  { id: 128, title: 'Blasphemous', platform: 'Both', price: 1299, description: 'Брутальная метроидвания', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/774361/header.jpg', category: 'Action', rating: 8.7, release_year: 2019, discount: 70 },
  { id: 129, title: 'Salt and Sanctuary', platform: 'Both', price: 899, description: '2D soulslike', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/283640/header.jpg', category: 'Action', rating: 8.6, release_year: 2016, discount: 75 },
  { id: 130, title: 'Katana ZERO', platform: 'Both', price: 699, description: 'Неон-слэшер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/460950/header.jpg', category: 'Action', rating: 9.3, release_year: 2019, discount: 40 },
  
  { id: 131, title: 'Project Zomboid', platform: 'Both', price: 899, description: 'Зомби-симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/108600/header.jpg', category: 'Adventure', rating: 9.1, release_year: 2013, discount: 30 },
  { id: 132, title: '7 Days to Die', platform: 'Both', price: 1499, description: 'Зомби-крафт', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/251570/header.jpg', category: 'Adventure', rating: 8.4, release_year: 2013, discount: 60 },
  { id: 133, title: 'State of Decay 2', platform: 'Both', price: 1799, description: 'Зомби-выживание', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/495420/header.jpg', category: 'Adventure', rating: 7.9, release_year: 2018, discount: 70 },
  { id: 134, title: 'The Long Dark', platform: 'Both', price: 1499, description: 'Выживание в холоде', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/305620/header.jpg', category: 'Adventure', rating: 8.8, release_year: 2017, discount: 75 },
  { id: 135, title: 'Green Hell', platform: 'Both', price: 1299, description: 'Выживание в джунглях', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/815370/header.jpg', category: 'Adventure', rating: 8.5, release_year: 2019, discount: 60 },
  
  { id: 136, title: 'Slay the Spire', platform: 'Both', price: 899, description: 'Карточный рогалик', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/646570/header.jpg', category: 'Strategy', rating: 9.4, release_year: 2019, discount: 50 },
  { id: 137, title: 'Darkest Dungeon', platform: 'Both', price: 1199, description: 'Готический рогалик', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/262060/header.jpg', category: 'RPG', rating: 8.9, release_year: 2016, discount: 75 },
  { id: 138, title: 'Enter the Gungeon', platform: 'Both', price: 699, description: 'Рогалик-шутер', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/311690/header.jpg', category: 'Action', rating: 9.0, release_year: 2016, discount: 60 },
  { id: 139, title: 'Risk of Rain 2', platform: 'Both', price: 999, description: '3D рогалик', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/632360/header.jpg', category: 'Action', rating: 9.2, release_year: 2020, discount: 50 },
  { id: 140, title: 'Binding of Isaac: Rebirth', platform: 'Both', price: 699, description: 'Рогалик', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/250900/header.jpg', category: 'Action', rating: 9.3, release_year: 2014, discount: 70 },
  
  { id: 141, title: 'Forza Motorsport', platform: 'Xbox', price: 3499, description: 'Гоночный симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2440510/header.jpg', category: 'Racing', rating: 8.4, release_year: 2023, isNew: true },
  { id: 142, title: 'WRC Generations', platform: 'Both', price: 2299, description: 'Ралли-симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1953180/header.jpg', category: 'Racing', rating: 8.2, release_year: 2022, discount: 60 },
  { id: 143, title: 'BeamNG.drive', platform: 'Both', price: 1299, description: 'Физика разрушений', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/284160/header.jpg', category: 'Simulation', rating: 9.5, release_year: 2015 },
  { id: 144, title: 'Car Mechanic Simulator', platform: 'Both', price: 1199, description: 'Симулятор механика', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/645630/header.jpg', category: 'Simulation', rating: 8.6, release_year: 2021, discount: 70 },
  { id: 145, title: 'Euro Truck Simulator 2', platform: 'Both', price: 899, description: 'Симулятор дальнобойщика', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/227300/header.jpg', category: 'Simulation', rating: 9.2, release_year: 2012, discount: 75 },
  
  { id: 146, title: 'Microsoft Flight Simulator', platform: 'Both', price: 3999, description: 'Реалистичный авиасимулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1250410/header.jpg', category: 'Simulation', rating: 9.0, release_year: 2020, discount: 30 },
  { id: 147, title: 'DCS World', platform: 'Both', price: 0, description: 'Военный авиасимулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/223750/header.jpg', category: 'Simulation', rating: 8.9, release_year: 2008 },
  { id: 148, title: 'Farming Simulator 22', platform: 'Both', price: 1999, description: 'Фермерский симулятор', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1248130/header.jpg', category: 'Simulation', rating: 8.3, release_year: 2021, discount: 50 },
  { id: 149, title: 'PowerWash Simulator', platform: 'Both', price: 1299, description: 'Расслабляющая мойка', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1290000/header.jpg', category: 'Simulation', rating: 9.1, release_year: 2022, discount: 30 },
  { id: 150, title: 'House Flipper', platform: 'Both', price: 1199, description: 'Ремонт домов', image_url: 'https://cdn.cloudflare.steamstatic.com/steam/apps/613100/header.jpg', category: 'Simulation', rating: 8.7, release_year: 2018, discount: 75 },
];
