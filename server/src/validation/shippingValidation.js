const Joi = require("joi");

exports.validateUserModel = (_reqBody) => {
    return Joi.object({
    user_id:Joi.string().min(2).max(150).required(),
    name:Joi.string().min(2).max(150).required(),
    email:Joi.string().min(2).max(150).email().required(),
    phone:Joi.string().min(2).max(150).allow(null,""),
    address:Joi.object({
      city:Joi.string().min(2).max(400).required(),
      street:Joi.string().min(2).max(400).required(),
      building_number:Joi.number().min(1).max(100).required(),
      building:Joi.boolean().required(),
      house_number:Joi.number().min(1).max(200).required(),
    }),
    }).validate(_reqBody)
    }