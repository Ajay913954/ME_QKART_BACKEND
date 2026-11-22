import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { Input, message, Row, Col, Spin, Button } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import { config } from "../App";

import Cart from "./Cart";
import Header from "./Header";
import Product from "./Product";
import Footer from "./Footer";
import "./Search.css";

/**
 * @typedef {Object} Product
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

class Search extends React.Component {
  constructor() {
    super();

    this.cartRef = React.createRef();

    this.debounceTimeout = 0;
    this.products = [];
    this.state = {
      loading: false,
      loggedIn: false,
      filteredProducts: [],
      selectedCategory: "All",
      searchText: "",
    };
  }

  validateResponse = (errored, response) => {
    if (errored || (!response.length && !response.message)) {
      message.error(
        "Could not fetch products. Check that the backend is running, reachable and returns valid JSON."
      );
      return false;
    }

    if (!response.length) {
      message.error(response.message || "No products found in database");
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
      response = await (await fetch(`${config.endpoint}/products`)).json();
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

  debounceSearch = (event) => {
    const value = event.target.value;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.search(value);
    }, 300);
  };

  search = (text) => {
    this.setState({ searchText: text });
    this.filterProducts(text, this.state.selectedCategory);
  };

  filterProducts = (searchText = this.state.searchText, category = this.state.selectedCategory) => {
    let result = this.products;

    if (category && category !== "All") {
      result = result.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchText && searchText.trim() !== "") {
      const query = searchText.toUpperCase();
      result = result.filter(
        (product) =>
          product.name.toUpperCase().includes(query) ||
          product.category.toUpperCase().includes(query)
      );
    }

    this.setState({
      filteredProducts: result,
      selectedCategory: category,
    });
  };

  handleCategoryClick = (category) => {
    this.filterProducts(this.state.searchText, category);
  };

  getProducts = async () => {
    const response = await this.performAPICall();

    if (response) {
      this.products = response;
      this.setState({
        filteredProducts: this.products.slice(),
      });
    }
  };

  componentDidMount() {
    this.getProducts();

    if (localStorage.getItem("email") && localStorage.getItem("token")) {
      this.setState({
        loggedIn: true,
      });
    }
  }

  getProductElement = (product) => {
    const colProps =
      this.state.loggedIn && this.products.length
        ? { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 }
        : { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 };

    return (
      <Col {...colProps} key={product._id} className="product-col">
        <Product
          product={product}
          addToCart={() => {
            if (this.state.loggedIn) {
              this.cartRef.current.postToCart(product._id, 1, true);
            } else {
              this.props.history.push("/login");
            }
          }}
        />
      </Col>
    );
  };

  getCategories = () => {
    const set = new Set();
    this.products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  };

  render() {
    const categories = this.getCategories();

    return (
      <div className="search-page-wrapper">
        {/* Header with Search bar */}
        <Header history={this.props.history}>
          <div className="search-bar-wrap">
            <Input.Search
              placeholder="Search products, brands, or categories..."
              onSearch={this.search}
              onChange={this.debounceSearch}
              enterButton={true}
              className="custom-search-input"
            />
          </div>
        </Header>

        {/* Main Content Area */}
        <div className="search-page-body">
          {/* Category Filter Pills Bar */}
          <div className="filter-bar">
            <div className="filter-bar-header">
              <span className="filter-label">
                <FilterOutlined /> Categories:
              </span>
            </div>
            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${
                    this.state.selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => this.handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="results-count">
              {this.state.filteredProducts.length} Products Found
            </div>
          </div>

          {/* Grid Layout: Products + Cart Sidebar */}
          <Row gutter={[24, 24]} className="search-main-row">
            {/* Products Column */}
            <Col
              xs={{ span: 24 }}
              lg={{
                span: this.state.loggedIn && this.products.length ? 16 : 24,
                order: 1,
              }}
            >
              <div className="search-container">
                {this.state.loading ? (
                  <div className="loading-state-box">
                    <Spin size="large" />
                    <p>Fetching catalog items...</p>
                  </div>
                ) : this.state.filteredProducts.length > 0 ? (
                  <Row gutter={[16, 16]} className="products-grid-row">
                    {this.state.filteredProducts.map((product) =>
                      this.getProductElement(product)
                    )}
                  </Row>
                ) : (
                  <div className="empty-products-state">
                    <div className="empty-state-icon">
                      <span role="img" aria-label="search">🔍</span>
                    </div>
                    <h3>No products found</h3>
                    <p>We couldn't find anything matching your search query or category.</p>
                    <Button
                      type="primary"
                      icon={<ReloadOutlined />}
                      onClick={() => {
                        this.setState({ searchText: "", selectedCategory: "All" });
                        this.filterProducts("", "All");
                      }}
                    >
                      Reset All Filters
                    </Button>
                  </div>
                )}
              </div>
            </Col>

            {/* Cart Sidebar Column */}
            {this.state.loggedIn && this.products.length > 0 && (
              <Col
                xs={{ span: 24 }}
                lg={{ span: 8, order: 2 }}
                className="search-cart-col"
              >
                <div className="search-cart-sticky-box">
                  <Cart
                    ref={this.cartRef}
                    products={this.products}
                    history={this.props.history}
                    token={localStorage.getItem("token")}
                  />
                </div>
              </Col>
            )}
          </Row>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(Search);
