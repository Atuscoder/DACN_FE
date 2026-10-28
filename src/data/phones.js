// Dữ liệu giả - Danh sách điện thoại
const phones = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: 34990000,
    oldPrice: 37990000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    colors: ["Titan Tự Nhiên", "Titan Đen", "Titan Trắng", "Titan Sa Mạc"],
    storage: ["256GB", "512GB", "1TB"],
    specs: {
      screen: "6.9 inch Super Retina XDR",
      chip: "A18 Pro",
      camera: "48MP + 48MP + 12MP",
      battery: "4685 mAh",
      os: "iOS 18"
    },
    description: "Flagship mạnh mẽ nhất của Apple năm 2024 với chip A18 Pro và camera chuyên nghiệp.",
    rating: 4.9,
    sold: 1250,
    tag: "Hot"
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    price: 31990000,
    oldPrice: 34990000,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet"],
    storage: ["256GB", "512GB", "1TB"],
    specs: {
      screen: "6.8 inch Dynamic AMOLED 2X",
      chip: "Snapdragon 8 Elite",
      camera: "200MP + 50MP + 50MP + 10MP",
      battery: "5000 mAh",
      os: "Android 15"
    },
    description: "Siêu phẩm Android với bút S Pen và camera 200MP đỉnh cao.",
    rating: 4.8,
    sold: 980,
    tag: "Mới"
  },
  {
    id: 3,
    name: "Xiaomi 15 Ultra",
    brand: "Xiaomi",
    price: 24990000,
    oldPrice: 27990000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    colors: ["Black", "White", "Green"],
    storage: ["256GB", "512GB"],
    specs: {
      screen: "6.73 inch AMOLED 120Hz",
      chip: "Snapdragon 8 Elite",
      camera: "50MP Leica + 50MP + 50MP",
      battery: "5400 mAh",
      os: "HyperOS 2"
    },
    description: "Camera Leica đỉnh cao, hiệu năng mạnh, giá cực kỳ hấp dẫn.",
    rating: 4.7,
    sold: 2100,
    tag: "Giảm sốc"
  },
  {
    id: 4,
    name: "OPPO Find X8 Pro",
    brand: "OPPO",
    price: 22990000,
    oldPrice: 25990000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    colors: ["Space Black", "Pearl White"],
    storage: ["256GB", "512GB"],
    specs: {
      screen: "6.78 inch AMOLED 120Hz",
      chip: "Dimensity 9400",
      camera: "50MP + 50MP + 50MP Hasselblad",
      battery: "5910 mAh",
      os: "ColorOS 15"
    },
    description: "Thiết kế sang trọng, sạc siêu nhanh 80W, camera Hasselblad.",
    rating: 4.6,
    sold: 850,
    tag: null
  },
  {
    id: 5,
    name: "iPhone 15",
    brand: "Apple",
    price: 18990000,
    oldPrice: 21990000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    colors: ["Đen", "Xanh", "Hồng", "Vàng", "Xanh dương"],
    storage: ["128GB", "256GB", "512GB"],
    specs: {
      screen: "6.1 inch Super Retina XDR",
      chip: "A16 Bionic",
      camera: "48MP + 12MP",
      battery: "3349 mAh",
      os: "iOS 18"
    },
    description: "iPhone phổ thông mạnh mẽ, bền bỉ, giá tốt nhất hiện nay.",
    rating: 4.8,
    sold: 3200,
    tag: "Bán chạy"
  },
  {
    id: 6,
    name: "Samsung Galaxy A56",
    brand: "Samsung",
    price: 9990000,
    oldPrice: 10990000,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    colors: ["Awesome Black", "Awesome Violet", "Awesome Lime"],
    storage: ["128GB", "256GB"],
    specs: {
      screen: "6.6 inch Super AMOLED 120Hz",
      chip: "Exynos 1580",
      camera: "50MP + 12MP + 5MP",
      battery: "5000 mAh",
      os: "Android 15"
    },
    description: "Tầm trung đáng mua nhất với màn hình đẹp và pin trâu.",
    rating: 4.5,
    sold: 4500,
    tag: "Giá tốt"
  },
  {
    id: 7,
    name: "Xiaomi Redmi Note 14 Pro",
    brand: "Xiaomi",
    price: 7990000,
    oldPrice: 8990000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    colors: ["Midnight Black", "Ocean Blue", "Aurora Purple"],
    storage: ["128GB", "256GB"],
    specs: {
      screen: "6.67 inch AMOLED 120Hz",
      chip: "Dimensity 7300",
      camera: "200MP + 8MP + 2MP",
      battery: "5500 mAh",
      os: "HyperOS"
    },
    description: "Camera 200MP cực đỉnh trong phân khúc dưới 10 triệu.",
    rating: 4.4,
    sold: 5800,
    tag: "Hot"
  },
  {
    id: 8,
    name: "vivo V40",
    brand: "vivo",
    price: 10990000,
    oldPrice: 11990000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    colors: ["Titanium Silver", "Stellar Black"],
    storage: ["128GB", "256GB"],
    specs: {
      screen: "6.78 inch AMOLED 120Hz",
      chip: "Snapdragon 7 Gen 3",
      camera: "50MP ZEISS + 50MP",
      battery: "5500 mAh",
      os: "Funtouch OS 14"
    },
    description: "Camera ZEISS tuyệt đẹp, thiết kế mỏng nhẹ sang trọng.",
    rating: 4.5,
    sold: 1900,
    tag: null
  }
];

export default phones;

// Format giá tiền VNĐ
export const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};
