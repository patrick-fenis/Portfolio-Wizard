const express = require('express')
const router = express.Router()

router.get('/explore/:tickerSymbol', (req, res) => {
    fetch (`https://api.stockdata.org/v1/data/quote?symbols=${req.params.tickerSymbol}&api_token=4eACabta8CtXVIVKsOd9lInaIFCHnuBkWgZYIEbJ`).then
    ((response) => {
        return response.json()
    }).then((json) => {
        stockData = json.data[0]
        res.send(stockData)
    },
    (err) => {
        console.log('err.message')
    })
})


module.exports = router
    
