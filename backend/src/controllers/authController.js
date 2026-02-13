const bcrypt = require('bcrypt');
const db = require('../config/db');
const { generateJWT } = require('../utils/jwt');

const registerUser = async (req, res) => {
  const { full_name, email, password, location_address } = req.body;

  try {
    const exists = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (exists.rows.length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Email is already registered',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const result = await db.query(
      `INSERT INTO users (full_name, email, password_hash, location_address) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, full_name, email, location_address, created_at`,
      [full_name, email, passwordHash, location_address]
    );

    const token = await generateJWT(
      result.rows[0].id,
      result.rows[0].full_name
    );

    return res.status(201).json({
      ok: true,
      user: result.rows[0],
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      ok: false,
      message: 'Server error',
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      'SELECT id, full_name, email, password_hash, location_address, is_active FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid credentials',
      });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({
        ok: false,
        message: 'User account is inactive',
      });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid credentials',
      });
    }

    const token = await generateJWT(user.id, user.full_name);

    return res.json({
      ok: true,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        location_address: user.location_address,
      },
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({
      ok: false,
      message: 'Server error',
    });
  }
};

const renewToken = async (req, res) => {
  const uid = req.uid;
  const full_name = req.full_name;

  const token = await generateJWT(uid, full_name);

  res.json({
    ok: true,
    token,
    message: 'Token renewed successfully',
  });
};

module.exports = {
  registerUser,
  loginUser,
  renewToken,
};
