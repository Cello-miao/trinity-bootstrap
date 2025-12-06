const { Product } = require('../models');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product (requires authentication)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const product = await Product.create({
      name,
      price,
      description,
      quantity: quantity || 0,
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product (requires authentication)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, quantity } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.update({
      name: name || product.name,
      price: price !== undefined ? price : product.price,
      description: description || product.description,
      quantity: quantity !== undefined ? quantity : product.quantity,
    });

    res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product (requires authentication)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
