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
} from "@chakra-ui/react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // TODO: Gọi API gửi email reset mật khẩu ở đây, ví dụ:
      // await sendResetPasswordEmail(email);

      // Giả lập thành công
      setSubmitted(true);
    } catch (err) {
      setError("Không thể gửi email. Vui lòng thử lại sau.");
    }
  };

  return (
    <Flex align="center" justifyContent="center" width="full" pt={10}>
      <Box width="400px">
        <Heading textAlign="center" mb={6}>
          Forgot Password
        </Heading>

        {submitted ? (
          <Alert status="success" mb={4}>
            Hướng dẫn đặt lại mật khẩu đã được gửi tới email: {email}
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={error !== ""} mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                placeholder="Nhập email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            {error && (
              <Alert status="error" mb={4}>
                {error}
              </Alert>
            )}

            <Button type="submit" colorScheme="teal" width="full">
              Gửi hướng dẫn
            </Button>
          </form>
        )}
      </Box>
    </Flex>
  );
}

export default ForgotPassword;
