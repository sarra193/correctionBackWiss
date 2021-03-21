const mongoose = require("mongoose");
const User=require("./User");
const postSchema= mongoose.Schema({

    country :{type: String},
   dateStart:{type:String},
   dateEnd:{type:String},
   description:{type:String},




})

module.exports =Post= mongoose.model("post",postSchema);
