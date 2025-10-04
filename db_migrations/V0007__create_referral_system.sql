-- Создание таблицы рефералов
CREATE TABLE IF NOT EXISTS referrals (
    id SERIAL PRIMARY KEY,
    referrer_user_id INTEGER NOT NULL,
    referred_user_id INTEGER,
    referral_code VARCHAR(20) UNIQUE NOT NULL,
    referred_email VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    bonus_amount DECIMAL(10, 2) DEFAULT 0,
    bonus_paid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    CONSTRAINT fk_referrer FOREIGN KEY (referrer_user_id) REFERENCES users(id),
    CONSTRAINT fk_referred FOREIGN KEY (referred_user_id) REFERENCES users(id)
);

CREATE INDEX idx_referral_code ON referrals(referral_code);
CREATE INDEX idx_referrer_user ON referrals(referrer_user_id);
CREATE INDEX idx_referred_user ON referrals(referred_user_id);

-- Добавляем реферальный код в таблицу users
ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_code VARCHAR(20) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS referred_by_code VARCHAR(20);

-- Генерируем уникальные реферальные коды для существующих пользователей
UPDATE users SET referral_code = 'REF' || LPAD(id::TEXT, 6, '0') WHERE referral_code IS NULL;

-- Создание таблицы истории бонусов
CREATE TABLE IF NOT EXISTS referral_bonuses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    referral_id INTEGER NOT NULL,
    bonus_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bonus_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_bonus_referral FOREIGN KEY (referral_id) REFERENCES referrals(id)
);

CREATE INDEX idx_bonus_user ON referral_bonuses(user_id);

-- Вставка тестовых данных для демо пользователя
INSERT INTO referrals (referrer_user_id, referred_user_id, referral_code, referred_email, status, bonus_amount, bonus_paid, created_at, completed_at)
VALUES 
(1, NULL, 'DEMO001REF1', 'friend1@example.com', 'completed', 500.00, TRUE, CURRENT_TIMESTAMP - INTERVAL '30 days', CURRENT_TIMESTAMP - INTERVAL '25 days'),
(1, NULL, 'DEMO001REF2', 'friend2@example.com', 'completed', 500.00, TRUE, CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '15 days'),
(1, NULL, 'DEMO001REF3', 'friend3@example.com', 'pending', 0, FALSE, CURRENT_TIMESTAMP - INTERVAL '5 days', NULL);

INSERT INTO referral_bonuses (user_id, referral_id, bonus_type, amount, description)
VALUES
(1, 1, 'referral_signup', 500.00, 'Бонус за регистрацию друга'),
(1, 2, 'referral_signup', 500.00, 'Бонус за регистрацию друга');