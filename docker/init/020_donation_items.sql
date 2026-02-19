CREATE TABLE IF NOT EXISTS donation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  condition VARCHAR(50),
  status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'claimed', 'withdrawn')),
  donor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add an index for faster queries on status
CREATE INDEX IF NOT EXISTS idx_donation_items_status ON donation_items(status);

-- Add an index for donor_id lookups
CREATE INDEX IF NOT EXISTS idx_donation_items_donor ON donation_items(donor_id);