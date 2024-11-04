import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Email phải có ký tự @ trong chuỗi").required("Bắt buộc phải điền thông tin vào ô này"),
  password: yup
    .string()
    .min(8, "Yêu cầu độ dài tối thiểu là 8 ký tự ")
    .required(),
});

export default validations;
