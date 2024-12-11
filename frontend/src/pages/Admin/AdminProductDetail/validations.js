import * as yup from "yup";

const editScheme = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5).required(),
  price: yup.string().required(),
  color: yup.array().of(yup.string().matches(/^#[0-9A-Fa-f]{6}$/i)).required(),
});

export default editScheme;
