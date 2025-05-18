const Joi = require("joi");

exports.validateUserModel = (_reqBody) => {
    return Joi.object({
    name:Joi.string().min(2).max(150).required(),
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(16).required(),
    role:Joi.string().min(2).max(10).allow(null,"")
    }).validate(_reqBody)
}
    
exports.validateLogin = (_reqBody) => {
    return Joi.object({
    email:Joi.string().min(2).max(150).email().required(),
    password:Joi.string().min(3).max(16).required(),
    }).validate(_reqBody)
}    