import * as yup from "yup";

const editScheme = yup.object().shape({
  title: yup.string().max(25, "Title is too long").required(),
  description: yup.string().min(5).required(),
  price: yup.number()
  .typeError('Price must be a valid number')
  .min(1, 'Price must be greater than or equal to 1')
  .max(1000000, 'Price must be shorter than or equal to 1000000')
  .required('Price is required'),
});

export default editScheme;
