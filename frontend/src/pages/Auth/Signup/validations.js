import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Vui lòng nhập một email hợp lệ.")
    .required("Email là bắt buộc."),
  
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc.")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa.")
    .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ cái viết thường.")
    .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất một số.")
    .matches(/[@$!%*?&#]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt."),
  
  passwordConfirm: yup
    .string()
    .required("Xác nhận mật khẩu là bắt buộc.")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp."),
});

export default validations;
