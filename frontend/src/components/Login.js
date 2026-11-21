import { LockOutlined, UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      email: "",
      password: "",
    };
  }

  validateInput = () => {
    if (!this.state.email) {
      message.error("Email is a required field");
      return false;
    }
    if (!this.state.password) {
      message.error("Password is a required field");
      return false;
    }
    return true;
  };

  validateResponse = (errored, response) => {
    if (errored || (!response.tokens && !response.message)) {
      message.error(
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON."
      );
      return false;
    }
    if (!response.tokens) {
      message.error(response.message);
      return false;
    }
    return true;
  };

  performAPICall = async () => {
    let response = {};
    let errored = false;

    this.setState({
      loading: true,
    });

    try {
      response = await (
        await fetch(`${config.endpoint}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
        })
      ).json();
    } catch (e) {
      errored = true;
    }

    this.setState({
      loading: false,
    });

    if (this.validateResponse(errored, response)) {
      return response;
    }
  };

  persistLogin = (token, email, balance, username, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("balance", balance);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
  };

  login = async () => {
    const response = await this.performAPICall();
    if (response) {
      this.persistLogin(
        response.tokens.access.token,
        response.user.email,
        response.user.walletMoney,
        response.user.name,
        response.user._id
      );
      this.setState({
        email: "",
        password: "",
      });
      message.success("Logged in successfully");
      this.props.history.push("/products");
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.login();
    }
  };

  render() {
    return (
      <div className="auth-page-wrapper">
        {/* Header */}
        <Header history={this.props.history} />

        {/* Login Form Container */}
        <div className="flex-container">
          <div className="login-container container auth-card">
            <div className="auth-header">
              <span className="auth-eyebrow">WELCOME BACK</span>
              <h1 className="auth-title">Login to QKart</h1>
              <p className="auth-subtitle">
                Enter your credentials to access your account & cart
              </p>
            </div>

            <div className="auth-form" onKeyDown={this.handleKeyDown}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <Input
                  className="input-field auth-input"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Enter your email"
                  size="large"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <Input.Password
                  className="input-field auth-input"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Enter your password"
                  size="large"
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({
                      password: e.target.value,
                    });
                  }}
                />
              </div>

              <Button
                loading={this.state.loading}
                type="primary"
                size="large"
                block
                className="auth-submit-btn"
                onClick={this.login}
                icon={<ArrowRightOutlined />}
              >
                Sign In
              </Button>
            </div>

            <div className="auth-footer">
              Don't have an account?{" "}
              <Link to="/register" className="auth-switch-link">
                Create one now
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

export default withRouter(Login);
