import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, Alert } from "@chakra-ui/react";
import { useFormik } from "formik";
import { fetchChangePassword } from "../../../api"; // API để thay đổi mật khẩu

function ChangePassword() {
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: async (values) => {
      try {
        await fetchChangePassword(values);
        alert("Mật khẩu đã được thay đổi");
      } catch (error) {
        setErrorMessage("Có lỗi xảy ra khi thay đổi mật khẩu");
      }
    },
  });

  return (
    <div>
      {errorMessage && <Alert status="error">{errorMessage}</Alert>}
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>Mật khẩu cũ</FormLabel>
          <Input
            name="oldPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.oldPassword}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Mật khẩu mới</FormLabel>
          <Input
            name="newPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
          />
        </FormControl>

        <Button type="submit">Đổi mật khẩu</Button>
      </form>
    </div>
  );
}

export default ChangePassword;