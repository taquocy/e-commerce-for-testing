import React, { useState } from "react";
import "./index.css"; // Import CSS với tên chính xác
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
        bag.setErrors({ general: e.response?.data?.message || "Lỗi không xác định" });
      }
    },
  });

  return (
    <div className="container">
      <Box className="signin-box">
        <Box className="signin-heading">
          <Heading>Sign In</Heading>
        </Box>
        {formik.errors.general && (
          <Box className="signin-alert">
            <Alert status="error">{formik.errors.general}</Alert>
          </Box>
        )}
        <Box className="signin-form">
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel className="signin-label">Email</FormLabel>
              <Input
                className="signin-input"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            {/* Password */}
            <FormControl mt="4" isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel className="signin-label">Password</FormLabel>
              <InputGroup>
                <Input
                  className="signin-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="2rem"
                    w="2rem"
                    p={0}
                    borderRadius="full"
                    bg="gray.200"
                    _hover={{ bg: "gray.300" }}
                    _active={{ bg: "gray.400" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            {/* Remember Me */}
            <FormControl mt="4" className="signin-checkbox">
              <Checkbox
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember Me
              </Checkbox>
            </FormControl>

            {/* Forgot Password */}
            <Box className="signin-forgot">
              <Link as={RouterLink} to="/forgot-password" color="teal.500">
                Quên mật khẩu?
              </Link>
            </Box>

            {/* Sign Up */}
            <Box className="signin-signup">
              <Text>
                Chưa có tài khoản?{" "}
                <Link as={RouterLink} to="/signup" color="blue.500" fontWeight="bold">
                  Đăng ký tại đây
                </Link>
              </Text>
            </Box>

            {/* Submit Button */}
            <Button className="signin-button" type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default Signin;
