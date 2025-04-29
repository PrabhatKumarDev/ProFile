const Portfolio = require("../models/Portfolio");

exports.createPortfolio = async (req, res) => {
  const { username, about, skills, projects, social, theme } = req.body;

  try {
    const exists = await Portfolio.findOne({ username });
    if (exists) return res.status(400).json({ message: "Username already taken" });

    const newPortfolio = new Portfolio({
      userId: req.user.id,
      username,
      about,
      skills,
      projects,
      social,
      theme,
    });

    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPortfolioByUsername = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ username: req.params.username });
    if (!portfolio) return res.status(404).json({ message: "Not found" });

    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: "Not found" });

    if (portfolio.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    const updated = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: "Not found" });

    if (portfolio.userId.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
