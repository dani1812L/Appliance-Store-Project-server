const Joi = require("joi");

exports.validate = (_reqBody) => {
    return Joi.object({
    name:Joi.string().min(2).max(400).required(),
    image_url:Joi.string().min(2).max(400).required(),
    description:Joi.string().min(2).max(600).required(),
    price:Joi.number().min(1).max(20000).required(),
    category:Joi.string().min(2).max(400).required(),
    amount:Joi.number().min(1).max(1000).required(),
    }).validate(_reqBody)
}