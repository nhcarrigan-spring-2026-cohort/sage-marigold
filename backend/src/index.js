require("dotenv").config();
const app = require("./server");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Sage-Marigol backend is running on port ${PORT}`);
});