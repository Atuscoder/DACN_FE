import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../data/phones';
import {
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct
} from '../../api/admin';
import './Admin.css';

const emptyForm = {
  name: '', brand: '', price: '', oldPrice: '', image: '',
  description: '', colors: '', storage: '', stock: '0',
  screen: '', chip: '', camera: '', battery: '', os: ''
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await adminGetProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError('');
  };

  const openEdit = (p) => {
    setEditingId(p.id);
    const specs = p.specs || {};
    setForm({
      name: p.name || '',
      brand: p.brand || '',
      price: String(p.price || ''),
      oldPrice: p.oldPrice != null ? String(p.oldPrice) : '',
      image: p.image || '',
      description: p.description || '',
      colors: Array.isArray(p.colors) ? p.colors.join(', ') : '',
      storage: Array.isArray(p.storage) ? p.storage.join(', ') : '',
      stock: String(p.stock != null ? p.stock : 0),
      screen: specs.man_hinh || specs.screen || '',
      chip: specs.chip || '',
      camera: specs.camera || '',
      battery: specs.pin || specs.battery || '',
      os: specs.os || ''
    });
    setShowForm(true);
    setError('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.price) {
      setError('Vui lòng nhập tên, thương hiệu và giá');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const body = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        image: form.image.trim() || null,
        description: form.description.trim() || null,
        colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
        storage: form.storage.split(',').map(s => s.trim()).filter(Boolean),
        stock: Number(form.stock) || 0,
        specs: {
          man_hinh: form.screen || '',
          chip: form.chip || '',
          camera: form.camera || '',
          pin: form.battery || '',
          os: form.os || ''
        }
      };
      if (editingId) {
        await adminUpdateProduct(editingId, body);
      } else {
        await adminCreateProduct(body);
      }
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Xóa sản phẩm "${name}"?`)) return;
    try {
      await adminDeleteProduct(id);
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  if (showForm) {
    return (
      <div>
        <h1>{editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Tên sản phẩm *</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Thương hiệu *</label>
            <input name="brand" value={form.brand} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Giá bán *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Giá cũ</label>
            <input name="oldPrice" type="number" value={form.oldPrice} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Link ảnh</label>
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className="form-row">
            <label>Mô tả</label>
            <textarea name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Màu sắc (cách nhau bởi dấu phẩy)</label>
            <input name="colors" value={form.colors} onChange={handleChange} placeholder="Đen, Trắng, Xanh" />
          </div>
          <div className="form-row">
            <label>Dung lượng (cách nhau bởi dấu phẩy)</label>
            <input name="storage" value={form.storage} onChange={handleChange} placeholder="128GB, 256GB" />
          </div>
          <div className="form-row">
            <label>Tồn kho</label>
            <input name="stock" type="number" value={form.stock} onChange={handleChange} />
          </div>
          <div className="form-row"><label>Màn hình</label><input name="screen" value={form.screen} onChange={handleChange} /></div>
          <div className="form-row"><label>Chip</label><input name="chip" value={form.chip} onChange={handleChange} /></div>
          <div className="form-row"><label>Camera</label><input name="camera" value={form.camera} onChange={handleChange} /></div>
          <div className="form-row"><label>Pin</label><input name="battery" value={form.battery} onChange={handleChange} /></div>
          <div className="form-row"><label>Hệ điều hành</label><input name="os" value={form.os} onChange={handleChange} /></div>
          <div className="form-actions">
            <button type="submit" className="btn-admin btn-primary-admin" disabled={saving}>
              {saving ? 'Đang lưu...' : 'Lưu'}
            </button>
            <button type="button" className="btn-admin btn-secondary-admin" onClick={() => setShowForm(false)}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-toolbar">
        <h1>Quản lý sản phẩm</h1>
        <button className="btn-admin btn-primary-admin" onClick={openCreate}>+ Thêm sản phẩm</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Thương hiệu</th>
              <th>Giá</th>
              <th>Tồn</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.image ? <img src={p.image} alt="" /> : '—'}</td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{formatPrice(p.price)}</td>
                <td>{p.stock ?? 0}</td>
                <td>
                  <button className="btn-admin btn-secondary-admin btn-sm" onClick={() => openEdit(p)}>Sửa</button>
                  <button className="btn-admin btn-danger btn-sm" onClick={() => handleDelete(p.id, p.name)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && products.length === 0 && <p>Chưa có sản phẩm nào.</p>}
    </div>
  );
}

export default AdminProducts;
