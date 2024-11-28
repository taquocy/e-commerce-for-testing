import * as yup from "yup";

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

const validations = yup.object().shape({
  email: yup
    .string()
    .matches(gmailRegex, "Email phải là địa chỉ Gmail hợp lệ")
    .required("Trường này là bắt buộc"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
    )
    .required("Trường này là bắt buộc"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không khớp")
    .required("Trường này là bắt buộc"),
});

export default validations;
