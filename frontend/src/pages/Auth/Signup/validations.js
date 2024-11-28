import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Nhập email hợp lệ").required("Bắt buộc"),
  password: yup
    .string()
    .min(6, "Password must be at least 10 characters long.")
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu phải trùng nhau")
    .required(),
});

export default validations;
