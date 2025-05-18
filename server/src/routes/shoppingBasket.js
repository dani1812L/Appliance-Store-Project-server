const express = require("express");
const { ShoppingBasketModel } = require("../models/shoppingBasketModel");
const { InstrumentsModel } = require("../models/instrumentsModel");
const { basketValidation } = require("../validation/basketValidation");
const {
  addToProducts,
  createProduct,
} = require("../services/shoppingBasket.service");

const router = express.Router();

// CREATE a new shopping basket
router.post("/", async (req, res) => {
  const { user_id, productId } = req.body;
  const { error } = basketValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let basket;

  try {
    basket = await ShoppingBasketModel.findOne({ user_id, active: true });

    if (basket) {
      const { modifiedCount } = await addToProducts(user_id, productId);
      if (+modifiedCount === 0) {
        const { modifiedCount: createModifiedCount } = await createProduct(user_id, productId);
        if (createModifiedCount === 0)
          return res.status(400).json({ error: "product couldn't be added" });
      }
    } else {
      // user doesn't have active basket
      basket = new ShoppingBasketModel({ user_id });
      await basket.save();
      const { modifiedCount } = await createProduct(user_id, productId);
      if (+modifiedCount === 0)
        return res.status(400).json({ error: "product or basket couldn't be added" });
    }

    basket = await ShoppingBasketModel.findOne({ user_id, active: true });
    return res.status(201).json(basket);
  } catch (err) {
    res.status(500).send("Error creating shopping basket: " + err.message);
  }
});

// עדכון כמות מוצר בסל
router.put("/user/:user_id/product/:productId", async (req, res) => {
  const { user_id, productId } = req.params;
  const { action } = req.body; // מצפה שaction יהיה 'decrease'

  try {
    const basket = await ShoppingBasketModel.findOne({ user_id, active: true });
    if (!basket) return res.status(404).send("Basket not found");

    const productIndex = basket.products.findIndex(
      (item) => item._id.toString() === productId
    );

    if (productIndex === -1)
      return res.status(404).send("Product not found in basket");

    if (action === "decrease") {
      if (basket.products[productIndex].quantity > 1) {
        basket.products[productIndex].quantity -= 1;
      } else {
        // הכמות 1 או פחות - מסירים את המוצר
        basket.products.splice(productIndex, 1);
      }
    } else {
      return res.status(400).send("Invalid action");
    }

    await basket.save();
    res.status(200).json(basket);
  } catch (err) {
    res.status(500).send("Error updating basket: " + err.message);
  }
});

// READ all shopping baskets with item details
router.get("/:user_id", async (req, res) => {
  try {
    const userId = req.params.user_id;

    const baskets = await ShoppingBasketModel.find({ user_id: userId });

    if (!baskets || baskets.length === 0) {
      return res.status(200).send([]);
    }

    const itemDetails = await Promise.all(
      baskets[0].products.map(async (basket) => {
        const item = await InstrumentsModel.findById(basket._id);
        return {
          ...basket._doc,
          itemDetails: item,
        };
      })
    );

    res.status(200).send(itemDetails);
  } catch (err) {
    res.status(500).send("Error retrieving shopping baskets: " + err.message);
  }
});

// READ a specific active shopping basket by user ID
router.get("/active/:id", async (req, res) => {
  try {
    const basket = await ShoppingBasketModel.find({
      user_id: req.params.id,
      active: true,
    });
    if (!basket) return res.status(404).send("Shopping basket not found");
    res.status(200).send(basket);
  } catch (err) {
    res.status(500).send("Error retrieving shopping basket: " + err.message);
  }
});

// DELETE all items from basket by productId
router.delete("/user/:user_id/product/:productId", async (req, res) => {
  const { user_id, productId } = req.params;

  try {
    const basket = await ShoppingBasketModel.findOne({ user_id, active: true });
    if (!basket) return res.status(404).send("Basket not found");

    const updatedProducts = basket.products.filter(
      (item) => item._id.toString() !== productId
    );

    basket.products = updatedProducts;
    await basket.save();

    res.status(200).send({ message: "All matching products removed", basket });
  } catch (err) {
    res.status(500).send("Error removing products: " + err.message);
  }
});

module.exports = router;
