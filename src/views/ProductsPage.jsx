import React from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { CHERI_CATEGORIES } from "../data";
import { formatVND } from "../utils/format";

export default function ProductsPage({
  filteredProducts,
  wishlist,
  selectedCategory,
  searchQuery,
  sortBy,
  onOpenQuickView,
  onQuickAddToCart,
  onToggleWishlist,
  onSetCategory,
  onSetSearchQuery,
  onSetSortBy,
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-fade-in space-y-8">
      {/* Category selection and sorting toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-y border-gray-100 py-6 gap-4">
        {/* Categories Row */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
          {CHERI_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSetCategory(cat.id);
                onSetSearchQuery("");
              }}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-light transition-all rounded-none border cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-[#74070e] text-white border-[#74070e]"
                  : "bg-white text-gray-600 border-[#74070e]/10 hover:border-[#74070e] hover:text-[#74070e]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* In-page active search status & Sort Selector */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto space-x-4">
          {searchQuery && (
            <span className="text-xs text-gray-500 font-light">
              Tìm kiếm cho: "
              <strong className="text-[#74070e]">{searchQuery}</strong>"
              <button
                onClick={() => onSetSearchQuery("")}
                className="ml-2 text-gray-400 hover:text-[#74070e] cursor-pointer"
              >
                (Xóa)
              </button>
            </span>
          )}

          <select
            value={sortBy}
            onChange={(e) => onSetSortBy(e.target.value)}
            className="bg-white border border-[#74070e]/15 text-[10px] uppercase tracking-[0.15em] px-4 py-3 rounded-none outline-none text-[#74070e] hover:border-[#74070e] cursor-pointer"
          >
            <option value="default">Sắp xếp mặc định</option>
            <option value="price_asc">Giá tăng dần 💎</option>
            <option value="price_desc">Giá giảm dần 💎</option>
            <option value="rating">Được thích nhiều nhất 🌹</option>
          </select>
        </div>
      </div>

      {/* Grid listings of filtered items */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const isFav = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => onOpenQuickView(product)}
                className="group cursor-pointer flex flex-col space-y-3"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[3/4] bg-[#FCFBF9] overflow-hidden rounded-none border border-[#74070e]/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />

                  {/* Status Label badge */}
                  {!product.inStock ? (
                    <span className="absolute top-3 left-3 bg-[#74070e]/85 text-white text-[8px] font-semibold uppercase tracking-[0.2em] py-1 px-2.5 rounded-none z-10">
                      HẾT HÀNG
                    </span>
                  ) : product.isNew ? (
                    <span className="absolute top-3 left-3 bg-[#74070e] text-white text-[8px] font-normal uppercase tracking-[0.2em] py-1 px-2.5 rounded-none z-10">
                      NEW
                    </span>
                  ) : null}
                  {product.originalPrice && product.inStock && (
                    <span className="absolute top-3 right-3 bg-stone-700 text-white text-[8px] font-normal uppercase tracking-[0.2em] py-1 px-2.5 rounded-none z-10">
                      OFFER
                    </span>
                  )}

                  {/* Hover Overlay triggers */}
                  <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuickView(product);
                      }}
                      className="bg-white hover:bg-[#74070e] hover:text-white text-[#74070e] p-2.5 rounded-full border border-[#74070e]/10 transition-all scale-95 group-hover:scale-100 cursor-pointer"
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {product.inStock && (
                      <button
                        onClick={(e) => onQuickAddToCart(product, e)}
                        className="bg-[#74070e] text-white p-2.5 rounded-full border border-[#74070e] hover:opacity-80 transition-all scale-95 group-hover:scale-100 cursor-pointer"
                        title="Thêm nhanh vào giỏ"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Favorite Heart Trigger */}
                  <button
                    onClick={(e) => onToggleWishlist(product.id, e)}
                    className="absolute bottom-3 right-3 bg-white hover:bg-white/90 p-2 rounded-full border border-[#74070e]/10 z-10 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFav ? "fill-[#74070e] text-[#74070e]" : "text-[#74070e]/40"}`}
                    />
                  </button>
                </div>

                {/* Info block */}
                <div className="space-y-1 text-center sm:text-left pr-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-light">
                    {product.categoryName}
                  </span>
                  <h4 className="text-sm font-light text-gray-800 group-hover:text-[#74070e] transition-colors line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <span className="text-xs font-semibold text-[#74070e]">
                      {formatVND(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-gray-400 line-through">
                        {formatVND(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#FAF8F5] border border-dashed border-gray-200 rounded-2xl max-w-2xl mx-auto space-y-4">
          <Heart className="w-8 h-8 text-gray-300 mx-auto" />
          <h3 className="text-lg font-serif">
            Chưa Tìm Thấy Thiết Kế Thiết Bản
          </h3>
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Chéri chưa tìm thấy sản phẩm nào khớp với bộ lọc kiếm tìm của chị.
            Chị có thể xóa từ khóa hoặc thử lại với danh mục khác nhé.
          </p>
          <button
            onClick={() => {
              onSetCategory("all");
              onSetSearchQuery("");
            }}
            className="bg-[#74070e] hover:bg-[#5a050a] text-white text-[10px] uppercase tracking-widest font-light py-2 px-6 rounded-full cursor-pointer"
          >
            Xem Toàn Bộ Sản Phẩm
          </button>
        </div>
      )}
    </div>
  );
}
