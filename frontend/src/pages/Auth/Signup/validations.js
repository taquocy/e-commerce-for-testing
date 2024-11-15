import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Nhập email hợp lệ")
    .required("Vui lòng nhập đầy đủ thông tin"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự") // Thêm kiểm tra độ dài
    .required("Vui lòng nhập đúng mật khẩu"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng nhập đúng mật khẩu xác nhận"),
});

export default validations;
