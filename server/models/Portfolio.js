const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  portfolioName: { type: String, required: true ,unique: true },
  selectedTemplate: { type: String, required: true },
  
  basicInfo: {
    fullName: { type: String },
    title: { type: String },
    summary: { type: String },
    email: { type: String },
    phone: { type: String },
    location: { type: String },
    website: { type: String },
  },
  socialLinks: {
    linkedIn: { type: String },
    github: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  skills: [
    {
      name: { type: String },
      level: { type: Number }, // Skill level as a percentage (e.g., 90 for 90%)
    },
  ],
  education: [
    {
      degree: { type: String },
      field: { type: String },
      institution: { type: String },
      startDate: { type: String },
      endDate: { type: String },
    },
  ],
  experience: [
    {
      position: { type: String },
      company: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      description: { type: String },
    },
  ],
  projects: [
    {
      name: { type: String },
      description: { type: String },
      techStack: [String],
      link: { type: String },
      image: { type: String }, // URL for the project image
    },
  ],
  createdAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false }, // Add a published field if needed
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);