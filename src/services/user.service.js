
const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

/**
 * Get user by ID
 *
 * MongoDB se user ko ID ke through find karta hai.
 *
 * @param {String} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 *
 * Email ke through user find karta hai.
 *
 * @param {String} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Create a new user
 *
 * Steps:
 * 1. Check whether email already exists.
 * 2. If email exists, throw 409 Conflict error.
 * 3. Create and return user in MongoDB.
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // Check if email is already registered
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(
      httpStatus.OK,
      "Email already taken"
    );
  }

  // Create user.
  // Password hashing is handled by the User model's pre-save hook.
  return User.create(userBody);
};

// TODO: CRIO_TASK_MODULE_CART - Implement getUserAddressById()

/**
 * Get subset of user's data by id
 * - Should fetch from Mongo only the email and address fields for the user apart from the id
 *
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getUserAddressById = async (id) => {
  return User.findOne(
    { _id: id },
    {
      email: 1,
      address: 1,
    }
  );
};

/**
 * Set user's shipping address
 *
 * @param {User} user
 * @param {String} newAddress
 * @returns {String}
 */
const setAddress = async (user, newAddress) => {
  user.address = newAddress;
  await user.save();

  return user.address;
};

// Export functions
module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getUserAddressById,
  setAddress,
};
