import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

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
        alert("Đăng ký thành công!");

        // Chuyển hướng sang trang đăng nhập
        navigate("/signin");
      } catch (e) {
        bag.setErrors({ general: e.response?.data?.message || "Lỗi xảy ra" });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign  upp</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
  <FormLabel>E-mail</FormLabel>
  <Input
    name="email"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.email}
  />
  {formik.touched.email && formik.errors.email && (
    <Box color="red.500" mt={1}>{formik.errors.email}</Box>
  )}
</FormControl>

<FormControl isInvalid={formik.touched.password && formik.errors.password}>
  <FormLabel>Password</FormLabel>
  <Input
    name="password"
    type="password"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.password}
  />
  {formik.touched.password && formik.errors.password && (
    <Box color="red.500" mt={1}>{formik.errors.password}</Box>
  )}
</FormControl>

<FormControl
  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
>
  <FormLabel>Password Confirm</FormLabel>
  <Input
    name="passwordConfirm"
    type="password"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.passwordConfirm}
  />
  {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
    <Box color="red.500" mt={1}>{formik.errors.passwordConfirm}</Box>
  )}
</FormControl>
              <Button mt="4" width="full" type="submit">
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
