const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
}

export async function adminGetProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error('Không lấy được sản phẩm');
  const data = await res.json();
  return data.products || [];
}

export async function adminCreateProduct(body) {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Thêm sản phẩm thất bại');
  return data;
}

export async function adminUpdateProduct(id, body) {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Cập nhật thất bại');
  return data;
}

export async function adminDeleteProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Xóa thất bại');
  return data;
}

export async function adminGetOrders() {
  const res = await fetch(`${API_BASE}/api/orders`, {
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Không lấy được đơn hàng');
  return data.orders || data || [];
}

export async function adminUpdateOrderStatus(id, status) {
  const res = await fetch(`${API_BASE}/api/orders/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Cập nhật trạng thái thất bại');
  return data;
}
