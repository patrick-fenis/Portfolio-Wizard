const express = require('express')
const router = express.Router()
const Holdings = require('../models/portfolio.js');

router.get('/', (req, res) => {
    Holdings.find((err, holdings) => {
        if(err) {
            console.log(err.message)
        } else {
            res.render('index.ejs', {
                currentHoldings: holdings
            })
        }
    })
})

router.get('/overview/new', (req, res) => {
    res.render('new.ejs')
})


router.get('/overview/:stockId', (req, res) => {
    Holdings.findById(req.params.stockId, (err, stock) => {
        if(err) {
            console.log(err.message)
        } else {
            res.render('show.ejs', {
                stockInfo: stock,
                index: req.params.stockId
            })
        }
    })
})

router.get('/overview/:stockId/edit', (req, res) => {
    Holdings.findById(req.params.stockId, (err, foundStock) => {
        res.render('edit.ejs', {
            stockInfo: foundStock
        })
    })
})

router.post('/overview', (req, res) => {
    Holdings.create(req.body, (err, createdStock) => {
        if(err) {
            console.log(err.message)
            res.send(err.message)
        } else {
            res.redirect('/overview'),
            console.log(createdStock)
        }
    })
})

router.delete('/overview/:stockId', (req, res) => {
    Holdings.findByIdAndDelete(req.params.stockId, (err, deletedStock) => {
        if(err) {
            res.send(err.message)
        } else {
            res.redirect('/overview'),
            console.log(deletedStock)
        }
    })
})

router.put('/overview/:stockId', (req, res) => {
    Holdings.findByIdAndUpdate(req.params.stockId, req.body, {new: true}, (err, updatedStock) => {
        if(err) {
            res.send(err.message)
        } else {
            res.redirect(`/overview/${req.params.stockId}`),
            console.log(updatedStock)
        }
    })
})

module.exports = router