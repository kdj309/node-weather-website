const path = require('path')
const express = require('express')
const hbs = require('hbs');
const app = express()
const { geocode } = require("./utils/Geocode");
const { getWeatherstatus } = require("./utils/Weather");
app.use(express.static(path.join(__dirname, './public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './templates/views'))


hbs.registerPartials(path.join(__dirname, './templates/partials'))


app.get('/', (req, res) => {
    res.render('index', {
        'title': "Weather info",
        'name': "Kartik"
    })
})

//
app.get('/about', (req, res) => {
    res.render('about', {
        'title': "About",
        'name': "Kartik"
    })
})
app.get('/')
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(404).json({ error: "Address Must be provided" })
    }
    geocode(req.query.address, (err, data) => {
        if (err) {
            return res.json({ error: err });
        } else {
            getWeatherstatus(data, (err, data) => {
                if (err) {
                    return res.json({ error: err });
                }
                return res.json({
                    ...data
                });
            })
        }
    })
})
app.use(function (req, res) {
    res.render('404', {
        'errorMessage': "Page not found"
    });
});
app.listen(3000, () => {
    console.log('server is up and running at 3000');
})