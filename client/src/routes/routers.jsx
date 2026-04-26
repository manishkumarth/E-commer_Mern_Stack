import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Cart from '../pages/cart';
import Login from '../pages/login';
import Register from '../pages/register';
import FourZeroFour from '../pages/404';
import ProtectedRoute from './proteced_route';
import ForgotPassword from '../pages/forgot_password';
import AdminDashboard from '../pages/admin_dashboard';
import ProductDetailsPage from '../pages/product_detials_page';
import CreateProduct from '../admincomponents/create_product';
import OrderChart from '../admincomponents/charts/orders';
import ProductChart from '../admincomponents/charts/product_chart';
import ProductList from '../admincomponents/product_list';
import UserList from '../admincomponents/user_list';
import Orders from '../admincomponents/orders';
import ProtectedAdmin from './protected_admin';
import UserOrder from '../pages/user_orders'

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
        <Route path="/order" element={<UserOrder />} />


      </Route>
      <Route element={<ProtectedAdmin /> }>
        <Route path="/admin_dashboard" element={<AdminDashboard />} >
          <Route index element={<h2>Welcome Admin </h2>} />

          <Route path="users" element={<UserList />} />

          <Route path="products" element={<ProductList />} />
          <Route path="products/chart" element={<ProductChart />} />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/chart" element={<OrderChart />} />

          <Route path="create_product" element={<CreateProduct />} />
        </Route>
      </Route>

      {/* 404 - MUST BE THE LAST ROUTE */}
      <Route path="*" element={<FourZeroFour />} />
    </Routes>
  );
};