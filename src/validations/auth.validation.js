
const Joi = require("joi");
const { password } = require("./custom.validation");

/**
 * Check request body for fields (all are required)
 * - "email" : string and satisfying email structure
 * - "password": string and satisfies the custom password structure defined in "src/validations/custom.validation.js"
 * - "name": string
 */
const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
    name: Joi.string().required(),
  }),
};

/**
 * Check request body for fields (all are required)
 * - "email" : string and satisfying email structure
 * - "password": string
 */
const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
