import * as Yup from "yup";

const validation = Yup.object({
  email: Yup.string()
    .email("Định dạng phải có '@' trong chuỗi")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|co)$/i,
      "Email phải có tên miền hợp lệ")
    .required("Email là bắt buộc")
    .required("Bạn chưa nhập địa chỉ email"),
    
  password: Yup.string()
    .min(8, "Yêu cầu tối thiểu 8 ký tự") 
    .max(15, "Mật khẩu không vượt quá 15 kí tự")
    .required("Bạn chưa nhập mật khẩu"),
});

export default validation;
