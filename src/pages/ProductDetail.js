import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';
import { getProductById, getProducts } from '../api/products';
import { formatPrice } from '../data/phones';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [phone, setPhone] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setPhone(data);
        setSelectedColor(data.colors?.[0] || '');
        setSelectedStorage(data.storage?.[0] || '');

        const all = await getProducts();
        setRelated(all.filter(p => p.id !== data.id).slice(0, 4));
      } catch (err) {
        console.error(err);
        setPhone(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <Navbar />
        <p style={{ textAlign: 'center', marginTop: 80 }}>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="not-found">
        <Navbar />
        <div className="not-found-content">
          <h2>😢 Không tìm thấy sản phẩm</h2>
          <Link to="/" className="btn-back">← Về trang chủ</Link>
        </div>
      </div>
    );
  }

  const discount = phone.oldPrice
    ? Math.round(((phone.oldPrice - phone.price) / phone.oldPrice) * 100)
    : 0;

  const specs = phone.specs || {};
  const screen = specs.man_hinh || specs.screen || '—';
  const chip = specs.chip || '—';
  const camera = specs.camera || '—';
  const battery = specs.pin || specs.battery || '—';
  const os = specs.os || '—';

  const handleAddToCart = () => {
    addToCart(
      {
        ...phone,
        color: selectedColor,
        storage: selectedStorage
      },
      quantity
    );
    const toast = document.createElement('div');
    toast.className = 'toast-success';
    toast.textContent = `✓ Đã thêm ${quantity} sản phẩm vào giỏ`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        ...phone,
        color: selectedColor,
        storage: selectedStorage
      },
      quantity
    );
    navigate('/cart');
  };

  return (
    <div className="product-detail-page">
      <Navbar />

      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <Link to="/#products">Sản phẩm</Link>
        <span>/</span>
        <span>{phone.name}</span>
      </div>

      <div className="product-detail">
        <div className="product-gallery">
          <div className="main-image">
            <img src={phone.image} alt={phone.name} />
            {phone.tag && <span className="detail-tag">{phone.tag}</span>}
          </div>
        </div>

        <div className="product-info-detail">
          <span className="brand">{phone.brand}</span>
          <h1>{phone.name}</h1>

          <div className="rating-row">
            <span className="stars">
              {'★'.repeat(Math.floor(phone.rating || 0))}
              {'☆'.repeat(5 - Math.floor(phone.rating || 0))}
            </span>
            <span>{phone.rating || 0}/5</span>
            {phone.sold != null && (
              <>
                <span className="dot">•</span>
                <span>Đã bán {Number(phone.sold).toLocaleString('vi-VN')}</span>
              </>
            )}
          </div>

          <div className="price-box">
            <span className="current-price">{formatPrice(phone.price)}</span>
            {phone.oldPrice && (
              <>
                <span className="old-price">{formatPrice(phone.oldPrice)}</span>
                <span className="discount-badge">Giảm {discount}%</span>
              </>
            )}
          </div>

          <p className="description">{phone.description}</p>

          {phone.colors?.length > 0 && (
            <div className="option-group">
              <label>Màu sắc:</label>
              <div className="options">
                {phone.colors.map(c => (
                  <button
                    key={c}
                    className={`option-btn ${selectedColor === c ? 'active' : ''}`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phone.storage?.length > 0 && (
            <div className="option-group">
              <label>Dung lượng:</label>
              <div className="options">
                {phone.storage.map(s => (
                  <button
                    key={s}
                    className={`option-btn ${selectedStorage === s ? 'active' : ''}`}
                    onClick={() => setSelectedStorage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="option-group">
            <label>Số lượng:</label>
            <div className="quantity-control">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-add" onClick={handleAddToCart}>
              🛒 Thêm vào giỏ
            </button>
            <button className="btn-buy-now" onClick={handleBuyNow}>
              Mua ngay
            </button>
          </div>

          <button
            className="btn-ask-ai"
            onClick={() => document.querySelector('.chatbot-toggle')?.click()}
          >
            💬 Hỏi AI tư vấn về máy này
          </button>
        </div>
      </div>

      <div className="specs-section">
        <h2>Thông số kỹ thuật</h2>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Màn hình</span>
            <span className="spec-value">{screen}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Chip xử lý</span>
            <span className="spec-value">{chip}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Camera</span>
            <span className="spec-value">{camera}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Pin</span>
            <span className="spec-value">{battery}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Hệ điều hành</span>
            <span className="spec-value">{os}</span>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h2>Sản phẩm liên quan</h2>
          <div className="related-grid">
            {related.map(p => (
              <div
                key={p.id}
                className="related-card"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img src={p.image} alt={p.name} />
                <h4>{p.name}</h4>
                <span className="related-price">{formatPrice(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Chatbot />
    </div>
  );
}

export default ProductDetail;
