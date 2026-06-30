import React, { useState } from "react";
import { 
  Sparkles, Search, ShoppingBag, MapPin, 
  CheckCircle2, ArrowRight, ChevronDown, ChevronUp
} from "lucide-react";

interface OrderingGuidePageProps {
  onNavigateToStore: () => void;
}

export default function OrderingGuidePage({ onNavigateToStore }: OrderingGuidePageProps) {
  // State to track which steps are expanded. Let's allow default to empty context, 
  // and click anywhere on the step header to toggle.
  const [openSteps, setOpenSteps] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
    4: false
  });

  const toggleStep = (stepNumber: number) => {
    setOpenSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 animate-fade-in space-y-12 font-sans">
      {/* Header Banner */}
      <div id="ordering-guide-header" className="text-left space-y-2 pb-6 border-b border-gray-100">
        <h2 className="text-[18px] font-sans font-bold text-[#74070E]">Hướng dẫn đặt hàng</h2>
        <div className="h-0.5 w-16 bg-[#74070e]/20 mt-4"></div>
      </div>

      {/* Steps Visual Accordion Layout */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div 
          id="guide-step-1"
          className="rounded-2xl bg-white shadow-xs overflow-hidden transition-all duration-300"
        >
          <button
            type="button"
            onClick={() => toggleStep(1)}
            className="w-full flex items-center justify-between p-5 text-left outline-none cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full border border-[#74070e]/30 bg-[#FCFBF9] text-[#74070e] font-serif flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-105">
                01
              </div>
              <div className="space-y-0.5">
                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-medium">BƯỚC ĐẦU TIÊN</span>
                <h3 className="text-base font-serif text-gray-800 flex items-center space-x-2">
                  <Search className="w-4 h-4 text-[#74070e]" />
                  <span>Khám phá sản phẩm & Chọn lựa sản phẩm</span>
                </h3>
              </div>
            </div>
            <div>
              {openSteps[1] ? (
                <ChevronUp className="w-5 h-5 text-[#74070e]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#74070e] transition-colors" />
              )}
            </div>
          </button>

          {openSteps[1] && (
            <div className="px-5 pb-6 pt-1 border-t border-gray-50 bg-[#FCFBF9]/65 transition-all animate-fade-in space-y-3">
              <p className="text-[14px] font-sans text-gray-600 font-light leading-relaxed">
                Dạo quanh danh mục sản phẩm của <strong>Chéri</strong> tại trang <strong>Cửa hàng</strong> để khám phá các dòng thiết kế thanh lịch độc quyền làm từ chất liệu tơ lụa tự nhiên mượt mà. 
              </p>
              <ul className="text-[14px] font-sans text-gray-500 space-y-1.5 pl-5 list-disc font-light">
                <li>Click chọn sản phẩm để mở xem thông tin chi tiết của mỗi thiết kế.</li>
                <li>Chọn kích cỡ phù hợp nhất với bản thân (Size S, M, L).</li>
                <li>Lựa chọn phân loại màu sắc ưng ý.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Step 2 */}
        <div 
          id="guide-step-2"
          className="rounded-2xl bg-white shadow-xs overflow-hidden transition-all duration-300"
        >
          <button
            type="button"
            onClick={() => toggleStep(2)}
            className="w-full flex items-center justify-between p-5 text-left outline-none cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full border border-[#74070e]/30 bg-[#FCFBF9] text-[#74070e] font-serif flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-105">
                02
              </div>
              <div className="space-y-0.5">
                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-medium font-sans">PHIÊN TẠO LẬP</span>
                <h3 className="text-base font-serif text-gray-800 flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-[#74070e]" />
                  <span>Thêm vào Giỏ hàng & Áp dụng ưu đãi</span>
                </h3>
              </div>
            </div>
            <div>
              {openSteps[2] ? (
                <ChevronUp className="w-5 h-5 text-[#74070e]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#74070e] transition-colors" />
              )}
            </div>
          </button>

          {openSteps[2] && (
            <div className="px-5 pb-6 pt-1 border-t border-gray-50 bg-[#FCFBF9]/65 transition-all animate-fade-in space-y-3">
              <p className="text-[14px] font-sans text-gray-600 font-light leading-relaxed">
                Sau khi chọn xong size và phân loại màu mong muốn, Quý khách bấm nút <strong>"Thêm vào Giỏ hàng"</strong> để lưu trữ sản phẩm trong phiên mua sắm.
              </p>
              <ul className="text-[14px] font-sans text-gray-500 space-y-1.5 pl-5 list-disc font-light">
                <li>Bấm vào biểu tượng Giỏ hàng trên thanh Menu bất cứ lúc nào để kiểm tra danh sách sản phẩm đã đặt.</li>
                <li>Nhập các mã Voucher khuyến mãi (ví dụ: <strong className="text-[#74070e]">CHERIVIP</strong>) để áp dụng đặc quyền giảm giá lên hóa đơn.</li>
                <li>Xác nhận tổng số tiền và số lượng sản phẩm trước khi thanh toán.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Step 3 */}
        <div 
          id="guide-step-3"
          className="rounded-2xl bg-white shadow-xs overflow-hidden transition-all duration-300"
        >
          <button
            type="button"
            onClick={() => toggleStep(3)}
            className="w-full flex items-center justify-between p-5 text-left outline-none cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full border border-[#74070e]/30 bg-[#FCFBF9] text-[#74070e] font-serif flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-105">
                03
              </div>
              <div className="space-y-0.5">
                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-medium font-sans">KÊ KHAI THÔNG TIN</span>
                <h3 className="text-base font-serif text-gray-800 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#74070e]" />
                  <span>Điền biểu mẫu Đặt hàng & Lựa chọn phương thức vận chuyển</span>
                </h3>
              </div>
            </div>
            <div>
              {openSteps[3] ? (
                <ChevronUp className="w-5 h-5 text-[#74070e]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#74070e] transition-colors" />
              )}
            </div>
          </button>

          {openSteps[3] && (
            <div className="px-5 pb-6 pt-1 border-t border-gray-50 bg-[#FCFBF9]/65 transition-all animate-fade-in space-y-3">
              <p className="text-[14px] font-sans text-gray-600 font-light leading-relaxed">
                Bấm nút <strong>"Thanh toán"</strong> để chuyển sang màn hình kê khai thông tin giao nhận một cách an toàn và bảo mật thông tin tối đa.
              </p>
              <ul className="text-[14px] font-sans text-gray-500 space-y-1.5 pl-5 list-disc font-light">
                <li>Cung cấp đầy đủ: Tên, Số điện thoại và Địa chỉ nhận hàng chính xác của Quý khách.</li>
                <li>Chọn hình thức chuyển phát: Giao hàng Tiêu chuẩn (được miễn phí vận chuyển cho hóa đơn từ 1.500.000đ) hoặc Giao hàng Hỏa tốc trong vòng 24 giờ.</li>
                <li>Tick chọn phương thức chi trả phù hợp: Chuyển khoản qua Ngân hàng qua quét mã QR cực nhanh, Trả tiền mặt khi nhận hàng (COD), hay thông qua Ví điện tử, Thẻ quốc tế.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Step 4 */}
        <div 
          id="guide-step-4"
          className="rounded-2xl bg-white shadow-xs overflow-hidden transition-all duration-300"
        >
          <button
            type="button"
            onClick={() => toggleStep(4)}
            className="w-full flex items-center justify-between p-5 text-left outline-none cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full border border-emerald-600/30 bg-[#FCFBF9] text-emerald-600 font-serif flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-105">
                04
              </div>
              <div className="space-y-0.5">
                <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-medium font-sans">XÁC NHẬN</span>
                <h3 className="text-base font-serif text-gray-800 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Xác nhận đơn hàng thành công & Tiếp nhận hành trình</span>
                </h3>
              </div>
            </div>
            <div>
              {openSteps[4] ? (
                <ChevronUp className="w-5 h-5 text-[#74070e]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#74070e] transition-colors" />
              )}
            </div>
          </button>

          {openSteps[4] && (
            <div className="px-5 pb-6 pt-1 border-t border-gray-50 bg-[#FCFBF9]/65 transition-all animate-fade-in space-y-3">
              <p className="text-[14px] font-sans text-gray-600 font-light leading-relaxed">
                Bấm <strong>"ĐẶT HÀNG NGAY"</strong>. Màn hình hóa đơn điện tử sẽ hiển thị mã số đơn hàng cụ thể của bạn.
              </p>
              <ul className="text-[14px] font-sans text-gray-500 space-y-1.5 pl-5 list-disc font-light">
                <li>Khách hàng đã đăng ký tài khoản có thể truy cập bất kỳ lúc nào vào trang <strong>"Hội Viên"</strong> để theo dõi lộ trình và lịch sử tất cả các đơn đặt hàng.</li>
                <li>Chỉ trong vòng 2-4 ngày, hộp sản phẩm bọc lụa tối giản mang thương hiệu Chéri độc quyền sẽ được trao tận tay bạn.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div id="guide-cta" className="bg-[#FAF8F5] border border-[#74070e]/10 p-8 text-center rounded-2xl space-y-4">
        <Sparkles className="w-8 h-8 text-[#74070e] mx-auto animate-pulse" />
        <h4 className="text-base font-serif text-gray-950 font-normal">Sẵn sàng trải nghiệm dịch vụ của Chéri?</h4>
        <p className="text-[14px] font-sans text-gray-400 font-light max-w-md mx-auto leading-relaxed">
          Đội ngũ nghệ nhân và nhân viên tư vấn Chéri luôn túc trực, cam kết mang lại sự hài lòng vượt bậc cho Quý khách.
        </p>
        <button
          onClick={onNavigateToStore}
          className="inline-flex items-center space-x-2 bg-[#74070e] hover:bg-[#5a050a] text-white text-[11px] uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all font-medium cursor-pointer"
        >
          <span>Khám phá bộ sưu tập ngay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
