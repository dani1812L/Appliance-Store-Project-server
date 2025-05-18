const Joi = require("joi");

// Joi Validation
exports.basketValidation = (_reqBody) => {
    return Joi.object({
      user_id: Joi.string().required(), // Ensure user_id is a valid string
      productId: Joi.string().required()
      
    }).validate(_reqBody);
  
  };