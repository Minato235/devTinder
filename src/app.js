const express = require("express");
const connectDB = require("./config/db");
const app = express();
const User = require("./models/user");

//creating New Instance of User

app.post("/signUp", async (req, res) => {
  const user = new User({
    firstName: "ShaSha",
    lastName: "ShaSha",
    age: 25,
    emailId: "ShasSha@Shasha",
    gender: "M",
    password: "Shasha",
  });
  try {
    await user.save();
    res.send(`Shasha added Suceesfullly`);
  } catch (err) {
    res.status(400).send("Error from User");
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
