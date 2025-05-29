import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin/index";
import Signup from "./pages/Auth/Signup/index";
import ForgotPassword from "./pages/Auth/Signin/ForgotPassword";
import Products from "./pages/Products/index";
import ProductDetail from "./pages/ProductDetail/index";
import Basket from "./pages/Basket/index";
import Cart from "./pages/Cart/index";
import Error404 from "./pages/Error404/index";
import ProductedProfile from "./pages/ProductedRoute/ProductedProfile";
import ProductedAdmin from "./pages/ProductedRoute/ProductedAdmin";
import Orders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import NewProduct from "./pages/Products/New";
import { AuthProvider } from "./contexts/AuthContext";
import { BasketProvider } from "./contexts/BasketContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BasketProvider>
          <CartProvider>
            <Navbar />
            <div id="content">
              <Routes>
                <Route path="/" exact index element={<Products />} />
                <Route path="/product/:product_id" element={<ProductDetail />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<ProductedProfile />} />
                <Route path="/admin">
                  <Route index element={<ProductedAdmin />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="products">
                    <Route index element={<AdminProducts />} />
                    <Route path=":product_id" element={<AdminProductDetail />} />
                    <Route path="new" element={<NewProduct />} />
                  </Route>
                </Route>
                <Route path="*" element={<Error404 />} />
              </Routes>
            </div>
          </CartProvider>
        </BasketProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;