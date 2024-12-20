import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Function to compare passwords
const validatePasswordConfirmation = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return "Passwords must match.";
  }
  return undefined;
};

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        setIsSubmitting(true);
        // Register API call
        const registerResponse = await fetcRegister({
          email: values.email,
          password: values.password,
        });

        // Handle successful login
        login(registerResponse);
        alert("Registration successful!");

        // Navigate to the profile page
        navigate("/profile");
      } catch (e) {
        // Handle errors
        bag.setErrors({ general: e.response?.data?.message || "An error occurred" });
      } finally {
        setIsSubmitting(false);
      }
    },
    validate: (values) => {
      const errors = {};
      const passwordError = validatePasswordConfirmation(values.password, values.passwordConfirm);
      if (passwordError) errors.passwordConfirm = passwordError;
      return errors;
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Signup</Heading>
            <Heading as="h2" size="md" mt={2}>Create your account</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && <Alert status="error">{formik.errors.general}</Alert>}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                />
              </FormControl>

              <Button mt="4" width="full" type="submit" isLoading={isSubmitting}>
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
