const express = require('express');
const router = express.Router();
const WeatherHandler = require('../handler/weatherHandler');

router.get('/details', WeatherHandler.showAllDetails);
router.get('/raindetails', WeatherHandler.showRainDetails);
router.get('/details/:city', WeatherHandler.showCityDetails);
router.post('/add', WeatherHandler.addNewCityTempDetails);
router.put('/changerain', WeatherHandler.changeRainDetails);
router.delete('/remove', WeatherHandler.removeCityDetails);

module.exports = router;
