const express = require("express");
const {
  createPortfolio,
  getPortfolioByUsername,
  updatePortfolio,
  deletePortfolio,
  getPortfolioByUser,
  publishPortfolio,
  getPortfolioBySlug,
  checkPortfolioName
} = require("../controllers/portfolioController");

const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/all", protect,getPortfolioByUser); 
router.post("/create", protect, createPortfolio);
// router.get("/:username", getPortfolioByUsername);
router.put("/:id", protect, updatePortfolio);
router.delete("/:id", protect, deletePortfolio);
router.put("/:id/publish", protect, publishPortfolio);
router.get("/slug/:slug", getPortfolioBySlug);
router.get("/check-name/:name",checkPortfolioName); // Check if portfolio name already exists


module.exports = router;
