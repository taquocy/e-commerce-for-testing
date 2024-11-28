import * as yup from "yup";

// Hàm kiểm tra đuôi URL
const validImageExtensions = [".jpg", ".jpeg", ".png", ".gif"];

const urlValidation = (value) => {
  // Kiểm tra xem giá trị có tồn tại và có đuôi hợp lệ không
  return value && validImageExtensions.some(extension => value.endsWith(extension));
};

const editScheme = yup.object().shape({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  description: yup
    .string()
    .min(5, "Mô tả phải có ít nhất 5 ký tự")
    .required("Mô tả là bắt buộc"),
  price: yup
    .number()
    .typeError("Giá phải là một số")
    .positive("Giá phải lớn hơn 0")
    .required("Giá là bắt buộc"),
  photos: yup
    .array()
    .of(
      yup
        .string()
        .required("URL ảnh là bắt buộc")
        .test(
          "is-valid-image-url",
          "URL phải kết thúc bằng .jpg, .jpeg, .png, hoặc .gif",
          urlValidation
        )
    )
    .min(1, "Cần ít nhất một ảnh cho sản phẩm"),
});

export default editScheme;
