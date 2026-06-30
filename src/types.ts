export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "tops" | "bottoms" | "dresses" | "outerwear";
  categoryName: string;
  image: string;
  secondaryImage: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  rating: number;
  isNew?: boolean;
  inStock: boolean;
  images?: string[];
  classifications?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  size?: string;
  color?: { name: string; hex: string };
  classification?: string;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size: string;
  colorName: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "preparing" | "shipped" | "delivering" | "delivered" | "cancelled" | "returned";
  statusText: string;
  address: string;
  phone: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  avatar: string;
  orders: Order[];
}

export interface TrackingMilestone {
  time: string;
  title: string;
  desc: string;
  location: string;
  isCompleted: boolean;
}

export interface ShippingTracking {
  orderId: string;
  carrierName: string;
  carrierLogo?: string;
  trackingNumber: string;
  driverName: string;
  driverPhone: string;
  estimatedDeliveryDate: string;
  currentStatus: "pending" | "preparing" | "shipped" | "delivering" | "delivered" | "failed";
  currentStatusText: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  shippingMethod: string;
  timeline: TrackingMilestone[];
  coordinates?: {
    current: { lat: number; lng: number };
    steps: { name: string; lat: number; lng: number; reached: boolean }[];
  };
}

