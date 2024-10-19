const express = require("express");
const connectDB = require("./config/db");
const app = express();
const User = require("./models/user");
const Movies = require("./models/movies");
app.use(express.json())

//Creating New Instance of User

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

app.post("/2",(req,res)=>{
  try{
    const user=new User(req.body)
   }catch(err){
    res.status(404).send("Error from /2")
  }
})

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
  const userId = req.body.userId;  // Get userId from the request body (its getting from postman)

  try {
    const user = await User.findOneAndDelete({ _id: userId });  // Delete the user by userId
    if (user) {
      console.log("User deleted:", user);  // Log the deleted user
      res.send("User deleted successfully.");
    } else {
      res.status(404).send("No user found with this ID.");  // User not found
    }
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).send("Error finding user.");  // Internal server error
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
