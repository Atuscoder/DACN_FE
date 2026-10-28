const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function getProducts({ search = '', brand = '' } = {}) {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (brand && brand !== 'All') params.append('brand', brand);
  const res = await fetch(`${API_BASE}/api/products?${params}`);
  if (!res.ok) throw new Error('Không lấy được danh sách sản phẩm');
  const data = await res.json();
  return data.products || [];
}

export async function getProductById(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error('Không tìm thấy sản phẩm');
  return await res.json();
}
