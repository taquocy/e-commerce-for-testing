import React, { useState } from "react";
import { postProduct } from "../../api";
import { useMutation, useQueryClient } from "react-query";
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
import { Formik, FieldArray } from "formik";
import validationSchema from "./validations";

function NewProduct() {
  const queryClient = useQueryClient();
  const [notify, setNotify] = useState({ message: "", type: "" }); // Thêm state thông báo

  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const handleSubmit = async (values, bag) => {
    setNotify({ message: "Đang thêm sản phẩm...", type: "loading" });

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        setNotify({ message: "Thêm sản phẩm thành công!", type: "success" });
        bag.resetForm();
      },
      onError: () => {
        setNotify({
          message: "Thêm sản phẩm thất bại. Vui lòng thử lại!",
          type: "error",
        });
      },
    });
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
        {/* THÔNG BÁO ĐƠN GIẢN */}
        {notify.message && (
          <Box
            mb={4}
            p={2}
            borderRadius={4}
            color={
              notify.type === "success"
                ? "green"
                : notify.type === "error"
                ? "red"
                : "blue"
            }
            bg={
              notify.type === "success"
                ? "#e6ffed"
                : notify.type === "error"
                ? "#ffe6e6"
                : "#e6f0ff"
            }
          >
            {notify.message}
          </Box>
        )}

        <Text fontSize="2xl">Edit</Text>
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: "",
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
          }) => (
            <>
              <Box>
                <Box my={5} textAlign="left">
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>
                        Title<span style={{ color: "red" }}>* </span>
                      </FormLabel>
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
                    {/* Các trường khác giữ nguyên */}
                    {/* ... */}
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
