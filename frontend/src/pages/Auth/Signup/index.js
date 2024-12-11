import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGoogleOneTapLogin from "google-one-tap-login";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, Text, Alert } from "@chakra-ui/react";
import { useFormik } from "formik";
import { fetcRegister } from "../../../api";
import validationSchema from "./validations";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";  
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Using the hook to handle Google login
  const handleGoogleSignIn = useGoogleOneTapLogin({
    onSuccess: async (response) => {
      try {
        // Handle Google login success
        await fetch("/api/google-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: response.credential }),
        });

        alert("Đăng nhập Google thành công!");
        navigate("/dashboard");
      } catch (error) {
        console.error("Đăng nhập Google thất bại:", error);
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Lỗi đăng nhập Google:", error);
      setIsLoading(false);
    },
    googleAccountConfigs: {
      client_id: "290524274843-3kcf9c3gk5cku9608embdd0ickj9c3ul.apps.googleusercontent.com",
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      dateOfBirth: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      setIsLoading(true);
      try {
        await fetcRegister({
          username: values.username,
          email: values.email,
          password: values.password,
        });

        alert("Tài khoản của bạn đã được tạo thành công!");
        navigate("/signin");
      } catch (e) {
        bag.setErrors({ general: e.response?.data?.message || "Lỗi xảy ra" });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Flex align="center" justifyContent="center" width="full">
      <Box pt={10}>
        <Box textAlign="center">
          <Heading>Đăng ký</Heading>
        </Box>

        <Box my={5}>
          {formik.errors.general && <Alert status="error">{formik.errors.general}</Alert>}
        </Box>

        <Box my={5} textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Tên tài khoản</FormLabel>
              <Input
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                isInvalid={formik.touched.username && formik.errors.username}
              />
            </FormControl>

            <FormControl isRequired mt="4">
              <FormLabel>E-mail</FormLabel>
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && formik.errors.email}
              />
            </FormControl>

            <FormControl isRequired mt="4">
              <FormLabel>Mật khẩu</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl isRequired mt="4">
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <InputGroup>
                <Input
                  name="passwordConfirm"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Ngày tháng năm sinh</FormLabel>
              <Input
                name="dateOfBirth"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
              />
            </FormControl>

            <FormControl isRequired mt="4">
              <Flex align="center">
                <Checkbox
                  name="terms"
                  onChange={formik.handleChange}
                  isChecked={formik.values.terms}
                  isInvalid={formik.touched.terms && formik.errors.terms}
                  border="1px solid #000"
                />
                <Text ml="2">
                  Tôi đồng ý với <Link to="/terms">điều khoản sử dụng</Link>
                </Text>
              </Flex>
            </FormControl>

            <Button
              mt="4"
              width="full"
              type="submit"
              isDisabled={!formik.values.terms}
              isLoading={isLoading}
              border="1px solid #000"
            >
              Đăng ký
            </Button>

            <Flex mt="4" justifyContent="space-between">
              <Button
                leftIcon={<FaGoogle />}
                colorScheme="red"
                variant="outline"
                width="48%"
                onClick={handleGoogleSignIn}
              >
                Google
              </Button>
              <Button leftIcon={<FaFacebook />} colorScheme="blue" variant="outline" width="48%">
                Facebook
              </Button>
            </Flex>

            <Text mt="4" textAlign="center">
              Đã có tài khoản?{" "}
              <Link to="/signin" style={{ color: "blue" }}>
                Đăng nhập
              </Link>
            </Text>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signup;
