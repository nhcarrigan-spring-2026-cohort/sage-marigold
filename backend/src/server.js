const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Sage-Marigold Backend!');
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'backend',
    timestamp: new Date().toISOString(),
  });
});

// db test route
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM test_connection');
    res.json({
      message: 'Database connection is working!',
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    console.log('DEBUG: Password is:', process.env.DB_PASSWORD);
    res.status(500).json({ error: 'Database connection failed :(' });
  }
});

module.exports = app;
