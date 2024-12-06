import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { Input, Button, FormControl, FormLabel, Text, Progress } from "@chakra-ui/react";
import * as yup from "yup";
import { message } from "antd";
import Autosuggest from "react-autosuggest";

// Validation Schema
const editScheme = yup.object().shape({
  title: yup
    .string()
    .matches(
      /^[a-zA-Z0-9\s]*$/,
      "Title must not contain special characters"
    )
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
    )
    .required("Price is required"),
  photos: yup
    .array()
    .min(1, "At least one photo is required")
    .of(yup.string().url("Each photo URL must be valid"))
    .required("Photos are required"),
});

// Suggestions for Autocomplete
const suggestions = [
  { title: "Product A" },
  { title: "Product B" },
  { title: "Product C" },
];

const NewProduct = () => {
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [titleSuggestions, setTitleSuggestions] = React.useState([]);

  const saveDraft = (values) => {
    localStorage.setItem("productDraft", JSON.stringify(values));
    message.success("Draft saved successfully!");
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    return suggestions.filter((item) =>
      item.title.toLowerCase().includes(inputValue)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setTitleSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setTitleSuggestions([]);
  };

  return (
    <Formik
      initialValues={{
        title: localStorage.getItem("productDraft")
          ? JSON.parse(localStorage.getItem("productDraft")).title
          : "",
        description: localStorage.getItem("productDraft")
          ? JSON.parse(localStorage.getItem("productDraft")).description
          : "",
        price: localStorage.getItem("productDraft")
          ? JSON.parse(localStorage.getItem("productDraft")).price
          : "",
        photos: localStorage.getItem("productDraft")
          ? JSON.parse(localStorage.getItem("productDraft")).photos
          : [],
      }}
      validationSchema={editScheme}
      onSubmit={(values, { setSubmitting }) => {
        simulateUpload();
        message.loading({ content: "Submitting...", key: "submit" });
        setTimeout(() => {
          message.success({
            content: "Product submitted successfully!",
            key: "submit",
          });
          setSubmitting(false);
        }, 2000);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          {/* Autocomplete for Title */}
          <FormControl mt={4}>
            <FormLabel>Title</FormLabel>
            <Autosuggest
              suggestions={titleSuggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={(suggestion) => suggestion.title}
              renderSuggestion={(suggestion) => <div>{suggestion.title}</div>}
              inputProps={{
                name: "title",
                value: values.title,
                onChange: handleChange,
                onBlur: handleBlur,
                placeholder: "Enter product title",
              }}
            />
            {touched.title && errors.title && (
              <Text mt={2} color="red.500">
                {errors.title}
              </Text>
            )}
          </FormControl>

          {/* Description */}
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.description && errors.description}
              placeholder="Enter product description"
            />
            {touched.description && errors.description && (
              <Text mt={2} color="red.500">
                {errors.description}
              </Text>
            )}
          </FormControl>

          {/* Price */}
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.price && errors.price}
              placeholder="Enter product price"
            />
            {touched.price && errors.price && (
              <Text mt={2} color="red.500">
                {errors.price}
              </Text>
            )}
          </FormControl>

          {/* Photos with Preview */}
          <FormControl mt={4}>
            <FormLabel>Photos</FormLabel>
            <FieldArray
              name="photos"
              render={(arrayHelpers) => (
                <div>
                  {values.photos &&
                    values.photos.map((photo, index) => (
                      <div key={index}>
                        <Input
                          name={`photos.${index}`}
                          value={photo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          isInvalid={touched.photos?.[index] && errors.photos?.[index]}
                          placeholder="Enter photo URL"
                          width="90%"
                        />
                        {touched.photos?.[index] && errors.photos?.[index] && (
                          <Text mt={2} color="red.500">
                            {errors.photos[index]}
                          </Text>
                        )}
                        {/* Preview Photo */}
                        {photo && (
                          <div>
                            <img
                              src={photo}
                              alt={`preview-${index}`}
                              style={{
                                maxWidth: "150px",
                                maxHeight: "100px",
                                marginTop: "10px",
                                borderRadius: "5px",
                                objectFit: "cover",
                                border: "1px solid #ccc",
                              }}
                            />
                          </div>
                        )}
                        <Button
                          ml="4"
                          mt="2"
                          type="button"
                          colorScheme="red"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  <Button mt="5" onClick={() => arrayHelpers.push("")} colorScheme="teal">
                    Add a Photo
                  </Button>
                </div>
              )}
            />
          </FormControl>

          {/* Progress Bar */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <Progress value={uploadProgress} size="xs" colorScheme="green" mt={2} />
          )}

          {/* Save Draft */}
          <Button mt="4" width="full" type="button" onClick={() => saveDraft(values)}>
            Save Draft
          </Button>

          {/* Submit */}
          <Button
            mt="4"
            width="full"
            colorScheme="teal"
            type="submit"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewProduct;
