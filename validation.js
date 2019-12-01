//VALIDATION
const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string() // string olsun
      .min(6) //minimum 6 karakter olsun
      .required() //boş olmasın
      .email(), // email olsun
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string() // string olsun
      .min(6) //minimum 6 karakter olsun
      .required() //boş olmasın
      .email(), // email olsun
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
