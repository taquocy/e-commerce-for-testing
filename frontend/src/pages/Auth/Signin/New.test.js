import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "./Signup";
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Mocking the external dependencies
jest.mock("../../../api", () => ({
  fetcRegister: jest.fn(),
}));

jest.mock("../../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Signup Component", () => {
  let navigate;
  let login;

  beforeEach(() => {
    navigate = jest.fn();
    login = jest.fn();
    useNavigate.mockReturnValue(navigate);
    useAuth.mockReturnValue({ login });
  });

  test("renders signup form correctly", () => {
    render(<Signup />);

    // Check if the form fields and submit button are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password confirm/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  test("shows validation errors when form is submitted with invalid data", async () => {
    render(<Signup />);

    // Submit the form with empty fields
    userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Check if the validation errors are shown
    await waitFor(() => {
      expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });
  });

  test("submits the form successfully and navigates to profile", async () => {
    fetcRegister.mockResolvedValue({ token: "fake-token" });

    render(<Signup />);

    // Fill out the form
    userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/password/i), "password123");
    userEvent.type(screen.getByLabelText(/password confirm/i), "password123");

    // Submit the form
    userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Wait for the API call and navigation
    await waitFor(() => {
      expect(fetcRegister).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(login).toHaveBeenCalledWith({ token: "fake-token" });
      expect(navigate).toHaveBeenCalledWith("/profile");
    });
  });

  test("displays error message when API call fails", async () => {
    fetcRegister.mockRejectedValue({
      response: { data: { message: "Error occurred" } },
    });

    render(<Signup />);

    // Fill out the form
    userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/password/i), "password123");
    userEvent.type(screen.getByLabelText(/password confirm/i), "password123");

    // Submit the form
    userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
    });
  });

  test("shows general error when API call fails with no message", async () => {
    fetcRegister.mockRejectedValue({
      response: { data: {} },
    });

    render(<Signup />);

    // Fill out the form
    userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    userEvent.type(screen.getByLabelText(/password/i), "password123");
    userEvent.type(screen.getByLabelText(/password confirm/i), "password123");

    // Submit the form
    userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Wait for the general error message to appear
    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });
});
