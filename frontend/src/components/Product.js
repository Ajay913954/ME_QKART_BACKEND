import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Rate } from "antd";
import React from "react";
import "./Product.css";

/**
 * @typedef {Object} Product
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

export default function Product(props) {
  return (
    <Card className="product" hoverable>
      {/* Product Image */}
      <div className="product-image-container">
        <img
          className="product-image"
          alt={props.product.name}
          src={props.product.image}
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-info-text">
          <div className="product-title" title={props.product.name}>
            {props.product.name}
          </div>
          <div className="product-category">{props.product.category}</div>
        </div>

        {/* Pricing and Actions */}
        <div className="product-info-utility">
          <div className="product-cost">₹{props.product.cost}</div>

          <div className="product-rating-row">
            <Rate
              className="product-rating"
              disabled={true}
              defaultValue={props.product.rating}
            />
            <span className="product-rating-count">({props.product.rating})</span>
          </div>

          <Button
            type="primary"
            className="product-add-btn"
            icon={<PlusCircleOutlined />}
            onClick={props.addToCart}
            block
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
