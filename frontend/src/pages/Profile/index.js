import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Text,
  Button,
  Alert,
  AlertIcon,
  Box,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout, loggedIn, updatePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      await updatePassword(currentPassword, newPassword); // Gọi updatePassword từ AuthContext
      alert("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setUpdating(false);
    } catch (error) {
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <div>
      {loggedIn === false && (
        <>
          <Alert status="warning">
            <AlertIcon />
            You are not logged in. Please login and try again.
          </Alert>
          <Link to="/signin">
            <Button mt={4} colorScheme="whatsapp" variant="solid">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button mt={4} ml={4} colorScheme="facebook" variant="solid">
              Register
            </Button>
          </Link>
        </>
      )}
      {loggedIn === true && (
        <>
          <Text fontSize={28} fontWeight={700}>
            Profile
          </Text>
          <Box mt={4}>
            <Text fontSize={20}>Email: {user.email}</Text>
          </Box>

          <Button colorScheme="blue" variant="solid" onClick={() => setUpdating(!updating)}>
            {updating ? "Cancel" : "Change Password"}
          </Button>

          {updating && (
            <Box mt={4}>
              <FormControl id="currentPassword" mt={4}>
                <FormLabel>Current Password</FormLabel>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </FormControl>
              <FormControl id="newPassword" mt={4}>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </FormControl>
              <FormControl id="confirmPassword" mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </FormControl>
              <Button mt={4} colorScheme="teal" onClick={handlePasswordUpdate}>
                Save Changes
              </Button>
            </Box>
          )}

          <Link to="/">
            <Button colorScheme="pink" variant="solid" mt={4} onClick={handleLogout}>
              Logout
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Profile;
