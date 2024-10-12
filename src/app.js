const express=require("express");

const app=express()

app.use("/123",(req,res)=>{
    res.send("Hello world")
})
app.use("/1",(req,res)=>{
    res.send("We are Numbers  🚀 ")
})

app.listen(3000,()=>{
    console.log("Server running on 3k ✨")
})