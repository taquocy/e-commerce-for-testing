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
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Flex align="center" marginTop="-100px" width="full" justifyContent="center" minHeight="100vh" bg="gray.50" >
      <Box
        p={8}
        boxShadow="lg"
        borderRadius="lg"
        bg="white"
        maxWidth="400px"
        width="90%"
        textAlign="center"
      >
        <Icon as={FaEnvelope} boxSize={12} color="teal.500" mb={4} />
        <Heading fontSize="2xl" mb={2}>
          Forgot Password
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={6}>
          Enter your email address below, and we’ll send you a link to reset your password.
        </Text>

        {submitted ? (
          <Alert status="success" variant="left-accent" mt={4} borderRadius="md">
            <AlertIcon />
            <Text>
              Instructions to reset your password have been sent to <strong>{email}</strong>.
            </Text>
          </Alert>
        ) : (
          <Box my={5} textAlign="left">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>E-mail Address</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    focusBorderColor="teal.500"
                    isRequired
                  />
                </FormControl>
                <Button
                  mt="4"
                  width="full"
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  _hover={{ bg: "teal.600" }}
                >
                  Send Instructions
                </Button>
              </VStack>
            </form>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default ForgotPassword;
