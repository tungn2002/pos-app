import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/admin/dashboard/Dashboard';
import PosPage from './components/pos/NewPosPage'; // Use the new POS page
import OrderInquiryPage from './components/pos/OrderInquiryPage';
import InventoryInquiryPage from './components/pos/InventoryInquiryPage';
import OrderManagement from './components/admin/order/OrderManagement';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes - redirect to login if not authenticated */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/order-inquiry" element={<OrderInquiryPage />} />
        <Route path="/inventory-inquiry" element={<InventoryInquiryPage />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
      </Routes>
    </Router>
  );
}

export default App
