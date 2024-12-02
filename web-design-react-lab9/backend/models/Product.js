const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    imageSrc: String,
    title: String,
    description: String,
    price: Number,
    size: [String],
    color: [String],
    color_to_buy: [String],
    link: String,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
