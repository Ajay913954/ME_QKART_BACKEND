import { LockOutlined, UserOutlined, MailOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  validateInput = () => {
    if (!this.state.username) {
      message.error("Username is a required field");
      return false;
    }
    if (this.state.username.length < 6) {
      message.error("Username must be at least 6 characters");
      return false;
    }
    if (this.state.username.length > 32) {
      message.error("Username must be at most 32 characters");
      return false;
    }
    if (!this.state.password) {
      message.error("Password is a required field");
      return false;
    }
    if (this.state.password.length < 6) {
      message.error("Password must be at least 8 characters");
      return false;
    }
    if (this.state.password.length > 32) {
      message.error("Password must be at most 32 characters");
      return false;
    }
    if (this.state.password !== this.state.confirmPassword) {
      message.error("Passwords do not match");
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
        await fetch(`${config.endpoint}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.state.username,
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

  register = async () => {
    const response = await this.performAPICall();
    if (response) {
      this.setState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      message.success("Registered successfully");
      this.props.history.push("/login");
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.register();
    }
  };

  render() {
    return (
      <div className="auth-page-wrapper">
        {/* Header */}
        <Header history={this.props.history} />

        {/* Register Form */}
        <div className="flex-container">
          <div className="register-container container auth-card">
            <div className="auth-header">
              <span className="auth-eyebrow">NEW CUSTOMER</span>
              <h1 className="auth-title">Make an account</h1>
              <p className="auth-subtitle">
                Join QKart today and unlock exclusive member deals
              </p>
            </div>

            <div className="auth-form" onKeyDown={this.handleKeyDown}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <Input
                  className="input-field auth-input"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  size="large"
                  value={this.state.username}
                  onChange={(e) => {
                    this.setState({
                      username: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <Input
                  className="input-field auth-input"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
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
                  placeholder="Password"
                  size="large"
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({
                      password: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <Input.Password
                  className="input-field auth-input"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirm Password"
                  size="large"
                  value={this.state.confirmPassword}
                  onChange={(e) => {
                    this.setState({
                      confirmPassword: e.target.value,
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
                onClick={this.register}
                icon={<ArrowRightOutlined />}
              >
                Create Account
              </Button>
            </div>

            <div className="auth-footer">
              Already have an account?{" "}
              <Link to="/login" className="auth-switch-link">
                Sign in here
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

export default withRouter(Register);
