import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSearch: () => void;
  isLoggedIn: boolean;
  userName: string;
  userAvatar: string;
}

export default function Header({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenSearch,
  isLoggedIn,
  userName,
  userAvatar,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { label: "Giới thiệu", page: "about" },
    { label: "Cửa hàng", page: "products" },
    { label: "Thử đồ ảo", page: "tryon" },
    { label: "Tra cứu đơn", page: "tracking" },
  ];

  const handleMobileNav = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 h-24 px-6 sm:px-12 transition-all duration-500 ${
      isScrolled 
        ? "bg-[#FDFBF7]/85 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-[0_4px_30px_rgba(212,175,55,0.03)] text-[#1A1A1A]" 
        : "bg-transparent border-b border-transparent text-[#1A1A1A]"
    }`}>
      {/* Laptop & Desktop Grid Layout (Centered Brand Styling) */}
      <div className="hidden md:grid grid-cols-3 items-center h-full max-w-7xl mx-auto">
        
        {/* Left Grid Cell: Text Links */}
        <nav className="flex items-center space-x-10 text-[13px] uppercase tracking-[0.2em] font-sans text-[#74070e]">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`hover:opacity-60 transition-all duration-200 cursor-pointer pb-1 ${
                currentPage === link.page ? "border-b border-[#74070e] font-semibold" : "opacity-75"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Center Grid Cell: Absolutely Centered Brand logo */}
        <div className="text-center">
          <button
            onClick={() => onNavigate("home")}
            className="inline-block relative cursor-pointer"
          >
            <span 
              className="text-5xl md:text-6xl font-normal text-[#74070e] font-logo block select-none px-2 transition-all duration-300"
            >
              Chéri
            </span>
          </button>
        </div>

        {/* Right Grid Cell: Pure luxury minimalist text buttons */}
        <div className="flex items-center justify-end space-x-8 text-[13px] uppercase tracking-[0.2em] font-sans text-[#74070e]">
          
          {/* Quick Search trigger text label only */}
          <button
            onClick={onOpenSearch}
            className="hover:opacity-60 transition-all cursor-pointer font-sans opacity-75"
          >
            Tìm kiếm
          </button>

          {/* Wishlist trigger text label only */}
          <button
            onClick={() => onNavigate("wishlist")}
            className={`hover:opacity-60 transition-all cursor-pointer font-sans ${
              currentPage === "wishlist" ? "border-b border-[#74070e] font-semibold pb-1" : "opacity-75"
            }`}
          >
            Yêu thích{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
          </button>

          {/* Cart trigger text label only */}
          <button
            onClick={() => onNavigate("cart")}
            className={`hover:opacity-60 transition-all cursor-pointer font-sans ${
              currentPage === "cart" ? "border-b border-[#74070e] font-semibold pb-1" : "opacity-75"
            }`}
          >
            Giỏ hàng{cartCount > 0 ? ` (${cartCount})` : ""}
          </button>

          {/* Account/Membership status text label only replaced with beautiful circular avatar as requested */}
          {isLoggedIn ? (
            <button
              onClick={() => onNavigate("account")}
              className="w-7 h-7 rounded-full overflow-hidden border border-[#74070e]/40 p-0.5 cursor-pointer hover:opacity-80 transition-all flex items-center justify-center shrink-0"
              title={`Hội viên: ${userName}`}
            >
              <img 
                src={userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                alt={userName} 
                className="w-full h-full rounded-full object-cover" 
              />
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className={`flex items-center space-x-1 p-1 hover:opacity-60 transition-all cursor-pointer text-[#74070e] ${
                  isAuthDropdownOpen ? "opacity-100" : "opacity-75"
                }`}
                title="Tài khoản"
              >
                <User className="w-5 h-5" />
              </button>

              {isAuthDropdownOpen && (
                <>
                  {/* Backdrop list overlay */}
                  <div 
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsAuthDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-40 bg-white border border-[#74070e]/10 shadow-[0_4px_12px_rgba(116,7,14,0.08)] py-1.5 z-50 text-left flex flex-col">
                    <button
                      onClick={() => {
                        onNavigate("login");
                        setIsAuthDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-[#74070e]/5 text-left text-[13px] font-medium text-[#74070e] transition-all duration-150 cursor-pointer"
                      style={{ fontFamily: '"SF Compact", sans-serif' }}
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => {
                        onNavigate("register");
                        setIsAuthDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-[#74070e]/5 text-left text-[13px] font-medium text-[#74070e] transition-all duration-150 cursor-pointer"
                      style={{ fontFamily: '"SF Compact", sans-serif' }}
                    >
                      Đăng ký
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile & Compact Phone View Layout (Compact interactive icons) */}
      <div className="flex md:hidden items-center justify-between h-full max-w-7xl mx-auto">
        {/* Left Side: Mobile Menu toggle & search icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1 text-[#74070e] hover:opacity-75 cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            onClick={onOpenSearch}
            className="p-1 text-[#74070e] hover:opacity-75 cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Brand Name Logo */}
        <div className="text-center">
          <button
            onClick={() => onNavigate("home")}
            className="inline-block cursor-pointer"
          >
            <span className="text-4xl font-normal text-[#74070e] font-logo select-none block">
              Chéri
            </span>
          </button>
        </div>

        {/* Right Side: Quick Action Icons for mobile checkout & bookmarks */}
        <div className="flex items-center space-x-4 text-[#74070e]">
          <button
            onClick={() => onNavigate("wishlist")}
            className="p-1 relative cursor-pointer hover:opacity-75"
            aria-label="Wishlist"
          >
            <Heart className={`w-5 h-5 ${currentPage === "wishlist" ? "fill-[#74070e]" : ""}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#74070e] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate("cart")}
            className="p-1 relative cursor-pointer hover:opacity-75"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#74070e] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => onNavigate("account")}
              className="w-6 h-6 rounded-full overflow-hidden border border-[#74070e]/40 p-0.5 cursor-pointer"
            >
              <img 
                src={userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                alt={userName} 
                className="w-full h-full rounded-full object-cover" 
              />
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className="p-1 text-[#74070e] hover:opacity-75 cursor-pointer"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </button>

              {isAuthDropdownOpen && (
                <>
                  {/* Backdrop list overlay */}
                  <div 
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsAuthDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-40 bg-white border border-[#74070e]/10 shadow-[0_4px_12px_rgba(116,7,14,0.08)] py-1.5 z-50 text-left flex flex-col">
                    <button
                      onClick={() => {
                        onNavigate("login");
                        setIsAuthDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-[#74070e]/5 text-left text-[13px] font-medium text-[#74070e] transition-all duration-150 cursor-pointer"
                      style={{ fontFamily: '"SF Compact", sans-serif' }}
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => {
                        onNavigate("register");
                        setIsAuthDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-[#74070e]/5 text-left text-[13px] font-medium text-[#74070e] transition-all duration-150 cursor-pointer"
                      style={{ fontFamily: '"SF Compact", sans-serif' }}
                    >
                      Đăng ký
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white p-6 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-5xl font-normal text-[#74070e] font-logo select-none">Chéri</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:text-[#74070e]">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-6 text-base tracking-widest font-light text-gray-800">
                <button
                  onClick={() => handleMobileNav("home")}
                  className={`text-left border-b border-gray-100 pb-2 ${currentPage === "home" ? "text-[#74070e] font-normal" : ""}`}
                >
                  Trang chủ
                </button>
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => handleMobileNav(link.page)}
                    className={`text-left border-b border-gray-100 pb-2 ${currentPage === link.page ? "text-[#74070e] font-normal" : ""}`}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => handleMobileNav("wishlist")}
                  className={`text-left border-b border-gray-100 pb-2 ${currentPage === "wishlist" ? "text-[#74070e] font-normal" : ""}`}
                >
                  Danh mục yêu thích ({wishlistCount})
                </button>
                <button
                  onClick={() => handleMobileNav("cart")}
                  className={`text-left border-b border-gray-100 pb-2 ${currentPage === "cart" ? "text-[#74070e] font-normal" : ""}`}
                >
                  Giỏ hàng của tôi ({cartCount})
                </button>
                {isLoggedIn ? (
                  <button
                    onClick={() => handleMobileNav("account")}
                    className={`text-left border-b border-gray-100 pb-2 flex items-center space-x-2 ${currentPage === "account" ? "text-[#74070e] font-normal" : ""}`}
                  >
                    <img 
                      src={userAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                      alt={userName} 
                      className="w-5 h-5 rounded-full object-cover" 
                    />
                    <span>Tài khoản ({userName})</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleMobileNav("login")}
                      className={`text-left border-b border-gray-100 pb-2 ${currentPage === "login" ? "text-[#74070e] font-normal" : ""}`}
                    >
                      Đăng nhập tài khoản
                    </button>
                    <button
                      onClick={() => handleMobileNav("register")}
                      className={`text-left border-b border-gray-100 pb-2 ${currentPage === "register" ? "text-[#74070e] font-normal" : ""}`}
                    >
                      Đăng ký hội viên
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs text-[#74070e] font-serif italic mb-1">Chéri - Gentle Elegance</p>
              <p className="text-[10px] text-gray-400">Minimalism & Elegance</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
