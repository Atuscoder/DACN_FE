import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../data/phones';
import { adminGetOrders, adminUpdateOrderStatus } from '../../api/admin';
import './Admin.css';

const STATUSES = ['Chờ xác nhận', 'Đang giao', 'Hoàn thành', 'Đã hủy'];

function statusClass(s) {
  if (!s) return '';
  if (s.includes('Chờ')) return 'status-cho';
  if (s.includes('giao') || s.includes('Giao')) return 'status-giao';
  if (s.includes('Hoàn')) return 'status-xong';
  if (s.includes('hủy') || s.includes('Hủy')) return 'status-huy';
  return '';
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const data = await adminGetOrders();
      setOrders(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatus = async (id, status) => {
    try {
      await adminUpdateOrderStatus(id, status);
      await load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <h1>Quản lý đơn hàng</h1>
        <button className="btn-admin btn-secondary-admin" onClick={load}>Làm mới</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>SĐT</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Đổi trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{o.customerName || o.userName || '—'}</td>
                <td>{o.phone || '—'}</td>
                <td>{formatPrice(o.totalAmount || o.tong_tien || 0)}</td>
                <td>
                  <span className={`status-badge ${statusClass(o.status || o.trang_thai)}`}>
                    {o.status || o.trang_thai}
                  </span>
                </td>
                <td>
                  {o.createdAt
                    ? new Date(o.createdAt).toLocaleString('vi-VN')
                    : '—'}
                </td>
                <td>
                  <select
                    value={o.status || o.trang_thai || ''}
                    onChange={(e) => handleStatus(o.id, e.target.value)}
                  >
                    {STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && orders.length === 0 && <p>Chưa có đơn hàng nào.</p>}
    </div>
  );
}

export default AdminOrders;
