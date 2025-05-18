const { ShoppingBasketModel } = require("../models/shoppingBasketModel");

// פונקציה זו אחראית להגדיל את הכמות של מוצר קיים בתוך סל הקניות של המשתמש
exports.addToProducts = async (user_id, productId) => {
  return await ShoppingBasketModel.updateOne(
    {
      user_id, // Match the user
      active: true, // Ensure the basket is active
      "products._id": productId, // Check if the product exists in the products array
    },
    {
      $inc: { "products.$.quantity": 1 }, // Increase the quantity by 1 if the product exists
    },
    {
      upsert: false, // Do not insert a new document if no match is found
    }
  );
};

// פונקציה זו אחראית להוסיף מוצר חדש לסל הקניות של המשתמש אם המוצר עדין לא קיים
exports.createProduct = async (user_id, productId) => {
  // If the product doesn't exist
  return await ShoppingBasketModel.updateOne(
    {
      user_id, // Match the user
      active: true, // Ensure the basket is active
      "products._id": { $ne: productId }, // Ensure the product doesn't already exist
    },
    {
      $push: {
        products: { id: productId, quantity: 1 }, // Add the product with a quantity of 1
      },
    }
  );
};
