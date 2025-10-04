-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_verified BOOLEAN DEFAULT false,
    avatar_url TEXT,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    loyalty_points INTEGER DEFAULT 0
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    promo_code VARCHAR(50),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    notes TEXT
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    item_type VARCHAR(50) NOT NULL,
    item_id INTEGER NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    quantity INTEGER DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    subscription_name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true,
    auto_renew BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_library table (purchased games)
CREATE TABLE IF NOT EXISTS user_library (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    game_id INTEGER NOT NULL,
    game_title VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activation_status VARCHAR(50) DEFAULT 'pending',
    account_email VARCHAR(255),
    account_password TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_user_subs_user ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subs_active ON user_subscriptions(is_active);
CREATE INDEX IF NOT EXISTS idx_user_library_user ON user_library(user_id);

-- Insert demo user (password: demo123)
INSERT INTO users (email, name, phone, password_hash, is_verified, total_spent, loyalty_points) VALUES
('demo@godstore.game', 'Демо Пользователь', '+7 999 123-45-67', '$2a$10$demo.hash.for.testing.purposes', true, 15000, 1500)
ON CONFLICT (email) DO NOTHING;

-- Insert demo orders
INSERT INTO orders (user_id, order_number, status, total_amount, discount_amount, promo_code, payment_method, created_at, completed_at) VALUES
(1, 'GS-2024-001', 'completed', 4299, 0, NULL, 'card', CURRENT_TIMESTAMP - INTERVAL '30 days', CURRENT_TIMESTAMP - INTERVAL '30 days'),
(1, 'GS-2024-002', 'completed', 3599, 720, 'GAME20', 'card', CURRENT_TIMESTAMP - INTERVAL '15 days', CURRENT_TIMESTAMP - INTERVAL '15 days'),
(1, 'GS-2024-003', 'completed', 2999, 300, 'WELCOME10', 'sbp', CURRENT_TIMESTAMP - INTERVAL '7 days', CURRENT_TIMESTAMP - INTERVAL '7 days')
ON CONFLICT (order_number) DO NOTHING;

-- Insert demo order items
INSERT INTO order_items (order_id, item_type, item_id, item_name, quantity, price) VALUES
(1, 'game', 1, 'Call of Duty: Modern Warfare III', 1, 4299),
(2, 'game', 20, 'Spider-Man 2', 1, 4499),
(3, 'subscription', 1, 'Xbox Game Pass Ultimate (1 месяц)', 1, 599),
(3, 'game', 9, 'Grand Theft Auto V', 1, 2999);

-- Insert demo subscriptions
INSERT INTO user_subscriptions (user_id, subscription_name, platform, start_date, end_date, is_active, auto_renew) VALUES
(1, 'Xbox Game Pass Ultimate', 'Xbox', CURRENT_TIMESTAMP - INTERVAL '7 days', CURRENT_TIMESTAMP + INTERVAL '23 days', true, true),
(1, 'PlayStation Plus Extra', 'PlayStation', CURRENT_TIMESTAMP - INTERVAL '60 days', CURRENT_TIMESTAMP - INTERVAL '30 days', false, false);

-- Insert demo library
INSERT INTO user_library (user_id, game_id, game_title, platform, purchase_date, activation_status, account_email) VALUES
(1, 1, 'Call of Duty: Modern Warfare III', 'Xbox', CURRENT_TIMESTAMP - INTERVAL '30 days', 'activated', 'demo_xbox@godstore.game'),
(1, 20, 'Spider-Man 2', 'PlayStation', CURRENT_TIMESTAMP - INTERVAL '15 days', 'activated', 'demo_ps@godstore.game'),
(1, 9, 'Grand Theft Auto V', 'Xbox', CURRENT_TIMESTAMP - INTERVAL '7 days', 'activated', 'demo_xbox@godstore.game');