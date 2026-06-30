import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// List of products to guide the AI Stylist's recommendation context
const CHERI_PRODUCTS = [
  { id: "1", name: "Áo Sơ Mi Lụa Mulberry (Mulberry Silk Shirt)", price: 1250000, category: "tops", desc: "Lụa tơ tằm Mulberry thượng hạng, mềm mượt bồng bềnh tựa mây trời, có màu Kem mộc mạc và màu Đỏ Chéri cổ điển tự hào kiêu sa." },
  { id: "2", name: "Đầm Dạ Hội Satin Classic (Classic Satin Dress)", price: 2450000, category: "dresses", desc: "Thiết kế ôm nhẹ duyên dáng, chất satin Ý bóng nhẹ sang quý, dệt xéo thướt tha mềm rủ, tôn dáng kiêu kỳ trong các bữa tiệc tối sang trọng." },
  { id: "3", name: "Áo Blazer Tweed Phối Khuy Gold (Gold-Button Tweed Blazer)", price: 1850000, category: "outerwear", desc: "Chất liệu dệt Tweed dày dặn đứng phom phối sợi nhũ ẩn hiện quý phái, đính hàng khuy đồng vát cạnh sắc sảo, màu Trắng ngà cổ kính." },
  { id: "4", name: "Quần Tây Ống Suông Silk Crepe (Wide-Leg Silk Crepe Trousers)", price: 1150000, category: "bottoms", desc: "Lưng cao thanh mảnh tôn dáng, chất lụa cát dày dặn có độ rủ hoàn hảo, tạo cảm giác đôi chân dài thênh thang đầy phóng khoáng." },
  { id: "5", name: "Đầm Lụa Cát Chiết Eo Cao (Puff-Sleeve Silk Sand Dress)", price: 1950000, category: "dresses", desc: "Thiết kế tay bồng bềnh thanh tao, chiết eo cao kiến tạo tì vết tỷ lệ cơ thể lý tưởng, cực kỳ quyến rũ cho buổi trà chiều lịch thiệp." },
  { id: "6", name: "Chân Váy Xếp Ly Satin Hoàng Gia (Premium Pleated Satin Skirt)", price: 950000, category: "bottoms", desc: "Từng nếp gấp ly dập nhiệt thủ công giữ nếp vĩnh cửu, chuyển sắc màu Vàng Champagne lộng lẫy theo từng bước bộ bước đi." },
  { id: "7", name: "Áo Gile Kaki Dáng Hộp Cổ Điển (Classic Boxy Khaki Gile)", price: 1350000, category: "tops", desc: "Thiết kế tối giản không tay, cổ V phóng khoáng trên nền kaki dày chất dệt nổi Pháp, mang lại diện mạo sục sôi khí chất quý cô hiện đại." },
  { id: "8", name: "Áo Len Cashmere Cổ Lọ Chéri (Chéri Cashmere Sweater)", price: 1650000, category: "outerwear", desc: "Dệt từ 100% sợi len lông dê Cashmere vùng cao nguyên lừng danh, siêu mềm mịn giữ ấm tuyệt đối mà nhẹ tênh, bảo chứng phong cách Thu Đông thời thượng." }
];

// Lazy-initialize Gemini client to prevent crashes if key is omitted or placeholder
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// System Instruction that creates Chéri's distinct luxury brand voice
const SYSTEM_INSTRUCTION = `
Bạn là "Chéri Consultant" - trợ lý phong cách ảo trực tiếp tư vấn của thương hiệu thời trang nữ cao cấp Chéri (Chéri - Gentle Elegance). 
Phong cách thiết kế của Chéri là tối giản (minimalism), vương giả sang trọng, tinh xảo tuyệt diệu trong từng mẫu vải thượng hạng như lụa mulberry, satin Ý, dạ tweed dệt vàng và len cashmere mượt mà.

Hướng dẫn giao tiếp:
1. Luôn nói tiếng Việt trung thực, lịch sự, nhã nhặn, đầy tinh tế của một Boutique cao cấp chuyên nghiệp.
2. Xưng呼: xưng "Chéri" hoặc "em", và gọi khách hàng là "chị" hoặc "quý cô" một cách tôn kính và trìu mến.
3. Luôn tôn vinh triết lý thời trang tối giản thanh tao nhưng giàu cá tính, không lỗi mốt.
4. Gợi ý cụ thể các sản phẩm từ bộ sưu tập của Chéri khi tư vấn phối đồ:
   - Áo Sơ Mi Lụa Mulberry (1.250.000₫): kem hoặc đỏ Chéri, sang trọng, quyến rũ dịu dàng.
   - Đầm Dạ Hội Satin Classic (2.450.000₫): đầm tiệc sang quý, quyến rũ thướt tha.
   - Áo Blazer Tweed Phối Khuy Gold (1.850.000₫): thanh lịch, kiêu kỳ, ấm áp quý phái.
   - Quần Tây Ống Suông Silk Crepe (1.150.000₫): hack dáng thanh thoát, tôn chân.
   - Đầm Lụa Cát Chiết Eo Cao (1.950.000₫): tinh tế thơ mộng, quyến rũ trẻ trung.
   - Chân Váy Xếp Ly Satin Hoàng Gia (950.000₫): nhịp điệu quyến rũ của Satin dập ly.
   - Áo Gile Kaki Dáng Hộp Cổ Điển (1.350.000₫): thời thượng, đậm cá tính tối giản bản lĩnh.
   - Áo Len Cashmere Cổ Lọ Chéri (1.650.000₫): đỉnh cao ấm áp tinh tế thu đông.

Thông tin cửa hàng cần tư vấn nếu khách hỏi:
- Địa chỉ: 118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh.
- Hotline hỗ trợ: 0881 1880 080.
- Email: contact.cheri@gmail.com.
- Chính sách: đổi trả trong vòng 7 ngày nếu còn nguyên mác, bảo hành đường chỉ và cúc khuy 6 tháng, miễn phí vận chuyển toàn quốc cho đơn từ 1.500.000₫.

Khi khách hàng hỏi về cách chọn size hoặc phối đồ cho sự kiện (đi làm, đi tiệc, kỷ niệm, dạo phố), hãy nhiệt tình gợi ý một set kết hợp hoàn hảo gồm các items của Chéri, mô tả chất liệu tinh tế để khách cảm thấy rung cảm trước nét đẹp sang trọng.
Hãy giữ câu trả lời súc tích, tinh tế và ấm áp. Tránh các icon ngộ nghĩnh trẻ con, thay vào đó có thể sử dụng biểu tượng thanh lịch nhã nhặn như ✨ hoặc 🌹.
`;

// Unified offline simulation generator to keep Chatbox active for any credential/permission errors
function getSimulationResponse(messages: any[]): string {
  const userMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
  let reply = "Dạ chào mừng Quý cô đến với thế giới thời trang tối giản của Chéri! ✨ Chéri rất hân hạnh được đồng hành và tư vấn phong cách riêng cho quý cô. ";

  if (userMsg.includes("sơ mi") || userMsg.includes("áo lụa") || userMsg.includes("mulberry")) {
    reply += "Dạ, mẫu Áo Sơ Mi Lụa Mulberry (1.250.000₫) thản nhiên toát lên khí chất vương giả nhờ lụa tơ tằm tự nhiên 100%. Mẫu này phối cùng Quần Tây Ống Suông Silk Crepe tạo dải màu tối giản siêu hack dáng đó ạ ✨";
  } else if (userMsg.includes("đầm") || userMsg.includes("váy") || userMsg.includes("satin") || userMsg.includes("tiệc")) {
    reply += "Chéri đặc biệt đề xuất mẫu Đầm Dạ Hội Satin Classic (2.450.000₫) bóng rủ dịu êm tựa dòng nước nâng niu làn da của chị. Chị có muốn em hướng dẫn chọn màu hay size mẫu tuyệt vời này không ạ? ✨";
  } else if (userMsg.includes("blazer") || userMsg.includes("tweed") || userMsg.includes("áo khoác")) {
    reply += "Chiếc Áo Blazer Tweed Phối Khuy Gold (1.850.000₫) là hiện thân của vẻ thanh lịch cổ điển Pháp. Sợi tweed ánh nhũ dệt nổi vô cùng tôn da, khuy vàng đúc tinh xảo tạo điểm nhấn kiêu sa ạ. ✨";
  } else if (userMsg.includes("địa chỉ") || userMsg.includes("cửa hàng") || userMsg.includes("ở đâu")) {
    reply += "Dạ, Boutique trang nhã của Chéri tọa lạc tại số 118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh. Kính mời chị ghé chơi thử đồ trực tiếp ạ. ✨";
  } else if (userMsg.includes("hotline") || userMsg.includes("điện thoại") || userMsg.includes("email") || userMsg.includes("liên hệ")) {
    reply += "Chị có thể liên lạc với Chéri qua Hotline: 0881 1880 080 hoặc gửi email hỗ trợ tới địa chỉ contact.cheri@gmail.com. Chéri luôn lắng nghe và sẵn lòng hỗ trợ chị! ✨";
  } else if (userMsg.includes("giao hàng") || userMsg.includes("ship") || userMsg.includes("bao lâu")) {
    reply += "Dạ, Chéri miễn phí vận chuyển toàn quốc cho tất cả đơn hàng từ 1.500.000₫. Thời gian nhận hàng tiêu chuẩn là 2-3 ngày làm việc đối với khu vực Hồ Chí Minh, và 3-5 ngày đối với khu vực tỉnh thành khác ạ. ✨";
  } else {
    reply += "Dạ em rất hân hạnh được gợi ý phong cách thời trang lụa mềm, đầm satin quyến rũ hay vest gile Kaki thời thượng dành riêng cho chị. Chị có thể bật mí buổi tiệc sắp tới của mình là gì để em gợi ý kết hợp set đồ hoàn hảo nhất không ạ? 🌹";
  }
  return reply;
}

// API endpoint for Chatbox
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Tham số messages không hợp lệ." });
      return;
    }

    const ai = getGeminiClient();

    // Fallback simulation mode if Gemini API key is missing
    if (!ai) {
      console.log("Gemini API key is not configured. Running in simulation mode.");
      const reply = getSimulationResponse(messages);
      res.json({ text: reply });
      return;
    }

    // Try using Gemini API, fallback elegantly to simulation if permission/access is denied
    try {
      // Prepare content structure for modern @google/genai SDK
      // Convert format {role: 'user'|'assistant', content: string} to standard text inputs
      const lastMessage = messages[messages.length - 1];

      // Create history context
      const chatHistory = messages.slice(0, messages.length - 1).map(m => ({
        role: m.role === "assistant" ? "model" as const : "user" as const,
        parts: [{ text: m.content }]
      }));

      // Call Gemini API using modern SDK
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          ...chatHistory,
          { role: "user" as const, parts: [{ text: lastMessage.content }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const replyText = response.text || getSimulationResponse(messages);
      res.json({ text: replyText });
    } catch (apiError: any) {
      console.warn("Gemini API call warning (falling back to simulation mode):", apiError.message || apiError);
      const reply = getSimulationResponse(messages);
      res.json({ text: reply });
    }
  } catch (err: any) {
    console.error("Express Gemini chat error:", err);
    res.status(500).json({ error: "Dạ, đã xảy ra sự cố kết nối máy chủ tư vấn của Chéri. Mong quý đại hoàng cảm thông.", detail: err.message });
  }
});

// Seeded pseudo-random generator to ensure consistency on refresh for any specific orderId
function seededRandom(seedStr: string) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  }
  return function () {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// Shipping track API that simulates a live integration with premium carrier Chéri Express Courier (GHN / GHTK style)
app.get("/api/shipping/track/:orderId", (req, res) => {
  const { orderId } = req.params;
  const phoneParam = req.query.phone as string || "";
  const statusParam = req.query.status as string || "";

  if (!orderId) {
    res.status(400).json({ error: "Mã đơn hàng không hợp lệ." });
    return;
  }

  const rand = seededRandom(orderId);

  // Predict driver and route based on orderId seed
  const drivers = ["Nguyễn Văn Nam", "Trần Hoàng Long", "Lê Gia Huy", "Phạm Cao Sơn", "Vũ Hoàng Gia"];
  const driverPhotos = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150"
  ];

  const driverIdx = Math.floor(rand() * drivers.length);
  const driverName = drivers[driverIdx];
  const driverImg = driverPhotos[driverIdx];
  const driverPhone = `09${Math.floor(1000 + rand() * 9000)} ${Math.floor(100 + rand() * 900)} ${Math.floor(10 + rand() * 90)}`;

  // Determine current status. If client passed statusParam, respect it. Otherwise, default deterministically
  let currentStatus: "pending" | "preparing" | "shipped" | "delivering" | "delivered" = "shipped";

  if (statusParam) {
    if (statusParam === "preparing") {
      // Map "Chờ giao hàng" to "Đang giao" during tracking as requested
      currentStatus = "delivering";
    } else if (["pending", "shipped", "delivering", "delivered"].includes(statusParam)) {
      currentStatus = statusParam as any;
    }
  } else {
    // Deterministic selection if no status provided
    const val = rand();
    if (orderId === "CR-9582") {
      currentStatus = "delivered";
    } else if (orderId === "CR-5621") {
      // Default order in Chờ giao hàng tab tracks as "đang giao"
      currentStatus = "delivering";
    } else if (val < 0.15) {
      currentStatus = "pending";
    } else if (val < 0.35) {
      currentStatus = "delivering";
    } else if (val < 0.65) {
      currentStatus = "shipped";
    } else if (val < 0.85) {
      currentStatus = "delivering";
    } else {
      currentStatus = "delivered";
    }
  }

  // Set recipient coordinates (Hồ Chí Minh target coordinates)
  // Base coordinates around Linh Trung, Thủ Đức or Ho Chi Minh City general
  const destLat = 10.8582 + (rand() - 0.5) * 0.04;
  const destLng = 106.7841 + (rand() - 0.5) * 0.04;

  const startLat = 10.7760; // District 1 Warehouse
  const startLng = 106.7011;

  // Intermediary coordinates based on status
  let currentLat = startLat;
  let currentLng = startLng;

  if (currentStatus === "pending" || currentStatus === "preparing") {
    currentLat = startLat;
    currentLng = startLng;
  } else if (currentStatus === "shipped") {
    currentLat = startLat + (destLat - startLat) * 0.4;
    currentLng = startLng + (destLng - startLng) * 0.4;
  } else if (currentStatus === "delivering") {
    currentLat = startLat + (destLat - startLat) * 0.85;
    currentLng = startLng + (destLng - startLng) * 0.85;
  } else if (currentStatus === "delivered") {
    currentLat = destLat;
    currentLng = destLng;
  }

  const statusTextMap = {
    pending: "Đơn hàng đã tiếp nhận",
    preparing: "Đang soạn hàng tại Atelier",
    shipped: "Đang vận chuyển liên tỉnh",
    delivering: "Shipper đang giao tới quý cô",
    delivered: "Đã giao hàng thành công"
  };

  const statusText = statusTextMap[currentStatus];

  // Dynamic deterministic timeline generation relative to actual date or simulated historic days
  const timeline: any[] = [];

  // Format dates: we can use realistic Vietnamese formats
  const dateStr = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(Math.floor(8 + rand() * 10)).padStart(2, '0');
    const mins = String(Math.floor(10 + rand() * 49)).padStart(2, '0');
    return `${hours}:${mins} - ${day}/${month}/${year}`;
  };

  // Build timeline nodes depending on status
  timeline.push({
    time: dateStr(4),
    title: "Đặt hàng thành công",
    desc: "Đơn đặt hàng ghi nhận thành công từ hệ thống thanh toán Chéri Haute Couture.",
    location: "Hệ thống điện tử Chéri",
    isCompleted: true
  });

  if (currentStatus !== "pending") {
    timeline.push({
      time: dateStr(3),
      title: "Đã kiểm duyệt & Xác nhận đơn hàng",
      desc: "Chuyên viên tư vấn Chéri đã liên hệ xác nhận size áo và màu sắc tinh tế cho Quý cô.",
      location: "Chéri Atelier, Quận 3, HCM",
      isCompleted: true
    });
    timeline.push({
      time: dateStr(2.5),
      title: "Đóng gói & Kiểm tra Haute Couture",
      desc: "Sản phẩm được là ủi bằng hơi nước nước ấm, bọc túi lụa chống ẩm và xếp hộp thắt ruy-băng nhung sang trọng.",
      location: "Tổng kho Chéri, Thủ Đức, HCM",
      isCompleted: true
    });
  }

  if (currentStatus === "shipped" || currentStatus === "delivering" || currentStatus === "delivered") {
    timeline.push({
      time: dateStr(1.5),
      title: "Bàn giao đơn vị chuyển phát nhanh",
      desc: "Bàn giao bưu kiện thành công cho Chéri Premium Express. Xe vận tải liên tỉnh tiến hành di chuyển.",
      location: "Bưu cục trung chuyển Thủ Đức, HCM",
      isCompleted: true
    });
    timeline.push({
      time: dateStr(1),
      title: "Rời bưu cục phân loại",
      desc: "Bưu kiện đã được phân loại tự động và đang trên hành trình luân chuyển tới địa bàn quận lân cận.",
      location: "Trung tâm Khai thác Vùng Nam Bộ",
      isCompleted: true
    });
  }

  if (currentStatus === "delivering" || currentStatus === "delivered") {
    timeline.push({
      time: dateStr(0.2),
      title: "Shipper đang giao hàng",
      desc: `Nhân viên vận chuyển ${driverName} (${driverPhone}) đang giữ gói hàng và liên hệ giao tới địa chỉ của Quý cô. Vui lòng giữ sóng điện thoại thông suốt.`,
      location: "Bưu cục phát nội ô",
      isCompleted: true
    });
  }

  if (currentStatus === "delivered") {
    timeline.push({
      time: dateStr(0),
      title: "Giao hàng thành công",
      desc: "Bưu tá đã hoàn tất trao tận tay hộp lụa Chéri cho Quý cô. Chân thành cảm ơn Quý cô đã sủng ái các thiết kế thủ công tinh xảo của Chéri!",
      location: "Địa chỉ của Quý cô",
      isCompleted: true
    });
  }

  // Reverse timeline so newest experiences are always displayed on top for luxurious usability
  timeline.reverse();

  const mockAddress = phoneParam.includes("0881") || orderId === "CR-9582"
    ? "118 Linh Trung, Phường Linh Trung, Thủ Đức, Thành phố Hồ Chí Minh"
    : "Địa chỉ đăng ký đơn hàng";

  const recipientName = phoneParam.includes("0881") || orderId === "CR-9582" ? "Nguyễn Thơ" : "Quý khách Chéri";
  const recipientPhone = phoneParam ? phoneParam : "0881 *** ***";

  res.json({
    orderId,
    carrierName: "Chéri Premium Logistics",
    carrierLogo: "✨",
    trackingNumber: `CR-SP-${orderId.replace(/[^a-zA-Z0-9]/g, "") || "9582"}-${Math.floor(100 + rand() * 900)}`,
    driverName,
    driverPhone,
    driverImg,
    estimatedDeliveryDate: currentStatus === "delivered" ? "Đã nhận hàng thành công" : "Trong ngày từ 8:00 - 18:00",
    currentStatus,
    currentStatusText: statusText,
    recipientName,
    recipientPhone,
    recipientAddress: mockAddress,
    shippingMethod: "Hỏa tốc Premium (Chéri Signature Box)",
    timeline,
    coordinates: {
      current: { lat: currentLat, lng: currentLng },
      steps: [
        { name: "Atelier Chéri (Q3)", lat: startLat, lng: startLng, reached: true },
        { name: "Trung tâm phát", lat: startLat + (destLat - startLat) * 0.6, lng: startLng + (destLng - startLng) * 0.6, reached: currentStatus !== "pending" && currentStatus !== "preparing" },
        { name: "Nhà Quý cô", lat: destLat, lng: destLng, reached: currentStatus === "delivered" }
      ]
    }
  });
});

// Serve products in structured JSON dynamically from Google Sheets
// Setup cache to avoid hitting Google Sheets rate limits on every reload
let cachedProducts: any[] = [];
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 60 * 1000; // Cache for 1 minute

function mapColorNameToHex(name: string): string {
  const norm = (name || "").toLowerCase().trim();
  if (norm.includes("chéri") || norm.includes("chéry") || norm.includes("cherry")) return "#74070e";
  if (norm.includes("đỏ")) return "#C21807"; // crimson red
  if (norm.includes("trắng") || norm.includes("white") || norm.includes("ivory") || norm.includes("kem")) return "#FAF8F5";
  if (norm.includes("đen") || norm.includes("black") || norm.includes("obsidian")) return "#1A1A1A";
  if (norm.includes("be") || norm.includes("beige")) return "#F5F2EB";
  if (norm.includes("xám") || norm.includes("grey") || norm.includes("gray")) return "#A9A9A9";
  if (norm.includes("nâu") || norm.includes("brown") || norm.includes("caramel")) return "#8B5A2B";
  if (norm.includes("vàng") || norm.includes("gold") || norm.includes("yellow")) return "#FADA5E";
  if (norm.includes("navy") || norm.includes("xanh navy")) return "#002060";
  if (norm.includes("xanh lá") || norm.includes("green") || norm.includes("emerald")) return "#2E8B57";
  if (norm.includes("xanh nhạt") || norm.includes("mint") || norm.includes("xanh lơ")) return "#E0F2F1";
  if (norm.includes("xanh") || norm.includes("blue")) return "#4A90E2";
  if (norm.includes("tím nhạt") || norm.includes("lavender")) return "#E6E6FA";
  if (norm.includes("tím") || norm.includes("purple")) return "#8A2BE2";
  if (norm.includes("hồng") || norm.includes("pink")) return "#FFC0CB";
  // Set classifications mapped as colors
  if (norm === "áo") return "#E8E1D9";
  if (norm === "quần") return "#3D3D3D";
  if (norm.includes("quần jean")) return "#4B6F96";
  if (norm === "váy" || norm === "chân váy") return "#CDB4A2";
  if (norm === "full set") return "#74070e";
  if (norm === "khăn choàng") return "#E6D7C3";
  return "#D4C5B9"; // default signature warm sand Chéri
}

function getPlaceholderImageForCategory(category: string, secondary = false): string {
  if (category === "tops") {
    return secondary
      ? "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
      : "https://images.unsplash.com/photo-1548624149-f95ab51fc05b?auto=format&fit=crop&q=80&w=800";
  } else if (category === "bottoms") {
    return secondary
      ? "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800"
      : "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800";
  } else if (category === "outerwear") {
    return secondary
      ? "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800"
      : "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800";
  } else {
    // dresses
    return secondary
      ? "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
      : "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800";
  }
}

// Split columns in a line, respecting double quotes and delimiters
function splitCSVLine(line: string, sep: string): string[] {
  const result: string[] = [];
  let current = "";
  let insideQuote = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (insideQuote && line[i + 1] === '"') {
        // escaped quote
        current += '"';
        i++;
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === sep && !insideQuote) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseTSV(tsvText: string): any[] {
  const lines = tsvText.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Determine separator automatically from headers
  const headerLine = lines[0] || "";
  const separator = headerLine.includes('\t') ? '\t' : ',';

  // Parse lines with double quotes and multi-line support
  const rowsList: string[][] = [];
  let buffer = "";

  for (const line of lines) {
    if (buffer) {
      buffer += "\n" + line;
    } else {
      buffer = line;
    }

    // Count quotes
    const quoteCount = (buffer.match(/"/g) || []).length;
    if (quoteCount % 2 === 0) {
      // Split strictly by dynamic separator, strip exterior double quotes
      const cols = splitCSVLine(buffer, separator).map(c => c.trim().replace(/^"(.*)"$/, '$1').replace(/""/g, '"'));
      rowsList.push(cols);
      buffer = "";
    }
  }

  if (rowsList.length < 2) return [];

  const headers = rowsList[0].map(h => h.trim().toLowerCase());

  const getCol = (cols: string[], name: string, fallbackIdx: number): string => {
    const idx = headers.indexOf(name.toLowerCase());
    if (idx !== -1 && idx < cols.length) {
      return cols[idx];
    }
    if (fallbackIdx !== -1 && fallbackIdx < cols.length) {
      return cols[fallbackIdx];
    }
    return "";
  };

  const groups: Record<string, string[][]> = {};

  // Group lines by handle (groupId)
  for (let i = 1; i < rowsList.length; i++) {
    const cols = rowsList[i];
    if (cols.length === 0 || !cols[0]) continue;
    const productGroupId = getCol(cols, "handle", 0);
    if (!productGroupId) continue;

    if (!groups[productGroupId]) {
      groups[productGroupId] = [];
    }
    groups[productGroupId].push(cols);
  }

  const parsedProducts: any[] = [];

  for (const [groupId, rows] of Object.entries(groups)) {
    // Find PRODUCT row
    const productRow = rows.find(r => {
      const ft = getCol(r, "fieldType", 1);
      return ft && ft.toUpperCase() === "PRODUCT";
    });
    if (!productRow) continue;

    const name = getCol(productRow, "name", 2) || "Sản Phẩm Chéri Vy";
    const visibleStr = (getCol(productRow, "visible", 3) || "TRUE").toString().trim().toUpperCase();
    const isVisible = visibleStr === "TRUE" || visibleStr === "1";
    if (!isVisible) continue;

    const rawDescription = getCol(productRow, "plainDescription", 4) || "";
    // strip HTML markup
    const description = rawDescription.replace(/<\/?[^>]+(>|$)/g, "").trim();

    const categoryPath = (getCol(productRow, "categorySlugs", 5) || "").toLowerCase();

    // Map categories
    let category: "tops" | "bottoms" | "dresses" | "outerwear" = "dresses";
    if (categoryPath.includes("áo") || categoryPath.includes("top") || categoryPath.includes("shirt") || categoryPath.includes("gile") || categoryPath.includes("corset")) {
      category = "tops";
    } else if (categoryPath.includes("quần") || categoryPath.includes("váy") || categoryPath.includes("bottom") || categoryPath.includes("skirt")) {
      category = "bottoms";
    } else if (categoryPath.includes("blazer") || categoryPath.includes("tweed") || categoryPath.includes("khoác") || categoryPath.includes("outerwear") || categoryPath.includes("jacket")) {
      category = "outerwear";
    } else if (categoryPath.includes("đầm") || categoryPath.includes("dress") || categoryPath.includes("dresses") || categoryPath.includes("tiệc")) {
      category = "dresses";
    } else {
      const lowerName = name.toLowerCase();
      if (lowerName.includes("đầm") || lowerName.includes("dress")) {
        category = "dresses";
      } else if (lowerName.includes("áo sơ mi") || lowerName.includes("áo thun") || lowerName.includes("áo gile") || lowerName.includes("áo lụa") || lowerName.includes("áo thắt nơ") || lowerName.includes("áo yếm") || lowerName.includes("top") || lowerName.includes("corset")) {
        category = "tops";
      } else if (lowerName.includes("quần") || lowerName.includes("chân váy") || lowerName.includes("váy") || lowerName.includes("skirt")) {
        category = "bottoms";
      } else if (lowerName.includes("blazer") || lowerName.includes("khoác") || lowerName.includes("áo len") || lowerName.includes("áo khoác")) {
        category = "outerwear";
      }
    }

    const categoryNames = {
      tops: "Áo Thiết Kế",
      bottoms: "Chân Váy & Quần",
      dresses: "Đầm Thiết Kế",
      outerwear: "Áo Khoác & Blazer"
    };

    const categoryName = categoryNames[category];

    // Options parsing
    let sizesSet = new Set<string>();
    const colorsList: { name: string; hex: string }[] = [];
    const classificationsSet = new Set<string>();

    const getOptionValues = (optName: string, optChoices: string) => {
      if (!optName || !optChoices) return;
      const lowerName = optName.toLowerCase().trim();
      const choices = optChoices.split(';').map(v => v.trim()).filter(Boolean);

      if (lowerName.includes("size") || lowerName.includes("kích cỡ") || lowerName.includes("kích thước")) {
        choices.forEach(v => {
          if (v) sizesSet.add(v);
        });
      } else if (lowerName.includes("phân loại") || lowerName.includes("loại") || lowerName.includes("subclass") || lowerName.includes("group")) {
        choices.forEach(v => {
          if (v) classificationsSet.add(v);
        });
      } else if (lowerName.includes("color") || lowerName.includes("màu") || lowerName.includes("sắc") || lowerName.includes("col")) {
        choices.forEach(v => {
          if (!v) return;
          if (v.includes(':')) {
            const parts = v.split(':');
            const hex = parts[0].trim();
            const name = parts[1].trim();
            if (!colorsList.some(col => col.name.toLowerCase() === name.toLowerCase())) {
              colorsList.push({ name, hex });
            }
          } else {
            const hex = mapColorNameToHex(v);
            if (!colorsList.some(col => col.name.toLowerCase() === v.toLowerCase())) {
              colorsList.push({ name: v, hex });
            }
          }
        });
      }
    };

    // check core product options (1 to 6)
    for (let j = 1; j <= 6; j++) {
      const optName = getCol(productRow, `productOptionName${j}`, -1);
      const optChoices = getCol(productRow, `productOptionChoices${j}`, -1);
      if (optName && optChoices) {
        getOptionValues(optName, optChoices);
      }
    }

    // Collect variant rows
    const variantRows = rows.filter(r => {
      const ft = getCol(r, "fieldType", 1);
      return ft && ft.toUpperCase() === "VARIANT";
    });

    let basePrice = 0;
    let baseOriginalPrice: number | undefined = undefined;
    let inStock = false;

    const cleanPriceString = (str: string): string => {
      if (!str) return "0";
      const dotCount = (str.match(/\./g) || []).length;
      if (dotCount > 1) {
        return str.replace(/\./g, "").replace(/[^0-9]/g, "");
      }
      return str.replace(/,/g, "").trim();
    };

    if (variantRows.length > 0) {
      const salePrices = variantRows.map(r => parseFloat(cleanPriceString(getCol(r, "price", 11)))).filter(p => !isNaN(p) && p > 0);
      const originalPrices = variantRows.map(r => parseFloat(cleanPriceString(getCol(r, "strikethroughPrice", 12)))).filter(p => !isNaN(p) && p > 0);

      const minSalePrice = salePrices.length > 0 ? Math.min(...salePrices) : 0;
      const maxOriginalPrice = originalPrices.length > 0 ? Math.max(...originalPrices) : 0;

      basePrice = minSalePrice;
      if (maxOriginalPrice > minSalePrice) {
        baseOriginalPrice = maxOriginalPrice;
      } else if (originalPrices.length > 0 && originalPrices[0] > 0) {
        baseOriginalPrice = originalPrices[0];
      }

      const stockCounts = variantRows.map(r => parseInt(getCol(r, "inventory", 14) || "0")).filter(s => !isNaN(s));
      const totalStock = stockCounts.reduce((a, b) => a + b, 0);
      inStock = totalStock > 0;

      // Extract options from variant choices too
      variantRows.forEach(vr => {
        for (let j = 1; j <= 6; j++) {
          const optName = getCol(vr, `productOptionName${j}`, -1);
          const optChoices = getCol(vr, `productOptionChoices${j}`, -1);
          if (optName && optChoices) {
            const lowerName = optName.toLowerCase().trim();
            if (lowerName.includes("size") || lowerName.includes("kích cỡ") || lowerName.includes("kích thước")) {
              sizesSet.add(optChoices);
            } else if (lowerName.includes("phân loại") || lowerName.includes("loại") || lowerName.includes("subclass") || lowerName.includes("group")) {
              classificationsSet.add(optChoices);
            } else if (lowerName.includes("color") || lowerName.includes("màu") || lowerName.includes("sắc") || lowerName.includes("col")) {
              if (!colorsList.some(col => col.name.toLowerCase() === optChoices.toLowerCase())) {
                colorsList.push({ name: optChoices, hex: mapColorNameToHex(optChoices) });
              }
            }
          }
        }
      });
    }

    if (basePrice === 0) {
      basePrice = parseFloat(cleanPriceString(getCol(productRow, "price", 11))) || 450000;
    }
    if (!baseOriginalPrice) {
      const orig = parseFloat(cleanPriceString(getCol(productRow, "strikethroughPrice", 12))) || 0;
      if (orig > basePrice) {
        baseOriginalPrice = orig;
      }
    }
    if (variantRows.length === 0) {
      const prodStock = parseInt(getCol(productRow, "inventory", 14) || "0");
      inStock = isNaN(prodStock) ? true : prodStock > 0;
    }

    // Parse Media
    const mediaRows = rows.filter(r => {
      const ft = getCol(r, "fieldType", 1);
      return ft && ft.toUpperCase() === "MEDIA";
    });

    const images: string[] = [];
    mediaRows.forEach(mr => {
      const mediaVal = getCol(mr, "media", 7);
      if (mediaVal) {
        if (mediaVal.startsWith("http")) {
          images.push(mediaVal);
        } else {
          images.push(`https://static.wixstatic.com/media/${mediaVal}`);
        }
      }
    });

    let primaryImage = "";
    let secondaryImage = "";

    if (images.length > 0) {
      primaryImage = images[0];
      secondaryImage = images[1] || images[0];
    } else {
      primaryImage = getPlaceholderImageForCategory(category);
      secondaryImage = getPlaceholderImageForCategory(category, true);
    }

    parsedProducts.push({
      id: groupId,
      name,
      price: basePrice,
      originalPrice: baseOriginalPrice,
      category,
      categoryName,
      image: primaryImage,
      secondaryImage,
      colors: colorsList,
      sizes: Array.from(sizesSet),
      classifications: Array.from(classificationsSet),
      description,
      details: [
        "Thiết kế Haute Couture tuyển lượng chất lượng hàng đầu Việt Nam",
        "Đường may dấu chỉ giấu nếp gấp phẳng hoàn hảo tinh tuyền phong dáng",
        "Sản phẩm được bảo hành đường may và nút cúc khuy 6 tháng",
        "Miễn chế đổi trả mộc mạc nguyên nhãn mác trong vòng 7 ngày làm việc",
        "Giặt nhẹ bằng tay nước mát bảo dưỡng chất sợi mềm rũ phom dáng"
      ],
      rating: +(4.5 + Math.random() * 0.5).toFixed(1),
      isNew: true,
      inStock,
      images
    });
  }

  return parsedProducts;
}

app.get("/api/products", async (req, res) => {
  const now = Date.now();
  // Return cached products if they are healthy and fresh
  if (cachedProducts.length > 0 && (now - cacheTimestamp < CACHE_DURATION_MS)) {
    res.json(cachedProducts);
    return;
  }

  try {
    const sheetId = "1Qe41ZrCGUaHXNnftPTyaYwzpLiW2E3xpGcrCMk4muLI";
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=tsv`;

    const response = await fetch(sheetUrl);
    if (!response.ok) {
      throw new Error(`Google Spreadsheet returned status ${response.status}`);
    }
    const tsvText = await response.text();
    const parsed = parseTSV(tsvText);

    if (parsed && parsed.length > 0) {
      cachedProducts = parsed;
      cacheTimestamp = now;
      res.json(parsed);
    } else {
      console.warn("Spreadsheet parsed to empty array. Falling back to local static database.");
      res.json(CHERI_PRODUCTS);
    }
  } catch (error: any) {
    console.error("Error loading spreadsheet dynamically, serving fallback static data:", error.message || error);
    res.json(CHERI_PRODUCTS);
  }
});

// Setup Vite development server or production build
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted on Express");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static assets server running under production path:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Chéri server successfully loaded and binding to http://0.0.0.0:${PORT}`);
  });
}

setupServer();
