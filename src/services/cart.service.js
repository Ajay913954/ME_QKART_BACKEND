
const httpStatus = require("http-status");
const { Cart, Product } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

// TODO: CRIO_TASK_MODULE_CART - Implement the Cart service methods

/**
 * Fetches cart for a user
 * - Find user's cart from Mongo
 * - If cart doesn't exist throw ApiError 404 "User does not have a cart"
 */
const getCartByUser = async (user) => {
  const cart = await Cart.findOne({ email: user.email });

  if (!cart) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User does not have a cart"
    );
  }

  return cart;
};

/**
 * Adds a new product to cart
 * - Get user's cart using Cart.findOne()
 * - If it doesn't exist create one
 * - If cart creation fails throw 500 ApiError
 * - If product already in cart throw 400:
 *   "Product already in cart. Use the cart sidebar to update or remove product from cart"
 * - If product not in products collection throw 400:
 *   "Product doesn't exist in database"
 * - Otherwise add product to user's cart
 */
const addProductToCart = async (user, productId, quantity) => {
  let cart = await Cart.findOne({ email: user.email });

  if (!cart) {
    cart = await Cart.create({
      email: user.email,
      cartItems: [],
      paymentOption: config.default_payment_option,
    });

    if (!cart) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Cart could not be created"
      );
    }
  }

  const existingProduct = cart.cartItems.find(
    (item) => item.product._id.toString() === productId.toString()
  );

  if (existingProduct) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product already in cart. Use the cart sidebar to update or remove product from cart"
    );
  }

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product doesn't exist in database"
    );
  }

  cart.cartItems.push({
    product: product,
    quantity: quantity,
  });

  await cart.save();

  return cart;
};

/**
 * Updates quantity of already existing product in cart
 * - If cart doesn't exist throw 400:
 *   "User does not have a cart. Use POST to create cart and add a product"
 * - If product not in products collection throw 400:
 *   "Product doesn't exist in database"
 * - If product not in cart throw 400:
 *   "Product not in cart"
 * - Otherwise update quantity and return cart
 */
const updateProductInCart = async (user, productId, quantity) => {
  const cart = await Cart.findOne({ email: user.email });

  if (!cart) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User does not have a cart. Use POST to create cart and add a product"
    );
  }

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product doesn't exist in database"
    );
  }

  const cartItem = cart.cartItems.find(
    (item) => item.product._id.toString() === productId.toString()
  );

  if (!cartItem) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product not in cart"
    );
  }

  cartItem.quantity = quantity;

  await cart.save();

  return cart;
};

/**
 * Deletes existing product in cart
 * - If cart doesn't exist throw 400 "User does not have a cart"
 * - If product not in cart throw 400 "Product not in cart"
 * - Otherwise remove product
 */
const deleteProductFromCart = async (user, productId) => {
  const cart = await Cart.findOne({ email: user.email });

  if (!cart) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User does not have a cart"
    );
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item.product._id.toString() === productId.toString()
  );

  if (itemIndex === -1) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Product not in cart"
    );
  }

  cart.cartItems.splice(itemIndex, 1);

  await cart.save();

  return cart;
};

/**
 * Checkout cart
 * - Find user's cart
 * - Validate cart is not empty
 * - Validate user's address
 * - Validate wallet balance
 * - Deduct total amount from wallet
 * - Empty the cart
 */
const checkout = async (user) => {
  // 1. Find user's cart
  const cart = await Cart.findOne({ email: user.email });

  // 2. Throw 404 if cart does not exist
  if (!cart) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User does not have a cart"
    );
  }

  // 3. Throw 400 if cart is empty
  if (cart.cartItems.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Cart is empty"
    );
  }

  // 4. Check if user has set a non-default delivery address
  if (!user.hasSetNonDefaultAddress()) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User has not set a delivery address"
    );
  }

  // 5. Calculate total cart value
  const totalCartValue = cart.cartItems.reduce((total, item) => {
    return total + item.product.cost * item.quantity;
  }, 0);

  // 6. Check if wallet balance is sufficient
  if (user.walletMoney < totalCartValue) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Insufficient wallet balance"
    );
  }

  // 7. Deduct total amount from user's wallet
  user.walletMoney -= totalCartValue;
  await user.save();

  // 8. Empty the cart
  cart.cartItems = [];
  await cart.save();

  return cart;
};

// Export all Cart service methods
module.exports = {
  getCartByUser,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  checkout,
};
