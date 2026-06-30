import { UserProfile, Order } from "../types";

export const DEFAULT_AVATAR = "https://static.wixstatic.com/shapes/911b80_6d255d6b79db420aacdc023db41d4aff.svg";

export const GUEST_USER: UserProfile = {
  name: "Khách quý Chéri",
  email: "",
  phone: "",
  address: "",
  memberTier: "Bronze",
  avatar: DEFAULT_AVATAR,
  orders: []
};

const DEFAULT_ORDERS: Order[] = [
  {
    id: "CR-9582",
    date: "2026-06-15",
    total: 3100000,
    status: "delivered",
    statusText: "Đã giao hàng thành công",
    address: "118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh",
    phone: "0881 1880 080",
    items: [
      {
        productId: "1",
        productName: "Áo Sơ Mi Lụa Mulberry (Mulberry Silk Shirt)",
        price: 1250000,
        quantity: 1,
        size: "S",
        colorName: "Đỏ Chéri Trầm"
      },
      {
        productId: "3",
        productName: "Áo Blazer Dạ Tweed Phối Khuy Gold",
        price: 1850000,
        quantity: 1,
        size: "M",
        colorName: "Trắng Ivory"
      }
    ]
  },
  {
    id: "CR-8924",
    date: "2026-06-19",
    total: 1250000,
    status: "pending",
    statusText: "Chờ thanh toán (Chuyển khoản)",
    address: "118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh",
    phone: "0881 1880 080",
    items: [
      {
        productId: "1",
        productName: "Áo Sơ Mi Lụa Mulberry (Mulberry Silk Shirt)",
        price: 1250000,
        quantity: 1,
        size: "S",
        colorName: "Kem Ngọc Trai"
      }
    ]
  },
  {
    id: "CR-7312",
    date: "2026-06-17",
    total: 2450005,
    status: "shipped",
    statusText: "Đang vận chuyển liên tỉnh",
    address: "118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh",
    phone: "0881 1880 080",
    items: [
      {
        productId: "2",
        productName: "Đầm Dạ Hội Satin Classic (Classic Satin Dress)",
        price: 2450000,
        quantity: 1,
        size: "M",
        colorName: "Đỏ Chéri Hoàng Gia"
      }
    ]
  },
  {
    id: "CR-5621",
    date: "2026-06-18",
    total: 1150000,
    status: "preparing",
    statusText: "Đang chuẩn bị hàng tại Atelier",
    address: "118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh",
    phone: "0881 1880 080",
    items: [
      {
        productId: "4",
        productName: "Quần Tây Ống Suông Silk Crepe (Wide-Leg)",
        price: 1150000,
        quantity: 1,
        size: "S",
        colorName: "Trắng Off-white"
      }
    ]
  },
  {
    id: "CR-4109",
    date: "2026-06-10",
    total: 1950000,
    status: "cancelled",
    statusText: "Đã huỷ đơn hàng",
    address: "118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh",
    phone: "0881 1880 080",
    items: [
      {
        productId: "5",
        productName: "Đầm Lụa Cát Tay Bồng Chiết Eo (Puff-Sleeve)",
        price: 1950000,
        quantity: 1,
        size: "S",
        colorName: "Hồng Nude Phấn"
      }
    ]
  },
  {
    id: "CR-3058",
    date: "2026-05-28",
    total: 1850000,
    status: "returned",
    statusText: "Đã hoàn trả hàng & hoàn tiền thành công",
    address: "118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh",
    phone: "0881 1880 080",
    items: [
      {
        productId: "3",
        productName: "Áo Blazer Dạ Tweed Phối Khuy Gold",
        price: 1850000,
        quantity: 1,
        size: "M",
        colorName: "Hắc Trân Châu Đen"
      }
    ]
  }
];

export const DEFAULT_USER: UserProfile = {
  name: "Nguyễn Thơ",
  email: "contact.cheri@gmail.com",
  phone: "0881 1880 080",
  address: "118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh",
  memberTier: "Gold",
  avatar: DEFAULT_AVATAR,
  orders: DEFAULT_ORDERS
};

export const DEFAULT_REGISTERED_USERS = [
  {
    email: "contact.cheri@gmail.com",
    password: "cheri123",
    name: "Nguyễn Thơ",
    phone: "0881 1880 080",
    address: "118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh",
    memberTier: "Gold",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    orders: DEFAULT_ORDERS
  },
  {
    email: "test@gmail.com",
    password: "123456",
    name: "Huyền My",
    phone: "0909 123 456",
    address: "79 Đường 3/2, Quận 10, Thành phố Hồ Chí Minh",
    memberTier: "Silver",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    orders: []
  }
];
