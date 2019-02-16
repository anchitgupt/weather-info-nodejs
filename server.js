const express = require('express');
const bodyParser = require('body-parser');

const apiKey = 'acf290298ef501c8ea98427a8226314c';

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static('public'));

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
