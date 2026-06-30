import React from "react";
import { Sparkles } from "lucide-react";

interface RegisterPageProps {
  regName: string;
  regPhone: string;
  regEmail: string;
  regAddress: string;
  regPassword: string;
  regConfirmPassword: string;
  showRegPassword: boolean;
  onSetRegName: (v: string) => void;
  onSetRegPhone: (v: string) => void;
  onSetRegEmail: (v: string) => void;
  onSetRegAddress: (v: string) => void;
  onSetRegPassword: (v: string) => void;
  onSetRegConfirmPassword: (v: string) => void;
  onSetShowRegPassword: (v: boolean) => void;
  onRegisterSubmit: (e: React.FormEvent) => void;
  onNavigate: (page: string) => void;
}

export default function RegisterPage({
  regName, regPhone, regEmail, regAddress, regPassword, regConfirmPassword,
  showRegPassword,
  onSetRegName, onSetRegPhone, onSetRegEmail, onSetRegAddress,
  onSetRegPassword, onSetRegConfirmPassword, onSetShowRegPassword,
  onRegisterSubmit,
  onNavigate,
}: RegisterPageProps) {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white animate-fade-in">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-[#FAF8F5]/40 border border-gray-100 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Left hand Side: Premium Visuals */}
        <div className="relative hidden md:block aspect-[4/5] bg-stone-100">
          <img 
            src="https://static.wixstatic.com/media/911b80_7907b5e433d447698e7ea8bdd57b33e2~mv2.png" 
            alt="Chéri luxury membership visual banner" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-8 text-white space-y-2 text-center z-10">
            <h4 className="font-sans font-bold tracking-tight text-[20px] italic text-center text-white">Bắt đầu hành trình cùng Chéri!</h4>
          </div>
        </div>

        {/* Right hand Side: Register Input Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6 bg-white overflow-y-auto">
          <div className="space-y-1">
            <h3 className="text-[18px] font-sans font-bold tracking-tight text-[#74070E]">Đăng ký</h3>
          </div>

          <form onSubmit={onRegisterSubmit} className="space-y-4 text-xs font-light text-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Họ và tên</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ninh Dương Lan Ngọc"
                  value={regName}
                  onChange={(e) => onSetRegName(e.target.value)}
                  className="w-full bg-[#FAF8F5]/80 border border-gray-100 focus:border-[#74070e]/40 outline-none px-3.5 py-2.5 rounded-xl text-gray-800 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Số điện thoại</label>
                <input 
                  type="tel" 
                  required
                  placeholder="0909 123 456"
                  value={regPhone}
                  onChange={(e) => onSetRegPhone(e.target.value)}
                  className="w-full bg-[#FAF8F5]/80 border border-gray-100 focus:border-[#74070e]/40 outline-none px-3.5 py-2.5 rounded-xl text-gray-800 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Địa chỉ Email</label>
              <input 
                type="email" 
                required
                placeholder="lanngoc@gmail.com"
                value={regEmail}
                onChange={(e) => onSetRegEmail(e.target.value)}
                className="w-full bg-[#FAF8F5]/80 border border-gray-100 focus:border-[#74070e]/40 outline-none px-3.5 py-2.5 rounded-xl text-gray-800 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Địa chỉ mặc định</label>
              <textarea 
                required
                placeholder="79 Đường 3/2, Quận 10, Thành phố Hồ Chí Minh"
                value={regAddress}
                onChange={(e) => onSetRegAddress(e.target.value)}
                rows={2}
                className="w-full bg-[#FAF8F5]/80 border border-gray-100 focus:border-[#74070e]/40 outline-none px-3.5 py-2.5 rounded-xl text-gray-800 resize-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Mật khẩu</label>
                <input 
                  type={showRegPassword ? "text" : "password"} 
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => onSetRegPassword(e.target.value)}
                  className="w-full bg-[#FAF8F5]/80 border border-gray-100 focus:border-[#74070e]/40 outline-none px-3.5 py-2.5 rounded-xl text-gray-800 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Nhập lại mật khẩu</label>
                <input 
                  type={showRegPassword ? "text" : "password"} 
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={regConfirmPassword}
                  onChange={(e) => onSetRegConfirmPassword(e.target.value)}
                  className="w-full bg-[#FAF8F5]/80 border border-gray-100 focus:border-[#74070e]/40 outline-none px-3.5 py-2.5 rounded-xl text-gray-800 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pb-1 text-[10px] text-gray-400 font-bold">
              <label className="flex items-center space-x-2 cursor-pointer font-bold">
                <input 
                  type="checkbox" 
                  checked={showRegPassword}
                  onChange={() => onSetShowRegPassword(!showRegPassword)}
                  className="accent-[#74070e]"
                />
                <span className="font-bold">Hiển thị mật khẩu</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#74070e] hover:bg-[#5a050a] text-white text-xs uppercase tracking-widest py-4 rounded-xl shadow-xs transition-colors cursor-pointer font-sans font-medium flex items-center justify-center space-x-2 mt-2"
            >
              <span>ĐĂNG KÝ</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-center text-[11px] font-light text-gray-400 pt-2">
            Đã có tài khoản?{" "}
            <button 
              onClick={() => onNavigate("login")}
              className="text-[#74070e] font-normal hover:underline cursor-pointer"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
