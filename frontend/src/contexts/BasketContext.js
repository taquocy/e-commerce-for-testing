import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  // Reset basket khi user thay đổi (đăng nhập mới hoặc đăng xuất)
  useEffect(() => {
    setItems([]);
    localStorage.removeItem("basket");
  }, [user]);

  const addToBasket = (data, findBasketItem) => {
    if (!findBasketItem) {
      return setItems((items) => [data, ...items]);
    }

    const filtered = items.filter((item) => item._id !== findBasketItem._id);
    setItems(filtered);
  };

  const removeFromBasket = (item_id) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };

  const emptyBasket = () => setItems([]);

  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
    emptyBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
