import * as yup from "yup";

const editScheme = yup.object().shape({
  title: yup.string().required("Title is required"), // Thêm thông báo lỗi
  description: yup
    .string()
    .min(5, "Description must be at least 5 characters") // Thêm thông báo lỗi cho độ dài
    .required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number") // Kiểm tra nếu giá trị không phải là số
    .positive("Price must be a positive number") // Kiểm tra giá trị âm
    .required("Price is required"), // Kiểm tra trường giá trị
});

export default editScheme;
