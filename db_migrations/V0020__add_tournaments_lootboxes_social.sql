-- Создание таблиц для турниров и лидербордов
CREATE TABLE IF NOT EXISTS tournaments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    game_id INTEGER,
    prize_pool INTEGER DEFAULT 0,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    max_participants INTEGER DEFAULT 100,
    status VARCHAR(50) DEFAULT 'upcoming',
    banner_url TEXT,
    rules TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tournament_participants (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER,
    user_id INTEGER,
    score INTEGER DEFAULT 0,
    rank INTEGER,
    prize_won INTEGER DEFAULT 0,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tournament_id, user_id)
);

CREATE TABLE IF NOT EXISTS leaderboard (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    category VARCHAR(100) NOT NULL,
    score INTEGER DEFAULT 0,
    rank INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, category)
);

CREATE TABLE IF NOT EXISTS lootboxes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    rarity VARCHAR(50),
    price INTEGER DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    cooldown_hours INTEGER DEFAULT 24,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lootbox_items (
    id SERIAL PRIMARY KEY,
    lootbox_id INTEGER,
    item_type VARCHAR(100),
    item_id INTEGER,
    item_name VARCHAR(255),
    probability DECIMAL(5,2),
    value INTEGER
);

CREATE TABLE IF NOT EXISTS user_lootbox_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    lootbox_id INTEGER,
    item_won_type VARCHAR(100),
    item_won_id INTEGER,
    item_won_name VARCHAR(255),
    value_won INTEGER,
    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_lootbox_cooldowns (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    lootbox_id INTEGER,
    last_opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    next_available_at TIMESTAMP,
    UNIQUE(user_id, lootbox_id)
);

CREATE TABLE IF NOT EXISTS user_friends (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    friend_id INTEGER,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, friend_id)
);

CREATE TABLE IF NOT EXISTS user_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    content TEXT NOT NULL,
    game_id INTEGER,
    image_url TEXT,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER,
    user_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

CREATE TABLE IF NOT EXISTS post_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER,
    user_id INTEGER,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS seasonal_events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(100),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    banner_url TEXT,
    discount_percentage INTEGER DEFAULT 0,
    special_rewards TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
CREATE INDEX IF NOT EXISTS idx_tournament_participants_score ON tournament_participants(tournament_id, score DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_category_rank ON leaderboard(category, rank);
CREATE INDEX IF NOT EXISTS idx_user_friends_status ON user_friends(user_id, status);
CREATE INDEX IF NOT EXISTS idx_user_posts_user ON user_posts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_seasonal_events_active ON seasonal_events(is_active, start_date, end_date);