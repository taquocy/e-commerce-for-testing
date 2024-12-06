import * as yup from "yup";

const editScheme = yup.object().shape({
  title: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s]*$/,
      "Title must not contain special characters"
    ) // Không cho phép ký tự đặc biệt
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(5, "Description must be at least 5 characters")
    .required("Description is required"),
  price: yup
    .string()
    .matches(
      /^[1-9][0-9]*$/,
      "Price must be a positive number starting with a non-zero digit"
    ) // Phải là số dương và bắt đầu bằng chữ số khác 0
    .required("Price is required"),
  photos: yup
    .array()
    .min(1, "At least one photo is required")
    .of(yup.string().url("Each photo URL must be valid"))
    .required("Photos are required"),
});

export default editScheme;
