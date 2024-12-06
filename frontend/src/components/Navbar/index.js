import React, { useState } from "react";
import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Flex } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái lưu từ khóa tìm kiếm
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`); // Chuyển hướng đến trang kết quả tìm kiếm
    }
  };

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
      <div className={styles.center}>
        {/* Thanh tìm kiếm */}
        <Flex>
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="300px"
            mr="2"
          />
          <Button colorScheme="blue" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Flex>
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
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant="outline">
                  Basket ({items.length})
                </Button>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="pink" variant="ghost">
                  Admin
                </Button>
              </Link>
            )}

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
