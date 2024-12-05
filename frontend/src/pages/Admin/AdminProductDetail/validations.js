import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price must be greater than or equal to 0")
    .max(10000, "Price must be less than or equal to 10000")
    .required("Price is required"),
  photos: yup
    .array()
    .of(
      yup
        .string()
        .matches(
          /\.(jpg|jpeg|png|gif|webp)$/,
          "Each photo must be a valid image URL ending with .jpg, .jpeg, .png, .gif, or .webp"
        )
        .required("Photo URL is required")
    )
    .min(1, "At least one photo is required")
    .max(10, "You can upload up to 10 photos"),
  status: yup
    .string()
    .oneOf(["Active", "Inactive"], "Status must be either 'Active' or 'Inactive'")
    .required("Status is required"),
});

export default validationSchema;
