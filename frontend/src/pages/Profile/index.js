import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Text, Button, Alert, AlertIcon, Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout, loggedIn } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <Flex
      justify="center"
      align="center"
      h="50vh"
      direction="column"
      textAlign="center"
    >
      {loggedIn === false && (
        <>
          <Alert status="warning" w="80%" maxW="400px" mb={6}>
            <AlertIcon />
            You are not logged in. Please login and try again.
          </Alert>
          <Flex gap={4}>
            <Link to="/signin">
              <Button colorScheme="whatsapp" variant="solid">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="facebook" variant="solid">
                Register
              </Button>
            </Link>
          </Flex>
        </>
      )}
      {loggedIn === true && (
        <Box textAlign="center" style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", width: "300px"}}>
          <div className="d-flex justify-content-center text-center align-items-center" style={{height: "200px" , marginTop:"20px"}}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Profile
          </Text>
          <Box mb={4}>
            <Text fontSize="lg">Email: {user.email}</Text>
            <Text fontSize="lg">Role: {user.role}</Text>
          </Box>
          <Button
            colorScheme="pink"
            variant="solid"
            onClick={handleLogout}
          >
            Logout
          </Button>
          </div>
        </Box>
      )}
    </Flex>
  );
}

export default Profile;
