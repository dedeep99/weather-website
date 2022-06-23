const path = require('path');
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

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

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Soumyadeep De"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Soumyadeep De"
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: "Help",
        name: "Soumyadeep De",
        message: "This is a help message"
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must enter a search term'
        })
    }
    console.log(req.query.rating)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address entered. Please provide an address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecastData,
                location,
                address: req.query.address
            })
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Soumyadeep De",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Soumyadeep De",
        errorMessage: "Page not found"
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})