const express = require("express");
const routerAuth = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateReq = require("../util/valiadateReq"); 

// Signup route
routerAuth.post("/signup", validateReq, async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    // Save the user in the database
    await newUser.save();

    // Optionally, generate a token for immediate login
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET || "shhhhh");
    
    // Set token as a cookie (optional)
    res.cookie("token", token, { httpOnly: true });

    return res.status(201).send("User created successfully.");
  } catch (err) {
    return res.status(500).send("Error signing up: " + err.message);
  }
});

module.exports = routerAuth; // Correct export
