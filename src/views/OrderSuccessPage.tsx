import React from "react";
import { CheckCircle2, ShoppingBag, ArrowRight, X } from "lucide-react";
import { formatVND } from "../utils";

export default function OrderSuccessPage({
  lastPlacedOrder,
  showRegisterSuggestion,
  onNavigate,
  onCloseRegisterSuggestion,
  onRegisterSubmit,
  regName,
  regEmail,
  regPhone,
  regAddress,
  regPassword,
  regConfirmPassword,
  onSetRegName,
  onSetRegEmail,
  onSetRegPhone,
  onSetRegAddress,
  onSetRegPassword,
  onSetRegConfirmPassword
}: any) {
  const setCurrentPage = onNavigate;
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-fade-in">
            {/* Step Progress Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-250 z-0"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#74070e] transition-all duration-300 z-0"
                  style={{ width: "100%" }}
                ></div>

                {/* Step 1: Cart */}
                <div className="flex flex-col items-center relative z-10 bg-white px-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs bg-[#74070e] text-white font-semibold">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest mt-2.5 font-light text-gray-400">
                    Giỏ hàng
                  </span>
                </div>

                {/* Step 2: Checkout */}
                <div className="flex flex-col items-center relative z-10 bg-white px-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs bg-[#74070e] text-white font-semibold">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest mt-2.5 font-light text-gray-400">
                    Thanh toán
                  </span>
                </div>

                {/* Step 3: Success */}
                <div className="flex flex-col items-center relative z-10 bg-white px-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs bg-[#74070e] text-white ring-4 ring-[#74070e]/10 font-semibold">
                    3
                  </div>
                  <span className="text-[10px] uppercase tracking-widest mt-2.5 font-semibold text-gray-950">
                    Hoàn tất
                  </span>
                </div>
              </div>
            </div>

            {/* Main Receipt Visual Sheet representing high checkout style */}
            <div className="bg-[#FAF8F5] border border-gray-150 rounded-2xl max-w-2xl mx-auto p-8 sm:p-12 text-center space-y-8 shadow-sm">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                <CheckCircle2 className="w-12 h-12 stroke-[1.5]" />
              </div>

              <div className="space-y-3.5">
                <h3 className="text-xl sm:text-2xl font-serif text-gray-950 font-normal">Đơn Hàng Đã Được Xác Nhận</h3>
              </div>

              {/* Receipt Breakdowns */}
              {lastPlacedOrder ? (
                <div className="bg-white border border-gray-100 rounded-xl p-5 text-left text-xs space-y-3 max-w-md mx-auto shadow-sm">
                  <p className="text-[10px] font-semibold border-b border-gray-100 pb-2 text-gray-400 uppercase tracking-wider">Hóa đơn điện tử</p>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-light">Mã đơn hàng:</span>
                    <strong className="text-gray-800 font-mono text-sm uppercase tracking-wider">{lastPlacedOrder.id}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 font-light">Ngày khởi tạo:</span>
                    <span className="text-gray-800 font-medium">{lastPlacedOrder.date}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 font-light">Tên người nhận:</span>
                    <span className="text-gray-800 font-semibold">{checkoutName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 font-light">Số điện thoại:</span>
                    <span className="text-gray-800 font-medium">{checkoutPhone}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400 font-light">Địa chỉ giao hàng:</span>
                    <span className="text-gray-850 font-medium text-right max-w-[200px] truncate-3-lines">{checkoutAddress}</span>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-50 pt-2 text-xs">
                    <span className="text-gray-400 font-light">Trạng thái đơn hàng:</span>
                    <span className="text-emerald-700 bg-emerald-50 py-1 px-2.5 rounded-full font-semibold text-[10px] uppercase tracking-wider flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                      Đang xử lý
                    </span>
                  </div>

                  {orderNote.trim() && (
                    <div className="flex justify-between border-t border-gray-100 pt-2.5">
                      <span className="text-gray-400 font-light flex-shrink-0">Lời dặn nghệ nhân:</span>
                      <span className="text-gray-650 font-light text-right italic break-all">"{orderNote}"</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center border-t border-gray-200/80 pt-3 text-sm">
                    <span className="text-gray-850 font-medium">Tổng thanh toán:</span>
                    <strong className="text-[#74070e] text-base font-semibold font-sans">{formatVND(lastPlacedOrder.total)}</strong>
                  </div>

                  <div className="bg-[#FAF8F5] p-2.5 rounded-lg text-[10.5px] text-gray-500 font-light flex items-center justify-center space-x-2 mt-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Phương thức: <strong>{checkoutPayment === "bank_transfer" ? "Chuyển khoản Ngân hàng" : checkoutPayment === "cod" ? "Thanh toán lúc nhận hàng COD" : checkoutPayment === "e_wallet" ? "Ví điện tử" : "Thẻ quốc tế"}</strong></span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-450">Không tìm thấy thông tin biên nhận</p>
              )}

              {/* Guest account optional suggestion block if not logged in (Requirement #4) */}
              {!isLoggedIn && showRegisterSuggestion && (
                <div className="bg-[#FFFDFB] border border-amber-100 rounded-xl p-5 text-left text-xs max-w-md mx-auto shadow-xs space-y-3 animate-fade-in mt-6">
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-850 font-sans">Bạn có muốn tạo tài khoản để theo dõi đơn hàng dễ dàng hơn không? ✨</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-light">Trở thành Hội viên Chéri để tận hưởng những quyền lợi độc quyền.</p>
                  </div>
                  <div className="flex items-center space-x-3.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        // Pre-fill details for register forms
                        setRegName(checkoutName);
                        setRegEmail(checkoutEmail);
                        setRegPhone(checkoutPhone);
                        setRegAddress(checkoutAddress);
                        // Navigate to registration page
                        setCurrentPage("register");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="bg-[#74070e] hover:bg-[#5a050a] text-white text-[10.5px] uppercase font-medium tracking-wider py-2 px-4 rounded-xl cursor-pointer transition-colors"
                    >
                      Tạo tài khoản
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowRegisterSuggestion(false);
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10.5px] uppercase font-light tracking-wider py-2 px-4 rounded-xl cursor-pointer transition-colors"
                    >
                      Để sau
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons to go home/account */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (lastPlacedOrder) {
                      setTrackingOrderId(lastPlacedOrder.id);
                      setTrackingPhone(lastPlacedOrder.phone || "");
                    }
                    setCurrentPage("tracking");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto bg-gray-800 hover:bg-black text-white text-[11px] uppercase tracking-wider py-3.5 px-6 rounded-xl cursor-pointer transition-colors font-medium border border-transparent"
                >
                  Theo dõi đơn hàng
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("products");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto bg-[#74070e] hover:bg-[#5a050a] text-white text-[11px] uppercase tracking-wider py-3.5 px-6 rounded-xl cursor-pointer transition-all duration-200"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </div>
    </>
  );
}
