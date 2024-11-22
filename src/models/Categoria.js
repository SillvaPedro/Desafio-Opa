const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);