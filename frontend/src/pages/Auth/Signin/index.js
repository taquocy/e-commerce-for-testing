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
  useToast,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Sử dụng Yup để kiểm tra dữ liệu
import { fetcRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(8, "Mật khẩu phải dài ít nhất 8 ký tự")
      .matches(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
      .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ hoa")
      .matches(/[0-9]/, "Mật khẩu phải có ít nhất một số")
      .matches(/[@$!%*?&]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      setIsLoading(true);
      try {
        const registerResponse = await fetcRegister({
          email: values.email,
          password: values.password,
        });

        // Log in user
        login(registerResponse);

        // Hiển thị thông báo đăng ký thành công
        toast({
          title: "Đăng ký thành công!",
          description: "Chào mừng bạn đến với trang của chúng tôi.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Chuyển hướng đến trang profile
        navigate("/profile");
      } catch (e) {
        bag.setErrors({
          general: e.response?.data?.message || "Đã xảy ra lỗi khi đăng ký.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Đăng Ký</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.email}
                  </Text>
                )}
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Mật khẩu</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.password}
                  </Text>
                )}
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  }
                />
                {formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm && (
                    <Text color="red.500" fontSize="sm">
                      {formik.errors.passwordConfirm}
                    </Text>
                  )}
              </FormControl>
              <Button
                mt="4"
                width="full"
                type="submit"
                colorScheme="blue"
                isDisabled={isLoading}
              >
                {isLoading ? <Spinner size="sm" /> : "Đăng Ký"}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
