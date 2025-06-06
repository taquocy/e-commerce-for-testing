import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Image,
  AlertIcon,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api.js";

function Basket() {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast();

  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    if (!address) {
      toast({
        title: "Địa chỉ không được để trống.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const itemIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
      payment: paymentMethod,
    };

    try {
      await postOrder(input);
      emptyBasket();
      onClose();
      toast({
        title: "Đặt hàng thành công!",
        description: "Cảm ơn bạn đã mua hàng.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Đặt hàng thất bại",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="5">
      {items.length === 0 ? (
        <Alert status="warning">
          <AlertIcon />
          Giỏ hàng trống.
        </Alert>
      ) : (
        <>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {items.map((item) => (
              <li key={item._id} style={{ width: "25%" }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize="lg">
                    {item.title} - {item.price}$
                  </Text>
                  <Image
                    htmlWidth={300}
                    loading="lazy"
                    src={item.photos[0]}
                    alt="basket item"
                    boxSize={250}
                    objectFit="cover"
                    borderRadius="20px"
                  />
                </Link>
                <Button
                  mt="2"
                  size="sm"
                  colorScheme="red"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Xoá khỏi giỏ
                </Button>
              </li>
            ))}
          </ul>

          {/* Tổng tiền và nút thanh toán */}
          <Box
            mt="10"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="2xl" fontWeight="bold">
              Tổng cộng: {total}$
            </Text>
            <Button onClick={onOpen} colorScheme="whatsapp">
              Thanh toán
            </Button>
          </Box>

          {/* Modal thanh toán */}
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Thanh toán đơn hàng</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl mb={4}>
                  <FormLabel>Địa chỉ giao hàng</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Nhập địa chỉ chi tiết..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Phương thức thanh toán</FormLabel>
                  <RadioGroup
                    onChange={setPaymentMethod}
                    value={paymentMethod}
                  >
                    <Stack direction="column">
                      <Radio value="COD">Tiền mặt khi nhận hàng</Radio>
                      {/* <Radio value="VNPAY">VNPAY</Radio> */}
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Xác nhận
                </Button>
                <Button onClick={onClose}>Huỷ</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Basket;
