// productRoutes.js
const express = require('express');
const router = express.Router();

module.exports = function(db) {
  // GET all products
  router.get('/products', async (req, res) => {
    try {
      const products = await db.collection('products').find().toArray();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // POST a new product
  router.post('/new_product', async (req, res) => {
    try {
      const newProduct = req.body;

      if (!newProduct.name || !newProduct.price || !newProduct.category) {
        return res.status(400).json({ error: 'Name, price, and category are required' });
      }

      const existingProduct = await db.collection('products').findOne({ name: newProduct.name });

      if (existingProduct) {
        return res.status(409).json({ error: 'Product with this name already exists' });
      }
      // Add dateCreated and dateTimestamp to the new product
        const now = new Date();
        const dateTimestamp = now.getTime();
        const dateCreated = now.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' });
        const currencySymbol = newProduct.currencySymbol || 'RM';

        const productWithDates = {
          ...newProduct,
          dateCreated,
          dateTimestamp,
          currencySymbol
        };
      const result = await db.collection('products').insertOne(productWithDates);

      res.status(201).json({
        message: 'Product created successfully',
        product: { _id: result.insertedId, ...productWithDates }
      });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};