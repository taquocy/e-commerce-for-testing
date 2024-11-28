import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),
  photos: Yup.array()
    .of(
      Yup.string()
        .required("Photo URL cannot be empty")
        .matches(
          /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i,
          "Photo must be a valid URL (e.g., https://example.com/photo.jpg)"
        )
    )
    .min(1, "At least one photo is required"),
});

export default validationSchema;
