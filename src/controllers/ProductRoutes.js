const express = require('express');
const Product = require('../models/ProductRoutes');

const router = express.Router();

// Criar um novo produto
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Produto não Atualizado' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obter um produto por ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obter todos os produtos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;