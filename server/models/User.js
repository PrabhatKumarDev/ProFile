const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
// This code defines a Mongoose schema for a User model. The schema includes three fields: name, email, and password. The email field is required and must be unique, while the password field is also required. The schema is then exported as a Mongoose model named "User".
// This allows the model to be used in other parts of the application for creating, reading, updating, and deleting user records in a MongoDB database.