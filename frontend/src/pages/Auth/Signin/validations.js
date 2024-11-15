import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Nhap Email hop le").required("Bat buoc"),
  password: yup
    .string()
    // .min(10, "Parolanız en az 10 karakter olmalıdır.")
    .required(),
  resetEmail: yup.string().email("Nhap Email hop le").required("Bat buoc"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default validations;
