import React, { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Heart, ShoppingBag, Eye, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../types";
import { BLOGS } from "../data";
import { formatVND } from "../utils/format";

interface HomePageProps {
  products: Product[];
  wishlist: string[];
  onOpenQuickView: (product: Product) => void;
  onQuickAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onNavigate: (page: string) => void;
  onSetCategory: (cat: string) => void;
}

export default function HomePage({
  products,
  wishlist,
  onOpenQuickView,
  onQuickAddToCart,
  onToggleWishlist,
  onNavigate,
  onSetCategory,
}: HomePageProps) {
  const productLaneRef = useRef<HTMLDivElement>(null);

  const scrollProductLane = (direction: "left" | "right") => {
    if (productLaneRef.current) {
      const { scrollLeft, clientWidth } = productLaneRef.current;
      const scrollAmount = clientWidth * 0.75;
      productLaneRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Elegant Hero Banner */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-6">
        <img 
          src="https://static.wixstatic.com/media/911b80_56c8defb7ec14d90b9ebb021fa9c4a65~mv2.jpg" 
          alt="Chéri Grand Campaign" 
          referrerPolicy="no-referrer"
          className="w-full h-auto object-cover block rounded-2xl" 
        />
      </section>

      {/* Elegant Call-To-Action Banner for Virtual Try-On */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-14">
        <div className="bg-[#F7F4EF] rounded-2xl border border-[#E8E3DD] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
          <div className="space-y-4 max-w-xl text-center md:text-left z-10 font-sans">
            <div className="inline-flex items-center space-x-1.5 text-[#8B0015] text-[10px] tracking-[0.3em] uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>TRẢI NGHIỆM MỚI</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-[#8B0015] font-lux-serif tracking-tight leading-snug">
              Phác Họa Vóc Dáng
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-light tracking-wide leading-relaxed">
              "Đắm mình trong nét lãng mạn của từng thiết kế, tự tin sải bước cùng những bộ đầm tinh tế. Công nghệ đo form tiên tiến mang đến độ tương hợp với cơ thể chính xác đến 98%."
            </p>
          </div>
          <div className="z-10 shrink-0">
            <button
              onClick={() => {
                onNavigate("tryon");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-[#8B0015] hover:bg-[#8B0015]/95 text-white text-[11px] uppercase tracking-[0.2em] font-semibold py-4 px-8 rounded-xl transition-all shadow-[0_10px_20px_-10px_rgba(139,0,21,0.3)] active:translate-y-px hover:-translate-y-0.5 cursor-pointer leading-none flex items-center gap-2"
            >
              <span>Trải Nghiệm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {/* Visual subtle accents */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#8B0015]/5 pointer-events-none blur-3xl" />
        </div>
      </section>

      {/* Featured Best Sellers Grid (Horizontal Slider) */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-5">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-[18px] font-sans font-bold tracking-tight text-[#74070E]">Sản phẩm tiêu biểu</h3>
          </div>
          <div className="flex flex-row items-center space-x-6 mt-4 sm:mt-0">
            <button
              onClick={() => {
                onSetCategory("all");
                onNavigate("products");
              }}
              className="text-xs uppercase tracking-widest font-normal text-[#74070e] hover:text-[#5a050a] flex items-center space-x-1 border-b border-[#74070e] pb-1 cursor-pointer"
            >
              <span>Xem Toàn Bộ Cửa Hàng</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => scrollProductLane("left")}
                className="p-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-[#74070e] hover:text-[#74070e] transition-all cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollProductLane("right")}
                className="p-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-[#74070e] hover:text-[#74070e] transition-all cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider wrapper with ref */}
        <div 
          ref={productLaneRef}
          className="flex overflow-x-auto gap-8 pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.slice(0, 10).map((product) => {
            const isFav = wishlist.includes(product.id);
            return (
              <div 
                key={product.id}
                onClick={() => onOpenQuickView(product)}
                className="flex-none w-[270px] sm:w-[290px] snap-start group cursor-pointer flex flex-col space-y-3 relative"
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
                      ƯU ĐÃI
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
                    <Heart className={`w-4 h-4 ${isFav ? "fill-[#74070e] text-[#74070e]" : "text-[#74070e]/40"}`} />
                  </button>
                </div>

                {/* Info block */}
                <div className="space-y-1 pr-1 text-center sm:text-left">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-light">{product.categoryName}</span>
                  <h4 className="text-sm font-light text-gray-800 group-hover:text-[#74070e] transition-colors line-clamp-1">{product.name}</h4>
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <span className="text-xs font-semibold text-[#74070e]">{formatVND(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-gray-400 line-through">{formatVND(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Elegant Muse Editorial Segment */}
      <section className="bg-white border-t border-b border-gray-100 pt-10 pb-24 overflow-hidden animate-fade-in">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Column: Model Imagery */}
            <div 
              onClick={() => onNavigate("products")}
              className="md:col-span-5 flex justify-center md:justify-start relative group -ml-4 md:-ml-24 lg:-ml-32 cursor-pointer"
            >
              <div className="relative overflow-visible">
                <img 
                  src="https://static.wixstatic.com/media/911b80_c2c4f8245cbc4a1e80c6e871af920c1d~mv2.png" 
                  alt="Nàng thơ Chéri" 
                  referrerPolicy="no-referrer"
                  className="h-[420px] md:h-[540px] w-auto object-contain block transition-all duration-1000 ease-out group-hover:scale-[1.03] filter drop-shadow-[-12px_16px_28px_rgba(116,7,14,0.08)] group-hover:drop-shadow-[-20px_24px_36px_rgba(116,7,14,0.18)]" 
                />
                <div className="absolute inset-0 bg-radial from-[#74070e]/5 to-transparent filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none -z-10" />
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-8 md:pl-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h3 className="font-serif font-bold text-[#74070e] tracking-widest uppercase transition-colors duration-300" style={{ fontSize: "15px" }}>
                  Nàng thơ của riêng bạn
                </h3>
              </motion.div>
              
              <motion.div 
                className="pl-6 md:pl-12 max-w-lg"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <p className="text-[13px] md:text-[13.5px] text-gray-800 font-sans tracking-wide leading-relaxed">
                  Không chạy theo xu hướng nhất thời. Chúng tôi tạo nên những thiết kế mang vẻ đẹp vượt thời gian.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-center space-x-2.5 text-[9px] tracking-[0.3em] text-[#74070e]/80 font-sans uppercase pt-4 border-t border-[#74070e]/20 max-w-[200px]">
                  <span>Atelier Chéri</span>
                  <span>•</span>
                  <span>Timeless</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
