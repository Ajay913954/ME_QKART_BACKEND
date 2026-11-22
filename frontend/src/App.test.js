import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Thanks from "./components/Thanks";

describe("QKart Frontend Components", () => {
  test("Home component renders hero title and action buttons", () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(getByText(/Welcome to QKart/i)).toBeInTheDocument();
    expect(getByText(/Browse Products/i)).toBeInTheDocument();
    expect(document.getElementById("register-button")).toBeInTheDocument();
    expect(document.getElementById("login-button")).toBeInTheDocument();
    expect(getByText(/Featured Categories/i)).toBeInTheDocument();
    expect(getByText(/Fast Delivery/i)).toBeInTheDocument();
  });

  test("Product component renders product details and triggers addToCart", () => {
    const mockProduct = {
      _id: "test1234",
      name: "Wireless Noise Cancelling Headphones",
      category: "Electronics",
      cost: 4999,
      rating: 5,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    };

    const mockAddToCart = jest.fn();

    const { getByText, getAllByText } = render(
      <Product product={mockProduct} addToCart={mockAddToCart} />
    );

    expect(getByText("Wireless Noise Cancelling Headphones")).toBeInTheDocument();
    expect(getAllByText("Electronics").length).toBeGreaterThanOrEqual(1);
    expect(getByText("₹4999")).toBeInTheDocument();

    const addBtn = getByText("Add to Cart");
    expect(addBtn).toBeInTheDocument();

    fireEvent.click(addBtn);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  test("Header component renders brand and navigation for unauthenticated user", () => {
    localStorage.clear();
    const mockHistory = { push: jest.fn() };

    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <Header history={mockHistory} />
      </BrowserRouter>
    );

    expect(getByAltText("QKart-icon")).toBeInTheDocument();
    expect(getByText("Explore")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByText("Register")).toBeInTheDocument();
  });

  test("Header component renders user info and logout button when logged in", () => {
    localStorage.setItem("username", "AjayTestUser");
    localStorage.setItem("token", "dummy_token");
    const mockHistory = { push: jest.fn() };

    const { getByText } = render(
      <BrowserRouter>
        <Header history={mockHistory} />
      </BrowserRouter>
    );

    expect(getByText("AjayTestUser")).toBeInTheDocument();
    const logoutBtn = getByText("Logout");
    expect(logoutBtn).toBeInTheDocument();

    fireEvent.click(logoutBtn);
    expect(localStorage.getItem("username")).toBeNull();
    expect(mockHistory.push).toHaveBeenCalledWith("/");
  });

  test("Footer renders brand summary and links", () => {
    const { getByAltText, getByText } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(getByAltText("QKart")).toBeInTheDocument();
    expect(getByText(/Quick Links/i)).toBeInTheDocument();
    expect(getByText(/Customer Care/i)).toBeInTheDocument();
  });

  test("Thanks page renders confirmation text and balance", () => {
    localStorage.setItem("balance", "2500");
    const mockHistory = { push: jest.fn() };

    const { getByText } = render(
      <BrowserRouter>
        <Thanks history={mockHistory} />
      </BrowserRouter>
    );

    expect(getByText("It's ordered!")).toBeInTheDocument();
    expect(getByText(/2500 available/i)).toBeInTheDocument();
    expect(getByText(/Browse for more products/i)).toBeInTheDocument();
  });
});
