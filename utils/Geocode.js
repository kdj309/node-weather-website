const axios = require("axios");
require('dotenv').config()
exports.geocode = (address = 'Kalaburagi', callback) => {
    let encodedaddress = encodeURIComponent(address)
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedaddress}.json?limit=1&proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${process.env.MAPBOX_API_KEY}`).then((result) => {
        const data = result.data
        const latitude = data.features[0].center[1]
        const longitude = data.features[0].center[0]
        const place = data.features[0].place_name
        const info = {
            latitude,
            longitude,
            place
        }
        callback(undefined, info)
    }).catch((err) => {
        callback('please use valid location', undefined)
    });
}