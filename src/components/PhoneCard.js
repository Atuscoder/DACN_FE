import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/phones';
import './PhoneCard.css';

function PhoneCard({ phone }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const discount = phone.oldPrice
    ? Math.round(((phone.oldPrice - phone.price) / phone.oldPrice) * 100)
    : 0;
  const rating = Number(phone.rating) || 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(phone);
    const toast = document.createElement('div');
    toast.className = 'toast-success';
    toast.textContent = '✓ Đã thêm vào giỏ hàng';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div className="phone-card" onClick={() => navigate(`/product/${phone.id}`)}>
      {phone.tag && (
        <span className={`phone-tag tag-${String(phone.tag).toLowerCase().replace(/\s+/g, '-')}`}>
          {phone.tag}
        </span>
      )}
      <div className="phone-image-wrap">
        <img src={phone.image} alt={phone.name} className="phone-image" loading="lazy" />
      </div>
      <div className="phone-info">
        <span className="phone-brand">{phone.brand}</span>
        <h3 className="phone-name">{phone.name}</h3>
        <div className="phone-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(rating))}
            {'☆'.repeat(5 - Math.floor(rating))}
          </span>
          <span className="rating-value">{rating}</span>
          {phone.sold != null && (
            <span className="sold">Đã bán {Number(phone.sold).toLocaleString('vi-VN')}</span>
          )}
        </div>
        <div className="phone-price-row">
          <span className="phone-price">{formatPrice(phone.price)}</span>
          {phone.oldPrice && (
            <>
              <span className="phone-old-price">{formatPrice(phone.oldPrice)}</span>
              <span className="phone-discount">-{discount}%</span>
            </>
          )}
        </div>
        <div className="phone-actions">
          <button className="btn-view" onClick={() => navigate(`/product/${phone.id}`)}>
            Xem chi tiết
          </button>
          <button className="btn-add-cart" onClick={handleAddToCart} title="Thêm vào giỏ">
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhoneCard;
