const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    
    // Check if token is present
    if (!token) {
      throw new Error("Token missing");
    }

    // Verify and decode the token
    const decodedObj = await jwt.verify(token, "shhhhh");

    // Extract _id from the decoded token
    const { _id } = decodedObj;

    // Find the user by _id
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    // Attach the user to the request (optional)
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (err) {
    // Send a more descriptive error message
    res.status(400).send(`Error: ${err.message}`);
  }
};

module.exports = auth;
