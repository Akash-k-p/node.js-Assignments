const express = require('express');
const dotenv = require('dotenv');
const weatherRoutes = require('./routes/weatherRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/weather', weatherRoutes);

module.exports = app;
