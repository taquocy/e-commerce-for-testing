import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ.")
    .required("Vui lòng nhập email."),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
    .required("Vui lòng nhập mật khẩu."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp.")
    .required("Vui lòng xác nhận mật khẩu."),
});

export default validations;
