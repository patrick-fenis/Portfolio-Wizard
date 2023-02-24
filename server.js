///  Server Set Up  ///

require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const mongoURI = process.env.MONGOURI
const PORT = process.env.PORT
const stockController = require('./controllers/stocks.js')

///  Middleware  ///

const db = mongoose.connection 
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static('public'))
app.use(stockController)

///  Model Import  ///

const Holdings = require('./models/portfolio.js');
const { update } = require('./models/portfolio.js');

/  Initial Seed  ///

app.get('/seed', async (req, res) => {
    const holdings = [
        {
            tickerSymbol: 'IONQ',
            companyName: 'IONQ Inc',
            quantity: 1000,
            purchasePrice: 4.35,
            long: true,
        },
        {
            tickerSymbol: 'LMT',
            companyName: 'Lockheed Martin',
            quantity: 100,
            purchasePrice: 235.45,
            long: true
        }
    ]
  
    try {
      const seedItems = await Holdings.create(holdings)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
  })



///  Server Connections  ///

mongoose.connect(mongoURI, {useNewUrlParser: true})
db.on('error', (err) => {console.log(`${err.message}... Is mongodb not working?`)})
db.on('connected', () => {console.log(`Connected to mongo at ${mongoURI}`)})
db.on('disconnected', () => {console.log('Disconnected')})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

//Update?