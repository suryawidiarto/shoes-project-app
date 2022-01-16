import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppPage from "../pages/AppPage";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import ProductDetail from "../pages/ProductDetail";
import ProfilePage from "../pages/ProfilePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import ShippingPage from "../pages/ShippingPage";
import ShippingDetail from "../pages/ShippingDetail";
import AdminAddDataProduct from "../pages/AdminAddDataProduct";
import AdminEditDataProduct from "../pages/AdminEditDataProduct";
import AdminDataOrder from "../pages/AdminDataOrder";
import AdminDataOrderDetail from "../pages/AdminDataOrderDetail";
import AdminDataProduct from "../pages/AdminDataProduct";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppPage />}>
          <Route path="" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="shipping-detail" element={<ShippingDetail />} />
          <Route path="order/:orderId" element={<OrderDetailPage />} />
          <Route path="orderhistory" element={<OrderHistoryPage />} />
          <Route path="admin">
            <Route path="data-product" element={<AdminDataProduct />} />
            <Route path="data-product/add-product" element={<AdminAddDataProduct />} />
            <Route path="data-product/edit-product/:productId" element={<AdminEditDataProduct />} />
            <Route path="data-order" element={<AdminDataOrder />} />
            <Route path="data-order/order-detail/:orderId" element={<AdminDataOrderDetail />} />
          </Route>
        </Route>

        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
