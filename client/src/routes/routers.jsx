import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Cart from '../pages/cart';
import Login from '../pages/login';
import Register from '../pages/register';
import FourZeroFour from '../pages/404';
import Orders from '../pages/orders';
import ProtectedRoute from './proteced_route';
import ForgotPassword from '../pages/forgot_password';
import AdminDashboard from '../pages/admin_dashboard';
import ProductDetailsPage from '../pages/product_detials_page';

export const PageRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Product Details Route - Must be before ProtectedRoute and * */}
      <Route path="/product/:id" element={<ProductDetailsPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Route>

      {/* 404 - MUST BE THE LAST ROUTE */}
      <Route path="*" element={<FourZeroFour />} />
    </Routes>
  );
};