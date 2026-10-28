import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PhoneCard from '../components/PhoneCard';
import Chatbot from '../components/Chatbot';
import { getProducts } from '../api/products';
import './Home.css';

function Home() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterBrand, setFilterBrand] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setPhones(data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Không kết nối được Backend. Kiểm tra server đang chạy chưa.');
      } finally {
        setLoading(false);
      }
    };
    fetchPhones();
  }, []);

  const brands = ['All', ...new Set(phones.map(p => p.brand))];

  const filteredPhones = phones.filter(p => {
    const matchBrand = filterBrand === 'All' || p.brand === filterBrand;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  return (
    <div className="home-page">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>
            Điện thoại thông minh<br />
            <span className="gradient-text">Chọn đúng - Dùng bền</span>
          </h1>
          <p>
            Hàng chính hãng • Bảo hành 12 tháng • Trả góp 0% •
            Tư vấn AI 24/7
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn-primary">Xem sản phẩm</a>
            <button
              className="btn-secondary"
              onClick={() => document.querySelector('.chatbot-toggle')?.click()}
            >
              💬 Chat với AI
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">8+</span>
            <span className="stat-label">Thương hiệu</span>
          </div>
          <div className="stat">
            <span className="stat-num">10k+</span>
            <span className="stat-label">Khách hàng</span>
          </div>
          <div className="stat">
            <span className="stat-num">4.8★</span>
            <span className="stat-label">Đánh giá</span>
          </div>
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-header">
          <h2>🔥 Sản phẩm nổi bật</h2>
          <div className="filters">
            <input
              type="text"
              placeholder="Tìm điện thoại..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <div className="brand-filters">
              {brands.map(b => (
                <button
                  key={b}
                  className={`brand-btn ${filterBrand === b ? 'active' : ''}`}
                  onClick={() => setFilterBrand(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', padding: 40 }}>Đang tải sản phẩm...</p>
        )}
        {error && (
          <p style={{ textAlign: 'center', color: 'red', padding: 20 }}>{error}</p>
        )}

        <div className="products-grid">
          {!loading && filteredPhones.length > 0 ? (
            filteredPhones.map(phone => (
              <PhoneCard key={phone.id} phone={phone} />
            ))
          ) : (
            !loading && !error && (
              <p className="no-result">Không tìm thấy sản phẩm phù hợp 😢</p>
            )
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">📱</span>
            <strong>PhoneStore</strong>
            <p>Cửa hàng điện thoại uy tín • Tư vấn AI thông minh</p>
          </div>
          <div className="footer-links">
            <h4>Liên hệ</h4>
            <p>📞 1900 1234</p>
            <p>✉️ support@phonestore.vn</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 PhoneStore. All rights reserved.
        </div>
      </footer>

      <Chatbot />
    </div>
  );
}

export default Home;
