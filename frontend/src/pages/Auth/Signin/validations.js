import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Định dạng phải có '@' trong chuỗi ")
    .required("Bạn chưa nhập địa chỉ email"),
  password: Yup.string()
    .required("Bạn chưa nhập mật khẩu"), 
});

export default validationSchema;