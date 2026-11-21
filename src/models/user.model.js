
const mongoose = require("mongoose");

// NOTE - "validator" external library and not the custom middleware
// at src/middlewares/validate.js
const validator = require("validator");

const config = require("../config/config");
const bcrypt = require("bcryptjs");

// TODO - Complete userSchema, a Mongoose schema for "users" collection

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,

      // Validate email format
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },

    password: {
      type: String,
      required: true,

      // Validate password contains at least one letter and one number
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },

    walletMoney: {
      type: Number,
      required: true,
      default: config.default_wallet_money,
      min: 0,
    },

    address: {
      type: String,
      default: config.default_address,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving user in database
userSchema.pre("save", async function (next) {
  // If password is not modified, don't hash it again
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password using bcrypt
  this.password = await bcrypt.hash(this.password, 8);

  next();
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

/**
 * Check if user has set a non-default address
 * @returns {boolean}
 */
 userSchema.methods.hasSetNonDefaultAddress = function () {
  return this.address !== config.default_address;
};

/**
 * Create a Mongoose model out of userSchema and export the model as "User"
 * Note: The model should be accessible in a different module when imported like below
 * const User = require("<user.model file path>").User;
 */

/**
 * @typedef User
 */

// Create a Mongoose model out of userSchema
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
