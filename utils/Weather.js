const axios = require("axios")

exports.getWeatherstatus = ({ latitude, longitude, place } = {}, callback) => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${latitude.toFixed(2)},${longitude.toFixed(2)}`).then((data) => {
        console.log(data);
        callback(undefined, { ...data.data, 'place': place })
    }).catch((err) => {
        console.log(err)
        callback('Failed to fetch weather of this location', undefined)
    })
}

