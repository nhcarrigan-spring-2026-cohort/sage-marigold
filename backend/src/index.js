require('dotenv').config({ path: '../.env' });
const app = require('./server');

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(PORT, () => {
  console.log(`Sage-Marigold backend is running on port ${PORT}`);
});

/* docker compose down -v
docker compose up --build para el team */
