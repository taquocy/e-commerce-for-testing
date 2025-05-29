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
import { useCart } from "../../contexts/CartContext";

function Cards({ item }) {
  const { addToBasket, items: basketItems } = useBasket();
  const { addToCart, items: cartItems } = useCart();

  const findBasketItem = basketItems.find(
    (basket_item) => basket_item._id === item._id
  );
  const findCartItem = cartItems.find(
    (cart_item) => cart_item._id === item._id
  );

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
            onClick={() => addToBasket(item, findBasketItem)}
          >
            {findBasketItem ? "Remove from Basket" : "Add to Basket"}
          </Button>
          <Button
            variant="solid"
            colorScheme={findCartItem ? "red" : "blue"}
            onClick={() => addToCart(item, findCartItem)}
          >
            {findCartItem ? "Remove from Cart" : "Add to Cart"}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default Cards;