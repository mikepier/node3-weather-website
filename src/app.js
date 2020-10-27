const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

const footerText = 'Copyright by Misio, 2020'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Misio Pysio',
        footer: footerText,
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Misio Pysio',
        footer: footerText,
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        contact: '564-123-123',
        footer: footerText,
    })
})

//app.com
//app.com/help
//app.com/about
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error:'You must provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return console.log(error)
        }

        forecast({latitude, longitude}, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

        res.send({
            forecast: forecastData,
            location: location
        })
        
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorText: 'How am I supposed to help with this strange URL. Sorry!'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404 error, buddy',
        errorText: 'My 404 page. Sorry!'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001.')
})
