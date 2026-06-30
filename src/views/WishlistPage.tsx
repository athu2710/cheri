import React from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Product } from "../types";
import { formatVND } from "../utils/format";

interface WishlistPageProps {
  products: Product[];
  wishlist: string[];
  onOpenQuickView: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onNavigate: (page: string) => void;
  showToast: (msg: string, type?: "success" | "info") => void;
}

export default function WishlistPage({
  products,
  wishlist,
  onOpenQuickView,
  onRemoveFromWishlist,
  onNavigate,
  showToast,
}: WishlistPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-fade-in space-y-8">
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => wishlist.includes(p.id)).map((product) => (
            <div 
              key={product.id}
              onClick={() => onOpenQuickView(product)}
              className="group cursor-pointer flex flex-col space-y-3 relative"
            >
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden rounded-xl">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWishlist(product.id);
                    showToast("Đã bỏ thích sản phẩm", "info");
                  }}
                  className="absolute top-3 right-3 bg-white hover:bg-red-50 p-2 rounded-full text-red-700 shadow-md z-10"
                  title="Bỏ thích"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-[#74070e] text-white text-[10px] uppercase tracking-widest font-normal py-2 px-6 rounded-full shadow-lg">
                    Xem Chi Tiết Mẫu
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] text-gray-400 tracking-wider uppercase font-light">{product.categoryName}</span>
                <h4 className="text-sm text-gray-800 font-light group-hover:text-[#74070e] transition-colors">{product.name}</h4>
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <span className="text-xs font-semibold text-[#74070e]">{formatVND(product.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-[#FCFBF9] rounded-2xl border border-gray-100 max-w-lg mx-auto space-y-5">
          <Heart className="w-10 h-10 text-gray-300 mx-auto stroke-1" />
          <h3 className="text-lg font-serif">Chưa lưu giữ thiết kế mộng mơ nào</h3>
          <button
            onClick={() => onNavigate("products")}
            className="bg-[#74070e] hover:bg-[#5a050a] text-white text-xs uppercase tracking-widest font-light py-3 px-8 rounded-full cursor-pointer"
          >
            Ghé Thăm Cửa Hàng Chéri
          </button>
        </div>
      )}
    </div>
  );
}
