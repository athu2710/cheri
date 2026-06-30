import React from "react";
import { Mail, Lock, Sparkles } from "lucide-react";

interface LoginPageProps {
  loginEmail: string;
  loginPassword: string;
  showLoginPassword: boolean;
  isForgotPassword: boolean;
  forgotEmail: string;
  onSetLoginEmail: (v: string) => void;
  onSetLoginPassword: (v: string) => void;
  onSetShowLoginPassword: (v: boolean) => void;
  onSetIsForgotPassword: (v: boolean) => void;
  onSetForgotEmail: (v: string) => void;
  onLoginSubmit: (e: React.FormEvent) => void;
  onNavigate: (page: string) => void;
  showToast: (msg: string, type?: "success" | "info") => void;
}

export default function LoginPage({
  loginEmail,
  loginPassword,
  showLoginPassword,
  isForgotPassword,
  forgotEmail,
  onSetLoginEmail,
  onSetLoginPassword,
  onSetShowLoginPassword,
  onSetIsForgotPassword,
  onSetForgotEmail,
  onLoginSubmit,
  onNavigate,
  showToast,
}: LoginPageProps) {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white animate-fade-in">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-[#FAF8F5]/40 border border-gray-100 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Left Side: Premium Visuals banner */}
        <div className="relative hidden md:block aspect-[4/5] bg-stone-100">
          <img 
            src="https://static.wixstatic.com/media/911b80_7907b5e433d447698e7ea8bdd57b33e2~mv2.png" 
            alt="Chéri luxury silk collections banner" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-8 text-white space-y-2 text-center z-10">
            {isForgotPassword ? (
              <p className="font-sans font-bold tracking-tight text-[20px] italic text-center text-white">
                Chúng tôi sẽ giúp bạn lấy lại tài khoản
              </p>
            ) : (
              <h4 className="font-sans font-bold tracking-tight text-[20px] italic text-center text-white">
                Chào mừng quay trở lại!
              </h4>
            )}
          </div>
        </div>

        {/* Right Side: Login Input Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-8 bg-white">
          {isForgotPassword ? (
            <>
              <div className="space-y-2">
                <h3 className="text-[18px] font-sans font-bold tracking-tight text-[#74070E]">Quên mật khẩu</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Vui lòng nhập địa chỉ email, hệ thống Chéri sẽ gửi một liên kết chứa mã thiết lập lại mật mã bảo mật riêng tư.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast(`Gửi liên kết đặt lại mật mã thành công tới email: ${forgotEmail}! Vui lòng kiểm tra hộp thư nhé 💌`, "success");
                  onSetIsForgotPassword(false);
                }} 
                className="space-y-5 text-xs font-light text-gray-700"
              >
                <div className="space-y-1">
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Địa chỉ Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      type="email" 
                      required
                      placeholder="lanngoc@gmail.com"
                      value={forgotEmail}
                      onChange={(e) => onSetForgotEmail(e.target.value)}
                      className="w-full bg-[#FAF8F5]/80 border border-gray-100 focus:border-[#74070e]/40 outline-none pl-11 pr-4 py-3 rounded-xl text-gray-800 transition-colors text-xs font-light"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#74070e] hover:bg-[#5a050a] text-white text-xs uppercase tracking-widest py-4 rounded-xl shadow-xs transition-colors cursor-pointer font-sans font-medium flex items-center justify-center space-x-2"
                >
                  <span>GỬI YÊU CẦU</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="border-t border-gray-100 pt-6 text-center">
                <button 
                  onClick={() => onSetIsForgotPassword(false)}
                  className="text-xs text-[#74070e] font-normal hover:underline cursor-pointer"
                >
                  Quay lại Đăng nhập
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h3 className="text-[18px] font-sans font-bold tracking-tight text-[#74070E]">Đăng nhập</h3>
              </div>

              <form onSubmit={onLoginSubmit} className="space-y-5 text-xs font-light text-gray-700">
                <div className="space-y-1">
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Địa chỉ Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input 
                      type="email" 
                      required
                      placeholder="contact.cheri@gmail.com"
                      value={loginEmail}
                      onChange={(e) => onSetLoginEmail(e.target.value)}
                      className="w-full bg-[#FAF8F5]/80 border border-gray-100 focus:border-[#74070e]/40 outline-none pl-11 pr-4 py-3 rounded-xl text-gray-800 transition-colors text-xs font-light"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Mật khẩu</label>
                    <button 
                      type="button" 
                      onClick={() => onSetIsForgotPassword(true)}
                      className="text-[10px] text-[#74070e] hover:underline cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-350" />
                    <input 
                      type={showLoginPassword ? "text" : "password"} 
                      required
                      minLength={6}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => onSetLoginPassword(e.target.value)}
                      className="w-full bg-[#FAF8F5]/80 border border-gray-100 focus:border-[#74070e]/40 outline-none pl-11 pr-12 py-3 rounded-xl text-gray-800 transition-colors text-xs font-light"
                    />
                    <button 
                      type="button"
                      onClick={() => onSetShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-450 hover:text-[#74070e] font-sans text-[10px] font-medium p-1 cursor-pointer"
                    >
                      {showLoginPassword ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#74070e] hover:bg-[#5a050a] text-white text-xs uppercase tracking-widest py-4 rounded-xl shadow-xs transition-colors cursor-pointer font-sans font-medium flex items-center justify-center space-x-2"
                >
                  <span>ĐĂNG NHẬP</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <p className="text-center text-[11px] font-light text-gray-400">
                  Bạn chưa đăng ký tài khoản?{" "}
                  <button 
                    onClick={() => onNavigate("register")}
                    className="text-[#74070e] font-normal hover:underline cursor-pointer"
                  >
                    Tạo tài khoản
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
