import React from "react";
import { X, Star, CheckCircle2, ShoppingBag } from "lucide-react";

export default function ReviewModal({
  reviewModalOpen,
  reviewTarget,
  reviewRating,
  reviewText,
  selectedReviewPreset,
  onClose,
  onSetReviewRating,
  onSetReviewText,
  onSetSelectedReviewPreset,
  onReviewSubmit,
  getProductImage
}: any) {
  if (!reviewModalOpen || !reviewTarget) return null;
  
  return (
    <>
      <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => onClose()}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in text-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button icon */}
            <button 
              type="button"
              onClick={() => onClose()}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#74070e] p-1.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Header Titles */}
              <div className="text-center space-y-1">
                <h3 className="text-lg font-serif text-[#74070e] font-semibold tracking-wide">
                  {reviewTarget.isOrderReview ? "Đánh Giá Đơn Hàng" : "Đánh Giá Sản Phẩm"}
                </h3>
                <p className="text-[11px] text-gray-400 font-light uppercase tracking-widest">
                  Trải nghiệm của Quý cô là huyết mạch của Chéri
                </p>
              </div>

              {/* Product mini info card or Order summary list */}
              {reviewTarget.isOrderReview ? (
                <div className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-4 flex items-start space-x-3 text-left">
                  <div className="w-12 h-12 rounded-lg bg-[#74070e]/5 border border-[#74070e]/10 shrink-0 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-[#74070e]" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-xs font-semibold text-[#74070e] uppercase tracking-wider">
                      Đơn hàng #{reviewTarget.orderId}
                    </p>
                    <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                      Sản phẩm: {reviewTarget.itemsSummary}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#FAF8F5] rounded-xl p-3.5 flex items-center space-x-3 border border-gray-100">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-white p-1 flex items-center justify-center">
                    <img 
                      src={getProductImage(reviewTarget.productId, reviewTarget.productName)} 
                      alt={reviewTarget.productName} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-sans font-medium text-gray-900 truncate">
                      {reviewTarget.productName}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-light flex items-center space-x-2 mt-0.5">
                      {reviewTarget.size && <span>Size: <strong>{reviewTarget.size}</strong></span>}
                      {reviewTarget.colorName && <span>| Màu: <strong>{reviewTarget.colorName}</strong></span>}
                    </p>
                  </div>
                </div>
              )}

              {/* Star controls with pristine gold colors */}
              <div className="space-y-2 text-center">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  Độ Hài Lòng Của Quý Cô
                </label>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => onSetReviewRating(star)}
                      className="cursor-pointer transition-transform duration-100 active:scale-95 p-1"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          star <= reviewRating 
                            ? "fill-amber-400 text-amber-400 filter drop-shadow-sm scale-110" 
                            : "text-gray-200 hover:text-amber-200"
                        } transition-colors`} 
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-amber-600 font-medium font-serif italic block mt-1">
                  {reviewRating === 5 && "Tuyệt hảo trên cả tuyệt vời - Chéri trân quý! 🌸"}
                  {reviewRating === 4 && "Hài lòng và ưng ý - Cảm ơn chị rất nhiều! 💕"}
                  {reviewRating === 3 && "Sản phẩm tạm ổn và vừa vặn! 🌿"}
                  {reviewRating === 2 && "Chưa đạt kỳ vọng - Chéri xin ghi nhận đóng góp! 🥀"}
                  {reviewRating === 1 && "Không ưng ý - Chéri thành thật xin lỗi và sửa đổi! 💔"}
                </span>
              </div>

              {/* Quick Preset Feedback tags */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  Cảm Nghĩ Gợi Ý (Chạm để chọn nhanh)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Chất lụa Mulberry mềm mát mượt vượt trội! ✨",
                    "Đóng gói vô cùng chỉn chu, hộp thơm sang trọng! 🌸",
                    "Phom dáng xinh xắn, tôn eo thon thả kiêu sa! 💕",
                    "Tư vấn viên Chéri nhiệt tình, giao siêu tốc! 🌹"
                  ].map((phrase) => {
                    const isSelected = selectedReviewPreset === phrase;
                    return (
                      <button
                        key={phrase}
                        type="button"
                        onClick={() => {
                          if (selectedReviewPreset === phrase) {
                            onSetSelectedReviewPreset("");
                          } else {
                            onSetSelectedReviewPreset(phrase);
                          }
                        }}
                        className={`p-2.5 text-left text-[10px] sm:text-xs rounded-xl border transition-all cursor-pointer font-light leading-snug flex items-start space-x-1.5 ${
                          isSelected 
                            ? "bg-[#74070e]/5 border-[#74070e] text-[#74070e] font-medium" 
                            : "bg-white border-gray-100 hover:border-gray-200 text-gray-600"
                        }`}
                      >
                        <span className="text-[#74070e]">{isSelected ? "●" : "○"}</span>
                        <span>{phrase}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Freeform Comment box */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">
                  Bình Luận Hoặc Ghi Chú Riêng
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => {
                    onSetReviewText(e.target.value);
                  }}
                  rows={3}
                  placeholder="Lời chia sẻ trân quý từ Quý cô... Hãy viết trải nghiệm chân thực nhất của chị nhé."
                  className="w-full bg-gray-50 border border-gray-150 rounded-xl outline-none p-3.5 text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#74070e]/40 transition-colors resize-none font-light"
                />
              </div>

              {/* Actions Footer */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs uppercase tracking-widest py-3 rounded-xl transition-all cursor-pointer font-medium"
                >
                  Trở lại
                </button>
                <button
                  type="button"
                  onClick={onReviewSubmit}
                  className="flex-grow bg-[#74070e] hover:bg-[#5a050a] text-white text-xs uppercase tracking-widest py-3 rounded-xl shadow-xs transition-colors cursor-pointer font-semibold"
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
