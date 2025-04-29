const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String, unique: true },
  theme: { type: String },
  about: String,
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      techStack: [String],
      link: String
    }
  ],
  social: {
    linkedin: String,
    github: String,
    twitter: String
  }
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
// // This code defines a Mongoose schema for a Portfolio model. The schema includes fields for userId, username, theme, about, skills, projects, and social links. The userId field references the User model, and the projects field is an array of objects containing details about each project. The schema is then exported as a Mongoose model named "Portfolio". This allows the model to be used in other parts of the application for creating, reading, updating, and deleting portfolio records in a MongoDB database.
// // The Portfolio model can be used to manage user portfolios in a web application, allowing users to showcase their skills and projects.