import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const defaultCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(defaultCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (data, findCartItem) => {
    if (!findCartItem) {
      return setItems((items) => [data, ...items]);
    }

    const filtered = items.filter((item) => item._id !== findCartItem._id);
    setItems(filtered);
  };

  const removeFromCart = (item_id) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };

  const emptyCart = () => setItems([]);

  const values = {
    items,
    setItems,
    addToCart,
    removeFromCart,
    emptyCart,
  };

  return (
    <CartContext.Provider value={values}>{children}</CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };