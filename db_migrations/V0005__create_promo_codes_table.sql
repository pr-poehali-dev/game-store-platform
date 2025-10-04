-- Create promo_codes table for discount coupons
CREATE TABLE IF NOT EXISTS promo_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
    max_uses INTEGER DEFAULT NULL,
    current_uses INTEGER DEFAULT 0,
    valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP DEFAULT NULL,
    is_active BOOLEAN DEFAULT true,
    min_purchase_amount DECIMAL(10, 2) DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for fast code lookup
CREATE INDEX idx_promo_codes_code ON promo_codes(code);
CREATE INDEX idx_promo_codes_active ON promo_codes(is_active);

-- Insert some initial promo codes
INSERT INTO promo_codes (code, discount_percent, max_uses, description, valid_until) VALUES
('WELCOME10', 10, 100, 'Скидка 10% для новых клиентов', CURRENT_TIMESTAMP + INTERVAL '30 days'),
('GAME20', 20, 50, 'Скидка 20% на все игры', CURRENT_TIMESTAMP + INTERVAL '7 days'),
('VIP30', 30, 20, 'VIP скидка 30%', CURRENT_TIMESTAMP + INTERVAL '14 days'),
('PROMO50', 50, 10, 'Суперскидка 50%!', CURRENT_TIMESTAMP + INTERVAL '3 days'),
('FIRSTBUY15', 15, 200, 'Скидка 15% на первую покупку', CURRENT_TIMESTAMP + INTERVAL '60 days');

-- Create promo_code_usage table to track who used which codes
CREATE TABLE IF NOT EXISTS promo_code_usage (
    id SERIAL PRIMARY KEY,
    promo_code_id INTEGER REFERENCES promo_codes(id),
    user_identifier VARCHAR(255),
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_promo_usage_code ON promo_code_usage(promo_code_id);
CREATE INDEX idx_promo_usage_user ON promo_code_usage(user_identifier);