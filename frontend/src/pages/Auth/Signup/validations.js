import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),

  username: yup
    .string()
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự.")
    .max(20, "Tên đăng nhập không quá 20 ký tự.")
    .required("Tên đăng nhập là bắt buộc"),

  password: yup
    .string()
    .min(5, "Mật khẩu phải có ít nhất 8 ký tự.")
    .required("Mật khẩu là bắt buộc"),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

export default validations;
