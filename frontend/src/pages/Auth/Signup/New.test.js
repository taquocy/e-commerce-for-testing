import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./index";
import { MemoryRouter } from "react-router-dom";

// Test: Validate empty required fields on Sign Up
test("shows validation errors for empty required fields on Sign Up", async () => {
  render(<Signup />, { wrapper: MemoryRouter });

  const submitButton = screen.getByText("Sign Up");
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("email is a required field")).toBeInTheDocument();
    expect(screen.getByText("password is a required field")).toBeInTheDocument();
    expect(screen.getByText("passwordConfirm is a required field")).toBeInTheDocument();
  });
});
