const mongose =require("mongoose");
const movies=new mongose.Schema({
    Name:String,
    Rank:Number
})

module.exports=mongose.model("Movies",movies)