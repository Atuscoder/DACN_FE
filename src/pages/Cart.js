import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/phones';
import { createOrder } from '../api/orders';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    if (!localStorage.getItem('token')) {
      alert('Vui lòng đăng nhập để thanh toán!');
      navigate('/login');
      return;
    }

    const customerName = window.prompt('Họ tên người nhận:');
    if (!customerName) return;

    const phone = window.prompt('Số điện thoại:');
    if (!phone) return;

    const address = window.prompt('Địa chỉ giao hàng:');
    if (!address) return;

    setCheckingOut(true);
    try {
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        color: item.color || null,
        storage: item.storage || null,
        price: item.price
      }));

      await createOrder({
        customerName,
        phone,
        address,
        items
      });

      alert('🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại PhoneStore.');
      clearCart();
      navigate('/');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    } finally {
      setCheckingOut(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="cart-empty">
          <div className="empty-icon">🛒</div>
          <h2>Giỏ hàng trống</h2>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link to="/" className="btn-continue">← Tiếp tục mua sắm</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Navbar />

      <div className="cart-container">
        <h1>🛒 Giỏ hàng của bạn <span className="item-count">({totalItems} sản phẩm)</span></h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <div className="cart-item-info">
                  <span className="cart-item-brand">{item.brand}</span>
                  <h3 onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                  {(item.color || item.storage) && (
                    <span style={{ fontSize: 13, color: '#888' }}>
                      {[item.color, item.storage].filter(Boolean).join(' / ')}
                    </span>
                  )}
                  <span className="cart-item-price">{formatPrice(item.price)}</span>
                </div>

                <div className="cart-item-qty">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <div className="cart-item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Xóa"
                >
                  ✕
                </button>
              </div>
            ))}

            <button className="btn-clear" onClick={clearCart}>
              🗑️ Xóa toàn bộ giỏ hàng
            </button>
          </div>

          <div className="cart-summary">
            <h3>Tóm tắt đơn hàng</h3>

            <div className="summary-row">
              <span>Tạm tính ({totalItems} sản phẩm)</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <span className="free">Miễn phí</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Tổng cộng</span>
              <span className="total-price">{formatPrice(totalPrice)}</span>
            </div>

            <button
              className="btn-checkout"
              onClick={handleCheckout}
              disabled={checkingOut}
            >
              {checkingOut ? 'Đang xử lý...' : '🛍️ Thanh toán ngay'}
            </button>

            <Link to="/" className="btn-keep-shopping">
              ← Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
