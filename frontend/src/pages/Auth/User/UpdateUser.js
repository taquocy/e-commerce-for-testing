import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Button, Box, Alert } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { fetchProfileUpdate } from "../../../api"; // API để cập nhật thông tin người dùng

function UpdateProfile() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await fetchProfileUpdate(values);
        alert("Thông tin cập nhật thành công");
        navigate("/profile"); // Quay lại trang profile
      } catch (error) {
        setErrorMessage("Có lỗi xảy ra khi cập nhật thông tin");
      }
    },
  });

  return (
    <Box>
      {errorMessage && <Alert status="error">{errorMessage}</Alert>}
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Họ tên</FormLabel>
          <Input
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Mật khẩu</FormLabel>
          <Input
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </FormControl>

        <Button type="submit" width="full">
          Cập nhật
        </Button>
      </form>
    </Box>
  );
}

export default UpdateProfile;
