// Import mongoose
const mongoose = require('mongoose');
// Load environment variables from .env file
require('dotenv').config();

// Database connection function
const connectDB = async () => {
  try {
    // Use the MONGODB_URI from the .env file
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1); 
  }
};


module.exports = connectDB;
