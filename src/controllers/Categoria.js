const express = require('express');
const Categoria = require('../models/Categoria');
const authenticateMiddleware = require("../middlewares/authenticate");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Criar uma nova categoria
app.post('/categorias', authenticateMiddleware, async (req, res) => {
  const categoria = new Categoria(req.body);
  try {
    await categoria.save();
    res.status(201).send(categoria);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ler todas as categorias
app.get('/categorias', authenticateMiddleware, async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.send(categorias);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Atualizar uma categoria
app.put('/categorias/:id', authenticateMiddleware, async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) return res.status(404).send();
    res.send(categoria);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = app; // Export the app for use in other modules