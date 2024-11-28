import * as Yup from 'yup';

const SignupValidation = Yup.object({
  name: Yup.string().required('Name is required').min(2, 'Name is too short'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default SignupValidation;
