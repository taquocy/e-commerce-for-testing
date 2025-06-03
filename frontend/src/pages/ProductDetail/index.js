import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import ImageGallery from "react-image-gallery";
import {
  Card,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { useAuth } from "../../contexts/AuthContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();
  const { loggedIn } = useAuth();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  // Sử dụng data._id thay vì item._id
  const findBasketItem = items.find(
    (basket_item) => String(basket_item._id) === String(data._id)
  );
  const images = data.photos.map((url) => ({ original: url }));

  const handleAddToBasket = () => {
    if (!loggedIn) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }
    addToBasket(data, findBasketItem);
  };

  return (
    <div>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <ImageGallery items={images} showThumbnails={false} />

        <Stack>
          <CardBody>
            <Heading size="md">{data.title}</Heading>

            <Text maxWidth={400} py="2">
              {data.description}
            </Text>
            <Text color="blue.600" fontSize="2xl">
              {data.price}$
            </Text>
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                colorScheme={findBasketItem ? "red" : "green"}
                onClick={handleAddToBasket}
              >
                {findBasketItem ? "Remove from Basket" : "Add to Basket"}
              </Button>
             
            </ButtonGroup>
          </CardBody>
        </Stack>
      </Card>
    </div>
  );
}

export default ProductDetail;
