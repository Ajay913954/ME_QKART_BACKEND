import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-col brand-col">
              <img className="footer-img" src="/icon-white.png" alt="QKart" />
              <p className="footer-tagline">
                QKart is India's fastest-growing destination for premium electronics,
                fashion, and lifestyle curations. Experience seamless shopping,
                doorstep express delivery, and verified quality.
              </p>
              <div className="footer-trust-pill">
                <span role="img" aria-label="secure lock">🔒</span> 100% Secure SSL Payments & Guaranteed Quality
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Browse Catalog</Link>
                </li>
                <li>
                  <Link to="/register">Create Account</Link>
                </li>
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="footer-col">
              <h4 className="footer-heading">Customer Care</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/products">Track Your Order</Link>
                </li>
                <li>
                  <Link to="/products">Returns & Refunds</Link>
                </li>
                <li>
                  <Link to="/products">Shipping Information</Link>
                </li>
                <li>
                  <Link to="/products">FAQs & Help Center</Link>
                </li>
              </ul>
            </div>

            {/* Experience */}
            <div className="footer-col">
              <h4 className="footer-heading">Shop With Confidence</h4>
              <p className="footer-text">
                Every purchase on QKart is backed by our 7-day hassle-free replacement guarantee.
              </p>
              <div className="payment-badges">
                <span className="pay-badge">UPI</span>
                <span className="pay-badge">VISA</span>
                <span className="pay-badge">MasterCard</span>
                <span className="pay-badge">NetBanking</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} QKart India. All rights reserved. Crafted with precision for the modern shopper.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
