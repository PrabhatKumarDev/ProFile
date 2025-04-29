// Import mongoose
const mongoose = require('mongoose');
// Load environment variables from .env file
require('dotenv').config();

// Database connection function
const connectDB = async () => {
  try {
    // Use the DB_URL from the .env file
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1); 
  }
};

module.exports = connectDB;
