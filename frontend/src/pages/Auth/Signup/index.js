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
  Text,
  Link,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom"; // For routing

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
    <Flex align="center" width="full" justifyContent="center">
      <Box pt={10}>
        <Box textAlign="center">
          <Heading>Signup</Heading>
        </Box>
        <Box my={5}>
          {formik.errors.general && (
            <Alert status="error">{formik.errors.general}</Alert>
          )}
        </Box>
        <Box my={5} textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            {/* Email Field */}
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

            {/* Password Field */}
            <FormControl
              mt="4"
              isInvalid={formik.touched.password && !!formik.errors.password}
            >
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

            {/* Password Confirm Field */}
            <FormControl
              mt="4"
              isInvalid={formik.touched.passwordConfirm && !!formik.errors.passwordConfirm}
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
                <Text color="red.500" fontSize="sm">{formik.errors.passwordConfirm}</Text>
              )}
            </FormControl>

            {/* Submit Button */}
            <Button
              mt="4"
              width="full"
              type="submit"
              isLoading={formik.isSubmitting}
            >
              Sign Up
            </Button>
          </form>
        </Box>
        {/* Link to Login */}
        <Box textAlign="center" mt={4}>
          <Text fontSize="sm" color="gray.500">
            Bạn đã có tài khoản?{" "}
            <Link as={RouterLink} to="/login" color="red.500" fontWeight="bold">
              Đăng nhập
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signup;
