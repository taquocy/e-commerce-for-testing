import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin/index";
import Signup from "./pages/Auth/Signup/index";
import ForgotPassword from "./pages/Auth/Signin/ForgotPassword"; // Import ForgotPassword
import Products from "./pages/Products/index";
import ProductDetail from "./pages/ProductDetail/index";
import Basket from "./pages/Basket/index";
import Error404 from "./pages/Error404/index";
import ProductedProfile from "./pages/ProductedRoute/ProductedProfile";
import ProductedAdmin from "./pages/ProductedRoute/ProductedAdmin";
import Orders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import NewProduct from "./pages/Products/New";
// Remove this line if SignupValidatin is unused
// import SignupValidation from './pages/Auth/Signin/SignupValidation';



// import React from "react";
// import { AuthProvider } from "./contexts/AuthContext";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Signin from "./components/Signin";
// import Profile from "./components/Profile";






function App() {
  return (
    <>
      <Navbar />
      <div id="content">
        <Routes>
          <Route path="/" exect index element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Thêm Forgot Password */}
          <Route path="/basket" element={<Basket />} />
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

          {/* <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider> */}



        </Routes>
      </div>
    </>
  );
}

export default App;
