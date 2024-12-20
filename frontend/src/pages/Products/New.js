import React from "react";
import { postProduct } from "../../api";
import { useMutation, useQueryClient } from "react-query";
import './product.css';
import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Input,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Formik, FieldArray } from "formik";
import validationSchema from "./validations";
import { message } from "antd";

function NewProduct() {
  const navigate = useNavigate(); // Hook điều hướng
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const handleSubmit = async (values, bag) => {
    // Validate price: ensure it's positive and not zero
    if (values.price <= 0) {
      bag.setFieldError("price", "Price must be greater than 0");
      return;
    }

    console.log(values);
    message.loading({ content: "Loading...", key: "product_update" });

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        message.success({
          content: "Add Product is successfully",
          key: "product_update",
          duration: 2,
        });
      },
    });
  };

  const handlePriceChange = (e, setFieldValue) => {
    const value = e.target.value;
    // Check if the input value is a valid number and greater than 0
    if (/^\d*\.?\d*$/.test(value) && value >= 0) {
      setFieldValue("price", value);
    }
  };

  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Order</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Box mt={10}>

        {/* Nút Edit - Điều hướng về trang Home */}
        <Button
          colorScheme="blue"
          onClick={() => navigate("/admin")} // Điều hướng đến trang Home
          mb={4} // Khoảng cách bên dưới nút
        >
          Edit
        </Button>

        <Formik
          initialValues={{
            title: "",
            description: "",
            price: "",
            currency: "USD", // Default value for currency
            photos: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
            isSubmitting,
            setFieldValue, // To update the form field
          }) => (
            <>
              <Box>
                <Box my={5} textAlign="left">
                  <form onSubmit={handleSubmit}>
                    <FormControl isRequired isInvalid={touched.title && errors.title}>
                      <FormLabel>Title</FormLabel>
                      <Input
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        disabled={isSubmitting}
                      />
                      {touched.title && errors.title && (
                        <Text mt={2} color="red.500">
                          {errors.title}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl isRequired mt={4} isInvalid={touched.description && errors.description}>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        disabled={isSubmitting}
                      />
                      {touched.description && errors.description && (
                        <Text mt={2} color="red.500">
                          {errors.description}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl isRequired mt={4} isInvalid={touched.price && errors.price}>
                      <FormLabel>Price</FormLabel>
                      <Input
                        name="price"
                        onChange={(e) => handlePriceChange(e, setFieldValue)}
                        onBlur={handleBlur}
                        value={values.price}
                        disabled={isSubmitting}
                      />
                      {touched.price && errors.price && (
                        <Text mt={2} color="red.500">
                          {errors.price}
                        </Text>
                      )}
                    </FormControl>

                    {/* Select Currency */}
                    <FormControl isRequired mt={4} isInvalid={touched.currency && errors.currency}>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        name="currency"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.currency}
                        disabled={isSubmitting}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="VND">VND</option>
                        <option value="GBP">GBP</option>
                        {/* You can add more currencies here */}
                      </Select>
                      {touched.currency && errors.currency && (
                        <Text mt={2} color="red.500">
                          {errors.currency}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Photos</FormLabel>
                      <FieldArray
                        name="photos"
                        render={(arrayHelpers) => (
                          <div>
                            {values.photos &&
                              values.photos.map((photo, index) => (
                                <div key={index} className="input-button-row">
                                  <Input
                                    name={`photos.${index}`}
                                    value={photo}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                  />
                                  <Button
                                    ml="4"
                                    type="button"
                                    colorScheme="red"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            <Button
                              mt="5"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add a Photo
                            </Button>
                          </div>
                        )}
                      />
                    </FormControl>
                    <Button
                      mt={4}
                      width="full"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Add Product
                    </Button>
                  </form>
                </Box>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default NewProduct;
