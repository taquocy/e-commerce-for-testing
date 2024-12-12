import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "./index";
import { MemoryRouter } from "react-router-dom";


test("shows validation errors for empty required fields on Sign In", async () => {
  render(<SignIn />, { wrapper: MemoryRouter });


  const submitButton = screen.getByText("Sign In");

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("email is a required field")).toBeInTheDocument();
    expect(screen.getByText("password is a required field")).toBeInTheDocument();
  });
});
