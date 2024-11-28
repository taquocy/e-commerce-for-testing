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
import { fetchLogin } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Signin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      setIsSubmitting(true);
      try {
        const loginResponse = await fetchLogin(values);
        login(loginResponse);
        navigate("/profile");
      } catch (e) {
        bag.setErrors({
          general: e.response?.data?.message || "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Flex
      align="center"
      justify="center"
      width="full"
      bg="gray.50"
      minHeight="100vh"
      px={4}
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
        maxWidth="400px"
        width="full"
      >
        <Box textAlign="center">
          <Heading size="lg" mb={2} color="teal.600">
            Đăng Nhập
          </Heading>
          <Text color="gray.600">Chào mừng quay lại! Nhập thông tin của bạn.</Text>
        </Box>
        <Box my={5}>
          {formik.errors.general && (
            <Alert status="error" role="alert" rounded="md">
              {formik.errors.general}
            </Alert>
          )}
        </Box>
        <Box textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={formik.touched.email && formik.errors.email} mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                placeholder="Nhập email của bạn"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                borderColor={formik.errors.email ? "red.500" : undefined}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <FormLabel>Mật khẩu</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  placeholder="Nhập mật khẩu"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <InputRightElement>
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

            <Box mt={2} textAlign="right">
              <Link
                as={RouterLink}
                to="/forgot-password"
                color="teal.500"
                fontSize="sm"
              >
                Quên mật khẩu?
              </Link>
            </Box>

            <Button
              mt={6}
              colorScheme="teal"
              width="full"
              type="submit"
              rounded="md"
              isLoading={isSubmitting}
            >
              Đăng Nhập
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signin;
