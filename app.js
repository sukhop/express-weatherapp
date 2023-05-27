const express = require('express');
const https = require("node:https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const key = "95dafe8db796df4cc4112bc9e76a1d28";
    const units = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=${units}`;

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            // console.log(temp, weatherDesc);
            res.write("<img src=" + icon + " alt='weather icon' >")
            res.write("<h1>The temprature of " + query + " is: " + temp + " degrees Celcius.</h1>");
            res.write("<p>The Weather is currently " + weatherDesc + "</p>");
            res.send();
        })
    })
})



app.listen(1000, "127.0.0.1", () => {
    console.log('success');
})