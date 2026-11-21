import { LogoutOutlined, CompassOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./Header.css";

export default class Header extends React.Component {
  root = () => {
    this.props.history.push("/");
  };

  explore = () => {
    this.props.history.push("/products");
  };

  register = () => {
    this.props.history.push("/register");
  };

  login = () => {
    this.props.history.push("/login");
  };

  logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    this.props.history.push("/");
  };

  render() {
    const username = localStorage.getItem("username");

    return (
      <header className="header">
        {/* Shows Qkart title image & Brand */}
        <div className="header-brand-wrap" onClick={this.root}>
          <div className="header-title">
            <img src="/icon.svg" alt="QKart-icon" className="header-logo-img" />
          </div>
          <span className="header-badge">STORE</span>
        </div>

        {/* Slot for search bar or custom actions */}
        <div className="header-center">
          {this.props.children}
        </div>

        {/* Display links based on if the user is logged in or not */}
        <div className="header-action">
          {username ? (
            <div className="header-user-section">
              <div className="header-user-profile">
                <img
                  src="/avatar.png"
                  alt="profile"
                  className="profile-image"
                />
                <div className="header-user-details">
                  <span className="user-greeting">Welcome,</span>
                  <span className="header-info">{username}</span>
                </div>
              </div>

              <Button
                className="logout-btn"
                danger
                icon={<LogoutOutlined />}
                onClick={this.logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="header-nav-links">
              <button className="header-link" onClick={this.explore}>
                <CompassOutlined /> Explore
              </button>

              <button className="header-link-login" onClick={this.login}>
                <UserOutlined /> Login
              </button>

              <Button
                type="primary"
                className="header-register-btn"
                onClick={this.register}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </header>
    );
  }
}
