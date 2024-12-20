import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin/index";
import Signup from "./pages/Auth/Signup/index";
import ForgotPassword from "./pages/Auth/Signin/ForgotPassword"; // Import ForgotPassword
import Products from "./pages/Products/index";
import ProductDetail from "./pages/ProductDetail/index";
import Basket from "./pages/Basket/index";
import ProtectedRoute from "./components/ProtectedRoute"; // Giả định bạn có một ProtectedRoute component
import Profile from "./pages/Profile/index"; // Profile page
import AdminDashboard from "./pages/Admin/index"; // Admin dashboard
import AdminOrders from "./pages/Admin/Orders/index"; // Admin Orders page
import AdminProducts from "./pages/Admin/Products/index"; // Admin Products page
import AdminProductDetail from "./pages/Admin/Products/ProductDetail"; // Product detail page
import NewProduct from "./pages/Admin/Products/NewProduct"; // New product page
import Error404 from "./pages/Error404"; // 404 Page

function App() {
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/basket" element={<Basket />} />

          {/* Protected routes for profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Protected admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute admin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />}>
              <Route path=":product_id" element={<AdminProductDetail />} />
              <Route path="new" element={<NewProduct />} />
            </Route>
          </Route>

          {/* 404 route */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
