const mongoose = require("mongoose");

let schema = new mongoose.Schema({
user_id:String,
name:String,
email:String,
phone:String,
address:{
  city:String,
  street:String,
  building_number:Number,
  building:Boolean,
  house_number:Number,
},
},{timestamps:true
})
exports.UserModel = mongoose.model("shipping",schema)