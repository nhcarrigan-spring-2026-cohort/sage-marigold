const { 
  getUserProfile, 
  updateUserProfile, 
  anonymizeUserAccount 
} = require('../models/Profile');

/**
 * Get current user's profile
 * GET /api/users/profile
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const profile = await getUserProfile(userId);
    
    if (!profile) {
      return res.status(404).json({ 
        ok: false, 
        msg: 'Profile not found or account has been deleted' 
      });
    }

    res.json({ 
      ok: true, 
      profile 
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ 
      ok: false, 
      msg: 'Server error fetching profile' 
    });
  }
};

/**
 * Update current user's profile
 * PUT /api/users/profile
 * 
 * Allowed fields: full_name, location (mapped to location_address in DB)
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, location } = req.body;

    // Validation: At least one field must be provided
    if (!full_name && !location) {
      return res.status(400).json({
        ok: false,
        msg: 'Please provide at least one field to update (full_name or location)'
      });
    }

    // Validation: full_name should not be empty if provided
    if (full_name !== undefined && (!full_name || full_name.trim().length === 0)) {
      return res.status(400).json({
        ok: false,
        msg: 'Name cannot be empty'
      });
    }

    // Validation: full_name length check
    if (full_name && full_name.length > 100) {
      return res.status(400).json({
        ok: false,
        msg: 'Name must be less than 100 characters'
      });
    }

    // Validation: location length check
    if (location && location.length > 255) {
      return res.status(400).json({
        ok: false,
        msg: 'Location must be less than 255 characters'
      });
    }

    // Map 'location' from request to 'location_address' for database
    const updates = {};
    if (full_name !== undefined) updates.full_name = full_name.trim();
    if (location !== undefined) updates.location_address = location.trim();

    const updatedProfile = await updateUserProfile(userId, updates);

    if (!updatedProfile) {
      return res.status(404).json({
        ok: false,
        msg: 'Profile not found or account has been deleted'
      });
    }

    res.json({
      ok: true,
      msg: 'Profile updated successfully',
      profile: updatedProfile
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      ok: false,
      msg: 'Server error updating profile'
    });
  }
};

/**
 * Delete current user's account (Soft Delete with Anonymization)
 * DELETE /api/users/account
 * 
 * Process:
 * 1. Withdraw all available items
 * 2. Cancel all pending requests
 * 3. Anonymize user record (remove PII)
 * 
 * All operations happen in a transaction
 */
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await anonymizeUserAccount(userId);

    res.json({
      ok: true,
      msg: 'Account deleted successfully. Your data has been anonymized.',
      details: {
        itemsWithdrawn: result.withdrawnItems,
        requestsCancelled: result.cancelledRequests
      }
    });

  } catch (error) {
    console.error('Error deleting account:', error);

    if (error.message === 'User not found or already anonymized') {
      return res.status(404).json({
        ok: false,
        msg: 'Account not found or already deleted'
      });
    }

    res.status(500).json({
      ok: false,
      msg: 'Server error deleting account. Please try again later.'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount
};