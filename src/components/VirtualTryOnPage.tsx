import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, Camera, Upload, ArrowRight, UserCheck, ShieldCheck, ShoppingBag, Heart,
  RotateCcw, Maximize2, ZoomIn, ZoomOut, RotateCw, Play, Pause, RefreshCw, Layers, CheckCircle,
  HelpCircle, Search, Info, Sliders, Check, Trash
} from "lucide-react";
import { Product } from "../types";
import { CHERI_PRODUCTS, CHERI_CATEGORIES } from "../data";

interface VirtualTryOnPageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
}

// Preset facial options for quick model generation
const PRESET_MESSY_FACES = [
  {
    id: "f1",
    name: "Ami (Châu Á)",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "f2",
    name: "Clara (Châu Âu)",
    thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "f3",
    name: "Nadine (Pháp)",
    thumbnail: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400",
  }
];

// Aesthetic mock outfits for high fashion renders (different angles for 360 degree simulation)
const MODEL_360_OUTFITS: Record<string, string[]> = {
  // Bodysuit Base (Neutral body suit)
  "base": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800", // front
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800", // angle
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800", // left side
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"  // back view
  ],
  // Mulberry Silk Shirt
  "1": [
    "https://images.unsplash.com/photo-1548624149-f95ab51fc05b?auto=format&fit=crop&q=80&w=800", // front
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800", // angle
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800", // side
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800"  // back
  ],
  // Satin Evening Dress
  "2": [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800"
  ],
  // Blazer Tweed
  "3": [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
  ],
  // Satin Pleated Skirt
  "6": [
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800"
  ]
};

// Default mappings to handle other products seamlessly with beautiful representation models
export default function VirtualTryOnPage({
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist
}: VirtualTryOnPageProps) {
  // Navigation steps: 1 | 2 | 3
  const [activeStep, setActiveStep] = useState<number>(1);

  // Dynamic products list fetched from the Google Sheet API
  const [products, setProducts] = useState<Product[]>(CHERI_PRODUCTS);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("API load status failing");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn("Could not load dynamic products in Try On, using fallback static catalog", err);
      });
  }, []);

  const getProductOutfitAngles = (productId: string): string[] => {
    return MODEL_360_OUTFITS[productId] || [
      products.find(p => p.id === productId)?.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      products.find(p => p.id === productId)?.secondaryImage || "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
    ];
  };
  
  // Custom states for Step 1
  const [uploadedFaceUrl, setUploadedFaceUrl] = useState<string | null>(null);
  const [selectedFacePresetId, setSelectedFacePresetId] = useState<string>("f1");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Body metrics form
  const [chestMetric, setChestMetric] = useState<string>("");
  const [waistMetric, setWaistMetric] = useState<string>("");
  const [hipsMetric, setHipsMetric] = useState<string>("");
  const [heightMetric, setHeightMetric] = useState<string>("");
  const [weightMetric, setWeightMetric] = useState<string>("");
  
  // Character Generation State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [characterGenerated, setCharacterGenerated] = useState<boolean>(false);
  
  // Custom states for Step 2
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProductId, setActiveProductId] = useState<string>("2"); // Pre-select beautiful dress id 2
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Custom states for Step 3 (360 controller)
  const [rotationAngleIndex, setRotationAngleIndex] = useState<number>(0); // 0: 0°, 1: 90°, 2: 180°, 3: 270°
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isRotatingDrag, setIsRotatingDrag] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Set default color when active product changes
  useEffect(() => {
    const product = products.find(p => p.id === activeProductId);
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
  }, [activeProductId, products]);

  // Handle auto-rotation interval
  useEffect(() => {
    let interval: any;
    if (autoRotate && activeStep === 3) {
      interval = setInterval(() => {
        setRotationAngleIndex(prev => (prev + 1) % 4);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [autoRotate, activeStep]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Drag and Drop files for Step 1
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (validTypes.includes(file.type)) {
        const url = URL.createObjectURL(file);
        setUploadedFaceUrl(url);
        setSelectedFacePresetId(""); // Clear preset selection
        showToast("Đã tải ảnh lên thành công ✨");
      } else {
        showToast("Vui lòng tải ảnh JPG, PNG hoặc WEBP");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setUploadedFaceUrl(url);
      setSelectedFacePresetId(""); // Clear preset selection
      showToast("Đã tải ảnh lên thành công ✨");
    }
  };

  const handleUsePresetFace = () => {
    const randomPreset = PRESET_MESSY_FACES[Math.floor(Math.random() * PRESET_MESSY_FACES.length)];
    setSelectedFacePresetId(randomPreset.id);
    setUploadedFaceUrl(null);
    showToast(`Đã áp dụng gương mặt ${randomPreset.name} 🤩`);
  };

  const handleGenerateCharacter = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCharacterGenerated(true);
      showToast("Tạo nhân vật Chéri cao cấp thành công! 💃");
      setActiveStep(2); // Automatically advance to step 2 as a premium UX flow
    }, 2000);
  };

  const handleResetCharacter = () => {
    setCharacterGenerated(false);
    setUploadedFaceUrl(null);
    setSelectedFacePresetId("f1");
    setChestMetric("");
    setWaistMetric("");
    setHipsMetric("");
    setHeightMetric("");
    setWeightMetric("");
    showToast("Đã làm mới cài đặt nhân vật 🤍");
  };

  // Get active face image source
  const getActiveFaceSrc = () => {
    if (uploadedFaceUrl) return uploadedFaceUrl;
    const preset = PRESET_MESSY_FACES.find(f => f.id === selectedFacePresetId);
    return preset ? preset.thumbnail : PRESET_MESSY_FACES[0].thumbnail;
  };

  // Rotate drag gesture mock implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsRotatingDrag(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRotatingDrag) return;
    const diffX = e.clientX - dragStartX;
    if (Math.abs(diffX) > 60) {
      if (diffX > 0) {
        setRotationAngleIndex(prev => (prev === 0 ? 3 : prev - 1));
      } else {
        setRotationAngleIndex(prev => (prev + 1) % 4);
      }
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsRotatingDrag(false);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeProduct = products.find(p => p.id === activeProductId) || products[0];

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#1A1A1A] font-sans pb-16 relative" id="cheri-tryon-panel">
      {/* Toast Alert bar */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-[#8B0015] text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-normal shadow-[0_10px_25px_-5px_rgba(139,0,21,0.25)] flex items-center space-x-2 border border-white/10">
              <Sparkles className="w-4 h-4 text-[#F7F4EF] animate-pulse" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Intro Hero Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 pt-8 pb-4">
        <div className="border-[#E8E3DD] border-b pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-light text-[#8B0015] font-lux-serif tracking-tight">
              Virtual Try-On
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-12 mt-4 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        
        {/* SIDEBAR BÊN TRÁI - 3 BƯỚC KHÉP KÍN */}
        <aside className="bg-white rounded-2xl border border-[#E8E3DD] p-4 h-fit sticky top-28 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4 px-2">Các bước thực hiện</div>
          <div className="space-y-2.5">
            {[
              { step: 1, label: "Tạo nhân vật ảo", icon: Sparkles, desc: "Khuôn mặt & vóc dáng" },
              { step: 2, label: "Chọn sản phẩm", icon: Layers, desc: "Thử đồ & Phối phong cách" },
              { step: 3, label: "Đa góc độ 360°", icon: RotateCw, desc: "Xoay góc & Xem chi tiết" }
            ].map((item) => {
              const isActive = activeStep === item.step;
              return (
                <button
                  key={item.step}
                  onClick={() => {
                    if (item.step > 1 && !characterGenerated && !uploadedFaceUrl && selectedFacePresetId === "") {
                      showToast("Vui lòng ấn 'Tạo nhân vật' ở Bước 1 trước để tiếp tục! ✨");
                      setActiveStep(1);
                    } else {
                      setActiveStep(item.step);
                    }
                  }}
                  className={`w-full text-left p-3.5 rounded-xl transition-all duration-300 relative cursor-pointer group border flex items-start gap-3.5 outline-none ${
                    isActive
                      ? "bg-[#F7F4EF] border-l-4 border-l-[#8B0015] border-[#E8E3DD] shadow-sm text-[#8B0015]"
                      : "bg-transparent border-transparent text-gray-500 hover:text-[#1A1A1A] hover:bg-[#FAF8F5]"
                  }`}
                >
                  <div className={`mt-0.5 p-1 rounded-md transition-all ${
                    isActive ? "bg-[#8B0015]/10 text-[#8B0015]" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium tracking-wide">
                        {item.label}
                      </span>
                      {characterGenerated && item.step === 1 && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Đã có nhân vật" />
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400 font-light block mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8E3DD] text-[10px] text-gray-400 text-center flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-1.5 opacity-80" />
            <p className="font-medium text-gray-500 uppercase tracking-widest text-[8.5px]">Thử Đồ Bảo Mật</p>
            <p className="font-light mt-1 text-center px-1">Chéri cam kết không lưu giữ ảnh chân dung của quý khách ngoài trình duyệt này.</p>
          </div>
        </aside>

        {/* PHÂN VÙNG HIỂN THỊ CHÍNH (NỘI DUNG TỪNG STEP) */}
        <main className="min-h-[580px]">
          <AnimatePresence mode="wait">

            {/* MÀN HÌNH 1: TẠO NHÂN VẬT ẢO */}
            {activeStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                
                {/* CỘT TRÁI: UPLOAD VÀ THÔNG SỐ */}
                <div className="bg-white rounded-2xl border border-[#E8E3DD] p-6 sm:p-8 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                  <div>
                    {/* Face Upload Area */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="w-4.5 h-4.5 text-[#8B0015]" />
                        <h2 className="text-base font-medium tracking-wide text-gray-800">Ảnh khuôn mặt</h2>
                      </div>
                      <p className="text-xs text-gray-400 font-light mb-4">
                        Tải ảnh chân dung rõ nét, góc trực diện để công nghệ Chéri Virtual trích khuôn mặt ướm lên cơ thể mẫu.
                      </p>

                      {/* Frame Upload Container */}
                      <div 
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300 cursor-pointer ${
                          dragActive 
                            ? "border-[#8B0015] bg-[#8B0015]/5" 
                            : uploadedFaceUrl 
                              ? "border-emerald-500 bg-emerald-50/20" 
                              : "border-[#E8E3DD] bg-[#FCFBF9] hover:bg-neutral-50"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        
                        {uploadedFaceUrl ? (
                          <div className="text-center flex flex-col items-center">
                            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-emerald-500 p-0.5 shadow-md mb-3 group">
                              <img src={uploadedFaceUrl} alt="Uploaded face" className="w-full h-full object-cover rounded-full" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                <Trash className="w-5 h-5 text-white" />
                              </div>
                            </div>
                            <span className="text-[11px] font-medium text-emerald-700 flex items-center justify-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Gương mặt đã sẵn sàng
                            </span>
                            <span className="text-[10px] text-gray-400 font-light mt-1">Hỗ trợ JPG, PNG, WEBP. Click để đổi ảnh</span>
                          </div>
                        ) : selectedFacePresetId ? (
                          <div className="text-center flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden border border-[#D9CFC1] p-0.5 shadow-sm mb-3">
                              <img 
                                src={PRESET_MESSY_FACES.find(f => f.id === selectedFacePresetId)?.thumbnail} 
                                alt="Preset focus" 
                                className="w-full h-full object-cover rounded-full" 
                              />
                            </div>
                            <span className="text-[11px] font-medium text-[#8B0015] block">Đang dùng gương mặt mẫu: {PRESET_MESSY_FACES.find(f => f.id === selectedFacePresetId)?.name}</span>
                            <span className="text-[10px] text-gray-400 font-light mt-1">Kéo thả ảnh chụp của bạn vào đây để thay đổi</span>
                          </div>
                        ) : (
                          <div className="text-center flex flex-col items-center">
                            <div className="p-4 rounded-full bg-[#F7F4EF] text-[#8B0015] mb-4">
                              <Upload className="w-6 h-6 animate-pulse" />
                            </div>
                            <span className="text-xs font-semibold text-gray-700">📷 Click hoặc kéo thả ảnh vào đây</span>
                            <span className="text-[10px] text-gray-400 font-light mt-2 max-w-[200px]">
                              Hỗ trợ định dạng JPG, PNG, WEBP tỷ lệ chuẩn khuôn mặt rõ ràng.
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Preset face trigger */}
                      <div className="mt-3 flex items-center justify-between">
                        <button 
                          onClick={handleUsePresetFace}
                          className="text-[11px] text-[#8B0015] hover:opacity-85 font-medium flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                        >
                          📸 Dùng gương mặt mẫu ngẫu nhiên
                        </button>
                        {(uploadedFaceUrl || selectedFacePresetId) && (
                          <button
                            onClick={() => {
                              setUploadedFaceUrl(null);
                              setSelectedFacePresetId("f1");
                              showToast("Đã khôi phục gương mặt mặc định");
                            }}
                            className="text-[10px] text-gray-400 hover:text-red-500 bg-transparent border-0 cursor-pointer"
                          >
                            Xóa ảnh chân dung
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Presets Grid Showcase */}
                    <div className="mb-6">
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Hoặc chọn nhanh mặt mẫu Chéri</div>
                      <div className="grid grid-cols-3 gap-2.5">
                        {PRESET_MESSY_FACES.map((face) => (
                          <button
                            key={face.id}
                            onClick={() => {
                              setSelectedFacePresetId(face.id);
                              setUploadedFaceUrl(null);
                              showToast(`Chọn mặt mẫu ${face.name}`);
                            }}
                            className={`p-1.5 rounded-xl border flex flex-col items-center transition-all bg-white cursor-pointer ${
                              selectedFacePresetId === face.id && !uploadedFaceUrl
                                ? "border-[#8B0015] bg-[#F7F4EF]/30"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <img src={face.thumbnail} alt={face.name} className="w-10 h-10 rounded-full object-cover mb-1 border border-gray-100" />
                            <span className="text-[9.5px] text-gray-700 font-medium truncate w-full text-center">{face.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Physical Metrics Card */}
                    <div className="border-t border-[#E8E3DD] pt-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Sliders className="w-4 h-4 text-[#8B0015]" />
                        <h2 className="text-base font-medium tracking-wide text-gray-800">Thông số cơ thể</h2>
                      </div>
                      <p className="text-[11px] text-gray-400 font-light mb-4">
                        Nhập số đo chính xác để Chéri điều chỉnh phom dáng Virtual Avatar sát nhất với nàng.
                      </p>

                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="text-[11px] text-gray-500 font-medium block mb-1">Vòng Ngực (Bust)</label>
                          <input
                            type="number"
                            placeholder="Ví dụ 84 cm"
                            value={chestMetric}
                            onChange={(e) => setChestMetric(e.target.value)}
                            className="w-full bg-[#FCFBF9] border border-[#E8E3DD] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8B0015] focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-gray-500 font-medium block mb-1">Vòng Eo (Waist)</label>
                          <input
                            type="number"
                            placeholder="Ví dụ 62 cm"
                            value={waistMetric}
                            onChange={(e) => setWaistMetric(e.target.value)}
                            className="w-full bg-[#FCFBF9] border border-[#E8E3DD] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8B0015] focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-gray-500 font-medium block mb-1">Vòng Hông (Hips)</label>
                          <input
                            type="number"
                            placeholder="Ví dụ 90 cm"
                            value={hipsMetric}
                            onChange={(e) => setHipsMetric(e.target.value)}
                            className="w-full bg-[#FCFBF9] border border-[#E8E3DD] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8B0015] focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-gray-500 font-medium block mb-1">Chiều Cao (cm)</label>
                          <input
                            type="number"
                            placeholder="Ví dụ 165 cm"
                            value={heightMetric}
                            onChange={(e) => setHeightMetric(e.target.value)}
                            className="w-full bg-[#FCFBF9] border border-[#E8E3DD] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8B0015] focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="text-[11px] text-gray-500 font-medium block mb-1">Cân nặng (kg)</label>
                        <input
                          type="number"
                          placeholder="Ví dụ 48 kg"
                          value={weightMetric}
                          onChange={(e) => setWeightMetric(e.target.value)}
                          className="w-full bg-[#FCFBF9] border border-[#E8E3DD] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8B0015] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Active button trigger */}
                  <div className="mt-8 pt-4 border-t border-[#E8E3DD] flex items-center gap-3">
                    <button
                      onClick={handleResetCharacter}
                      className="px-4 py-3 border border-[#E8E3DD] rounded-xl text-xs hover:bg-[#FCFBF9] font-medium transition-all text-gray-500 cursor-pointer shadow-xs active:scale-95"
                    >
                      Xóa tất cả
                    </button>
                    <button
                      onClick={handleGenerateCharacter}
                      disabled={isGenerating}
                      className="flex-grow bg-[#8B0015] hover:bg-[#8B0015]/90 text-white rounded-xl py-3 px-4 text-xs tracking-widest font-semibold uppercase relative cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(139,0,21,0.18)] transition-all overflow-hidden active:translate-y-px"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#F7F4EF]" />
                          <span>ĐANG TẠO AVATAR...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#F7F4EF]" />
                          <span>✨ Tạo nhân vật</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* CỘT PHẢI: PREVIEW AVATAR GENERATED */}
                <div className="bg-white rounded-2xl border border-[#E8E3DD] p-6 sm:p-8 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] flex flex-col justify-between items-center text-center relative min-h-[450px]">
                  <div className="w-full flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <span className="text-xs uppercase font-semibold text-[#8B0015] tracking-widest">Generated Try-On</span>
                    <span className="text-[10px] text-gray-400 font-light italic">Chéri AI Render v2.5</span>
                  </div>

                  <div className="flex-grow w-full flex items-center justify-center relative">
                    {isGenerating ? (
                      <div className="flex flex-col items-center animate-fade-in py-12">
                        <div className="relative mb-6">
                          <div className="w-20 h-20 rounded-full border-4 border-dashed border-[#8B0015] animate-spin flex items-center justify-center" />
                          <div className="absolute inset-2 overflow-hidden rounded-full">
                            <img src={getActiveFaceSrc()} alt="Face scan" className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <h3 className="text-sm font-semibold tracking-wide text-gray-800">Đang quét phác thảo cơ thể</h3>
                        <p className="text-xs text-gray-400 font-light mt-1.5 max-w-[220px]">
                          Cân chỉnh vòng ngực {chestMetric || "84"}cm, eo {waistMetric || "62"}cm theo tỷ lệ vàng chuẩn boutique...
                        </p>
                      </div>
                    ) : characterGenerated ? (
                      <div className="relative w-full max-w-[280px] h-[380px] bg-[#FCFBF9] rounded-2xl border border-[#E8E3DD] overflow-hidden group">
                        
                        {/* Avatar Image Body (Bodysuit) */}
                        <img 
                          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" 
                          alt="Mannequin Bodysuit" 
                          className="w-full h-full object-cover hover:scale-105 transition-all duration-700" 
                        />
                        
                        {/* Overlay Face swap - mapped directly on top neck of the mannequin model */}
                        <div className="absolute top-[12%] left-[45%] -translate-x-1/2 w-12 h-14 rounded-full overflow-hidden border-2 border-white pointer-events-none shadow-sm bg-stone-100">
                          <img 
                            src={getActiveFaceSrc()} 
                            alt="Face overlay" 
                            className="w-full h-full object-cover scale-[1.12]" 
                          />
                        </div>

                        {/* Measurements stats pill tags overlaid on body */}
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-xl border border-[#E8E3DD]/45 text-left text-[10px] space-y-0.5 shadow-sm">
                          <div className="flex justify-between font-medium text-gray-700 text-[11px] mb-1">
                            <span>Vóc dáng nàng:</span>
                            <span className="text-[#8B0015]">Gold Perfect</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-3 text-gray-500 font-light">
                            <div>Ngực: <b className="font-semibold text-gray-800">{chestMetric || "84"} cm</b></div>
                            <div>Eo: <b className="font-semibold text-gray-800">{waistMetric || "62"} cm</b></div>
                            <div>Hông: <b className="font-semibold text-gray-800">{hipsMetric || "90"} cm</b></div>
                            <div>Chiều cao: <b className="font-semibold text-gray-800">{heightMetric || "165"} cm</b></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-12">
                        {/* Initial Placeholder view */}
                        <div className="w-32 h-44 border border-dashed border-gray-200 rounded-2xl flex items-center justify-center bg-[#FCFBF9] text-gray-300 mb-4">
                          <UserCheck className="w-12 h-12 stroke-[1]" />
                        </div>
                        <h3 className="text-gray-400 font-light text-sm">Nhân vật ảo sẽ xuất hiện tại đây</h3>
                        <p className="text-[11px] text-gray-400 max-w-[240px] mt-2 font-light">
                          Hãy tải chân dung và nhập vóc dáng cơ thể để Chéri dựng mô hình người thử đồ ảo chất lượng cao.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="w-full pt-4 mt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-light">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Hệ thống bảo mật tệp tin cục bộ. Ảnh được bảo vệ.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MÀN HÌNH 2: CHỌN SẢN PHẨM & TRẢI NGHIỆM THỬ ĐỒ VỚI AVATAR */}
            {activeStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                
                {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM THỰC TẾ */}
                <div className="bg-white rounded-2xl border border-[#E8E3DD] p-6 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] flex flex-col h-[640px]">
                  
                  {/* Tìm kiếm & Categories */}
                  <div className="mb-4">
                    <div className="relative mb-3.5">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Tìm sản phẩm Chéri..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#FCFBF9] border border-[#E8E3DD] rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-800 outline-none focus:bg-white focus:ring-1 focus:ring-[#8B0015]"
                      />
                    </div>

                    <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                      {CHERI_CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                            selectedCategory === cat.id
                              ? "bg-[#8B0015] text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Danh sách 8 sản phẩm thời trang, scrollable */}
                  <div className="flex-grow overflow-y-auto pr-1 space-y-3.5 custom-scrollbar">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((p) => {
                        const isTrying = activeProductId === p.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => {
                              setActiveProductId(p.id);
                              showToast(`Đã ướm thử ${p.name} 👗`);
                            }}
                            className={`p-3 rounded-xl border flex gap-3.5 cursor-pointer bg-white transition-all transform hover:-translate-y-0.5 hover:shadow-md ${
                              isTrying
                                ? "border-[#8B0015] ring-1 ring-[#8B0015]/40 bg-[#F7F4EF]/5"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-100 relative">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                              {isTrying && (
                                <div className="absolute inset-0 bg-[#8B0015]/10 flex items-center justify-center">
                                  <span className="bg-[#8B0015] text-[8px] text-[#F7F4EF] font-semibold px-1 rounded uppercase">ON</span>
                                </div>
                              )}
                            </div>

                            <div className="flex-grow flex flex-col justify-between py-0.5">
                              <div>
                                <h3 className="text-xs font-semibold text-gray-800 tracking-wide line-clamp-1">{p.name}</h3>
                                <div className="flex items-center justify-between mt-0.5">
                                  <p className="text-[10px] text-gray-400 font-light">{p.categoryName}</p>
                                  {p.rating && (
                                    <span className="text-[10px] text-amber-500 font-medium flex items-center gap-0.5 shrink-0 bg-amber-50 px-1.5 py-0.5 rounded-md">
                                      ★ {p.rating.toFixed(1)}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs font-semibold text-[#8B0015]">
                                  {p.price.toLocaleString("vi-VN")}đ
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveProductId(p.id);
                                    showToast(`Đã ướm thử ${p.name} 👗`);
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] tracking-widest font-semibold uppercase cursor-pointer transition-all ${
                                    isTrying
                                      ? "bg-[#8B0015] text-white"
                                      : "bg-[#F7F4EF] hover:bg-[#D9CFC1] text-gray-700"
                                  }`}
                                >
                                  👗 Thử đồ
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12 text-gray-400 font-light text-xs">
                        Không tìm thấy sản phẩm phù hợp.
                      </div>
                    )}
                  </div>
                </div>

                {/* CỘT PHẢI: KHU VỰC AVATAR MODEL (THE ACTIVE TRY ON RENDER) */}
                <div className="bg-white rounded-2xl border border-[#E8E3DD] p-6 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] flex flex-col justify-between items-center text-center">
                  
                  <div className="w-full flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-xs uppercase font-semibold text-[#8B0015] tracking-widest">Virtual Model Fit</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[9px] text-[#8B0015] font-semibold tracking-wider">AI FIT MATCH 98%</span>
                    </div>
                  </div>

                  {/* Character visual display */}
                  <div className="flex-grow w-full flex items-center justify-center relative py-6">
                    <div className="relative w-full max-w-[280px] h-[360px] bg-[#FCFBF9] rounded-2xl border border-[#E8E3DD] overflow-hidden shadow-inner">
                      
                      {/* Fitted Outfits Render mapped to Unsplash Haute-Couture style photo */}
                      <img 
                        src={getProductOutfitAngles(activeProduct.id)[0]} 
                        alt="Applied Garment look" 
                        className="w-full h-full object-cover transition-all duration-500" 
                      />

                      {/* Overlap face to retain exact virtual-identity customized in step 1! */}
                      {characterGenerated && (
                        <div className="absolute top-[12%] left-[45%] -translate-x-1/2 w-11 h-13 rounded-full overflow-hidden border-2 border-white pointer-events-none shadow-sm bg-stone-100">
                          <img 
                            src={getActiveFaceSrc()} 
                            alt="Face swap" 
                            className="w-full h-full object-cover scale-[1.12]" 
                          />
                        </div>
                      )}

                      {/* Small badge oftried garment */}
                      <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[8.5px] text-white/90 font-medium tracking-widest uppercase">
                        Sản phẩm đang mặc
                      </div>
                    </div>
                  </div>

                  {/* Panel and actions list */}
                  <div className="w-full border-t border-gray-100 pt-4">
                    <div className="bg-[#FAF8F5] border border-[#E8E3DD]/60 rounded-xl p-3 text-left mb-4">
                      <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Bản báo cáo độ tương thích dáng</div>
                      <div className="text-xs font-semibold text-[#8B0015] mt-0.5 line-clamp-1">{activeProduct.name}</div>
                      
                      <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-gray-100/70 text-[10px]">
                        <div>
                          <span className="text-gray-400 block font-light">Màu sắc</span>
                          <span className="font-semibold text-gray-700">{selectedColor || "Ngọc Trai"}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-light">Ướm cỡ</span>
                          <span className="font-semibold text-[#8B0015]">{selectedSize}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-light">Khuyên dùng</span>
                          <span className="text-emerald-700 font-semibold uppercase">Vừa Khít</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <button
                        onClick={(e) => {
                          onToggleWishlist(activeProduct.id, e as any);
                          showToast(
                            wishlist.includes(activeProduct.id) 
                              ? "Đã bỏ thích sản phẩm! 🤍" 
                              : "Đã thêm trang phục này vào danh sách yêu thích! ❤️"
                          );
                        }}
                        className="px-4 py-3 border border-[#E8E3DD] hover:bg-[#F7F4EF]/20 rounded-xl text-xs tracking-wider font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[#8B0015] active:translate-y-px"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(activeProduct.id) ? "fill-[#8B0015] text-[#8B0015]" : ""}`} />
                        <span>Lưu outfit</span>
                      </button>
                      <button
                        onClick={(e) => {
                          onAddToCart(activeProduct, e as any);
                          showToast("Đã thêm trang phục sang trọng vào giỏ hàng! 🛒");
                          // Smoothly go check the cart
                          setTimeout(() => onNavigate("cart"), 900);
                        }}
                        className="px-4 py-3 bg-[#8B0015] hover:bg-[#8B0015]/90 text-white rounded-xl text-xs tracking-widest font-semibold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:translate-y-px"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Mua ngay</span>
                      </button>
                    </div>

                    {/* Quick navigation hint */}
                    <button
                      onClick={() => setActiveStep(3)}
                      className="mt-3.5 text-[11px] text-[#8B0015] hover:underline font-semibold uppercase tracking-widest cursor-pointer flex items-center justify-center gap-1 mx-auto"
                    >
                      Xoay 360 độ góc quay thực tế <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MÀN HÌNH 3: XOAY 360 ĐỘ MODEL TRẢI NGHIỆM */}
            {activeStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-[#E8E3DD] p-4 sm:p-8 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center min-h-[640px] relative overflow-hidden"
              >
                {/* Visual Canvas Container (Height 700px) */}
                <div 
                  className={`w-full max-w-[420px] transition-all duration-300 flex flex-col items-center relative ${
                    isFullscreen ? "fixed inset-0 bg-white/95 z-50 p-6 flex justify-center items-center max-w-none" : ""
                  }`}
                  id="canvas-360-viewport"
                >
                  <div className="w-full flex items-center justify-between mb-2">
                    <div className="text-left">
                      <span className="text-[10px] text-[#8B0015] font-semibold tracking-widest uppercase">INTERACTIVE 360° ENGINE</span>
                      <h3 className="text-sm font-semibold text-gray-800 mt-0.5">{activeProduct.name}</h3>
                    </div>
                    {isFullscreen && (
                      <button
                        onClick={() => setIsFullscreen(false)}
                        className="p-2 border border-gray-200 rounded-full hover:bg-neutral-50 text-gray-500 text-xs uppercase"
                      >
                        Đóng Toàn Màn Hình
                      </button>
                    )}
                  </div>

                  {/* Character Rendering Window with drag & scale controls */}
                  <div 
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="relative w-full h-[380px] sm:h-[430px] rounded-2xl bg-[#FCFBF9] border border-[#E8E3DD] overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center justify-center shadow-inner group"
                  >
                    
                    {/* Rendered frame corresponding to index rotation Angle */}
                    <img
                      src={getProductOutfitAngles(activeProduct.id)[rotationAngleIndex]}
                      alt={`360 render index ${rotationAngleIndex}`}
                      className="w-full h-full object-cover select-none pointer-events-none transition-all duration-500 ease-out"
                      style={{ transform: `scale(${zoomScale})` }}
                    />

                    {/* Swapped face overlay */}
                    {characterGenerated && (
                      <div 
                        className="absolute top-[12%] left-[45%] -translate-x-1/2 w-12 h-14 rounded-full overflow-hidden border-2 border-white pointer-events-none shadow-sm bg-stone-100 transition-all duration-300"
                        style={{ transform: `scale(${zoomScale})` }}
                      >
                        <img 
                          src={getActiveFaceSrc()} 
                          alt="Swapped Face rotate" 
                          className="w-full h-full object-cover scale-[1.12]" 
                        />
                      </div>
                    )}

                    {/* Hint overlay on hover */}
                    <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all">
                      <span className="bg-black/60 backdrop-blur-md text-white/90 text-[10px] tracking-wider px-3 py-1 rounded-full uppercase">
                        🖱️ Click và kéo chuột để xoay 360°
                      </span>
                    </div>

                    {/* Angle degree indicator */}
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-semibold text-[#8B0015]">
                      GÓC QUAY: {rotationAngleIndex === 0 ? "0° TRƯỚC" : rotationAngleIndex === 1 ? "90° NGHIÊNG" : rotationAngleIndex === 2 ? "180° NGHIÊNG TRÁI" : "270° SAU TÀ"}
                    </div>
                  </div>

                  {/* 360 DEGREE REMOTE PANEL */}
                  <div className="w-full mt-6 bg-[#FCFBF9] border border-[#E8E3DD] p-4 rounded-2xl flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-3 text-center block">BỘ ĐIỀU KHIỂN XOAY VÒNG 360°</span>
                    
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 w-full text-center">
                      <button
                        onClick={() => setRotationAngleIndex(prev => (prev === 0 ? 3 : prev - 1))}
                        className="p-2 border border-gray-200 bg-white hover:bg-[#F7F4EF]/20 text-[10.5px] font-medium rounded-xl flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-[#8B0015] outline-none transition-all cursor-pointer shadow-xs"
                        title="Xoay sang trái"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Xoay trái</span>
                      </button>

                      <button
                        onClick={() => setRotationAngleIndex(prev => (prev + 1) % 4)}
                        className="p-2 border border-gray-200 bg-white hover:bg-[#F7F4EF]/20 text-[10.5px] font-medium rounded-xl flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-[#8B0015] outline-none transition-all cursor-pointer shadow-xs"
                        title="Xoay sang phải"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Xoay phải</span>
                      </button>

                      <button
                        onClick={() => setAutoRotate(!autoRotate)}
                        className={`p-2 border text-[10.5px] font-medium rounded-xl flex flex-col items-center justify-center gap-1 outline-none transition-all cursor-pointer shadow-xs ${
                          autoRotate 
                            ? "bg-[#8B0015] text-white border-transparent" 
                            : "border-gray-200 bg-white text-gray-700 hover:bg-[#F7F4EF]/20"
                        }`}
                        title="Chế độ tự động chụp quay liên tiếp"
                      >
                        {autoRotate ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5" />}
                        <span>Auto Xoay</span>
                      </button>

                      <button
                        onClick={() => setZoomScale(prev => Math.min(prev + 0.15, 2.0))}
                        className="p-2 border border-gray-200 bg-white hover:bg-[#F7F4EF]/20 text-[10.5px] font-medium rounded-xl flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-[#8B0015] outline-none transition-all cursor-pointer shadow-xs"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Zoom In</span>
                      </button>

                      <button
                        onClick={() => setZoomScale(prev => Math.max(prev - 0.15, 0.7))}
                        className="p-2 border border-gray-200 bg-white hover:bg-[#F7F4EF]/20 text-[10.5px] font-medium rounded-xl flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-[#8B0015] outline-none transition-all cursor-pointer shadow-xs"
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                        <span>Zoom Out</span>
                      </button>

                      <button
                        onClick={() => {
                          setZoomScale(1.0);
                          setRotationAngleIndex(0);
                          setAutoRotate(false);
                          showToast("Đã khôi phục góc máy ban đầu 📍");
                        }}
                        className="p-2 border border-gray-200 bg-white hover:bg-[#F7F4EF]/20 text-[10.5px] font-medium rounded-xl flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-[#8B0015] outline-none transition-all cursor-pointer shadow-xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                      </button>

                      <button
                        onClick={() => showToast(`Vải ${activeProduct.categoryName} cao cấp dệt sợi tự nhiên. Phù hợp 98%`)}
                        className="p-2 border border-gray-200 bg-white hover:bg-[#F7F4EF]/20 text-[10.5px] font-medium rounded-xl flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-[#8B0015] outline-none transition-all cursor-pointer shadow-xs"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Chi Tiết</span>
                      </button>

                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 border border-gray-200 bg-white hover:bg-[#F7F4EF]/20 text-[10.5px] font-medium rounded-xl flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-[#8B0015] outline-none transition-all cursor-pointer shadow-xs"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Toàn Màn</span>
                      </button>
                    </div>
                  </div>

                  {/* FLOAT DETAIL PANEL AT BOTTOM RIGHT */}
                  <div className="w-full mt-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8E3DD] p-4 text-left shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] text-gray-400 font-semibold tracking-wide block uppercase">Sản phẩm xoay 360</span>
                          <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">{activeProduct.name}</h4>
                        </div>
                        <span className="text-xs font-bold text-[#8B0015] bg-[#F7F4EF] p-1.5 rounded-lg shrink-0">
                          {activeProduct.price.toLocaleString("vi-VN")}đ
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-600">
                        <div>
                          <span className="text-gray-400 block text-[9.5px]">Mã SP</span>
                          <span className="font-semibold text-gray-800 uppercase">CR-{activeProduct.id}269</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[9.5px]">Color</span>
                          <span className="font-semibold text-gray-800">{selectedColor || "Kem Lụa"}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[9.5px]">Chất liệu</span>
                          <span className="font-semibold text-gray-800 truncate block">Mulberry / Satin Ý</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[9.5px]">Bảo hành</span>
                          <span className="font-semibold text-emerald-700">12 Tháng Atelier</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2.5 mt-4">
                      <button
                        onClick={(e) => onAddToCart(activeProduct, e)}
                        className="flex-grow bg-[#8B0015] hover:bg-[#8B0015]/90 text-[#F7F4EF] font-semibold text-xs py-3 px-4 rounded-xl tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:translate-y-px"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Ướm mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* FOOTER Hướng dẫn sử dụng phòng thử tiện nghi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 mt-12">
        <div className="bg-white border border-[#E8E3DD] rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
          <div className="flex items-center gap-2 text-[#8B0015] uppercase tracking-widest text-[11px] font-semibold mb-4">
            <Info className="w-4 h-4" />
            <span>MẸO TRẢI NGHIỆM PHÒNG THỬ</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-500 font-light leading-relaxed">
            <div className="border-[#E8E3DD] md:border-r pr-0 md:pr-6">
              <h4 className="font-medium text-gray-800 text-[13px] mb-1.5 uppercase tracking-wide">1. Đảm bảo ánh sáng</h4>
              <p>Ảnh chụp khuôn mặt tại phòng sáng hoặc góc ngoài trời để Chéri nhận diện và hiệu chỉnh da mượt mà nhất.</p>
            </div>
            <div className="border-[#E8E3DD] md:border-r pr-0 md:pr-6">
              <h4 className="font-medium text-gray-800 text-[13px] mb-1.5 uppercase tracking-wide">2. Số đo chuẩn dáng</h4>
              <p>Hãy chuẩn bị các số dải đo Ngực - Eo - Hông</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 text-[13px] mb-1.5 uppercase tracking-wide">3. Thay đổi góc nhìn</h4>
              <p>Đừng ngần ngại sử dụng chuột kéo thả hoặc phím tự động xoay ở Bước 3 để cảm nhận tà váy bồng bềnh rực rỡ.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
