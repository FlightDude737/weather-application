const path = require("path")
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

// Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Drew Crocker'
    })
})

app.get('/dev/api', (req, res) => {
    res.render('api', {
        title: 'Weather API',
        name: 'Drew Crocker'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Drew Crocker',
        describe: 'This is the help page'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Drew Crocker'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'No location was provided.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found in directory.',
        name: 'Drew Crocker'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found. 404',
        name: 'Drew Crocker'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})