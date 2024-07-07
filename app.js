
require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const productRoutes = require('./routes/productRoutes');
const initSampleProducts = require("./initSampleProduct");  // Import the new route file

const app = express();
const port = process.env.PORT || 3000;
let db, v;
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    return client.db(process.env.DB_NAME);
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}

// Call this function after connecting to the database
async function startServer() {
  try {
    db = await connectToDatabase();
    v = await initSampleProducts(db);
    // Use the product routes
    app.use('/', productRoutes(db));

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();