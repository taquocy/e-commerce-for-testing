import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Alert,
  Text,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import validationSchema from "./validations";
import { fetchRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (values.password !== values.passwordConfirm) {
        setErrors({ passwordConfirm: "Mật khẩu xác nhận không khớp!" });
        setSubmitting(false);
        return;
      }
      try {
        setError(null);
        const response = await fetchRegister({
          email: values.email,
          password: values.password,
        });
        login(response);
        navigate("/profile");
      } catch (e) {
        setError(e.response?.data?.message || "Đăng ký thất bại!");
        setErrors({ general: e.response?.data?.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Flex align="center" width="full" justifyContent="center">
      <Box pt={10} width={{ base: "90%", md: "400px" }}>
        <Box textAlign="center">
          <Heading>Đăng Ký</Heading>
        </Box>
        {error && (
          <Box my={5}>
            <Alert status="error">{error}</Alert>
          </Box>
        )}
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
                <Text color="red.500" mt={1}>
                  {formik.errors.email}
                </Text>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel>Mật khẩu</FormLabel>
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

            <FormControl mt={4} isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <InputGroup>
                <Input
                  name="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="2rem"
                    w="2rem"
                    p={0}
                    borderRadius="full"
                    bg="gray.200"
                    _hover={{ bg: "gray.300" }}
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  >
                    {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
                <Text color="red.500" mt={1}>
                  {formik.errors.passwordConfirm}
                </Text>
              )}
            </FormControl>

            <Button mt={4} width="full" type="submit" isLoading={formik.isSubmitting}>
              Đăng Ký
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signup;