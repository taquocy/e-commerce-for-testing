import React, { useState } from "react";
import "./index.css"; // Import CSS
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  FormErrorMessage,
  Text,
  InputGroup,
  InputRightElement,
  Link,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";

function Signin({ history }) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("email"));

  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("email") || "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });

        if (rememberMe) {
          localStorage.setItem("email", values.email);
        } else {
          localStorage.removeItem("email");
        }

        login(loginResponse);
        history.push("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response?.data?.message || "An error occurred" });
      }
    },
  });

  return (
    <div className="signin-container">
      <Box className="signin-box" boxShadow="lg" p="8" rounded="lg" bg="white">
        <Box className="signin-heading">
          <Heading size="lg" color="teal.600">
            Welcome Back
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Sign in to your account
          </Text>
        </Box>

        {formik.errors.general && (
          <Box className="signin-alert" mt="4">
            <Alert status="error">{formik.errors.general}</Alert>
          </Box>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <FormControl isInvalid={formik.touched.email && formik.errors.email} mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              focusBorderColor="teal.400"
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          {/* Password */}
          <FormControl isInvalid={formik.touched.password && formik.errors.password} mb="4">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                focusBorderColor="teal.400"
              />
              <InputRightElement width="4.5rem">
                <Button
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          {/* Remember Me & Forgot Password */}
          <Flex justifyContent="space-between" alignItems="center" mb="4">
            <Checkbox
              isChecked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              colorScheme="teal"
              className="signin-rememberme"
            >
              Remember Me
            </Checkbox>
            <Text fontSize="sm" className="signin-forgot">
              <Link as={RouterLink} to="/forgot-password" color="teal.500">
                Forgot Password?
              </Link>
            </Text>
          </Flex>

          {/* Submit Button */}
          <Button type="submit" colorScheme="teal" width="full" mb="4">
            Sign In
          </Button>
        </form>

        {/* Sign Up */}
        <Text fontSize="sm" textAlign="center">
          Don't have an account?{" "}
          <Link as={RouterLink} to="/signup" color="teal.500" fontWeight="bold">
            Sign Up
          </Link>
        </Text>
      </Box>
    </div>
  );
}

export default Signin;
