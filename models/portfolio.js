const mongoose = require('mongoose')
const Schema = mongoose.Schema

const equitySchema = new Schema({
    tickerSymbol: {type: String, require: true},
    companyName: String,
    quantity: Number,
    purchasePrice: {type: Number, min: 0, require: true},
    long: Boolean,
})

const Holdings = mongoose.model('Portfolio', equitySchema)

module.exports = Holdings