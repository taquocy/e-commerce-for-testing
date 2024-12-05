import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { useQuery } from "react-query";
import "./styles/product.css";


import {
  Box,
  FormControl,
  FormLabel,
  Text,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../style.css";
import { Formik, FieldArray } from "formik";
import validationSchema from "./validations";
import { message, Modal } from "antd";

function AdminProductDetail() {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formikSubmit, setFormikSubmit] = useState(null);

  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleSubmit = async (values, bag) => {
    console.log("submitted");
    message.loading({ content: "Loading... ", key: "product_update" });

    try {
      await updateProduct(values, product_id);

      message.success({
        content: "The product has been successfully updated.",
        key: "product_update",
        duration: 2,
      });
      navigate("/admin/products");
    } catch (e) {
      const errorMessage = e.response?.data?.message || "An unknown error occurred.";
      message.error(`Error: ${errorMessage}`);
    }
  };

  const handleUpdate = (submitFunc) => {
    setFormikSubmit(() => submitFunc);
    setIsModalVisible(true);
  };

  const confirmUpdate = () => {
    setIsModalVisible(false);
    if (formikSubmit) formikSubmit();
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
        <Text fontSize="2xl">Edit Product</Text>
        <Formik
          initialValues={{
            title: data.title,
            description: data.description,
            price: data.price,
            photos: data.photos || [],
            status: data.status || "Active",
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
            resetForm,
          }) => (
            <form onSubmit={(e) => e.preventDefault()}>
              <Box my={5} textAlign="left">
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    disabled={isSubmitting}
                    isInvalid={touched.title && errors.title}
                  />
                  {touched.title && errors.title && (
                    <Text mt={2} color="red.500">
                      {errors.title}
                    </Text>
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    disabled={isSubmitting}
                    isInvalid={touched.description && errors.description}
                  />
                  {touched.description && errors.description && (
                    <Text mt={2} color="red.500">
                      {errors.description}
                    </Text>
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    disabled={isSubmitting}
                    isInvalid={touched.price && errors.price}
                  />
                  {touched.price && errors.price && (
                    <Text mt={2} color="red.500">
                      {errors.price}
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
                            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                              <Input
                                name={`photos.${index}`}
                                value={photo}
                                disabled={isSubmitting}
                                onChange={handleChange}
                                width="70%"
                              />
                              <img
                                src={photo}
                                alt={`photo-${index}`}
                                style={{ width: "50px", height: "50px", marginLeft: "10px", objectFit: "cover" }}
                              />
                              <Button
                                ml="4"
                                type="button"
                                colorScheme="red"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Remove
                              </Button>
                              {touched.photos && errors.photos && errors.photos[index] && (
                                <Text mt={2} color="red.500">
                                  {errors.photos[index]}
                                </Text>
                              )}
                            </div>
                          ))}
                        <Button mt="5" onClick={() => arrayHelpers.push("")}>
                          Add a Photo
                        </Button>
                      </div>
                    )}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Status</FormLabel>
                  <select
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                    disabled={isSubmitting}
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid lightgray",
                      width: "100%",
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {touched.status && errors.status && (
                    <Text mt={2} color="red.500">
                      {errors.status}
                    </Text>
                  )}
                </FormControl>

                <Button
                  mt={4}
                  width="full"
                  type="button"
                  onClick={() => handleUpdate(handleSubmit)}
                  isLoading={isSubmitting}
                >
                  Update
                </Button>
                <Button
                  mt={4}
                  ml={4}
                  colorScheme="gray"
                  onClick={() => resetForm()}
                  isDisabled={isSubmitting}
                >
                  Reset
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      <Modal
        title="Confirm Update"
        visible={isModalVisible}
        onOk={confirmUpdate}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>Are you sure you want to update this product?</p>
      </Modal>
    </div>
  );
}

export default AdminProductDetail;
