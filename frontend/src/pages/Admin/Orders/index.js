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
  useToast,
} from "@chakra-ui/react";
import { useBasket } from "../../../contexts/BasketContext";
import { postOrder } from "../../../api"; // ✅ Dùng đúng hàm API

function Basket() {
  const [address, setAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast();

  const { items, removeFromBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    try {
      const itemIds = items.map((item) => item._id);
      const input = {
        address,
        payment: "cash", // Thanh toán COD
        items: JSON.stringify(itemIds),
      };

      await postOrder(input);

      emptyBasket();
      onClose();

      toast({
        title: "Đặt hàng thành công!",
        description: "Cảm ơn bạn đã mua hàng. Đơn hàng đang được xử lý.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể đặt hàng. Vui lòng thử lại.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="5">
      {items.length < 1 && (
        <Alert status="warning">
          <AlertIcon />
          Giỏ hàng của bạn đang trống.
        </Alert>
      )}

      {items.length > 0 && (
        <>
          <ul style={{ listStyleType: "decimal", display: "flex", flexWrap: "wrap" }}>
            {items.map((item) => (
              <li key={item._id} style={{ margin: 20, width: "25%" }}>
                <Link to={`/product/${item._id}`}>
                  <Text fontSize="lg">
                    {item.title} - {item.price} $
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

          <Box mt="10">
            <Text fontSize="xl" fontWeight="bold">
              Tổng tiền: {total} $
            </Text>
          </Box>

          {/* Nút thanh toán */}
          <Button onClick={onOpen} colorScheme="teal" size="lg" mt={4}>
            Thanh toán khi nhận hàng
          </Button>

          {/* Modal nhập địa chỉ */}
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Nhập địa chỉ giao hàng</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Địa chỉ</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Nhập địa chỉ nhận hàng của bạn"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
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
