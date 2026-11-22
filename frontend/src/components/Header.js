import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
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
        {/* QKart Logo */}
        <div className="header-brand" onClick={this.root}>
          <img src="/icon.svg" alt="QKart-icon" className="header-logo-img" />
        </div>

        {/* Search Bar / Center content */}
        <div className="header-search">
          {this.props.children}
        </div>

        {/* Right Action Links */}
        <div className="header-actions">
          {username ? (
            <div className="header-user">
              <div className="user-info">
                <img src="/avatar.png" alt="profile" className="profile-image" />
                <span className="username">{username}</span>
              </div>

              <Button
                size="middle"
                className="logout-btn"
                onClick={this.logout}
                icon={<LogoutOutlined />}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="header-links">
              <button className="nav-btn" onClick={this.explore}>
                Explore
              </button>

              <button className="nav-btn" onClick={this.login}>
                <UserOutlined /> Login
              </button>

              <Button
                type="primary"
                className="register-btn"
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
