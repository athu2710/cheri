import React from "react";
import { ArrowRight, ShoppingBag, Truck, RefreshCw, ShieldCheck, Plus, Minus, Check, Trash2 } from "lucide-react";
import { CartItem } from "../types";
import { formatVND } from "../utils/format";

interface CartPageProps {
  cart: CartItem[];
  selectedCartItemIds: string[];
  selectedCartItems: CartItem[];
  totalCalculated: {
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    final: number;
  };
  appliedDiscount: { code: string; percent: number } | null;
  promoCode: string;
  onSetPromoCode: (code: string) => void;
  onApplyPromo: (e: React.MouseEvent) => void;
  onUpdateQuantity: (itemId: string, increase: boolean) => void;
  onRemoveFromCart: (itemId: string) => void;
  onSetSelectedCartItemIds: (ids: string[]) => void;
  onNavigate: (page: string) => void;
  showToast: (msg: string, type?: "success" | "info") => void;
}

export default function CartPage({
  cart,
  selectedCartItemIds,
  selectedCartItems,
  totalCalculated,
  appliedDiscount,
  promoCode,
  onSetPromoCode,
  onApplyPromo,
  onUpdateQuantity,
  onRemoveFromCart,
  onSetSelectedCartItemIds,
  onNavigate,
  showToast,
}: CartPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-fade-in">
      {/* Step Progress Bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-200 z-0"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#74070e] transition-all duration-300 z-0"
            style={{ width: "0%" }}
          ></div>

          {/* Step 1: Cart */}
          <div className="flex flex-col items-center relative z-10 bg-white px-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs bg-[#74070e] text-white ring-4 ring-[#74070e]/10 font-semibold">
              1
            </div>
            <span className="text-[10px] uppercase tracking-widest mt-2.5 font-semibold text-gray-950">
              Giỏ hàng
            </span>
          </div>

          {/* Step 2: Checkout */}
          <div className="flex flex-col items-center relative z-10 bg-white px-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs bg-white border border-gray-200 text-gray-400 font-light">
              2
            </div>
            <span className="text-[10px] uppercase tracking-widest mt-2.5 font-light text-gray-400">
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

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart list (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Select All Checkbox header */}
            <div className="flex items-center justify-between bg-gray-50/80 p-4 border border-gray-100 rounded-xl">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={cart.length > 0 && selectedCartItemIds.length === cart.length}
                  onChange={() => {
                    if (selectedCartItemIds.length === cart.length) {
                      onSetSelectedCartItemIds([]);
                    } else {
                      onSetSelectedCartItemIds(cart.map(item => item.id));
                    }
                  }}
                  className="w-4 h-4 accent-[#74070e] rounded cursor-pointer"
                />
                <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider">Chọn tất cả ({cart.length} sản phẩm)</span>
              </label>
              
              {selectedCartItemIds.length > 0 && (
                <button 
                  onClick={() => {
                    cart.filter(item => selectedCartItemIds.includes(item.id)).forEach(item => onRemoveFromCart(item.id));
                    onSetSelectedCartItemIds([]);
                    showToast("Đã xóa các sản phẩm được chọn khỏi giỏ hàng", "info");
                  }}
                  className="text-xs text-red-700 hover:underline flex items-center space-x-1 font-light cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa mục đã chọn ({selectedCartItemIds.length})</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {cart.map((item) => {
                const isSelected = selectedCartItemIds.includes(item.id);
                return (
                  <div 
                    key={item.id} 
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between border border-gray-100 p-4 rounded-xl pb-5 gap-4 transition-all duration-200 ${
                      isSelected ? "bg-amber-50/10 border-amber-800/10" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                      <input 
                        type="checkbox" 
                        checked={isSelected}
                        onChange={() => {
                          if (isSelected) {
                            onSetSelectedCartItemIds(selectedCartItemIds.filter(id => id !== item.id));
                          } else {
                            onSetSelectedCartItemIds([...selectedCartItemIds, item.id]);
                          }
                        }}
                        className="w-4 h-4 accent-[#74070e] rounded cursor-pointer flex-shrink-0"
                      />
                      <div className="w-20 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm font-medium text-gray-850 limit-lines-1">{item.product.name}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400 font-light">
                          {item.classification && (
                            <span>Phân loại: <strong className="text-gray-700 font-semibold">{item.classification}</strong></span>
                          )}
                          {item.size && (
                            <span>Size: <strong className="text-gray-700 font-semibold">{item.size}</strong></span>
                          )}
                          {item.color && (
                            <span className="flex items-center space-x-1">
                              <span>Màu:</span>
                              <span className="inline-block w-2 H-2 rounded-full border border-gray-200" style={{ backgroundColor: item.color.hex }}></span>
                              <strong className="text-gray-700 font-semibold">{item.color.name}</strong>
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#74070e] pt-1">{formatVND(item.product.price)}</p>
                      </div>
                    </div>

                    {/* Adjust quantity and actions */}
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-8 sm:space-x-12 pl-8 sm:pl-0">
                      <div className="flex items-center border border-gray-200 rounded-full h-8 overflow-hidden bg-white">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, false)}
                          className="px-2.5 text-gray-400 hover:bg-gray-50 hover:text-black cursor-pointer h-full"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-medium w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, true)}
                          className="px-2.5 text-gray-400 hover:bg-gray-50 hover:text-black cursor-pointer h-full"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right flex items-center space-x-4">
                        <span className="text-xs font-semibold text-gray-800 hidden sm:inline">{formatVND(item.product.price * item.quantity)}</span>
                        <button 
                          onClick={() => onRemoveFromCart(item.id)}
                          className="p-1 px-1.5 rounded-full hover:bg-red-50 hover:text-red-700 text-gray-400 cursor-pointer"
                          title="Xóa khỏi giỏ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust factors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-[11px] text-gray-400 font-light uppercase tracking-wider text-center sm:text-left">
              <div className="flex items-center space-x-2.5 justify-center sm:justify-start">
                <Truck className="w-5 h-5 text-[#74070e]/80" />
                <span>GIAO HÀNG TOÀN QUỐC</span>
              </div>
              <div className="flex items-center space-x-2.5 justify-center sm:justify-start">
                <RefreshCw className="w-4.5 h-4.5 text-[#74070e]/80" />
                <span>7 NGÀY ĐỔI TRẢ</span>
              </div>
              <div className="flex items-center space-x-2.5 justify-center sm:justify-start">
                <ShieldCheck className="w-4.5 h-4.5 text-[#74070e]/80" />
                <span>BẢO HÀNH 30 NGÀY</span>
              </div>
            </div>
          </div>

          {/* Checkout Panel (5 Columns) */}
          <div className="lg:col-span-5 bg-[#FCFBF9] border border-gray-100 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-serif text-gray-950 font-medium border-b border-gray-100 pb-3">Tạm tính đơn hàng</h3>
            
            {/* Calculation sheet */}
            <div className="space-y-3.5 text-xs font-light text-gray-600 border-b border-gray-200/80 pb-5">
              <div className="flex justify-between">
                <span>Cộng gốc ({selectedCartItems.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm được chọn)</span>
                <span className="text-gray-800 font-normal">{formatVND(totalCalculated.subtotal)}</span>
              </div>

              {appliedDiscount && (
                <div className="flex justify-between text-emerald-700">
                  <span>Chiết khấu hoàng gia ({appliedDiscount.code} -{appliedDiscount.percent}%)</span>
                  <span>-{formatVND(totalCalculated.discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Thuế giá trị phần trăm (VAT 8%)</span>
                <span className="text-gray-800 font-normal">{formatVND(totalCalculated.tax)}</span>
              </div>

              <div className="flex justify-between">
                <span>Ước chi phí vận chuyển</span>
                {selectedCartItems.length === 0 ? (
                  <span>0đ</span>
                ) : totalCalculated.shipping === 0 ? (
                  <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">MIỄN PHÍ</span>
                ) : (
                  <span className="text-gray-800 font-normal">{formatVND(totalCalculated.shipping)}</span>
                )}
              </div>
              {totalCalculated.subtotal > 0 && totalCalculated.subtotal < 1500000 && (
                <p className="text-[10px] text-gray-400 italic font-mono text-right">Mua thêm {formatVND(1500000 - totalCalculated.subtotal)} để được MIỄN PHÍ vận chuyển tiêu chuẩn</p>
              )}
            </div>

            {/* Final Total */}
            <div className="flex justify-between items-center text-gray-900 border-b border-gray-200/80 pb-5">
              <span className="text-sm tracking-wide">Tổng tạm tính</span>
              <span className="text-xl font-semibold text-[#74070e] font-sans">{formatVND(totalCalculated.final)}</span>
            </div>

            {/* Coupon Area form */}
            <div className="space-y-3 pb-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => onSetPromoCode(e.target.value)}
                  placeholder="Mã ưu đãi (Ví dụ: CHERIVIP)"
                  className="flex-1 bg-white border border-gray-200 rounded-lg text-xs px-3 py-2 outline-none text-gray-800 placeholder:text-gray-400 focus:border-amber-800/40"
                />
                <button
                  type="button"
                  onClick={(e) => onApplyPromo(e as any)}
                  className="bg-gray-800 hover:bg-black text-white text-[10px] uppercase tracking-widest font-light px-4 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Áp dụng
                </button>
              </div>
              <p className="text-[10px] text-gray-400 font-mono">* Mã <span className="text-[#74070e] font-semibold font-sans">CHERIVIP</span> (giảm 10%) hoặc <span className="text-[#74070e] font-semibold font-sans">SLOWFASHION</span> (giảm 15%)</p>
            </div>

            {/* Proceed CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (selectedCartItemIds.length === 0) {
                    showToast("Kính thưa quý cô, vui lòng chọn ít nhất một sản phẩm thời thượng để tiến hành thanh toán nhé! 🌹", "info");
                  } else {
                    onNavigate("checkout");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="w-full bg-[#74070e] hover:bg-[#5a050a] text-white text-xs uppercase tracking-widest py-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center space-x-2.5 cursor-pointer font-medium active:scale-[0.99]"
              >
                <span>Tiến Hành Thanh Toán</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10.5px] text-gray-400 text-center mt-3 leading-relaxed">
                * Nhấn thanh toán để tiếp tục đặt hàng
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 bg-[#FCFBF9] rounded-2xl border border-gray-100 max-w-lg mx-auto space-y-5">
          <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto stroke-1" />
          <h3 className="text-lg font-serif">Giỏ hàng đang trống</h3>
          <button
            onClick={() => onNavigate("products")}
            className="bg-[#74070e] hover:bg-[#5a050a] text-white text-xs uppercase tracking-widest font-light py-3.5 px-8 rounded-full cursor-pointer shadow-sm"
          >
            MUA SẮM NGAY
          </button>
        </div>
      )}
    </div>
  );
}
