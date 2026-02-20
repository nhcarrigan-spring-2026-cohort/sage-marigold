CREATE TABLE IF NOT EXISTS requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
<<<<<<< HEAD
<<<<<<< HEAD
    item_id UUID NOT NULL REFERENCES donation_items(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled')),
=======
    item_id UUID NOT NULL,
    requester_id UUID NOT NULL,
    status TEXT DEFAULT 'pending',
>>>>>>> cd33768 (refactor: sync request logic with donation_items table and add status validation)
=======
    item_id UUID NOT NULL REFERENCES donation_items(id) ON DELETE CASCADE,
    requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled')),
>>>>>>> 7125eb5 (feat: implement database transactions for acceptRequest (WIP: createRequest transaction))
    application_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7125eb5 (feat: implement database transactions for acceptRequest (WIP: createRequest transaction))

-- Add an index for faster queries on status (optimizes the "15-request limit" check written in the controller)
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);

-- Add an index for faster queries on requester_id (helps a user to see the history of items they've requested)
CREATE INDEX IF NOT EXISTS idx_requests_requester_id ON requests(requester_id);

-- Add an index for faster queries on item_id (speeds up the process of a donor viewing all applications for their specific item)
CREATE INDEX IF NOT EXISTS idx_requests_item_id ON requests(item_id);

<<<<<<< HEAD
<<<<<<< HEAD
-- Prevents a user from having multiple 'pending' requests for the same item at once, 
-- while still allowing them to re-apply if a previous request was 'cancelled' or 'rejected'
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_pending_request ON requests (item_id, requester_id) WHERE status = 'pending';
=======
>>>>>>> cd33768 (refactor: sync request logic with donation_items table and add status validation)
=======
>>>>>>> 7125eb5 (feat: implement database transactions for acceptRequest (WIP: createRequest transaction))
=======
-- Prevents a user from having multiple 'pending' requests for the same item at once, 
-- while still allowing them to re-apply if a previous request was 'cancelled' or 'rejected'
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_pending_request ON requests (item_id, requester_id) WHERE status = 'pending';
>>>>>>> 0dbc33c (fix: implement partial unique index for pending requests and manual timestamp updates in controller)
