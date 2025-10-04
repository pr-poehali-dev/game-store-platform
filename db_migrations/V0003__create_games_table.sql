CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  category VARCHAR(100),
  rating DECIMAL(3,1),
  release_year INTEGER,
  discount INTEGER DEFAULT 0,
  is_hot BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  region VARCHAR(50),
  franchise VARCHAR(100),
  full_description TEXT,
  console_models VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);