import * as Yup from "yup";

const forgotPasswordValidation = Yup.object({
  email: Yup.string()
    .trim()
    .email("Email không hợp lệ. Vui lòng kiểm tra lại.")
    .max(255, "Email không được vượt quá 255 ký tự.")
    .required("Địa chỉ email là bắt buộc."),
});

export default forgotPasswordValidation;
