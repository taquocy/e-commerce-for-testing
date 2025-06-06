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
  FormErrorMessage,
  Text,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetchLogin, fetchRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Signin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showErrorIndicator, setShowErrorIndicator] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      if (!values.email || !values.password) {
        setShowErrorIndicator(true);
        return;
      }
      setShowErrorIndicator(false);

      try {
        if (isRegistering) {
          const registerResponse = await fetchRegister({
            email: values.email,
            password: values.password,
          });
          if (registerResponse.success) {
            setIsRegistering(false);
            navigate("/signin");
          }
        } else {
          const loginResponse = await fetchLogin({
            email: values.email,
            password: values.password,
          });
          login(loginResponse);
          navigate("/"); // ✅ BUG-1 FIX: Chuyển về trang chủ
        }
      } catch (e) {
        bag.setErrors({ general: e.response?.data?.message || "Login error" });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>{isRegistering ? "Sign Up" : "Sign In"}</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel>
                  E-mail
                  {showErrorIndicator && !formik.values.email && (
                    <Text as="span" color="red.500">*</Text>
                  )}
                </FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl mt="4" isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel>
                  Password
                  {showErrorIndicator && !formik.values.password && (
                    <Text as="span" color="red.500">*</Text>
                  )}
                </FormLabel>
                <InputGroup>
                  <Input
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

              {!isRegistering && (
                <Box mt={2} textAlign="right">
                  <Link as={RouterLink} to="/forgot-password" color="teal.500">
                    Quên mật khẩu?
                  </Link>
                </Box>
              )}

              <Button mt="4" width="full" type="submit">
                {isRegistering ? "Sign Up" : "Sign In"}
              </Button>

              <Box mt="4" textAlign="center">
                <Button
                  variant="link"
                  color="teal.500"
                  onClick={() => setIsRegistering(!isRegistering)}
                >
                  {isRegistering
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signin;
