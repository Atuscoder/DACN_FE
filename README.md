# PhoneStore Frontend (đã nối Backend + Admin)

## Tính năng
- Sản phẩm / chi tiết từ API
- Giỏ hàng + đặt hàng thật
- Đăng ký / đăng nhập JWT
- Chatbot AI
- **Trang Admin**: quản lý sản phẩm, đơn hàng

## Chạy
```bash
cd FE   # hoặc thư mục chứa package.json
npm install
npm start
```

Backend phải chạy tại http://localhost:5000

## Admin
1. Đăng ký tài khoản
2. Trong MySQL: `UPDATE nguoi_dung SET vai_tro = 'admin' WHERE email = '...';`
3. Đăng nhập lại → hiện link **Admin** trên Navbar → `/admin/products`
