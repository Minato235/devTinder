const express = require("express");
const connectDB = require("./config/db");
const app = express();
const router=express.Router()
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateReq } = require("./util/valiadateReq");
const auth=require("../src/middleware/auth")
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const routerAuth=require("./routes/login")



app.use(express.json());
app.use(cookieParser());
//rotes
app.use("/auth", routerAuth); // Now, access login as /auth/login


// Adjust the path as needed



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
