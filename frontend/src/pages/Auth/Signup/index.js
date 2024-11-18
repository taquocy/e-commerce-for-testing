import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Alert,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

function Signup({ history }) {
  const { login } = useAuth();

  // State để quản lý hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
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
                  E-mail <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt="4" isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel>
                  Mật khẩu <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"} // Hiển thị/ẩn mật khẩu
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "Ẩn" : "Hiện"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password && (
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt="4" isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}>
                <FormLabel>
                  Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <InputGroup>
                  <Input
                    name="passwordConfirm"
                    type={showPasswordConfirm ? "text" : "password"} // Hiển thị/ẩn mật khẩu xác nhận
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                      {showPasswordConfirm ? "Ẩn" : "Hiện"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                  <FormErrorMessage>{formik.errors.passwordConfirm}</FormErrorMessage>
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
