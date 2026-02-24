-- docker/init/040_profile_management.sql
-- Add profile management fields to users table

-- Add is_anonymized flag for soft delete tracking
-- (location_address and updated_at already exist)
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_anonymized BOOLEAN DEFAULT FALSE;

-- Add index on is_anonymized for filtering
CREATE INDEX IF NOT EXISTS idx_users_is_anonymized ON users(is_anonymized);

-- Add comment
COMMENT ON COLUMN users.is_anonymized IS 'TRUE when user account has been soft-deleted (anonymized)';