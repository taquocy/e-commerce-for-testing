import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import ImageGallery from "react-image-gallery";
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Input,
  Textarea,
  IconButton,
  Flex,
  Divider,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { StarIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data?.photos.map((url) => ({ original: url }));

  // State for Chi Tiết Sản Phẩm
  const [details, setDetails] = useState(() =>
    JSON.parse(localStorage.getItem("productDetails")) || {
      category: "Không có thông tin",
      brand: "Không có thông tin",
      origin: "Không có thông tin",
      stock: "Không có thông tin",
    }
  );
  const [editingDetails, setEditingDetails] = useState(false);

  // State for Mô Tả Sản Phẩm
  const [description, setDescription] = useState(
    localStorage.getItem("productDescription") || "Không có mô tả chi tiết"
  );
  const [editingDescription, setEditingDescription] = useState(false);

  // State for Đánh Giá Sản Phẩm
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("productReviews")) || []
  );
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("productDetails", JSON.stringify(details));
    localStorage.setItem("productDescription", description);
    localStorage.setItem("productReviews", JSON.stringify(reviews));
  }, [details, description, reviews]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  // Handle Chi Tiết Sản Phẩm
  const handleDetailChange = (key, value) => {
    setDetails({ ...details, [key]: value });
  };

  // Handle Đánh Giá Sản Phẩm
  const handleAddReview = () => {
    if (newRating > 0 && newReview.trim() !== "") {
      setReviews([
        ...reviews,
        { rating: newRating, comment: newReview, id: Date.now() },
      ]);
      setNewReview("");
      setNewRating(0);
    }
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <div>
      <Box mt="8">
        <Heading size="lg" mb="4">
          {data?.name}
        </Heading>
        <Text fontSize="xl" color="gray.600">
          {data?.price} VND
        </Text>
      </Box>

      <Card direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline">
        <ImageGallery items={images} showThumbnails={false} />
        <Stack>
          <CardBody>
            <Heading size="md">{data?.title}</Heading>
            <Text maxWidth={400} py="2">
              {data?.description}
            </Text>
            <Text color="blue.600" fontSize="2xl">
              {data?.price}$
            </Text>
          </CardBody>
          <CardFooter>
            <Button
              variant="solid"
              colorScheme={findBasketItem ? "red" : "whatsapp"}
              onClick={() => addToBasket(data, findBasketItem)}
            >
              {findBasketItem ? "Remove from basket" : "Add to Basket"}
            </Button>
          </CardFooter>
        </Stack>
      </Card>

      {/* Chi Tiết Sản Phẩm */}
      <Box mt="8">
        <Heading size="lg" mb="4">
          Chi Tiết Sản Phẩm
        </Heading>
        {!editingDetails ? (
          <Box>
            <Text>
              <strong>Danh Mục:</strong> {details.category}
            </Text>
            <Text>
              <strong>Thương hiệu:</strong> {details.brand}
            </Text>
            <Text>
              <strong>Xuất xứ:</strong> {details.origin}
            </Text>
            <Text>
              <strong>Số lượng còn lại:</strong> {details.stock}
            </Text>
            <Button
              mt="4"
              colorScheme="blue"
              onClick={() => setEditingDetails(true)}
            >
              Chỉnh sửa
            </Button>
          </Box>
        ) : (
          <Stack spacing="3">
            <Input
              placeholder="Danh Mục"
              value={details.category}
              onChange={(e) => handleDetailChange("category", e.target.value)}
            />
            <Input
              placeholder="Thương hiệu"
              value={details.brand}
              onChange={(e) => handleDetailChange("brand", e.target.value)}
            />
            <Input
              placeholder="Xuất xứ"
              value={details.origin}
              onChange={(e) => handleDetailChange("origin", e.target.value)}
            />
            <Input
              placeholder="Số lượng còn lại"
              value={details.stock}
              onChange={(e) => handleDetailChange("stock", e.target.value)}
            />
            <Button
              colorScheme="green"
              onClick={() => setEditingDetails(false)}
            >
              Lưu
            </Button>
          </Stack>
        )}
      </Box>

      <Divider my="6" />

      {/* Mô Tả Sản Phẩm */}
      <Box mt="8">
        <Heading size="lg" mb="4">
          Mô Tả Sản Phẩm
        </Heading>
        {!editingDescription ? (
          <Box>
            <Text>{description}</Text>
            <Button
              mt="4"
              colorScheme="blue"
              onClick={() => setEditingDescription(true)}
            >
              Chỉnh sửa
            </Button>
          </Box>
        ) : (
          <Box>
            <Textarea
              placeholder="Mô tả sản phẩm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              mt="4"
              colorScheme="green"
              onClick={() => setEditingDescription(false)}
            >
              Lưu
            </Button>
          </Box>
        )}
      </Box>

      <Divider my="6" />

      {/* Đánh Giá Sản Phẩm */}
      <Box mt="8">
        <Heading size="lg" mb="4">
          Đánh Giá Sản Phẩm
        </Heading>
        <Box>
          <Flex align="center" mb="4">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                boxSize="6"
                color={newRating > index ? "yellow.500" : "gray.300"}
                cursor="pointer"
                onClick={() => setNewRating(index + 1)}
              />
            ))}
          </Flex>
          <Textarea
            placeholder="Hãy để lại bình luận sản phẩm"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <Flex mt="4" gap="4">
            <Button colorScheme="green" onClick={handleAddReview}>
              Tải bình luận lên
            </Button>
            <Button colorScheme="red" onClick={() => setNewReview("")}>
              Xóa bình luận
            </Button>
          </Flex>
        </Box>
        <Divider my="6" />
        {reviews.map((review) => (
          <Box
            key={review.id}
            p="4"
            border="1px solid #ddd"
            borderRadius="8px"
            mb="4"
          >
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold">Đánh giá:</Text>
              <Text>{`⭐`.repeat(review.rating)}</Text>
            </Flex>
            <Text mt="2">{review.comment}</Text>
            <Button
              mt="2"
              colorScheme="red"
              size="sm"
              onClick={() => handleDeleteReview(review.id)}
            >
              Xóa đánh giá
            </Button>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default ProductDetail;
