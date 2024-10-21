const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/vendorBuyer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Product Schema
const productSchema = new mongoose.Schema({
    vendorName: String,
    productName: String,
    productPrice: Number,
});

const Product = mongoose.model('Product', productSchema);

// API Routes
app.post('/api/products', async (req, res) => {
    const { vendorName, productName, productPrice } = req.body;
    const product = new Product({ vendorName, productName, productPrice });
    await product.save();
    res.status(201).send(product);
});

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});