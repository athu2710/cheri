import React from "react";
import { X, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { formatVND } from "../utils";

export default function QuickViewModal({
  quickViewProduct,
  previewImage,
  selectedColor,
  selectedSize,
  selectedClassification,
  wishlist,
  onClose,
  onSetPreviewImage,
  onSetSelectedColor,
  onSetSelectedSize,
  onSetSelectedClassification,
  onToggleWishlist,
  onBuyNow,
  onAddToCart,
  showToast,
}) {
  if (!quickViewProduct) return null;
  const isFav = wishlist.includes(quickViewProduct.id);
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={() => onClose()}
      >
        <div
          className="bg-white rounded-none border border-[#74070e]/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-none relative grid grid-cols-1 md:grid-cols-2 p-6 sm:p-10 gap-8 animate-fade-in text-[#74070e]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close modal */}
          <button
            onClick={() => onClose()}
            className="absolute top-4 right-4 text-gray-400 hover:text-[#74070e] p-1.5 rounded-none hover:bg-stone-50 transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left side: Images gallery previews */}
          <div className="space-y-3">
            <div className="aspect-[3/4] bg-[#FCFBF9] rounded-none overflow-hidden border border-[#74070e]/10">
              <img
                src={previewImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail captures */}
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-start max-h-36 overflow-y-auto scrollbar-none">
              {(quickViewProduct.images && quickViewProduct.images.length > 0
                ? quickViewProduct.images
                : [quickViewProduct.image, quickViewProduct.secondaryImage]
              ).map((imgUrl, imgIdx) => (
                <button
                  key={imgIdx}
                  onClick={() => onSetPreviewImage(imgUrl)}
                  className={`w-12 h-16 rounded-none overflow-hidden border bg-[#FCFBF9] transition-all cursor-pointer flex-shrink-0 ${previewImage === imgUrl ? "border-[#74070e]" : "border-[#74070e]/10"}`}
                >
                  <img
                    src={imgUrl}
                    alt={`Preview ${imgIdx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right side: options choose sizing & checkout details */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#74070e] bg-[#74070e]/5 px-3 py-1 rounded-sm inline-block">
                  {quickViewProduct.categoryName}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-gray-950 font-medium leading-tight pt-1">
                  {quickViewProduct.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-[#74070e]">
                    {formatVND(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatVND(quickViewProduct.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Classification choices selection (Phân loại) */}
              {quickViewProduct.classifications &&
                quickViewProduct.classifications.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">
                      Phân loại
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.classifications.map((cl) => (
                        <button
                          key={cl}
                          onClick={() => onSetSelectedClassification(cl)}
                          className={`px-3 py-1.5 border text-xs font-light tracking-wide cursor-pointer transition-all ${
                            selectedClassification === cl
                              ? "bg-[#74070e] text-white border-[#74070e]"
                              : "bg-white text-gray-600 border-[#74070e]/10 hover:border-[#74070e]"
                          }`}
                        >
                          {cl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Color choices selection */}
              {quickViewProduct.colors &&
                quickViewProduct.colors.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-1">
                      Chọn Màu sắc
                    </span>
                    <div className="flex items-center space-x-3.5">
                      {quickViewProduct.colors.map((color) => (
                        <button
                          key={color.hex}
                          onClick={() => onSetSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                            selectedColor && selectedColor.hex === color.hex
                              ? "border-[#74070e] scale-102"
                              : "border-gray-200"
                          }`}
                          title={color.name}
                        >
                          <span
                            className="w-6 h-6 rounded-full inline-block cursor-pointer shadow-inner border border-black/5"
                            style={{ backgroundColor: color.hex }}
                          ></span>
                        </button>
                      ))}
                    </div>
                    {selectedColor && (
                      <span className="text-[11px] text-gray-700 font-light block">
                        Đã chọn màu: <strong>{selectedColor.name}</strong>
                      </span>
                    )}
                  </div>
                )}

              {/* Sizing choosing */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">
                    <span>Chọn Kích Cỡ</span>
                    <button
                      onClick={() =>
                        alert(
                          "Hướng dẫn chọn Size:\n\n- Size S: Vòng ngực 82-86cm, Eo 64-68cm, Nặng 44-48kg\n- Size M: Vòng ngực 86-90cm, Eo 68-72cm, Nặng 49-53kg\n- Size L: Vòng ngực 90-94cm, Eo 72-76cm, Nặng 54-58kg\n\nQuý cô cũng có thể hỏi Stylist Chéri ở góc phải dưới màn hình tư vấn thêm ạ.",
                        )
                      }
                      className="text-[#74070e] lowercase tracking-wide cursor-pointer hover:underline"
                    >
                      (Bảng số đo size)
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => onSetSelectedSize(size)}
                        className={`w-8 h-8 rounded-none border text-xs font-light tracking-wide cursor-pointer flex items-center justify-center transition-all ${
                          selectedSize === size
                            ? "bg-[#74070e] text-white border-[#74070e]"
                            : "bg-white text-gray-600 border-[#74070e]/10 hover:border-[#74070e]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Spec Bullet points details with scroll */}
              <div className="border-t border-[#74070e]/10 pt-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#74070e]/60 block mb-2">
                  Mô tả sản phẩm
                </span>
                <div className="text-[11px] font-light text-gray-500 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {quickViewProduct.description ||
                    "Chưa có thông tin mô tả chi tiết."}
                </div>
              </div>
            </div>

            {/* Action buttons footer modal */}
            <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-[#74070e]/10">
              {/* 1. Mua ngay (Primary Button, larger width, dark red background, white text) */}
              <button
                onClick={quickViewProduct.inStock ? onBuyNow : undefined}
                disabled={!quickViewProduct.inStock}
                className={`h-[52px] flex-1 sm:flex-none sm:w-[220px] text-xs uppercase tracking-[0.15em] rounded-md font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  quickViewProduct.inStock
                    ? "bg-[#8B0000] hover:bg-[#700000] text-white cursor-pointer"
                    : "bg-[#e5e5e5] text-[#999999] cursor-not-allowed border-none"
                }`}
              >
                {quickViewProduct.inStock ? (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>Mua Ngay</span>
                  </>
                ) : (
                  <span>HẾT HÀNG</span>
                )}
              </button>

              {/* 2. Giỏ hàng (Square, white background, light gray border, centered icon) */}
              <button
                onClick={quickViewProduct.inStock ? onAddToCart : undefined}
                disabled={!quickViewProduct.inStock}
                className={`h-[52px] w-[52px] flex-shrink-0 border rounded-md transition-all duration-300 flex items-center justify-center ${
                  quickViewProduct.inStock
                    ? "bg-white hover:bg-gray-50 border-[#E5E5E5] text-[#74070e] cursor-pointer"
                    : "bg-[#f5f5f5] text-[#cccccc] border-[#e5e5e5] cursor-not-allowed"
                }`}
                title={
                  quickViewProduct.inStock
                    ? "Thêm Vào Giỏ Hàng"
                    : "Sản phẩm tạm hết hàng"
                }
              >
                <ShoppingBag className="w-5 h-5" />
              </button>

              {/* 3. Yêu thích (Square, same size as shopping cart, white background, light gray border, centered icon) */}
              <button
                onClick={(e) => {
                  onToggleWishlist(quickViewProduct.id, e);
                }}
                className="h-[52px] w-[52px] flex-shrink-0 bg-white hover:bg-gray-50 border border-[#E5E5E5] text-[#74070e] rounded-md transition-all duration-300 flex items-center justify-center cursor-pointer"
                title="Thêm yêu thích"
              >
                <Heart
                  className={`w-5 h-5 ${wishlist.includes(quickViewProduct.id) ? "fill-[#74070e] text-[#74070e]" : "text-[#74070e]/30"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
