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
import { Link as RouterLink } from "react-router-dom";
import "./Spin.css"; // Add a CSS file for spinning animation

function Signin({ history }) {
  const { login } = useAuth();
  const [showErrorIndicator, setShowErrorIndicator] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      if (!values.email || !values.password) {
        setShowErrorIndicator(true);
      } else {
        setShowErrorIndicator(false);
      }

      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        alert("Đăng nhập thành công");
        login(loginResponse);
        history.push("/");  
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  const [speed, setSpeed] = useState("normal");

  const handleSpeedChange = (mode) => {
    if (mode === 1) setSpeed("slow");
    else if (mode === 2) setSpeed("normal");
    else if (mode === 3) setSpeed("fast");
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.50"
      py="10"
    >
      <Box
        bg="white"
        p="8"
        rounded="md"
        shadow="lg"
        width="400px"
      >
        <Box textAlign="center" mb="6">
          <Heading as="h1" size="lg" color="teal.600">
            Sign In
          </Heading>
        </Box>
        {formik.errors.general && (
          <Alert status="error" mb="4" rounded="md">
            {formik.errors.general}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={formik.touched.email && formik.errors.email}
            mb="4"
          >
            <FormLabel>
              E-mail <Text as="span" color="red.500">*</Text>
            </FormLabel>
            <Input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              focusBorderColor="teal.400"
              placeholder="Enter your email"
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
            mb="4"
          >
            <FormLabel>
              Password <Text as="span" color="red.500">*</Text>
            </FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                focusBorderColor="teal.400"
                placeholder="Enter your password"
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
          <Box textAlign="right" mb="4">
            <Link as={RouterLink} to="/forgot-password" color="teal.500">
              Forgot password?
            </Link>
          </Box>
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={formik.isSubmitting}
          >
            Sign In
          </Button>
        </form>

        <Box textAlign="center" mt="8">
          <Heading as="h2" size="md" mb="4">
            Thấy nóng không? bật quạt nhé?
          </Heading>
          <Box
            className={`spinner ${speed}`}
            bgImage={
              "https://is1-ssl.mzstatic.com/image/thumb/Purple128/v4/eb/43/eb/eb43ebe4-20c7-8ba5-6e7f-753a385c3e64/source/512x512bb.jpg"
            }
            bgSize="cover"
            bgPosition="center"
            w="100px"
            h="100px"
            borderRadius="full"
            mx="auto"
          ></Box>
          <Flex justify="center" mt="4" gap="4">
            <Button colorScheme="teal" size="sm" onClick={() => handleSpeedChange(1)}>
              Mode 1 (Chậm)
            </Button>
            <Button colorScheme="teal" size="sm" onClick={() => handleSpeedChange(2)}>
              Mode 2 (Vừa)
            </Button>
            <Button colorScheme="teal" size="sm" onClick={() => handleSpeedChange(3)}>
              Mode 3 (Nhanh)
            </Button>
          </Flex>
        </Box>

        <Box mt={5} textAlign="center">
          <p fontSize="lg" fontWeight="bold">
            Cần hỗ trợ?
          </p>
          <p mt={2}>
            Nếu bạn gặp vấn đề về tài khoản, hãy liên hệ admin hoặc đội hỗ trợ
          </p>
          <p mt={2} color="blue.500" fontWeight="semibold">
            Hotline: <a href="tel:+1234567890">+1 (234) 567-890</a>
          </p>
          <p mt={2} color="blue.500" fontWeight="semibold">
            Email: <a href="mailto:support@example.com">support@example.com</a>
          </p>
        </Box>
      </Box>
    </Flex>
  );
}

export default Signin;