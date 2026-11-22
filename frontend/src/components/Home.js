import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css";

export default function Home() {
  const history = useHistory();

  const categories = [
    { name: "Electronics", desc: "Laptops, Headphones & Audio" },
    { name: "Fashion", desc: "Men & Women Apparel" },
    { name: "Footwear", desc: "Sneakers, Formal & Sports" },
    { name: "Accessories", desc: "Watches, Bags & Daily Gear" },
  ];

  return (
    <div className="home-wrapper">
      {/* Top Header */}
      <Header history={history} />

      {/* Main Container */}
      <main className="home-main">
        {/* Hero Promotional Banner */}
        <section className="home-hero">
          <div className="hero-text-container">
            <h1 className="hero-heading">
              Welcome to QKart
            </h1>
            <p className="hero-subheading">
              Shop thousands of products across electronics, fashion, and lifestyle essentials with verified quality and doorstep delivery.
            </p>

            <div className="home-buttons">
              <Link to="/products">
                <Button
                  type="primary"
                  size="large"
                  className="browse-btn"
                  icon={<ArrowRightOutlined />}
                >
                  Browse Products
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  id="register-button"
                  size="large"
                  className="auth-btn"
                >
                  Register
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  id="login-button"
                  size="large"
                  className="auth-btn"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Realistic Trust Strip */}
        <div className="trust-strip">
          <div className="trust-item">
            <span className="trust-icon" role="img" aria-label="delivery">🚚</span>
            <div>
              <strong>Fast Delivery</strong>
              <p>Reliable shipping across India</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon" role="img" aria-label="shield">🛡️</span>
            <div>
              <strong>100% Genuine</strong>
              <p>Direct from verified sellers</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon" role="img" aria-label="payment">💳</span>
            <div>
              <strong>Secure Payments</strong>
              <p>Protected digital transactions</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon" role="img" aria-label="returns">🔄</span>
            <div>
              <strong>Easy Returns</strong>
              <p>7-day hassle-free replacement</p>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <section className="home-categories">
          <div className="section-title-wrap">
            <h2>Featured Categories</h2>
            <Link to="/products" className="view-all-link">
              View All Products &rarr;
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <Link to="/products" key={idx} className="category-tile">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <span className="cat-action">Shop Now &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
