import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Text,
  Button,
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateProfile } from "../../api";

function Profile() {
  const { user, logout, loggedIn } = useAuth();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    logout();
  };

  const formik = useFormik({
    initialValues: {
      email: user.email,
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required("Required"),
      password: yup.string().min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values, bag) => {
      setIsSubmitting(true);
      try {
        await updateProfile(values);
        toast({
          title: "Profile updated.",
          description: "Your profile has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
      setIsSubmitting(false);
    },
  });

  return (
    <div>
      {loggedIn === false && (
        <>
          <Alert status="warning">
            <AlertIcon />
            You are not logged in. please login and try again.
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
            <Text fontSize={20}>email: {user.email}</Text>
            <Text fontSize={20}>role: {user.role}</Text>
          </Box>

          <Box mt={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              {formik.errors.general && (
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  {formik.errors.general}
                </Alert>
              )}

              <Button
                mt={4}
                width="full"
                type="submit"
                isLoading={isSubmitting}
              >
                Update Profile
              </Button>
            </form>
          </Box>

          <br />
          <br />
          <Link to="/">
            <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
              Logout
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Profile;
