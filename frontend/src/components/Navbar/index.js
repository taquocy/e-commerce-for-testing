import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
import { useCart } from "../../contexts/CartContext";

function Navbar() {
  const { loggedIn } = useAuth();
  const { items: basketItems } = useBasket();
  const { items: cartItems } = useCart();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="green">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="blue">Register</Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {basketItems.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant="outline">
                  Basket ({basketItems.length})
                </Button>
              </Link>
            )}
            {cartItems.length > 0 && (
              <Link to="/cart">
                <Button colorScheme="teal" variant="outline">
                  Cart ({cartItems.length})
                </Button>
              </Link>
            )}
            <Link to="/admin/products/new">
              <Button colorScheme="pink" variant="ghost">
                Add New
              </Button>
            </Link>
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;