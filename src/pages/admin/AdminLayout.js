import React from 'react';
import { Link, Outlet, Navigate, useLocation } from 'react-router-dom';
import './Admin.css';

function AdminLayout() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role !== 'admin') {
    return (
      <div className="admin-guard">
        <h2>⛔ Không có quyền truy cập</h2>
        <p>Chỉ tài khoản Admin mới vào được khu vực này.</p>
        <Link to="/">← Về trang chủ</Link>
      </div>
    );
  }

  const isActive = (path) => location.pathname.startsWith(path) ? 'active' : '';

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="logo">📱 Admin Panel</div>
        <nav>
          <Link to="/admin/products" className={isActive('/admin/products')}>📦 Sản phẩm</Link>
          <Link to="/admin/orders" className={isActive('/admin/orders')}>🧾 Đơn hàng</Link>
        </nav>
        <Link to="/" className="back-store">← Về cửa hàng</Link>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
