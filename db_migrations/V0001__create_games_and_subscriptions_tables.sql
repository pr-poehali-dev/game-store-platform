-- Создание таблицы игр
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('Xbox', 'PlayStation', 'Both')),
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(100),
    rating DECIMAL(3, 1),
    release_year INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы подписок
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('Xbox', 'PlayStation')),
    price DECIMAL(10, 2) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    description TEXT,
    features TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка примеров игр
INSERT INTO games (title, platform, price, description, image_url, category, rating, release_year) VALUES
('Starfield', 'Xbox', 2999.00, 'Космическая RPG от Bethesda', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', 'RPG', 8.5, 2023),
('Spider-Man 2', 'PlayStation', 3499.00, 'Продолжение приключений Человека-паука', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800', 'Action', 9.2, 2023),
('Forza Horizon 5', 'Xbox', 2499.00, 'Лучший гоночный симулятор', 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800', 'Racing', 9.0, 2021),
('God of War Ragnarök', 'PlayStation', 3999.00, 'Эпическое приключение Кратоса', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', 'Action', 9.5, 2022),
('Halo Infinite', 'Xbox', 1999.00, 'Культовый шутер от 343 Industries', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', 'Shooter', 8.0, 2021),
('The Last of Us Part II', 'PlayStation', 2999.00, 'Постапокалиптический экшен', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', 'Action', 9.3, 2020);

-- Вставка подписок
INSERT INTO subscriptions (name, platform, price, duration, description, features) VALUES
('Game Pass Ultimate', 'Xbox', 599.00, '1 месяц', 'Доступ к 100+ играм', ARRAY['Онлайн-мультиплеер', 'Игры EA Play', 'Cloud Gaming', 'Скидки до 20%']),
('Game Pass Ultimate', 'Xbox', 1699.00, '3 месяца', 'Доступ к 100+ играм на 3 месяца', ARRAY['Онлайн-мультиплеер', 'Игры EA Play', 'Cloud Gaming', 'Скидки до 20%']),
('PlayStation Plus Extra', 'PlayStation', 699.00, '1 месяц', 'Коллекция из 400+ игр', ARRAY['Онлайн-мультиплеер', 'Ежемесячные игры', 'Каталог классики', 'Скидки']),
('PlayStation Plus Premium', 'PlayStation', 899.00, '1 месяц', 'Премиум доступ ко всем функциям', ARRAY['Онлайн-мультиплеер', '700+ игр', 'Классические игры', 'Облачный гейминг']),
('EA Play', 'Xbox', 299.00, '1 месяц', 'Игры от Electronic Arts', ARRAY['50+ игр EA', 'Ранний доступ', 'Скидки 10%']),
('PlayStation Plus Essential', 'PlayStation', 499.00, '1 месяц', 'Базовая подписка', ARRAY['Онлайн-мультиплеер', 'Ежемесячные игры', 'Облачные сохранения']);