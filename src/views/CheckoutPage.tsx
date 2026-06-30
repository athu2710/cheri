import React from "react";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";
import { formatVND } from "../utils";

export default function CheckoutPage({
  selectedCartItems,
  checkoutName,
  checkoutPhone,
  checkoutAddress,
  checkoutEmail,
  orderNote,
  checkoutPayment,
  shippingMethod,
  totalCalculated,
  appliedDiscount,
  onSetCheckoutName,
  onSetCheckoutPhone,
  onSetCheckoutAddress,
  onSetCheckoutEmail,
  onSetOrderNote,
  onSetCheckoutPayment,
  onSetShippingMethod,
  onPlaceOrder,
  onNavigate,
  showRegisterSuggestion
}: any) {
  const setCurrentPage = onNavigate;
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-fade-in">
            {/* Step Progress Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-200 z-0"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#74070e] transition-all duration-300 z-0"
                  style={{ width: "50%" }}
                ></div>

                {/* Step 1: Cart */}
                <div className="flex flex-col items-center relative z-10 bg-white px-4">
                  <button 
                    onClick={() => {
                      setCurrentPage("cart");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs bg-[#74070e] text-white font-semibold cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </button>
                  <span className="text-[10px] uppercase tracking-widest mt-2.5 font-light text-gray-400">
                    Giỏ hàng
                  </span>
                </div>

                {/* Step 2: Checkout */}
                <div className="flex flex-col items-center relative z-10 bg-white px-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs bg-[#74070e] text-white ring-4 ring-[#74070e]/10 font-semibold">
                    2
                  </div>
                  <span className="text-[10px] uppercase tracking-widest mt-2.5 font-semibold text-gray-950">
                    Thanh toán
                  </span>
                </div>

                {/* Step 3: Success */}
                <div className="flex flex-col items-center relative z-10 bg-white px-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs bg-white border border-gray-200 text-gray-400 font-light">
                    3
                  </div>
                  <span className="text-[10px] uppercase tracking-widest mt-2.5 font-light text-gray-400">
                    Hoàn tất
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 border-b border-gray-100 pb-5 mb-8 text-center sm:text-left">
              Đặt hàng &amp; Thanh toán dịch vụ
            </h2>

            {selectedCartItems.length > 0 ? (
              <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Form fields & options (7 Columns) */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Delivery details receiver card */}
                  <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
                    <h3 className="text-base uppercase tracking-widest font-semibold text-gray-900 border-l-2 border-[#74070e] pl-3 flex items-center space-x-2">
                      <User className="w-4 h-4 text-[#74070e]" />
                      <span>Thông tin giao nhận hàng</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-medium">Họ tên chị *</label>
                        <input
                          type="text"
                          required
                          value={checkoutName}
                          onChange={(e) => setCheckoutName(e.target.value)}
                          placeholder="Nhập họ & tên đầy đủ"
                          className="w-full bg-gray-50/50 border border-gray-100 focus:border-amber-800/40 focus:bg-white outline-none text-xs px-3.5 py-3 rounded-xl text-gray-800 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-medium">Số điện thoại liên lạc *</label>
                        <input
                          type="tel"
                          required
                          value={checkoutPhone}
                          onChange={(e) => setCheckoutPhone(e.target.value)}
                          placeholder="Số di động nhận sản phẩm"
                          className="w-full bg-gray-50/50 border border-gray-100 focus:border-amber-800/40 focus:bg-white outline-none text-xs px-3.5 py-3 rounded-xl text-gray-800 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-medium">Địa chỉ thư điện tử (Email) *</label>
                        <input
                          type="email"
                          required
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          placeholder="Địa chỉ email để nhận thư thông báo đơn"
                          className="w-full bg-gray-50/50 border border-gray-100 focus:border-amber-800/40 focus:bg-white outline-none text-xs px-3.5 py-3 rounded-xl text-gray-800 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-medium">Địa chỉ giao hàng chi tiết *</label>
                        <textarea
                          required
                          value={checkoutAddress}
                          onChange={(e) => setCheckoutAddress(e.target.value)}
                          rows={3}
                          placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                          className="w-full bg-gray-50/50 border border-gray-100 focus:border-amber-800/40 focus:bg-white outline-none text-xs px-3.5 py-3 rounded-xl text-gray-800 transition-colors resize-none leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-medium">Ghi chú gửi đơn hàng (Tùy chọn)</label>
                        <textarea
                          value={orderNote}
                          onChange={(e) => setOrderNote(e.target.value)}
                          rows={2}
                          placeholder="Chỉ dẫn giao giờ hành chính, lời nhắn đóng gói đặc biệt..."
                          className="w-full bg-gray-50/50 border border-gray-100 focus:border-amber-800/40 focus:bg-white outline-none text-xs px-3.5 py-3 rounded-xl text-gray-800 transition-colors resize-none leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping option card selection */}
                  <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
                    <h3 className="text-base uppercase tracking-widest font-semibold text-gray-900 border-l-2 border-[#74070e] pl-3 flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-[#74070e]" />
                      <span>HÌNH THỨC GIAO HÀNG</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Standard Box */}
                      <div 
                        onClick={() => setShippingMethod("standard")}
                        className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                          shippingMethod === "standard" 
                            ? "bg-amber-50/10 border-amber-800/40 ring-1 ring-amber-800/20" 
                            : "bg-white border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-850 uppercase tracking-wider">Tiêu chuẩn</span>
                          <span className="text-xs font-semibold text-[#74070e]">
                            {totalCalculated.subtotal >= 1500000 ? "0đ" : "30.000đ"}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                          Thời gian giao hàng dự kiến từ 2–4 ngày làm việc trên toàn quốc.
                        </p>
                        {totalCalculated.subtotal >= 1500000 && (
                          <div className="mt-3.5 text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm self-start uppercase tracking-wider font-semibold">Ưu đãi miễn phí</div>
                        )}
                      </div>

                      {/* Express Box */}
                      <div 
                        onClick={() => setShippingMethod("express")}
                        className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                          shippingMethod === "express" 
                            ? "bg-amber-50/10 border-amber-800/40 ring-1 ring-amber-800/20" 
                            : "bg-white border-gray-100 hover:border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-850 uppercase tracking-wider">Hỏa tốc</span>
                          <span className="text-xs font-semibold text-[#74070e]">50.000đ</span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                          Ưu tiên xử lý và vận chuyển trong vòng 24 giờ.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment choice box */}
                  <div className="bg-white border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
                    <h3 className="text-base uppercase tracking-widest font-semibold text-gray-900 border-l-2 border-[#74070e] pl-3 flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-[#74070e]" />
                      <span>Phương thức chi trả</span>
                    </h3>

                    <div className="space-y-3">
                      {/* Bank transfer */}
                      <label className={`flex items-start space-x-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                        checkoutPayment === "bank_transfer" ? "border-amber-800/30 bg-amber-50/5" : "border-gray-100 hover:border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="bank_transfer"
                          checked={checkoutPayment === "bank_transfer"}
                          onChange={() => setCheckoutPayment("bank_transfer")}
                          className="accent-[#74070e] mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Chuyển khoản Ngân hàng</span>
                          <p className="text-[11px] text-gray-400 font-light leading-relaxed">Chuyển tới tài khoản Chéri (Quét mã QR cực nhanh, bảo mật và hoàn toàn miễn phí giao dịch).</p>
                        </div>
                      </label>

                      {/* COD */}
                      <label className={`flex items-start space-x-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                        checkoutPayment === "cod" ? "border-amber-800/30 bg-amber-50/5" : "border-gray-100 hover:border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={checkoutPayment === "cod"}
                          onChange={() => setCheckoutPayment("cod")}
                          className="accent-[#74070e] mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Giao tiền mặt tận tay (COD)</span>
                          <p className="text-[11px] text-gray-400 font-light leading-relaxed">Thanh toán trực tiếp cho đơn vị vận chuyển khi nhận hàng.</p>
                        </div>
                      </label>

                      {/* MoMo / ZaloPay */}
                      <label className={`flex items-start space-x-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                        checkoutPayment === "e_wallet" ? "border-amber-800/30 bg-amber-50/5" : "border-gray-100 hover:border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="e_wallet"
                          checked={checkoutPayment === "e_wallet"}
                          onChange={() => setCheckoutPayment("e_wallet")}
                          className="accent-[#74070e] mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Ví điện tử hiện đại (MoMo, ZaloPay, ShopeePay)</span>
                          <p className="text-[11px] text-gray-455 font-light leading-relaxed">Thanh toán nhanh chóng chỉ với một chạm.</p>
                        </div>
                      </label>

                      {/* International Card */}
                      <label className={`flex items-start space-x-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                        checkoutPayment === "credit_card" ? "border-amber-800/30 bg-amber-50/5" : "border-gray-100 hover:border-gray-200"
                      }`}>
                        <input
                          type="radio"
                          name="payment"
                          value="credit_card"
                          checked={checkoutPayment === "credit_card"}
                          onChange={() => setCheckoutPayment("credit_card")}
                          className="accent-[#74070e] mt-0.5"
                        />
                        <div className="space-y-0.5">
                          <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Thẻ quốc tế (Visa, Mastercard, JCB, Amex)</span>
                          <p className="text-[11px] text-gray-455 font-light leading-relaxed">Thanh toán trực tuyến bằng thẻ quốc tế.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Selected Products & Order Summary (5 Columns) */}
                <div className="lg:col-span-5 bg-[#FCFBF9] border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-lg font-serif text-gray-950 font-medium border-b border-gray-100 pb-3">Chi tiết thanh toán</h3>
                  
                  {/* Selected products breakdown */}
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 divide-y divide-gray-100">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Thiết kế được lựa chọn ({selectedCartItems.length})</p>
                    {selectedCartItems.map((item) => (
                      <div key={item.id} className="flex space-x-3 pt-3.5">
                        <div className="w-12 h-16 bg-white border border-gray-150 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-0.5 min-w-0">
                          <h4 className="text-xs font-medium text-gray-800 truncate">{item.product.name}</h4>
                          <div className="text-[10px] text-gray-400 font-light flex items-center space-x-2">
                            <span>S.Lượng: <strong>x{item.quantity}</strong></span>
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && (
                              <span className="flex items-center space-x-1">
                                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color.hex }}></span>
                                <span>{item.color.name}</span>
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-semibold text-[#74070e]">{formatVND(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations Sheet */}
                  <div className="space-y-3.5 text-xs font-light text-gray-600 border-t border-b border-gray-200/80 py-5">
                    <div className="flex justify-between">
                      <span>Cộng gốc hàng</span>
                      <span className="text-gray-800 font-normal">{formatVND(selectedCartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0))}</span>
                    </div>

                    {appliedDiscount && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Chiết khấu hoàng gia</span>
                        <span>-{formatVND(totalCalculated.discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Thuế giá trị phần trăm (VAT 8%)</span>
                      <span className="text-gray-800 font-normal">{formatVND(totalCalculated.tax)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Phí hộp vương vận ({shippingMethod === "express" ? "Hỏa tốc" : "Tiêu chuẩn"})</span>
                      {totalCalculated.shipping === 0 ? (
                        <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">MIỄN PHÍ</span>
                      ) : (
                        <span className="text-gray-800 font-normal">{formatVND(totalCalculated.shipping)}</span>
                      )}
                    </div>
                  </div>

                  {/* Final Total */}
                  <div className="flex justify-between items-center text-gray-900 pb-3">
                    <span className="text-sm tracking-wide font-medium">Tổng quý thanh toán</span>
                    <span className="text-2xl font-semibold text-[#74070e] font-sans">{formatVND(totalCalculated.final)}</span>
                  </div>

                  {/* Trigger buttons */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#74070e] hover:bg-[#5a050a] text-white text-xs uppercase tracking-widest py-4.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2.5 cursor-pointer font-medium active:scale-[0.99]"
                    >
                      <ShoppingBag className="w-4.5 h-4.5" />
                      <span>HOÀN TẤT ĐẶT HÀNG</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage("cart");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full text-center text-xs text-gray-500 hover:text-black py-2 underline transition-colors cursor-pointer"
                    >
                      Quay về giỏ hàng kiểm tra thiết kế
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-24 bg-[#FCFBF9] rounded-2xl max-w-lg mx-auto space-y-4">
                <p className="text-xs text-gray-400">Không có cấu trúc sản phẩm thanh toán</p>
                <button onClick={() => setCurrentPage("products")} className="text-xs text-[#74070e] underline">Tiếp tục dạo shop</button>
              </div>
            )}
          </div>
    </>
  );
}
