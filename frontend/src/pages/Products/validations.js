import * as Yup from "yup";

const editScheme = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
  price: Yup.number()
    .moreThan(0, "Price must be greater than 0")
    .max(999999999, "Price must not exceed 9 digits")
    .required("Price is required"),
  photos: Yup.array().of(Yup.string().url("Must be a valid URL")),
});

export default editScheme;