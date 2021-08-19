const Joi = require("joi");

const Schema = Joi.object({
  destination: Joi.string().alphanum().min(3).required(),
  city: Joi.string().alphanum().min(3).required(),
  description: Joi.string().min(10).required(),
});

export default Schema;
