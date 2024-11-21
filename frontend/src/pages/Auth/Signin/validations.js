import * as yup from "yup";

// Validation schema using Yup
const validations = yup.object().shape({
  // Email field validation
  email: yup
    .string()
    .email("Please enter a valid email address.") // Check for valid email format
    .required("Email is required."), // Ensure the email field is not empty

  // Password field validation
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long.") // Ensure password has at least 10 characters
    .required("Password is required."), // Ensure the password field is not empty
});

export default validations;
