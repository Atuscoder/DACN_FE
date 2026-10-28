const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function createOrder(orderData) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Vui lòng đăng nhập để đặt hàng');

  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Đặt hàng thất bại');
  return data;
}
