import * as Yup from "yup";

export default Yup.object({
  email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  password: Yup.string().min(6, "Mật khẩu phải ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
});