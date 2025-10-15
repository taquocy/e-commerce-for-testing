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
} from "@chakra-ui/react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    if (!value) return "Email là bắt buộc";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return "Email không hợp lệ";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email.trim());
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    // TODO: gọi API gửi hướng dẫn reset mật khẩu nếu backend có endpoint
    setSubmitted(true);
  };

  return (
    <Flex align="center" width="full" justifyContent="center">
      <Box pt={10}>
        <Box textAlign="center">
          <Heading>Quên mật khẩu</Heading>
        </Box>
        {submitted ? (
          <Alert status="success" mt={5}>
            Hướng dẫn đặt lại mật khẩu đã được gửi tới {email}.
          </Alert>
        ) : (
          <Box my={5} textAlign="left">
            <form onSubmit={handleSubmit} noValidate>
              <FormControl isInvalid={!!error}>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>

              <Button mt="4" width="full" type="submit" colorScheme="teal">
                Gửi hướng dẫn
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default ForgotPassword;