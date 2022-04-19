var fs = require('fs');
const axios = require("axios")
var apiData = fs.readFileSync('api.txt').toString().trim().split('\n');

require('dotenv').config()
exports.getWeatherstatus = ({ latitude, longitude, place } = {}, callback) => {
    axios.get(`http://api.weatherstack.com/current?access_key=${apiData[1]}&query=${latitude.toFixed(2)},${longitude.toFixed(2)}`).then((data) => {
        console.log(data);
        callback(undefined, { ...data.data, 'place': place })
    }).catch((err) => {
        console.log(err)
        callback('Failed to fetch weather of this location', undefined)
    })
}

