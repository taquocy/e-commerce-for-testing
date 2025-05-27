import React from "react";
import {
  Card,
  Text,
  Image,
  Stack,
  Heading,
  CardBody,
  CardFooter,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";
// impor
import { useAuth } from "../../contexts/AuthContext";

function Cards({ item }) {
  const { addToBasket, items } = useBasket();


  const { loggedIn } = useAuth(); // lấy trạng thái đăng nhập

  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  const handleAddToBasket = () => {
    if (!loggedIn) {
      // Có thể dùng navigate("/signin") nếu muốn chuyển hướng
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }
    addToBasket(item, findBasketItem);
  };

  return (
    <Card maxW="sm">
      <Link to={`/product/${item._id}`}>
        <CardBody>
          <Image
            src={item.photos[0]}
            alt="Product"
            borderRadius="lg"
            loading="lazy"
            boxSize={300}
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{item.title}</Heading>
            <Text>{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
            <Text color="blue.600" fontSize="2xl">
              {item.price}$
            </Text>
          </Stack>
        </CardBody>
        <Divider />
      </Link>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme={findBasketItem ? "red" : "green"}
            onClick={handleAddToBasket}
          >
            {findBasketItem ? "Remove from Basket" : "Add to Basket"}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default Cards;
