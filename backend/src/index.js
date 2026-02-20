require('dotenv').config({ path: '../.env' });
const app = require('./server');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sage-Marigold backend is running on port ${PORT}`);
});
