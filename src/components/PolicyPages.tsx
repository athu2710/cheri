import React from "react";
import { 
  ShieldCheck, RefreshCw, Truck, ClipboardList, CheckCircle, 
  AlertOctagon, Calendar, HelpCircle, BadgeAlert, Clock, UserCheck, 
  FileText, Lock, Eye, Database, Info, Sparkles 
} from "lucide-react";

/* ------------------------------------------------------------
 * 1. RETURN POLICY PAGE
 * ------------------------------------------------------------ */
export function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 animate-fade-in space-y-12 font-sans">
      {/* Header */}
      <div className="text-left space-y-2 pb-6 border-b border-gray-100">
        <h2 className="text-[18px] font-sans font-bold text-[#74070E]">Chính sách đổi trả</h2>
        <div className="h-0.5 w-16 bg-[#74070e]/20 mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Conditions */}
        <div className="border border-gray-100 bg-white rounded-[20px] p-6 space-y-4 hover:shadow-xs transition-shadow">
          <div className="flex items-center space-x-3 text-[#74070e]">
            <ClipboardList className="w-5 h-5 text-[#74070e]" />
            <h3 className="font-sans font-bold text-[#74070e] text-[16px]">Điều kiện đổi trả</h3>
          </div>
          <ul className="space-y-2.5 text-[14px] font-sans text-gray-600 font-light pl-1">
            <li className="flex items-start space-x-2">
              <span className="text-[#74070e] mt-0.5">•</span>
              <span>Sản phẩm còn nguyên tem mác</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#74070e] mt-0.5">•</span>
              <span>Chưa qua sử dụng hoặc giặt tẩy</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#74070e] mt-0.5">•</span>
              <span>Không có dấu hiệu hư hỏng do người sử dụng</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#74070e] mt-0.5">•</span>
              <span>Yêu cầu đổi trả trong thời hạn quy định</span>
            </li>
          </ul>
        </div>

        {/* Time Limit & Supported Cases */}
        <div className="space-y-6">
          <div className="border border-gray-100 bg-[#FCFBF9] rounded-[20px] p-6 space-y-3">
            <div className="flex items-center space-x-3 text-emerald-700">
              <Clock className="w-5 h-5 text-emerald-700" />
              <h3 className="font-sans font-bold text-emerald-700 text-[16px]">Thời gian đổi trả</h3>
            </div>
            <p className="text-[14px] font-sans text-gray-700 font-medium">
              Trong vòng <span className="text-emerald-700 font-sans font-bold text-[14px]">07 ngày</span> kể từ ngày nhận hàng.
            </p>
          </div>

          <div className="border border-gray-100 bg-white rounded-[20px] p-6 space-y-4 hover:shadow-xs transition-shadow">
            <div className="flex items-center space-x-3 text-emerald-700">
              <CheckCircle className="w-5 h-5 text-emerald-700" />
              <h3 className="font-sans font-bold text-emerald-700 text-[16px]">Trường hợp được hỗ trợ</h3>
            </div>
            <ul className="grid grid-cols-2 gap-2 text-[14px] font-sans text-gray-600 font-light">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>Sai mẫu</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>Sai kích thước</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>Lỗi từ nhà sản xuất</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>Giao thiếu sản phẩm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Exclusions */}
      <div className="border border-red-100/50 bg-[#FCFBF9] rounded-[20px] p-6 space-y-4">
        <div className="flex items-center space-x-3 text-[#74070e]">
          <AlertOctagon className="w-5 h-5 text-[#74070e]" />
          <h3 className="font-sans font-bold text-[#74070e] text-[16px]">Trường hợp không áp dụng</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[14px] font-sans text-gray-600 font-light">
          <div className="bg-white p-3.5 rounded-xl border border-gray-100">
            <span className="block font-sans font-bold text-[#74070e] text-[14px] mb-1">Đã sử dụng</span>
            Sản phẩm đã qua sử dụng, giặt ủi, tẩy gội hoặc có mùi lạ.
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100">
            <span className="block font-sans font-bold text-[#74070e] text-[14px] mb-1">Sản phẩm bị chỉnh sửa</span>
            Khách hàng đã tự chỉnh sửa chi tiết, sửa tay, bóp bo gấu áo hoặc váy.
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-gray-100">
            <span className="block font-sans font-bold text-[#74070e] text-[14px] mb-1">Quá thời hạn</span>
            Thời gian phản hồi đổi trả đã quá thời hạn quy định (07 ngày).
          </div>
        </div>
      </div>

      {/* Workflow */}
      <div className="space-y-4">
        <h3 className="font-sans font-bold text-[#74070e] text-[16px] text-center mb-6">Quy trình đổi trả đơn giản</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: "Bước 1", title: "Liên hệ CHÉRI", desc: "Thông báo yêu cầu hỗ trợ qua Chatbox hoặc Hotline." },
            { step: "Bước 2", title: "Gửi hình ảnh xác nhận", desc: "Cung cấp hình ảnh chi tiết tem mác & lỗi sản phẩm." },
            { step: "Bước 3", title: "Gửi sản phẩm về kho", desc: "Đóng hộp cẩn thận gửi chuyển phát ngược về kho Chéri." },
            { step: "Bước 4", title: "Xử lý đổi hoặc hoàn tiền", desc: "Chéri kiểm hàng và gửi mẫu mới hoặc thanh toán hoàn trả." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 space-y-2 text-center hover:border-[#74070e]/20 transition-all">
              <span className="inline-block text-[11px] uppercase tracking-wider font-semibold text-[#74070e] bg-[#74070e]/5 px-2 py-0.5 rounded-full">{item.step}</span>
              <h4 className="text-[14px] font-sans font-bold text-gray-800">{item.title}</h4>
              <p className="text-[14px] font-sans text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
 * 2. WARRANTY POLICY PAGE
 * ------------------------------------------------------------ */
export function WarrantyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 animate-fade-in space-y-12 font-sans">
      {/* Header */}
      <div className="text-left space-y-2 pb-6 border-b border-gray-100">
        <h2 className="text-[18px] font-sans font-bold text-[#74070E]">Chính sách bảo hành</h2>
        <div className="h-0.5 w-16 bg-[#74070e]/20 mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Scope */}
        <div className="border border-gray-100 bg-white rounded-[20px] p-6 space-y-4">
          <div className="flex items-center space-x-3 text-[#74070e]">
            <ShieldCheck className="w-5 h-5 text-[#74070e]" />
            <h3 className="font-sans font-bold text-[#74070e] text-[16px]">Phạm vi bảo hành</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px] font-sans text-gray-600 font-light pl-1">
            <li className="flex items-center space-x-2 bg-gray-50/50 p-2 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74070e]"></span>
              <span>Lỗi đường may</span>
            </li>
            <li className="flex items-center space-x-2 bg-gray-50/50 p-2 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74070e]"></span>
              <span>Lỗi khóa kéo</span>
            </li>
            <li className="flex items-center space-x-2 bg-gray-50/50 p-2 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74070e]"></span>
              <span>Lỗi khuy nút</span>
            </li>
            <li className="flex items-center space-x-2 bg-gray-50/50 p-2 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74070e]"></span>
              <span>Lỗi từ sản xuất</span>
            </li>
          </ul>
        </div>

        {/* Duration & Condition */}
        <div className="space-y-6">
          <div className="bg-[#FAF8F5] border border-emerald-600/10 rounded-[20px] p-6 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-700">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span className="text-[11px] uppercase tracking-wider font-semibold font-sans">Thời hạn dịch vụ</span>
            </div>
            <h4 className="text-[14px] font-sans font-bold text-gray-900">30 ngày kể từ ngày nhận hàng</h4>
            <p className="text-[14px] font-sans text-gray-400 font-light">Chắp vá tỉ mỉ hoặc phục dựng nguyên bộ cho quý cô.</p>
          </div>

          <div className="border border-gray-100 bg-white rounded-[20px] p-6 space-y-3.5">
            <h3 className="font-sans font-bold text-emerald-700 text-[16px] flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>Điều kiện bảo hành</span>
            </h3>
            <ul className="space-y-2 text-[14px] font-sans text-gray-500 font-light">
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span>Có thông tin hóa đơn đơn hàng ghi nhận</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span>Sản phẩm thuộc danh mục được quy định bảo hành</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Exclusions */}
      <div className="border border-gray-100 bg-[#FCFBF9] rounded-[20px] p-6 space-y-4">
        <div className="flex items-center space-x-3 text-[#74070e]">
          <BadgeAlert className="w-5 h-5 text-[#74070e]" />
          <h3 className="font-sans font-bold text-[#74070e] text-[16px]">Trường hợp từ chối bảo hành</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[14px] font-sans text-gray-600 font-light">
          <p className="bg-white p-3.5 rounded-xl border border-gray-100/60 shadow-2xs">
            Hư hỏng do sử dụng không đúng hướng dẫn (ví dụ giặt máy đối với lụa tự nhiên mỏng nhạy cảm).
          </p>
          <p className="bg-white p-3.5 rounded-xl border border-gray-100/60 shadow-2xs">
            Khách hàng tự ý chỉnh sửa thiết kế tại các tiệm giặt là sửa đồ ngoài Chéri.
          </p>
          <p className="bg-white p-3.5 rounded-xl border border-gray-100/60 shadow-2xs">
            Hư hỏng do tác động vật lý mạnh từ môi trường ngoài như cào rách, cháy nổ, ẩm mốc nặng.
          </p>
        </div>
      </div>

      {/* Process list */}
      <div className="space-y-4 text-center">
        <h3 className="font-sans font-bold text-[#74070e] text-[16px] text-center mb-6">Quy trình xử lý bảo hành</h3>
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          {["Tiếp nhận yêu cầu", "Kiểm tra sản phẩm", "Xử lý bảo hành", "Gửi lại khách hàng"].map((p, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-white border border-gray-150 rounded-xl px-5 py-3 shadow-3xs text-[14px] font-sans font-light text-gray-800">
                {p}
              </div>
              {idx < 3 && <div className="hidden sm:block text-gray-300">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
 * 3. PRIVACY POLICY PAGE
 * ------------------------------------------------------------ */
export function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 animate-fade-in space-y-12 font-sans">
      {/* Header */}
      <div className="text-left space-y-2 pb-6 border-b border-gray-100">
        <h2 className="text-[18px] font-sans font-bold text-[#74070E]">Chính sách bảo mật</h2>
        <div className="h-0.5 w-16 bg-[#74070e]/20 mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Collected */}
        <div className="border border-gray-100 bg-white rounded-[20px] p-6 space-y-4 hover:shadow-2xs transition-all">
          <div className="flex items-center space-x-3 text-[#74070e]">
            <Database className="w-5 h-5 text-[#74070e]" />
            <h3 className="font-sans font-bold text-[#74070e] text-[16px]">Thông tin được thu thập</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[14px] font-sans text-gray-600 font-light">
            <div className="bg-gray-50/50 p-2.5 rounded-lg">⚜️ Họ tên</div>
            <div className="bg-gray-50/50 p-2.5 rounded-lg">✉️ Email</div>
            <div className="bg-gray-50/50 p-2.5 rounded-lg">📞 Số điện thoại</div>
            <div className="bg-gray-50/50 p-2.5 rounded-lg">📍 Địa chỉ giao hàng</div>
            <div className="col-span-2 bg-gray-50/50 p-2.5 rounded-lg text-center">📦 Lịch sử đơn hàng</div>
          </div>
        </div>

        {/* Purpose */}
        <div className="border border-gray-100 bg-white rounded-[20px] p-6 space-y-4 hover:shadow-2xs transition-all">
          <div className="flex items-center space-x-3 text-[#74070e]">
            <FileText className="w-5 h-5 text-[#74070e]" />
            <h3 className="font-sans font-bold text-[#74070e] text-[16px]">Mục đích sử dụng</h3>
          </div>
          <ul className="space-y-2 text-[14px] font-sans text-gray-600 font-light">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#74070e] rounded-full"></span>
              <span>Xử lý & giao nhận đơn hàng</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#74070e] rounded-full"></span>
              <span>Hỗ trợ Chăm sóc khách hàng ưu việt</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#74070e] rounded-full"></span>
              <span>Cải thiện trải nghiệm mua sắm website</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#74070e] rounded-full"></span>
              <span>Gửi thông tin ưu đãi hấp dẫn (sau khi được Quý cô đồng ý)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Cam ket & Cookies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FCFBF9] rounded-[20px] p-6 border border-gray-100 text-[14px] font-sans font-light text-gray-600">
        <div className="space-y-2.5 border-b md:border-b-0 md:border-r border-gray-200/60 pb-4 md:pb-0 md:pr-6">
          <h4 className="font-sans font-bold text-emerald-700 text-[15px] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Cam kết bảo mật</span>
          </h4>
          <p className="leading-relaxed">
            Tuyệt đối không bán dữ liệu khách hàng. Không chia sẻ thông tin trái phép cho bất kỳ bên thứ ba nào nằm ngoài luồng vận hành chuyển phát bắt buộc.
          </p>
        </div>
        <div className="space-y-2.5 md:pl-6 pt-4 md:pt-0">
          <h4 className="font-sans font-bold text-emerald-700 text-[15px] flex items-center space-x-1.5">
            <Eye className="w-3.5 h-3.5 text-emerald-700" />
            <span>Chính sách Cookies</span>
          </h4>
          <p className="leading-relaxed">
            Sử dụng cookies thông minh tự phục vụ nhằm ghi nhớ tùy chọn, giỏ hàng hiện thời để nâng cao tối đa tốc độ tải trang dữ liệu khách hàng.
          </p>
        </div>
      </div>

      {/* Customer Rights */}
      <div className="border border-gray-100 rounded-[20px] p-6 space-y-4 bg-white">
        <h3 className="font-sans font-bold text-[#74070e] text-[16px]">Quyền của khách hàng đối với thông tin cá nhân</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[14px] font-sans font-light text-gray-500">
          <div className="border border-gray-100 rounded-xl p-4 space-y-1 hover:bg-[#FAF8F5] transition-colors">
            <span className="block font-sans font-bold text-gray-900 text-[14px]">Xem dữ liệu cá nhân</span>
            Quý khách có quyền truy vấn tất cả thông tin hồ sơ của mình trên hệ thống.
          </div>
          <div className="border border-gray-100 rounded-xl p-4 space-y-1 hover:bg-[#FAF8F5] transition-colors">
            <span className="block font-sans font-bold text-gray-900 text-[14px]">Yêu cầu chỉnh sửa</span>
            Cập nhật lại nhanh chóng địa chỉ, số điện thoại, mật mã bất kỳ lúc nào.
          </div>
          <div className="border border-gray-150 rounded-xl p-4 space-y-1 hover:bg-[#FAF8F5] transition-colors">
            <span className="block font-sans font-bold text-emerald-700 text-[14px]">Yêu cầu xóa dữ liệu</span>
            Yêu cầu Chéri giải trừ thông tin tài khoản nếu không còn nhu cầu mua sắm.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
 * 4. SHIPPING POLICY PAGE
 * ------------------------------------------------------------ */
export function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 animate-fade-in space-y-12 font-sans">
      {/* Header */}
      <div className="text-left space-y-2 pb-6 border-b border-gray-100">
        <h2 className="text-[18px] font-sans font-bold text-[#74070E]">Chính sách vận chuyển & giao hàng</h2>
        <div className="h-0.5 w-16 bg-[#74070e]/20 mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Region */}
        <div className="bg-white border border-gray-100 p-6 rounded-[20px] text-center space-y-2">
          <span className="text-[11px] tracking-wider font-mono text-[#74070e] uppercase font-bold">PHẠM VI ĐỊA LÝ</span>
          <h4 className="font-sans font-bold text-gray-900 text-[14px]">Khu vực giao hàng</h4>
          <p className="text-[14px] font-sans text-emerald-700 font-serif font-semibold">TOÀN QUỐC</p>
        </div>

        {/* Time */}
        <div className="bg-white border border-gray-100 p-6 rounded-[20px] text-center space-y-2">
          <span className="text-[11px] tracking-wider font-mono text-[#74070e] uppercase font-bold">HÀNH TRÌNH CHUẨN</span>
          <h4 className="font-sans font-bold text-gray-900 text-[14px]">Thời gian giao hàng</h4>
          <div className="text-[14px] font-sans text-gray-600 font-light space-y-1">
            <p>🏙️ Nội thành: <strong className="text-gray-900">1–2 ngày làm việc</strong></p>
            <p>✈️ Toàn quốc: <strong className="text-gray-900">2–4 ngày làm việc</strong></p>
          </div>
        </div>

        {/* Fees */}
        <div className="bg-white border border-gray-100 p-6 rounded-[20px] text-center space-y-2">
          <span className="text-[11px] tracking-wider font-mono text-[#74070e] uppercase font-bold">BIỂU PHÍ DỊCH VỤ</span>
          <h4 className="font-sans font-bold text-gray-900 text-[14px]">Phí vận chuyển</h4>
          <p className="text-[14px] font-sans text-gray-600 font-light leading-relaxed">
            Được hiển thị minh bạch tại bước thanh toán trước khi Quý khách xác nhận mua sắm.
          </p>
        </div>
      </div>

      {/* Priority Service */}
      <div className="border border-amber-100/60 bg-[#FCFBF9] rounded-[20px] p-6 space-y-4">
        <div className="flex items-center space-x-3 text-[#74070e]">
          <Sparkles className="w-5 h-5 text-[#74070e] animate-pulse" />
          <h3 className="font-sans font-bold text-[#74070e] text-[16px]">Dịch vụ giao hàng ưu tiên — Chéri Priority</h3>
        </div>
        <p className="text-[14px] font-sans text-gray-600 font-light leading-relaxed">
          Đơn hàng sẽ được lọc xử lý khẩn trương, bao bọc hộp lụa mướt và giao gửi nhanh chóng bậc nhất tương ứng phù hợp theo từng khu vực hỗ trợ cố định.
        </p>
      </div>

      {/* Exceptions & Inspections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px] font-sans text-gray-500 font-light">
        <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-2">
          <h4 className="font-sans font-bold text-emerald-700 text-[15px] flex items-center space-x-2">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Kiểm tra hàng hóa</span>
          </h4>
          <p className="leading-relaxed">
            Khách hàng vui lòng kiểm tra kĩ tình trạng nguyên vẹn kiện hộp của gói hàng trước khi nhận từ nhân viên chuyển phát.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-2">
          <h4 className="font-sans font-bold text-[#74070e] text-[15px] flex items-center space-x-2">
            <Info className="w-4 h-4 text-[#74070e]" />
            <span>Trường hợp giao hàng chậm</span>
          </h4>
          <p className="leading-relaxed">
            Nếu có nguyên do bất khả kháng (bão lụt, sự cố vận chuyển), CHÉRI sẽ chủ động liên hệ và liên tục cập nhật cụ thể hành trình cho Quý khách.
          </p>
        </div>
      </div>
    </div>
  );
}
