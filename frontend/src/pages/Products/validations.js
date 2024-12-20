import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .typeError("Price must be a number"),
  photos: Yup.array().of(Yup.string().url("Must be a valid URL")),
});

export default validationSchema;
