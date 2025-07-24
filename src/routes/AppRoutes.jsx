// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../components/Dashboard';
import OrdersPage from '../pages/OrdersPage';
import ProductsPage from '../pages/ProductsPage';
import CreateOrderPage from '../pages/CreateOrderPage';
import InvoicePreview from '../components/InvoicePreview';
import NotificationsPanel from '../components/NotificationsPanel';
import ShopSetupPage from '../pages/ShopSetupPage';
import AdminUsersPage from '../pages/AdminUsersPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/create-order" element={<CreateOrderPage />} />
      <Route path="/invoice" element={<InvoicePreview />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/notifications" element={<NotificationsPanel />} />
      <Route path="/setup" element={<ShopSetupPage />} />
      <Route path="/admin-users" element={<AdminUsersPage />} />
    </Routes>
  );
}
