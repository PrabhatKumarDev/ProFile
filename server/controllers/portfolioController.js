const Portfolio = require("../models/Portfolio");

exports.createPortfolio = async (req, res) => {
  const {
    portfolioName,
    selectedTemplate,
    basicInfo,
    socialLinks,
    skills,
    education,
    experience,
    projects,
  } = req.body;
  
  try {
    // Check if a portfolio with the same name already exists for the user
    const exists = await Portfolio.findOne({ portfolioName, userId: req.user.id });
    if (exists) return res.status(400).json({ message: "Portfolio name already exists" });

    // Create a new portfolio
    const newPortfolio = new Portfolio({
      userId: req.user.id,
      portfolioName,
      selectedTemplate,
      basicInfo,
      socialLinks,
      skills,
      education,
      experience,
      projects,
    });
    console.log("New Portfolio:", newPortfolio); // Log the new portfolio object
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPortfolioByUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const portfolios = await Portfolio.find({ userId: req.user.id });

    if (!portfolios || portfolios.length === 0) {
      return res.status(404).json({ message: "No portfolios found" });
    }

    res.status(200).json(portfolios);
  } catch (err) {
    console.error("Error in getPortfolioByUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePortfolio = async (req, res) => {
  const {
    portfolioName,
    selectedTemplate,
    basicInfo,
    socialLinks,
    skills,
    education,
    experience,
    projects,
  } = req.body;

  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    // Check if the user is authorized to update the portfolio
    if (portfolio.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    // Update the portfolio
    portfolio.portfolioName = portfolioName || portfolio.portfolioName;
    portfolio.selectedTemplate = selectedTemplate || portfolio.selectedTemplate;
    portfolio.basicInfo = basicInfo || portfolio.basicInfo;
    portfolio.socialLinks = socialLinks || portfolio.socialLinks;
    portfolio.skills = skills || portfolio.skills;
    portfolio.education = education || portfolio.education;
    portfolio.experience = experience || portfolio.experience;
    portfolio.projects = projects || portfolio.projects;
    portfolio.updatedAt = Date.now();

    const updatedPortfolio = await portfolio.save();
    res.json(updatedPortfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    // Check if the user is authorized to delete the portfolio
    if (portfolio.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: "Portfolio deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};