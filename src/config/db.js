const mongoose = require("mongoose");
const URL = `mongodb+srv://ankamasish21:q47y5StT4SPdRAiW@namastemongo.cnlzt.mongodb.net/devtinder`;
const connectDB = async () => {
  await mongoose.connect(URL);
};
module.exports=connectDB;
// connectDB()
//   .then(() => {
//     console.log("DB connected");
//   })
//   .catch((err) => {
//     console.error(err);
//   });
