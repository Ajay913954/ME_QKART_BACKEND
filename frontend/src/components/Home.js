import {
  ArrowRightOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  ShoppingOutlined,
  FireOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Home.css";

export default function Home() {
  const history = useHistory();

  const categories = [
    { name: "Electronics", icon: "💻", tag: "Hot Deals" },
    { name: "Fashion & Apparel", icon: "👕", tag: "Trending" },
    { name: "Footwear & Shoes", icon: "👟", tag: "New Arrival" },
    { name: "Accessories", icon: "⌚", tag: "Popular" },
  ];

  return (
    <div className="home-page">
      {/* Top Navigation */}
      <Header history={history} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">
            <FireOutlined className="hero-pill-icon" /> Next-Gen Shopping Experience
          </div>

          <h1 className="hero-title">
            Everything You Love, <br />
            <span className="hero-title-gradient">Delivered in Flash.</span>
          </h1>

          <p className="hero-subtitle">
            Explore India's most curated catalog of electronics, lifestyle, and
            fashion essentials at unbeatable prices with guaranteed doorstep delivery.
          </p>

          <div className="home-buttons">
            <Link to="/products">
              <Button
                type="primary"
                size="large"
                className="hero-btn-primary"
                icon={<ArrowRightOutlined />}
              >
                Browse Products
              </Button>
            </Link>

            <Link to="/register">
              <Button
                id="register-button"
                size="large"
                className="hero-btn-secondary"
              >
                Register
              </Button>
            </Link>

            <Link to="/login">
              <Button
                id="login-button"
                size="large"
                className="hero-btn-secondary"
              >
                Login
              </Button>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarFilled key={i} />
                ))}
              </div>
              <span className="stat-label">4.9/5 from 50k+ Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-highlight">⚡ 2-Hour</span>
              <span className="stat-label">Average Express Delivery</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="hero-card-showcase">
          <div className="showcase-card">
            <div className="showcase-badge">WEEKEND SPECIAL</div>
            <div className="showcase-icon-ring">
              <ShoppingOutlined className="showcase-main-icon" />
            </div>
            <h3 className="showcase-title">Mega Savings Festival</h3>
            <p className="showcase-desc">Up to 60% off on top trending essentials today.</p>
            <Link to="/products">
              <Button type="primary" block className="showcase-action-btn">
                Claim Deals Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-box blue">
              <ThunderboltOutlined />
            </div>
            <div className="feature-details">
              <h4>Lightning Fast Delivery</h4>
              <p>Reliable doorstep shipping in record time across top cities.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box green">
              <SafetyCertificateOutlined />
            </div>
            <div className="feature-details">
              <h4>100% Genuine Products</h4>
              <p>Direct from verified manufacturers with guaranteed authenticity.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box amber">
              <CreditCardOutlined />
            </div>
            <div className="feature-details">
              <h4>Secure Digital Checkout</h4>
              <p>Safe transactions protected with bank-grade encryption.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box purple">
              <CustomerServiceOutlined />
            </div>
            <div className="feature-details">
              <h4>24/7 Dedicated Support</h4>
              <p>Our friendly customer care team is always here to help you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Categories */}
      <section className="categories-section">
        <div className="section-header">
          <span className="section-eyebrow">EXPLORE CATALOG</span>
          <h2 className="section-title">Trending Categories</h2>
          <p className="section-subtitle">Find what you're looking for with our curated collections.</p>
        </div>

        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <Link to="/products" key={idx} className="category-card">
              <div className="category-tag">{cat.tag}</div>
              <div className="category-emoji">{cat.icon}</div>
              <h3 className="category-name">{cat.name}</h3>
              <span className="category-link-text">Shop Collection →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to action Banner */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Ready to upgrade your shopping experience?</h2>
          <p>Join thousands of savvy shoppers saving big every day on QKart.</p>
          <Link to="/products">
            <Button size="large" className="cta-btn">
              Explore All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
