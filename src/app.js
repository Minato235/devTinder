const express = require("express");

const app = express();

// Middleware to protect /admin routes
app.use("/admin", (req, res, next) => {
  let token = "11";  // Hardcoded token (in real scenarios, get from headers/auth)
  const admin = token === "11";
  
  if (!admin) {
    console.log("No Access");
    return res.status(401).send("No Access");  // Respond with 401 and prevent further execution
  }
  
  console.log("200 You have Access");
  next();  // Pass control to the next handler
});

app.use("/", (err, req, res, next) => {
  if (err) {
    console.log(err);  // Log the error details to the console
    res.status(500).send("Something went wrong");  // Send a 500 Internal Server Error response
  }
});


// POST /admin/1 route
app.post("/admin/1", (req, res) => {
  res.send("We are Numbers 🚀");  // Respond with a message
});

// DELETE /admin/delete route
app.delete("/admin/delete", (req, res) => {
  res.send("deleted Numbers");  // Respond indicating deletion
});

// Server - don't touch
app.listen(3000, () => {
  console.log("Server running on 3k ✨");
});
