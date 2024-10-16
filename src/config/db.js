const mongoose = require("mongoose");
const URL = `mongodb+srv://ankamasish21:q47y5StT4SPdRAiW@namastemongo.cnlzt.mongodb.net/`;
const connectDB = async () => {
  await mongoose.connect(URL);
};
connectDB()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
