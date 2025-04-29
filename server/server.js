const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
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
