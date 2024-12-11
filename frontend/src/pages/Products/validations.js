import * as yup from "yup";

const editScheme = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5).required(),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(1, "Price must be greater than or equal to 1")
    .required("Price is required"),
});

export default editScheme;
