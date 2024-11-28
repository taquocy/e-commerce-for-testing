import React from "react";
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert, Text, Link } from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import "./Signup.css"; // Import CSS

function Signup({ history }) {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetcRegister({
          email: values.email,
          password: values.password,
        });
        login(registerResponse);
        history.push("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response?.data?.message || "Đã xảy ra lỗi." });
      }
    },
  });

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-heading">Signup</h1>
        {formik.errors.general && (
          <div className="signup-alert">{formik.errors.general}</div>
        )}
        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
            <FormLabel>E-mail</FormLabel>
            <Input
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Text color="red.500" fontSize="sm">{formik.errors.email}</Text>
            )}
          </FormControl>

          <FormControl isInvalid={formik.touched.password && !!formik.errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <Text color="red.500" fontSize="sm">{formik.errors.password}</Text>
            )}
          </FormControl>

          <FormControl isInvalid={formik.touched.passwordConfirm && !!formik.errors.passwordConfirm}>
            <FormLabel>Password Confirm</FormLabel>
            <Input
              name="passwordConfirm"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
            />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
              <Text color="red.500" fontSize="sm">{formik.errors.passwordConfirm}</Text>
            )}
          </FormControl>

          <Button className="signup-button" mt="4" width="full" type="submit" isLoading={formik.isSubmitting}>
            Sign Up
          </Button>
        </form>
        <div className="signup-link">
          <Text fontSize="sm" color="gray.500">
            Bạn đã có tài khoản?{" "}
            <Link as={RouterLink} to="/Signin">
              Đăng nhập
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Signup;
