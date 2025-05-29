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
  Text,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import validationSchema from "./validations";
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

function Signin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setError(null);
        const response = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        login(response);
        navigate("/profile");
      } catch (e) {
        setError(e.message || "Đăng nhập thất bại! Vui lòng kiểm tra email hoặc mật khẩu.");
        setErrors({ general: e.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Flex align="center" width="full" justifyContent="center">
      <Box pt={10} width={{ base: "90%", md: "400px" }}>
        <Box textAlign="center">
          <Heading>Đăng Nhập</Heading>
        </Box>
        {error && (
          <Box my={5}>
            <Alert status="error">{error}</Alert>
          </Box>
        )}
        <Box my={5} textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel>
                E-mail
                {formik.touched.email && !formik.values.email && (
                  <Text as="span" color="red.500">
                    *
                  </Text>
                )}
              </FormLabel>
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <Text color="red.500" mt={1}>
                  {formik.errors.email}
                </Text>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel>
                Mật khẩu
                {formik.touched.password && !formik.values.password && (
                  <Text as="span" color="red.500">
                    *
                  </Text>
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
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.touched.password && formik.errors.password && (
                <Text color="red.500" mt={1}>
                  {formik.errors.password}
                </Text>
              )}
            </FormControl>

            <Box mt={2} textAlign="right">
              <Link as={RouterLink} to="/forgot-password" color="teal.500">
                Quên mật khẩu?
              </Link>
            </Box>

            <Button mt={4} width="full" type="submit" isLoading={formik.isSubmitting}>
              Đăng Nhập
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signin;