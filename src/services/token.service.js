
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

/**
 * Generate JWT token
 *
 * Payload contains:
 * - sub: User ID
 * - type: Token type (ACCESS / REFRESH)
 *
 * Token expiration is set using the expires parameter.
 *
 * @param {ObjectId} userId - MongoDB user ID
 * @param {Number} expires - Expiration time in Unix timestamp (seconds)
 * @param {string} type - Token type (access, refresh)
 * @param {string} [secret] - Secret key (defaults to config.jwt.secret)
 * @returns {string} JWT token
 */
const generateToken = (
  userId,
  expires,
  type,
  secret = config.jwt.secret
) => {
  // JWT payload
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
    type,
  };

  // Sign payload using secret key and return JWT token
  return jwt.sign(payload, secret);
};

/**
 * Generate authentication tokens for a user
 *
 * Steps:
 * 1. Calculate access token expiration time.
 * 2. Generate JWT token using user's ID.
 * 3. Return token and expiration date.
 *
 * @param {User} user - Registered user object
 * @returns {Promise<Object>} Authentication tokens
 *
 * Example response:
 * "access": {
 *   "token": "eyJhbGciOiJIUzI1NiIs...",
 *   "expires": "2021-01-30T13:51:19.036Z"
 * }
 */
const generateAuthTokens = async (user) => {
  // Calculate expiration time in seconds
  const accessTokenExpires =
    Math.floor(Date.now() / 1000) +
    config.jwt.accessExpirationMinutes * 60;

  // Generate access token
  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  // Return token in required response format
  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires * 1000),
    },
  };
};

// Export functions so they can be used in other files
module.exports = {
  generateToken,
  generateAuthTokens,
};
