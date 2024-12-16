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
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";

function Cards({ item }) {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <Card
      maxW="sm"
      position="relative"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "2xl",
        transform: "scale(1.03)", // Thẻ phóng to nhẹ
      }}
    >
      <Link to={`/product/${item._id}`}>
        <CardBody p="0" position="relative">
          {/* Ảnh sản phẩm */}
          <Box position="relative" overflow="hidden">
            <Image
              src={item.photos[0]}
              alt="Product"
              borderRadius="lg"
              loading="lazy"
              boxSize={300}
              objectFit="cover"
              transition="transform 0.3s ease"
              _hover={{
                transform: "scale(1.1)", // Ảnh phóng to khi hover
              }}
            />
            {/* Overlay khi hover */}
            <Flex
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.5)" /* Lớp mờ */
              opacity="0"
              justifyContent="center"
              alignItems="center"
              transition="opacity 0.3s ease"
              _hover={{ opacity: "1" }}
            >
              <Text fontSize="lg" color="white" fontWeight="bold">
                View Details
              </Text>
            </Flex>
          </Box>

          <Stack mt="4" spacing="3" p="4">
            <Heading size="md">{item.title}</Heading>
            <Text>{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
            <Text color="blue.600" fontSize="2xl">
              {item.price}$
            </Text>
          </Stack>
        </CardBody>
      </Link>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme={findBasketItem ? "red" : "green"}
            onClick={() => addToBasket(item, findBasketItem)}
          >
            {findBasketItem ? "Remove from Basket" : "Add to Basket"}
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to Cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default Cards;
