const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/weather.json');


function readData() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}


function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

const WeatherHandler = {
  showAllDetails: (req, res) => {
    const data = readData();
    res.json(data);
  },

  showRainDetails: (req, res) => {
    const data = readData();
    const rainData = data.filter((item) => item.rain === 'yes');
    res.json(rainData);
  },

  addNewCityTempDetails: (req, res) => {
    const newCity = req.body;
    const data = readData();
    data.push(newCity);
    writeData(data);
    res.status(201).json({ message: 'New city details added successfully' });
  },

  changeRainDetails: (req, res) => {
    const city = "Delhi";
    const data = readData();
    const cityData = data.find((item) => item.city.name.toLowerCase() === city.toLowerCase());
    if (cityData) {
      cityData.rain = "no";
      writeData(data);
      res.json({ message: `Rain details updated for city ${city}` });
    } else {
      res.status(404).json({ message: `City ${city} not found` });
    }
  },

  removeCityDetails: (req, res) => {
    const city = "Agra";
    const data = readData();
    const updatedData = data.filter((item) => item.city.name.toLowerCase() !== city.toLowerCase());
    writeData(updatedData);
    res.json({ message: `Details for city ${city} removed successfully` });
  },

  showCityDetails: (req, res) => {
    const { city } = req.params;
    const data = readData();
    console.log(data);
    const cityData = data.find((item) => item.city.name.toLowerCase() === city.toLowerCase());
    if (cityData) {
      res.json(cityData);
    } else {
      res.status(404).json({ message: `City ${city} not found` });
    }
  }
};

module.exports = WeatherHandler;
