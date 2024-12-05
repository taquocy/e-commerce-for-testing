import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|co)$/i,
      "Email phải có tên miền hợp lệ")
    .required("Email là bắt buộc"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự.") // 8 kí tự nhưng lại để là 5?
    .max(15,"Mật khẩu không được vượt quá 15 kí tự")
    .required("Mật khẩu là bắt buộc"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

export default validations;
