const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use URL routes
app.use('/api/urls', urlRoutes);

module.exports = app;
