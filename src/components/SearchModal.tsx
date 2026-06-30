import React from "react";
import { X, Sparkles, Camera, UploadCloud, ArrowRight } from "lucide-react";
import { formatVND } from "../utils";

export default function SearchModal({
  isSearchOpen,
  headerSearchInput,
  visualSearchPreview,
  isScanning,
  scanStep,
  scanProgress,
  matchedProduct,
  similarityScore,
  scanCompleted,
  onClose,
  onSetHeaderSearchInput,
  onTriggerHeaderSearch,
  onImageUploadSearch,
  onPresetVisualSearch,
  onClearVisualSearch,
  onQuickAddToCart,
  onNavigate,
  showToast
}: any) {
  if (!isSearchOpen) return null;
  const setCurrentPage = onNavigate;
  
  return (
    <>
      <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => {
            setIsSearchOpen(false);
            handleClearVisualSearch();
          }}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-fade-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => {
                setIsSearchOpen(false);
                handleClearVisualSearch();
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-black py-0.5 px-1.5 rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 text-gray-800">
              {/* Text Search Form */}
              <form onSubmit={handleTriggerHeaderSearch} className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest text-[#74070e] font-bold border-l-2 border-[#74070e] pl-2">TÌM KIẾM SẢN PHẨM</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    autoFocus
                    value={headerSearchInput}
                    onChange={(e) => setHeaderSearchInput(e.target.value)}
                    placeholder="Vui lòng nhập từ khóa"
                    className="flex-1 bg-gray-50 border border-transparent focus:border-gray-200 outline-none rounded-xl text-sm px-4 py-3 text-gray-800 placeholder:text-gray-400 font-light"
                  />
                  <button
                    type="submit"
                    className="bg-[#74070e] hover:bg-[#5a050a] text-white text-xs uppercase tracking-widest px-6 py-3 rounded-xl cursor-pointer transition-colors"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </form>

              {/* Quick tag tips inside popup */}
              <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-light uppercase tracking-wider items-center">
                <span>Gợi Ý Tìm Kiếm:</span>
                {["lụa", "chân váy", "đầm", "satin"].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => {
                      setHeaderSearchInput(tag);
                    }}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-600 px-2.5 py-1 rounded border border-gray-100 cursor-pointer text-[9px] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-gray-300 uppercase text-[9px] tracking-[0.2em] font-medium">Hoặc tìm bằng hình ảnh</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              {/* Visual Search Interface */}
              <div className="space-y-4">
                {!visualSearchPreview ? (
                  <div className="space-y-4">
                    {/* Drag-and-drop / select block */}
                    <label className="border-2 border-dashed border-gray-200 hover:border-[#74070e]/40 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all bg-[#FCFBF9]/50 hover:bg-[#FCFBF9]">
                      <div className="p-3 bg-[#74070e]/5 rounded-full text-[#74070e] mb-3">
                        <UploadCloud className="w-6 h-6 animate-pulse" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">Tải ảnh trang phục lên để đối chiếu</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUploadSearch} 
                      />
                    </label>
                  </div>
                ) : (
                  <div className="bg-[#FAF8F5] border border-gray-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-stretch relative overflow-hidden">
                    {/* Selected Image viewport with laser lines mapping */}
                    <div className="w-full sm:w-[150px] aspect-[4/5] rounded-l-md rounded-r-none overflow-hidden relative border border-gray-200 bg-white shadow-xs flex-shrink-0">
                      <img src={visualSearchPreview} alt="Selected target design" className="w-full h-full object-cover" />
                      {isScanning && (
                        <>
                          {/* Pulsing visual scan effect */}
                          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-[#74070e] to-[#e43343] shadow-[0_0_8px_#74070e] animate-[bounce_2s_infinite]"></div>
                          <div className="absolute inset-0 bg-[#74070e]/5 backdrop-blur-[0.5px]"></div>
                        </>
                      )}
                    </div>

                    {/* Scanning feedback or match result details */}
                    <div className="flex-grow flex flex-col justify-between space-y-4">
                      {isScanning ? (
                        <div className="flex flex-col justify-center h-full space-y-3">
                          <div className="flex items-center space-x-1.5 text-[#74070e] text-xs font-semibold uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 animate-spin text-[#74070e]" />
                            <span>Atelier Chéri AI Scanner</span>
                          </div>
                          <p className="text-[11px] text-gray-500 font-light italic">{scanStep}</p>
                          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#74070e] h-full transition-all duration-300 rounded-full"
                              style={{ width: `${scanProgress}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono text-right">{scanProgress}% hoàn tất</span>
                        </div>
                      ) : (
                        <div className="space-y-3.5">
                          {matchedProduct ? (
                            <>
                              <div className="space-y-1">
                                <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-[#74070e]/10 text-[#74070e] text-[9px] uppercase tracking-widest rounded-sm font-semibold">
                                  <span>Độ khớp {similarityScore}%</span>
                                </span>
                                <h4 className="text-xs font-serif font-semibold text-gray-950 leading-tight block">{matchedProduct.name}</h4>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest block">{matchedProduct.categoryName}</span>
                              </div>
                              <p className="text-[11px] text-gray-500 font-light line-clamp-3 leading-relaxed border-t border-gray-100/60 pt-2">
                                {matchedProduct.description}
                              </p>
                              
                              <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-gray-100/60">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setQuickViewProduct(matchedProduct);
                                    // Match size first available
                                    if (matchedProduct.sizes?.length) {
                                      setSelectedSize(matchedProduct.sizes[0]);
                                    }
                                    // Match color first available
                                    if (matchedProduct.colors?.length) {
                                      setSelectedColor(matchedProduct.colors[0]);
                                      setPreviewImage(matchedProduct.image);
                                    }
                                    setIsSearchOpen(false);
                                  }}
                                  className="px-3 py-1.5 bg-[#74070e] hover:bg-[#5a050a] text-white text-[9.5px] uppercase tracking-wider rounded-md font-semibold cursor-pointer transition-colors"
                                >
                                  Mở xem nhanh
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSearchQuery(matchedProduct.name);
                                    setIsSearchOpen(false);
                                    setCurrentPage("products");
                                  }}
                                  className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 text-[9.5px] uppercase tracking-wider rounded-md font-semibold cursor-pointer transition-colors"
                                >
                                  ĐI ĐẾN CỬA HÀNG
                                </button>
                                <button
                                  type="button"
                                  onClick={handleClearVisualSearch}
                                  className="px-2.5 py-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-600 text-[10px] rounded-md transition-colors font-medium cursor-pointer"
                                  title="Thử tìm bằng hình khác"
                                >
                                  Tải ảnh khác
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <h4 className="text-sm font-serif font-semibold text-[#74070e] uppercase tracking-wide">
                                  Không tìm thấy hình ảnh
                                </h4>
                                <p className="text-[11px] text-gray-500 leading-relaxed text-justify mt-1">
                                  Thật tiếc, hệ thống Chéri chưa đối chiếu được tệp hình ảnh này với các sản phẩm trưng bày hiện tại. Vui lòng tìm bằng hình ảnh khác hoặckhám phá các bộ sưu tập sẵn có.
                                </p>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-gray-100/60">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    handleClearVisualSearch();
                                    setCurrentPage("products");
                                  }}
                                  className="px-4 py-2 bg-[#74070e] hover:bg-[#5a050a] text-white text-[9.5px] uppercase tracking-wider rounded-md font-semibold cursor-pointer transition-colors"
                                >
                                  ĐI ĐẾN CỬA HÀNG
                                </button>
                                <button
                                  type="button"
                                  onClick={handleClearVisualSearch}
                                  className="px-2.5 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-500 text-[10px] rounded-md transition-colors font-medium cursor-pointer"
                                >
                                  Tải ảnh khác
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
