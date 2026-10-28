import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    const onStorage = () => {
      setUserName(localStorage.getItem('userName') || '');
      setRole(localStorage.getItem('role') || '');
    };
    window.addEventListener('storage', onStorage);
    // refresh on focus
    const interval = setInterval(onStorage, 1000);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    setUserName('');
    setRole('');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📱</span>
          <span className="logo-text">PhoneStore</span>
        </Link>

        <div className="navbar-links">
          <Link to="/">Trang chủ</Link>
          <Link to="/#products">Sản phẩm</Link>
          {role === 'admin' && (
            <Link to="/admin/products" style={{ color: '#f59e0b', fontWeight: 600 }}>
              Admin
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-btn">
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {userName ? (
            <div className="user-menu">
              <span className="user-name">👤 {userName}</span>
              <button className="btn-logout" onClick={handleLogout}>Đăng xuất</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn-login">Đăng nhập</Link>
              <Link to="/register" className="btn-register">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
