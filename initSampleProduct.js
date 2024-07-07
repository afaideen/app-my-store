


const {convertTimestampToMalaysianTimeString} = require("./utils");

const dateTimestamp = new Date().getTime();
const dateCreated = convertTimestampToMalaysianTimeString(dateTimestamp);
const sampleProducts = [
    {
        "dateCreated": dateCreated,
        "dateTimestamp": dateTimestamp,
        "name": "Smartphone",
        "description": "Latest model smartphone with high-resolution camera",
        "price": 699.99,
        "currencySymbol": "RM",
        "category": "Electronics",
        "inStock": true,
        "quantity": 50
    },
    {
        "dateCreated": dateCreated,
        "dateTimestamp": dateTimestamp,
        "name": "Running Shoes",
        "description": "Comfortable running shoes with excellent support",
        "price": 89.99,
        "currencySymbol": "RM",
        "category": "Sports",
        "inStock": true,
        "quantity": 100
    },
    {
        "dateCreated": dateCreated,
        "dateTimestamp": dateTimestamp,
        "name": "Wireless Headphones",
        "description": "High-quality over-ear wireless headphones with noise cancellation",
        "price": 199.99,
        "currencySymbol": "RM",
        "category": "Electronics",
        "inStock": true,
        "quantity": 30
    },
    {
        "dateCreated": dateCreated,
        "dateTimestamp": dateTimestamp,
        "name": "Stainless Steel Water Bottle",
        "description": "Eco-friendly, double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours",
        "price": 24.99,
        "currencySymbol": "RM",
        "category": "Outdoor",
        "inStock": true,
        "quantity": 200,
        "color": "Midnight Blue",
        "capacity": "750ml",
        "features": [
            "BPA-free",
            "Leak-proof lid",
            "Wide mouth for easy cleaning",
            "Fits most cup holders"
        ]
    },
    {
        "dateCreated": dateCreated,
        "dateTimestamp": dateTimestamp,
        "name": "Collapsible Silicone Water Bottle",
        "description": "Compact, lightweight, and foldable water bottle perfect for travel and outdoor adventures. Made from food-grade silicone, it's easy to carry and store.",
        "price": 19.99,
        "currencySymbol": "RM",
        "category": "Outdoor",
        "inStock": true,
        "quantity": 150,
        "color": "Forest Green",
        "capacity": "500ml",
        "features": [
            "BPA-free",
            "Leak-proof",
            "Dishwasher safe",
            "Attached carabiner for easy carrying"
        ]
    }
];

async function initSampleProducts(db) {
  try {
    // Check if there are any existing products
    const existingProductsCount = await db.collection('products').countDocuments();

    if (existingProductsCount === 0) {
      const result = await db.collection('products').insertMany(sampleProducts);
      console.log(`${result.insertedCount} sample products added to the database`);
      return 1;
    } else {
      console.log('Products already exist in the database. Skipping sample data insertion.');
      return 0;
    }
  } catch (error) {
    console.error('Error checking/adding sample products:', error);
  }
}

module.exports = initSampleProducts;