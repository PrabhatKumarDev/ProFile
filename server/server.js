const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://portfolio-backend-rawp.onrender.com",  // Replace with your actual frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // Add any custom headers if needed
}));
app.use(express.json());


connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Hello World! This is the server for the Portfolio Tracker application.');
  });
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/portfolio", require("./routes/portfolioRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
