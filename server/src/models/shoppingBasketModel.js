const mongoose = require("mongoose");

// Mongoose Schema
let schema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "instruments",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    active: { type: Boolean, default: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Mongoose Model
exports.ShoppingBasketModel = mongoose.model("shopping_basket", schema);
