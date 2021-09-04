const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

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

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ravi Bains'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ravi Bains'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ravi Bains'
    })
})

// app.get('/help',(req,res)=>{
//     res.send({
//         name: 'Jito',
//         age: 30
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('<title>All about me!</title>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an Address'
        })
    }
    geocode(req.query.address,(error, {lat,lon,location}={})=> {
        console.log(req.query.address)
        if(error){       
            return console.log('Error', error)
        }
        forecast(lat,lon, (error,foreCastData)=> {
            if(error) {
                return console.log('Error', error)
            }
            console.log(location)
            console.log(foreCastData)
            res.send({
                location: location,
                foreCastData: foreCastData
            })
        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Error',
        name: 'Ravi Bains',
        errorMessage: 'Help artical not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Error',
        name: 'Ravi Bains',
        errorMessage: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})