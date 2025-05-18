const mongoose = require("mongoose");

let schema = new mongoose.Schema({
name:String,
image_url:String,
description:String,
price:Number,
category:String,
amount:Number,
})
exports.InstrumentsModel = mongoose.model("instruments",schema);