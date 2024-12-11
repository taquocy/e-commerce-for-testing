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
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { fetcRegister } from "../../../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        await fetcRegister({
          email: values.email,
          password: values.password,
        });

        alert("Đăng ký thành công!");
        navigate("/signin");
      } catch (e) {
        bag.setErrors({ general: e.response?.data?.message || "Lỗi xảy ra" });
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              {/* Email */}
              <FormControl
                isInvalid={formik.touched.email && formik.errors.email}
              >
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              {/* Password */}
              <FormControl
                mt="4"
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={
                        showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      aria-label="Toggle Password Visibility"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              {/* Password Confirm */}
              <FormControl
                mt="4"
                isInvalid={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
              >
                <FormLabel>Password Confirm</FormLabel>
                <InputGroup>
                  <Input
                    name="passwordConfirm"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                  />
                  <InputRightElement>
                    <IconButton
                      icon={
                        showConfirmPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )
                      }
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      variant="ghost"
                      aria-label="Toggle Confirm Password Visibility"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {formik.errors.passwordConfirm}
                </FormErrorMessage>
              </FormControl>

              {/* Submit Button */}
              <Button mt="4" width="full" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
