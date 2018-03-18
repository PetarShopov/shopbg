const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    author: { type: String },
    timestamp: { type: Date, default: Date.now() }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product