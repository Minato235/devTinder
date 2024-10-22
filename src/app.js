const express = require("express");
const connectDB = require("./config/db");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateReq } = require("./util/valiadateReq");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// Adjust the path as needed

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Find user by email
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }

    // Compare password
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      // Generate JWT tokenclear
      
      const token = jwt.sign({ _id: user._id }, "shhhhh");
      console.log(token);

      // Set token as cookie
      res.cookie("token", token);
      return res.send("Login success");
    } else {
      return res.status(401).send("Login not successful");
    }
  } catch (err) {
    // General error handling
    return res.status(500).send("Error finding login: " + err.message);
  }
});

app.post("/signUp", async (req, res) => {
  try {
    validateReq(req);

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      age,
      emailId,
      gender,
      password: hashPassword,
    });

    await user.save();
    res.status(201).send(`User ${firstName} added successfully`);
  } catch (err) {
    res.status(400).send(`Error from User: ${err.message}`);
  }
});

app.get("/feed1", async (req, res) => {
  // Use req.query instead of req.body for a GET request
  try {
    const user = await User.find({ emailId: "ShasSha@Shasha" });
    if (user) {
      res.json(user); // Send the user data if found
    } else {
      res.status(404).send("No user found with this email ID");
    }
  } catch (err) {
    res.status(404).send("Error finding user");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId; // Get userId from the request body (its getting from postman)

  try {
    const user = await User.findOneAndDelete({ _id: userId }); // Delete the user by userId
    if (user) {
      console.log("User deleted:", user); // Log the deleted user
      res.send("User deleted successfully.");
    } else {
      res.status(404).send("No user found with this ID."); // User not found
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send("Error finding user."); // Internal server error
  }
});

// Server - don't touch
connectDB()
  .then(() => {
    console.log("Db Connected");
    app.listen(3000, () => {
      console.log("Server running on 3k ✨");
    });
  })
  .catch((err) => {
    console.error(err);
  });
