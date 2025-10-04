-- Добавляем поля для обложек и улучшений игр
ALTER TABLE t_p1573360_game_store_platform.games 
ADD COLUMN IF NOT EXISTS cover_image TEXT,
ADD COLUMN IF NOT EXISTS rawg_id INTEGER,
ADD COLUMN IF NOT EXISTS screenshots TEXT[], 
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS metacritic_score INTEGER,
ADD COLUMN IF NOT EXISTS release_date DATE;

-- Таблица отзывов с рейтингами (расширяем существующую)
ALTER TABLE t_p1573360_game_store_platform.reviews
ADD COLUMN IF NOT EXISTS helpful_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS verified_purchase BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS images TEXT[];

-- Таблица Wishlist
CREATE TABLE IF NOT EXISTS t_p1573360_game_store_platform.wishlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  notify_on_sale BOOLEAN DEFAULT TRUE,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, game_id)
);

-- Таблица достижений пользователя
CREATE TABLE IF NOT EXISTS t_p1573360_game_store_platform.user_achievements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  achievement_type VARCHAR(50) NOT NULL,
  achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB
);

-- Таблица уровней пользователя
CREATE TABLE IF NOT EXISTS t_p1573360_game_store_platform.user_levels (
  user_id INTEGER PRIMARY KEY,
  level VARCHAR(20) DEFAULT 'bronze',
  experience_points INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  purchases_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица истории цен
CREATE TABLE IF NOT EXISTS t_p1573360_game_store_platform.price_history (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  discount_percent INTEGER DEFAULT 0,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица кешбэка и бонусов
CREATE TABLE IF NOT EXISTS t_p1573360_game_store_platform.user_balance (
  user_id INTEGER PRIMARY KEY,
  cashback_balance DECIMAL(10,2) DEFAULT 0,
  bonus_points INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица Premium подписок (расширяем существующую)
ALTER TABLE t_p1573360_game_store_platform.subscriptions
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS premium_discount INTEGER DEFAULT 10;

-- Таблица подарков
CREATE TABLE IF NOT EXISTS t_p1573360_game_store_platform.gifts (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL,
  recipient_email VARCHAR(255) NOT NULL,
  game_id INTEGER NOT NULL,
  gift_code VARCHAR(50) UNIQUE NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  redeemed_at TIMESTAMP,
  redeemed_by INTEGER
);

-- Таблица предзаказов
CREATE TABLE IF NOT EXISTS t_p1573360_game_store_platform.preorders (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  preorder_bonus TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, game_id)
);

-- Таблица уведомлений
CREATE TABLE IF NOT EXISTS t_p1573360_game_store_platform.notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON t_p1573360_game_store_platform.wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_price_history_game ON t_p1573360_game_store_platform.price_history(game_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON t_p1573360_game_store_platform.notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_gifts_code ON t_p1573360_game_store_platform.gifts(gift_code);
CREATE INDEX IF NOT EXISTS idx_user_achievements ON t_p1573360_game_store_platform.user_achievements(user_id);