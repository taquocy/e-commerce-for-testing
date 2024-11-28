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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false); // Trạng thái hiển thị thông báo thành công

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        // Gửi yêu cầu đăng ký
        await fetcRegister({
          email: values.email,
          password: values.password,
        });

        // Hiển thị thông báo đăng ký thành công
        setSuccess(true);

        // Chuyển hướng sang trang đăng nhập sau 2 giây
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } catch (e) {
        // Hiển thị lỗi
        bag.setErrors({ general: e.response?.data?.message || "An error occurred" });
      }
    },
  });

  return (
    <Flex align="center" width="full" justifyContent="center">
      <Box pt={10} w="full" maxW="400px">
        <Box textAlign="center">
          <Heading>Sign Up</Heading>
        </Box>

        {success && (
          <Alert status="success" mt={5} borderRadius="md">
            <AlertIcon />
            Registration successful! Redirecting to login page...
          </Alert>
        )}

        {formik.errors.general && (
          <Alert status="error" mt={5} borderRadius="md">
            <AlertIcon />
            {formik.errors.general}
          </Alert>
        )}

        <Box my={5} textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={formik.touched.email && formik.errors.email}
              isRequired
            >
              <FormLabel>E-mail</FormLabel>
              <Input
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={formik.touched.password && formik.errors.password}
              isRequired
            >
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              isInvalid={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              }
              isRequired
            >
              <FormLabel>Password Confirm</FormLabel>
              <Input
                name="passwordConfirm"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
              />
              <FormErrorMessage>{formik.errors.passwordConfirm}</FormErrorMessage>
            </FormControl>

            <Button
              mt={6}
              colorScheme="teal"
              width="full"
              type="submit"
              isLoading={formik.isSubmitting}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signup;
