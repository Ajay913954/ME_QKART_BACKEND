
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");

// TODO: CRIO_TASK_MODULE_CART - Update function to process url with query params

/**
 * Get user details
 * - Use service layer to get User data
 * - If query param, "q" equals "address", return only the address field of the user
 * - Else,
 * - Return the whole user object fetched from Mongo
 *
 * - If data exists for the provided "userId", return 200 status code and the object
 * - If data doesn't exist, throw an error using `ApiError` class
 *   - Status code should be "404 NOT FOUND"
 *   - Error message, "User not found"
 * - If the user whose token is provided and user whose data to be fetched don't match, throw `ApiError`
 *   - Status code should be "403 FORBIDDEN"
 *   - Error message, "User not found"
 *
 * @returns {User | {address: String}}
 */
const getUser = catchAsync(async (req, res) => {
  let user;

  if (req.query.q === "address") {
    user = await userService.getUserAddressById(req.params.userId);
  } else {
    user = await userService.getUserById(req.params.userId);
  }

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.id !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "User not found");
  }

  if (req.query.q === "address") {
    return res.status(httpStatus.OK).send({
      address: user.address,
    });
  }

  res.status(httpStatus.OK).send(user);
});

const setAddress = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.email !== req.user.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User not authorized to access this resource"
    );
  }

  const address = await userService.setAddress(user, req.body.address);

  res.send({
    address,
  });
});

module.exports = {
  getUser,
  setAddress,
};
