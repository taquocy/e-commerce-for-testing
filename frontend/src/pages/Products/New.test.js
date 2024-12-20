import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import NewProduct from "./New";
import Signup from "./index";
import { postProduct } from "../../api";
import { message } from "antd";

// Mock các dependencies
jest.mock("../../api");
jest.mock("antd", () => ({
  message: {
    loading: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

describe("NewProduct Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 8: Validation for negative price
  test("shows validation error for negative price", async () => {
    render(<NewProduct />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Price/i), "-10");

    fireEvent.click(screen.getByText("Add Product"));

    await waitFor(() => {
      expect(screen.getByText("Price must be greater than 0")).toBeInTheDocument();
    });
  });

  // Test 9: Handles API error gracefully
  test("displays error message on API failure", async () => {
    postProduct.mockRejectedValueOnce(new Error("Failed to add product"));

    const { container } = render(<NewProduct />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Title/i), "Test Product");
    await userEvent.type(screen.getByLabelText(/Description/i), "Test Description");
    await userEvent.type(screen.getByLabelText(/Price/i), "99.99");

    fireEvent.click(screen.getByText("Add Product"));

    await waitFor(() => {
      expect(message.loading).toHaveBeenCalledWith({
        content: "Loading...",
        key: "product_update",
      });

      expect(message.error).toHaveBeenCalledWith({
        content: "Failed to add product",
        key: "product_update",
        duration: 2,
      });
    });
  });

  // Test 10: Redirects to admin page on successful submission
  test("redirects to admin page after successful submission", async () => {
    postProduct.mockResolvedValueOnce({ success: true });

    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    const { container } = render(<NewProduct />, { wrapper });

    await userEvent.type(screen.getByLabelText(/Title/i), "Test Product");
    await userEvent.type(screen.getByLabelText(/Description/i), "Test Description");
    await userEvent.type(screen.getByLabelText(/Price/i), "99.99");

    fireEvent.click(screen.getByText("Add Product"));

    await waitFor(() => {
      expect(postProduct).toHaveBeenCalledWith({
        title: "Test Product",
        description: "Test Description",
        price: "99.99",
        photos: "[]",
      });

      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });
  });
});
