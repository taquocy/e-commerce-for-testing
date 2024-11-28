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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Invalid email address.");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // Giả lập xác suất thành công 70%
      if (isSuccess) {
        setSubmitted(true);
      } else {
        setError("Failed to send instructions. Please try again.");
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Flex align="center" width="full" justifyContent="center">
      <Box pt={10}>
        <Box textAlign="center">
          <Heading>Forgot Password</Heading>
        </Box>
        {submitted ? (
          <Box>
            <Alert status="success" mt={5}>
              Instructions to reset your password have been sent to {email}.
            </Alert>
            <Button mt={4} onClick={() => setSubmitted(false)} colorScheme="teal">
              Reset
            </Button>
          </Box>
        ) : (
          <Box my={5} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              {error && (
                <Alert status="error" mt={3}>
                  {error}
                </Alert>
              )}
              <Button
                mt="4"
                width="full"
                type="submit"
                colorScheme="teal"
                isLoading={isLoading}
              >
                Send Instructions
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default ForgotPassword;
