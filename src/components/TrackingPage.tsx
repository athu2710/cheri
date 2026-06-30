import React, { useState, useEffect } from "react";
import { 
  Search, ArrowLeft, Truck, MapPin, Phone, User, Calendar, CheckCircle2, 
  Clock, Landmark, FileText, Navigation, ArrowRight, ShieldCheck, Mail
} from "lucide-react";
import { motion } from "motion/react";
import { ShippingTracking } from "../types";

// Memory fallback cache in case localStorage is blocked in iframe/sandboxed environments
const memoryCache: Record<string, string> = {};

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("Storage access blocked, using memory cache fallback:", e);
      return memoryCache[key] || null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("Storage writing blocked, using memory cache fallback:", e);
      memoryCache[key] = value;
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("Storage deletion blocked, using memory cache fallback:", e);
      delete memoryCache[key];
    }
  }
};

interface TrackingPageProps {
  initialOrderId?: string;
  initialPhone?: string;
  onNavigate: (page: string) => void;
  showToast: (message: string, type?: "success" | "info") => void;
}

export default function TrackingPage({ initialOrderId = "", initialPhone = "", onNavigate, showToast }: TrackingPageProps) {
  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [phoneInput, setPhoneInput] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingData, setTrackingData] = useState<ShippingTracking | null>(null);

  // Trigger search if initial inputs are provided
  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId, initialPhone);
    }
  }, [initialOrderId, initialPhone]);

  const handleSearch = async (id: string, phone: string) => {
    const trimmedId = id.trim();
    if (!trimmedId) {
      setError("Vui lòng nhập Mã đơn hàng.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const userStr = safeLocalStorage.getItem("cheri_user");
      let orderStatus = "";
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          const matchedOrder = userObj.orders?.find((o: any) => o.id === trimmedId);
          if (matchedOrder && matchedOrder.status) {
            orderStatus = matchedOrder.status;
          }
        } catch (e) {
          console.error("Failed to parse user profile for tracking status syncing:", e);
        }
      }

      const statusQuery = orderStatus ? `&status=${encodeURIComponent(orderStatus)}` : "";
      const response = await fetch(`/api/shipping/track/${encodeURIComponent(trimmedId)}?phone=${encodeURIComponent(phone.trim())}${statusQuery}`);
      if (!response.ok) {
        throw new Error("Không thể kết nối đến hệ thống vận chuyển.");
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setTrackingData(null);
      } else {
        setTrackingData(data);
        
        // Dynamic status check and notifications with existing toast system
        const storedStatuses = safeLocalStorage.getItem("cheri_saved_order_statuses");
        const statusMap = storedStatuses ? JSON.parse(storedStatuses) : {};
        const oldStatus = statusMap[data.orderId];

        if (oldStatus && oldStatus !== data.currentStatus) {
          showToast(`Cập nhật vận trình ${data.orderId}: Đơn hàng vừa chuyển sang "${data.currentStatusText}" 🚀`, "success");
        } else if (!oldStatus) {
          showToast(`Đồng bộ vận đơn ${data.orderId}: Trạng thái hiện tại là "${data.currentStatusText}" 📦`, "success");
        } else {
          showToast(`Trạng thái đơn hàng ${data.orderId}: "${data.currentStatusText}" ✨`, "info");
        }

        // Save new status back to localStorage
        statusMap[data.orderId] = data.currentStatus;
        safeLocalStorage.setItem("cheri_saved_order_statuses", JSON.stringify(statusMap));
      }
    } catch (err: any) {
      setError("Có lỗi xảy ra khi đồng bộ hành trình. Quý cô vui lòng thử lại sau.");
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(orderIdInput, phoneInput);
  };

  // Helper inside tracking UI to render dynamic progress bar
  const statusSteps = [
    { key: "pending", label: "Tiếp nhận" },
    { key: "preparing", label: "Soạn hàng" },
    { key: "shipped", label: "Vận chuyển" },
    { key: "delivering", label: "Đang giao" },
    { key: "delivered", label: "Hoàn tất" }
  ];

  const getStepIndex = (status: string) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  const activeStepIdx = trackingData ? getStepIndex(trackingData.currentStatus) : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      {/* Header and Back Link */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5">
        <div>
          <h1 className="font-sans text-xl font-bold tracking-widest uppercase text-[#74070E] mt-3">
            Theo Dõi Vận Chuyển Đơn Hàng
          </h1>
        </div>
        <div className="p-3 bg-[#74070e]/5 rounded-full hidden sm:block">
          <Truck className="w-8 h-8 text-[#74070e]" />
        </div>
      </div>

      {/* Tra cứu Form */}
      <div className="bg-[#FAF9F5] border border-[#74070e]/10 p-6 md:p-8 rounded-lg mb-10 shadow-[0_4px_24px_rgba(116,7,14,0.02)]">
        <h2 className="text-sm uppercase tracking-widest text-gray-800 font-semibold mb-4 flex items-center">
          <Search className="w-4 h-4 mr-2 text-[#74070e]" /> Tra cứu lịch trình chuyển phát nhanh Chéri
        </h2>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-500 font-medium font-sans">
              Mã Đơn Hàng <span className="text-[#74070e]">*</span>
            </label>
            <input 
              type="text" 
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              placeholder="VD: CR-9582, CR-1024..." 
              required
              className="w-full h-11 bg-white border border-gray-200 px-4 text-[13px] tracking-wide placeholder-gray-300 focus:outline-none focus:border-[#74070e] transition-colors"
            />
          </div>
          <div className="md:col-span-4 space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-500 font-medium font-sans">
              Số Điện Thoại Nhận Hàng
            </label>
            <input 
              type="text" 
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="Nhập SĐT để tự bộ lọc" 
              className="w-full h-11 bg-white border border-gray-200 px-4 text-[13px] tracking-wide placeholder-gray-300 focus:outline-none focus:border-[#74070e] transition-colors"
            />
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#74070e] text-white text-xs uppercase tracking-widest hover:bg-[#520509] transition-all cursor-pointer font-medium flex items-center justify-center space-x-2 shadow-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Đang tra cứu...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Tra cứu đơn</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-gray-400 font-medium">✨ Bấm để tra cứu thử các mẫu vận trình:</span>
          {[
            { id: "CR-9582", label: "Đã giao thành công (CR-9582)", phone: "0881 1880 080" },
            { id: "CR-7312", label: "Đang vận chuyển (CR-7312)", phone: "0881 1880 080" },
            { id: "CR-5621", label: "Đang chuẩn bị (CR-5621)", phone: "0881 1880 080" },
          ].map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                setOrderIdInput(sample.id);
                setPhoneInput(sample.phone);
                handleSearch(sample.id, sample.phone);
              }}
              className="px-2 py-1 bg-white hover:bg-[#74070e] hover:text-white border border-gray-200 hover:border-[#74070e] text-gray-600 font-mono text-[11px] rounded transition-all cursor-pointer active:scale-95"
            >
              {sample.id}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-2 border-red-500 text-red-700 p-4 text-[13px] rounded mb-10 flex items-start space-x-2"
        >
          <span className="font-semibold block mt-0.5">⚠️ Lỗi:</span>
          <p>{error}</p>
        </motion.div>
      )}

      {/* Search results */}
      {trackingData && (
        <div className="space-y-8 animate-fade-up">
          
          {/* Main Status Ribbon */}
          <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#74070e] font-semibold">Trạng thái vận đơn</span>
              <h3 className="text-xl font-normal text-[#74070e] flex items-center">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#74070e] mr-2 animate-pulse"></span>
                {trackingData.currentStatusText}
              </h3>
              <p className="text-xs text-gray-400 font-mono">Mã vận đơn: {trackingData.trackingNumber}</p>
            </div>
            <div className="space-y-1 md:border-l md:border-r md:px-6 border-gray-100">
              <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">Hãng vận chuyển</span>
              <h4 className="text-[13px] font-medium text-gray-800 flex items-center">
                <span className="mr-1">{trackingData.carrierLogo}</span> {trackingData.carrierName}
              </h4>
              <p className="text-xs text-gray-500 font-sans">{trackingData.shippingMethod}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">Thời gian giao hàng dự kiến</span>
              <h4 className="text-[13px] font-mono text-gray-850 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                {trackingData.estimatedDeliveryDate}
              </h4>
              <p className="text-xs text-gray-400">Từ 08:00 đến 18:00 hàng ngày</p>
            </div>
          </div>

          {/* Slim Custom Real-time Progress Bar */}
          <div className="bg-[#FAF9F5]/40 border border-gray-100 p-6 md:p-8 rounded-lg shadow-xs">
            <div className="relative flex items-center justify-between">
              {/* Progress Line */}
              <div className="absolute left-0 right-0 h-0.5 bg-gray-200 top-3.5 -z-10"></div>
              {/* Active Progress Line */}
              <div 
                className="absolute left-0 h-0.5 bg-[#74070e] top-3.5 -z-10 transition-all duration-1000 ease-out"
                style={{ width: `${activeStepIdx >= 0 ? (activeStepIdx / (statusSteps.length - 1)) * 100 : 0}%` }}
              ></div>

              {/* Progress Steps Nodes */}
              {statusSteps.map((step, idx) => {
                const isCompleted = idx <= activeStepIdx;
                const isActive = idx === activeStepIdx;
                return (
                  <div key={step.key} className="flex flex-col items-center">
                    <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all duration-300 ${
                      isActive 
                        ? "bg-[#74070e] text-white border-[#74070e] shadow-[0_0_8px_rgba(116,7,14,0.4)]" 
                        : isCompleted
                          ? "bg-white text-[#74070e] border-[#74070e]" 
                          : "bg-white text-gray-400 border-gray-200"
                    }`}>
                      {isCompleted && !isActive ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    <span className={`text-[11px] uppercase tracking-wider font-sans mt-2 font-medium ${
                      isActive ? "text-[#74070e] font-semibold" : isCompleted ? "text-gray-800" : "text-gray-400"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sơ đồ hành động: Timeline và Bản đồ Vector */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* Left/Middle Column (3/5): Timeline */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-[#74070e] font-semibold flex items-center mb-1">
                <Clock className="w-4 h-4 mr-2" /> Hành trình di chuyển chi tiết
              </h3>

              <div className="relative pl-5 border-l border-gray-200 space-y-6 pt-2">
                {trackingData.timeline.map((item, idx) => {
                  const isLatest = idx === 0;
                  return (
                    <div key={idx} className="relative group">
                      {/* Node Bullet */}
                      <span className={`absolute -left-[26px] top-1.5 w-3 h-3 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                        isLatest 
                          ? "bg-[#74070e] border-[#74070e] ring-4 ring-[#74070e]/20" 
                          : "bg-white border-gray-300"
                      }`} />

                      {/* Header Timeline Node */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-1 gap-1">
                        <span className={`font-medium tracking-wide text-[13px] ${isLatest ? "text-[#74070e] font-semibold" : "text-gray-800"}`}>
                          {item.title}
                        </span>
                        <span className="text-[11px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                          {item.time}
                        </span>
                      </div>

                      {/* Details */}
                      <p className="text-[12px] text-gray-500 leading-relaxed text-justify mb-1">
                        {item.desc}
                      </p>
                      
                      {item.location && (
                        <div className="flex items-center text-[11px] text-gray-400 italic">
                          <MapPin className="w-3 h-3 mr-1" /> {item.location}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (2/5): Shipper và Mini-Map Vector */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Shipper Information Block */}
              {trackingData.currentStatus !== "pending" && trackingData.currentStatus !== "preparing" && (
                <div className="bg-white border border-gray-150 p-5 rounded-lg text-center space-y-4">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold text-left mb-1 flex items-center">
                    <User className="w-3.5 h-3.5 mr-1.5 text-[#74070e]" /> Nhân viên giao hàng
                  </h3>
                  <div className="flex flex-col items-center">
                    <img 
                      src={trackingData.driverImg} 
                      alt={trackingData.driverName} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#74070e]/10 shadow-sm"
                    />
                    <h4 className="text-sm font-medium mt-3 text-gray-900">{trackingData.driverName}</h4>
                    <p className="text-[11px] text-[#74070e] bg-[#74070e]/5 px-2.5 py-0.5 rounded-full mt-1">
                      Đại sứ Giao vận Chéri
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-center items-center">
                    <a 
                      href={`tel:${trackingData.driverPhone}`}
                      className="flex items-center space-x-1.5 text-xs text-gray-700 hover:text-[#74070e] font-mono transition-transform active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#74070e] animate-bounce" />
                      <span>{trackingData.driverPhone}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Vector Animated Route Map */}
              <div className="bg-[#FCFBF9] border border-gray-100 p-5 rounded-lg flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold flex items-center">
                    <Navigation className="w-3.5 h-3.5 mr-1.5 text-[#74070e]" /> Sơ đồ phân phối
                  </h3>
                  <span className="text-[10px] uppercase font-mono text-gray-400">Live GPS</span>
                </div>

                {/* Simulated Map Canvas View */}
                <div className="relative w-full h-[180px] bg-white border border-gray-100 rounded flex items-center justify-center overflow-hidden">
                  {/* Subtle Gridlines Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:16px_16px] opacity-60"></div>
                  
                  {/* Visual Route Line */}
                  <svg className="absolute inset-0 w-full h-full p-4" xmlns="http://www.w3.org/2000/svg">
                    {/* Path from Atelier to Home */}
                    <path 
                      d="M 30 140 Q 100 80 150 90 T 260 40" 
                      fill="none" 
                      stroke="#E5E5E5" 
                      strokeWidth="3" 
                      strokeLinecap="round"
                    />
                    {/* Active completed subpath line */}
                    {activeStepIdx > 1 && (
                      <motion.path 
                        d="M 30 140 Q 100 80 150 90 T 260 40" 
                        fill="none" 
                        stroke="#74070e" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                        strokeDasharray="260"
                        initial={{ strokeDashoffset: 260 }}
                        animate={{ 
                          strokeDashoffset: 260 - (260 * (activeStepIdx - 1) / 3)
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    )}

                    {/* Nodes Pins */}
                    {/* Atelier Pin */}
                    <circle cx="30" cy="140" r="5" fill="#74070e" />
                    {/* Transshipment Hub Hub */}
                    <circle cx="150" cy="90" r="5" fill={activeStepIdx > 2 ? "#74070e" : "#D4C5B9"} />
                    {/* Destination Pin */}
                    <circle cx="260" cy="40" r="5" fill={activeStepIdx === 4 ? "#74070e" : "#D4C5B9"} />
                  </svg>

                  {/* Delivery Car floating along path depending on status */}
                  {activeStepIdx >= 2 && (
                    <motion.div 
                      className="absolute z-10 p-1.5 bg-white rounded-full border border-[#74070e]/20 shadow-[0_2px_8px_rgba(116,7,14,0.15)] text-[#74070e]"
                      initial={{ 
                        left: "30px", 
                        bottom: "140px" 
                      }}
                      animate={{ 
                        left: activeStepIdx === 2 ? "110px" : activeStepIdx === 3 ? "190px" : "245px",
                        bottom: activeStepIdx === 2 ? "75px" : activeStepIdx === 3 ? "115px" : "125px"
                      }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    >
                      <Truck className="w-4 h-4" />
                    </motion.div>
                  )}

                  {/* HTML Labels */}
                  <div className="absolute left-6 bottom-4 text-[9px] uppercase tracking-wide text-gray-500 font-medium bg-white/95 px-1 rounded shadow-xs">
                    Atelier (Q3)
                  </div>
                  <div className="absolute inset-x-0 mx-auto text-center w-18 bottom-12 text-[9px] uppercase tracking-wide text-gray-500 font-medium bg-white/95 px-1 rounded shadow-xs">
                    Phát (T.Đức)
                  </div>
                  <div className="absolute right-5 top-4 text-[9px] uppercase tracking-wide text-gray-800 font-semibold bg-white/95 px-1 rounded shadow-xs border border-[#74070e]/10">
                    Quý cô Chéri
                  </div>
                </div>

                <div className="mt-3.5 space-y-1.5 text-[11px] text-gray-500">
                  <div className="flex items-center justify-between">
                    <span>Kho Gửi:</span>
                    <span className="font-medium text-gray-700">Chéri Atelier (Hồ Chi Minh, Q.3)</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-1.5">
                    <span>Nơi Nhận:</span>
                    <span className="font-medium text-gray-700 truncate max-w-40" title={trackingData.recipientAddress}>
                      {trackingData.recipientAddress}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Secure & Premium Pledge Info Box */}
          <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-[#74070e]/5 rounded-full text-[#74070e] mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[13px] font-semibold text-gray-900 uppercase tracking-wide">Bảo chứng vận chuyển cao cấp</h4>
                <p className="text-xs text-gray-500 leading-relaxed text-justify">
                  Sản phẩm được bảo hiểm hàng hóa 100%. Mở hộp kiểm hàng trước khi ký nhận để tận hưởng chất lượng dịch vụ tốt nhất.
                </p>
              </div>
            </div>
            
            <div className="border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-6 space-y-1 text-xs">
              <p className="font-medium text-gray-800">Cần liên hệ nhanh với Chéri?</p>
              <div className="flex flex-col space-y-1 text-gray-500 mt-1">
                <a href="tel:08811880080" className="hover:text-[#74070e] flex items-center font-mono">
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-[#74070e]" /> 0881 1880 080
                </a>
                <a href="mailto:contact.cheri@gmail.com" className="hover:text-[#74070e] flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-[#74070e]" /> contact.cheri@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* No Data State */}
      {!trackingData && !loading && !error && (
        <div className="text-center py-12 md:py-16 bg-[#FCFBF9]/60 border border-dashed border-gray-200 rounded-lg max-w-xl mx-auto">
          <Truck className="w-12 h-12 text-[#74070e]/40 mx-auto mb-4" />
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-700">Chưa có kết quả truy vấn</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mt-2 leading-relaxed">
            Nhập Mã Đơn hàng Chéri cao cấp của Quý cô ở phía trên để cập nhật tức thì lịch trình và tiến trình vận chuyển theo thời gian thực.
          </p>
        </div>
      )}
    </div>
  );
}
