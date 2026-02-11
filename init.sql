CREATE TABLE IF NOT EXISTS test_connection (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO test_connection (status) VALUES ('database initialized and connected :) ');