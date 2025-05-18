const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let schema = new mongoose.Schema({
name:String,
email: { type: String, unique: true, required: true },
password:String,
  // role - תקפיד המשתמש אם אדמין או משתמש רגיל
role:{
  type:String, default:"user"
}
  // {timestamps:true} -> דואג להוסיף תאריך של הוספה ועדכון
},{timestamps:true
})
exports.UserModel = mongoose.model("users",schema)

exports.createToken = (user_id,role) => {

  const token = jwt.sign({_id:user_id,role},process.env.TOKEN_SECRET,{expiresIn:"600mins"})
  return token;
}
