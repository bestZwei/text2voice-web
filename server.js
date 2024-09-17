const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api-url', (req, res) => {
  res.json({ url: process.env.VOICE_API_URL });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
