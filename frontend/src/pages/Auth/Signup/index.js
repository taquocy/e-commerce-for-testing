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
  AlertIcon,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { registerValidation } from "./validations";
import { fetchRegister } from "../../../api";
import { useNavigate } from "react-router-dom"; // ✅ Thêm điều hướng sau khi đăng ký

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // ✅ Sử dụng navigate

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerValidation,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });

        // Tùy theo backend trả về
        if (registerResponse?.accessToken || registerResponse?.success) {
          alert("Đăng ký thành công! Đang chuyển sang trang đăng nhập...");
          formik.resetForm();
          navigate("/signin"); // ✅ Điều hướng sau khi đăng ký
        } else {
          bag.setErrors({
            general: registerResponse.message || "Đăng ký thất bại",
          });
        }
      } catch (e) {
        bag.setErrors({
          general: e.response?.data?.message || "Lỗi kết nối. Vui lòng thử lại.",
        });
      }
    },
  });

  return (
    <Flex align="center" width="full" justifyContent="center">
      <Box pt={10} width="400px">
        <Box textAlign="center">
          <Heading>Sign Up</Heading>
        </Box>

        <Box my={5}>
          {formik.errors.general && (
            <Alert status="error">
              <AlertIcon />
              {formik.errors.general}
            </Alert>
          )}
        </Box>

        <Box my={5} textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="example@email.com"
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            {/* Password */}
            <FormControl
              mt={4}
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <FormLabel>Password</FormLabel>
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
                    type="button"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            {/* Confirm Password */}
            <FormControl
              mt={4}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            >
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
            </FormControl>

            {/* Submit */}
            <Button mt={6} width="full" type="submit" colorScheme="teal">
              Sign Up
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signup;
