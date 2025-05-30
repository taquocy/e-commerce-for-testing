import { Link } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Button,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { useCart } from "../../contexts/CartContext";

function Cart() {
  const { items, removeFromCart, emptyCart } = useCart();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <Box p="5">
      {items.length < 1 && (
        <Alert status="warning">
          <AlertIcon />
          You have no items in your cart.
        </Alert>
      )}
      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal", display: "flex" }}>
            {items.map((item) => (
              <li key={item._id} style={{ margin: 20, width: "25%", listStyleType:"none" }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize="22">
                    {item.title} - {item.price} $
                  </Text>
                  <Image
                    htmlWidth={300}
                    loading="lazy"
                    src={item.photos[0]}
                    alt="cart item"
                    boxSize={250}
                    objectFit="cover"
                    borderRadius="20px"
                  />
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme="red"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove from Cart
                </Button>
              </li>
            ))}
          </ul>
          <Box mt="10">
            <Text fontSize="22">Total: {total}$</Text>
          </Box>
          <Button onClick={emptyCart} colorScheme="orange" mt={4}>
            Clear Cart
          </Button>
        </>
      )}
    </Box>
  );
}

export default Cart;