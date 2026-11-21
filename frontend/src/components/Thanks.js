import { CheckCircleFilled, ArrowRightOutlined, ShoppingOutlined, WalletOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Thanks.css";

class Thanks extends React.Component {
  render() {
    const balance = localStorage.getItem("balance") || "0";

    return (
      <div className="thanks-page-wrapper">
        {/* Header */}
        <Header history={this.props.history} />

        {/* Success Container */}
        <div className="thanks-main-content">
          <div className="thanks-container">
            <div className="thanks-icon-wrapper">
              <CheckCircleFilled className="thanks-check-icon" />
            </div>

            <span className="thanks-eyebrow">ORDER CONFIRMED</span>
            <h1 className="thanks-title">It's ordered!</h1>

            <div className="green-text thanks-line thanks-message">
              You will receive an invoice for your order shortly.
              <br />
              Your order will arrive in 7 business days.
            </div>

            {/* Delivery Steps Progress Indicator */}
            <div className="order-steps-bar">
              <div className="order-step active">
                <div className="step-dot"></div>
                <span>Order Placed</span>
              </div>
              <div className="step-line active"></div>
              <div className="order-step">
                <div className="step-dot"></div>
                <span>Processing</span>
              </div>
              <div className="step-line"></div>
              <div className="order-step">
                <div className="step-dot"></div>
                <span>Dispatched</span>
              </div>
              <div className="step-line"></div>
              <div className="order-step">
                <div className="step-dot"></div>
                <span>Delivered</span>
              </div>
            </div>

            {/* Wallet Balance Card */}
            <div className="thanks-wallet-card">
              <WalletOutlined className="thanks-wallet-icon" />
              <div className="thanks-wallet-info">
                <span className="wallet-title">Remaining Wallet Balance</span>
                <span className="wallet-value">₹{balance} available</span>
              </div>
            </div>

            <div className="thanks-actions">
              <Link to="/products" className="thanks-line">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingOutlined />}
                  className="thanks-browse-btn"
                >
                  Browse for more products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(Thanks);
