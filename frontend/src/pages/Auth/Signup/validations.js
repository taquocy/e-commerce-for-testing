import * as yup from "yup";

const validations = yup.object({
  email: yup
    .string()
    .email("Địa chỉ email không hợp lệ.")
    .required("Vui lòng nhập địa chỉ email."),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
    .required("Vui lòng nhập mật khẩu."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp.")
    .required("Vui lòng xác nhận lại mật khẩu."),
});

export default validations;

