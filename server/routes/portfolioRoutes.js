const express = require("express");
const {
  createPortfolio,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio,
  getPortfolioByUser
} = require("../controllers/portfolioController");

const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/all", protect,getPortfolioByUser); 
router.post("/create", protect, createPortfolio);
// router.get("/:username", getPortfolioByUsername);
router.put("/:id", protect, updatePortfolio);
router.delete("/:id", protect, deletePortfolio);


module.exports = router;
