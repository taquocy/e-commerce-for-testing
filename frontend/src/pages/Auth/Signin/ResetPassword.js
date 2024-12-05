import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Alert } from "@chakra-ui/react";
import { fetchResetPassword } from "../../../api"; // Đảm bảo đường dẫn đúng
import { useParams } from "react-router-dom"; // Sử dụng nếu bạn nhận token qua URL

const ResetPassword = () => {
  const { token } = useParams(); // Giả sử token được truyền qua URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await fetchResetPassword(token, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <Box align="center" width="full" justifyContent="center">
      <Box textAlign="center" p={10}>
        <h1>Reset Password</h1>
      </Box>
      {success ? (
        <Alert status="success" mt={5}>
          Your password has been successfully reset. You can now log in.
        </Alert>
      ) : (
        <Box my={5} textAlign="left">
          {error && <Alert status="error" mt={2}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                isRequired
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isRequired
              />
            </FormControl>
            <Button mt={4} width="full" type="submit" colorScheme="teal">
              Reset Password
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default ResetPassword;
