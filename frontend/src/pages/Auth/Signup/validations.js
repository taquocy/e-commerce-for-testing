import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Please enter your email").required("This field is required"),
  password: yup
    .string()
    // .min(10, "Parolanız en az 10 karakter olmalıdır.")
    .required(),
  passwordConfirm: yup
    .string()
    // .oneOf([yup.ref("password")], "Parolanız uyuşmuyor")
    .required(),
});

export default validations;
