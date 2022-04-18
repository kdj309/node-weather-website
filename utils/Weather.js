const axios = require("axios")
require('dotenv').config()
exports.getWeatherstatus = ({ latitude, longitude, place } = {}, callback) => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API_KEY}&query=${latitude.toFixed(2)},${longitude.toFixed(2)}`).then((data) => {
        callback(undefined, { ...data.data, 'place': place })
    }).catch((err) => {
        callback('Failed to fetch weather of this location', undefined)
    })
}

