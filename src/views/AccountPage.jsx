import React from "react";
import { LogOut, MapPin } from "lucide-react";
import { formatVND } from "../utils";

export default function AccountPage({
  userProfile,
  selectedOrderTab,
  filteredOrders,
  activeDropdownId,
  accPassword,
  accConfirmPassword,
  onSetSelectedOrderTab,
  onSetActiveDropdownId,
  onSetAccPassword,
  onSetAccConfirmPassword,
  onUpdateProfile,
  onLogout,
  onNavigate,
  onReviewProduct,
  onReorderItem,
  getOrderCountByStatus,
  getDeadlineDate,
  getProductImage,
}) {
  const setCurrentPage = onNavigate;
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-fade-in space-y-10">
        {/* User card banner */}
        <div className="bg-[#FAF8F5] border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div
              onClick={() =>
                document.getElementById("avatar-upload-input")?.click()
              }
              className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#74070e]/80 relative cursor-pointer group"
              title="Tải ảnh đại diện lên"
            >
              <img
                src={userProfile.avatar || DEFAULT_AVATAR}
                alt={userProfile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = DEFAULT_AVATAR;
                }}
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[9px] text-white font-medium uppercase font-sans tracking-wider">
                  Tải lên
                </span>
              </div>
              <input
                id="avatar-upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const base64 = event.target?.result;
                      if (base64) {
                        setUserProfile({ ...userProfile, avatar: base64 });
                        showToast("Đã cập nhật ảnh đại diện thành công 🌹");
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-serif text-gray-950 font-medium">
                {userProfile.name}
              </h3>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#74070e] text-white py-0.5 px-2.5 rounded-sm">
                  HẠNG {userProfile.memberTier.toUpperCase()} VIP
                </span>
                <span className="text-xs text-amber-800 font-mono font-medium">
                  ✨ 2,500 Chéri Points
                </span>
              </div>
            </div>
          </div>

          {/* Quick statistics */}
          <div className="flex items-center space-x-8 text-center text-xs text-gray-500 font-light border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-8 w-full sm:w-auto justify-around sm:justify-end">
            <div>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">
                Mã Hội Viên
              </p>
              <strong className="text-gray-800 font-semibold font-mono">
                CHR-29048-VIP
              </strong>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">
                Tích điểm nhận quà
              </p>
              <strong className="text-gray-800 font-semibold font-mono">
                Giảm 10% Trọn đời
              </strong>
            </div>
          </div>
        </div>

        {/* Split view: historical orders and settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left historical list (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-3 gap-4">
              <h3 className="text-lg font-serif text-gray-900 font-medium">
                Đơn hàng của Quý cô
              </h3>
              <span className="text-[11px] text-gray-500 font-mono">
                Dữ liệu đồng bộ lúc: 21:54 VN
              </span>
            </div>

            {/* Premium Navigation Tabs with counts */}
            <div className="flex flex-row items-center border-b border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 -mx-2 px-2 gap-1.5 scroll-smooth">
              {[
                { id: "all", label: "Tất cả" },
                { id: "pending", label: "Chờ thanh toán" },
                { id: "shipped", label: "Vận chuyển" },
                { id: "preparing", label: "Chờ giao hàng" },
                { id: "delivered", label: "Hoàn thành" },
                { id: "cancelled", label: "Đã hủy" },
                { id: "returned", label: "Trả hàng/Hoàn tiền" },
              ].map((tab) => {
                const count = getOrderCountByStatus(tab.id);
                const isActive = selectedOrderTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setSelectedOrderTab(tab.id);
                      setActiveDropdownId(null);
                    }}
                    className={`py-2 px-3 text-[11px] sm:text-xs font-medium cursor-pointer uppercase tracking-wider transition-all rounded-md border flex items-center space-x-1.5 shrink-0 ${
                      isActive
                        ? "bg-[#74070e] text-white border-[#74070e] shadow-xs"
                        : "bg-white text-gray-600 hover:text-[#74070e] border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredOrders.length > 0 ? (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-100 rounded-xl p-5 sm:p-6 shadow-xs space-y-5 relative"
                  >
                    {/* Order code and status banner */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-150 pb-3 gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest font-bold">
                          Mã số đơn hàng: {order.id}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 font-light">
                            Ngày khởi tạo: <strong>{order.date}</strong>
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] uppercase font-bold tracking-widest py-1 px-3 rounded-full flex items-center space-x-1 border ${
                          order.status === "delivered"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : order.status === "cancelled"
                              ? "bg-red-50 text-red-700 border-red-100"
                              : order.status === "returned"
                                ? "bg-purple-50 text-purple-700 border-purple-100"
                                : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            order.status === "delivered"
                              ? "bg-emerald-500"
                              : order.status === "cancelled"
                                ? "bg-red-500"
                                : order.status === "returned"
                                  ? "bg-purple-500"
                                  : "bg-amber-500 animate-pulse"
                          }`}
                        ></span>
                        <span>{order.statusText}</span>
                      </span>
                    </div>

                    {/* Order items lists in beautiful image-cards matching the user requested mockup */}
                    <div className="divide-y divide-gray-50 space-y-4">
                      {order.items.map((item, idx) => {
                        const matchedProduct = getMatchingProduct({
                          productId: item.productId,
                          productName: item.productName,
                        });
                        const prodImg = matchedProduct
                          ? matchedProduct.image
                          : getProductImage(item.productId, item.productName);

                        const dispName = item.productName;
                        const dispPrice = item.price;

                        return (
                          <div
                            key={idx}
                            className="pt-4 first:pt-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                          >
                            <div className="flex items-start space-x-4 w-full">
                              {/* Left: Product photo with luxury framing */}
                              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 aspect-square shrink-0 relative bg-gray-50 flex items-center justify-center p-1">
                                <img
                                  src={prodImg}
                                  alt={dispName}
                                  className="w-full h-full object-contain mix-blend-multiply"
                                />
                              </div>

                              {/* Middle description matching design parameters */}
                              <div className="space-y-1.5 flex-grow min-w-0">
                                <h4 className="text-xs sm:text-sm font-sans font-medium text-gray-900 leading-snug line-clamp-2">
                                  {dispName}
                                </h4>

                                <p className="text-[10px] sm:text-xs text-gray-500 font-light flex flex-wrap gap-2">
                                  {item.size && (
                                    <span>
                                      Kích thước:{" "}
                                      <strong className="font-semibold text-gray-800">
                                        {item.size}
                                      </strong>
                                    </span>
                                  )}
                                  {item.colorName && (
                                    <span>
                                      | Màu:{" "}
                                      <strong className="font-semibold text-gray-800">
                                        {item.colorName}
                                      </strong>
                                    </span>
                                  )}
                                  <span>
                                    | Số lượng:{" "}
                                    <strong className="font-semibold text-gray-800">
                                      x{item.quantity}
                                    </strong>
                                  </span>
                                </p>
                              </div>
                            </div>

                            {/* Right item total cost column */}
                            <div className="flex md:flex-col justify-between md:justify-center items-center md:items-end w-full md:w-auto border-t md:border-t-0 border-gray-150 pt-2.5 md:pt-0 shrink-0">
                              <span className="text-gray-900 font-serif font-medium text-sm sm:text-base">
                                {formatVND(dispPrice * item.quantity)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Unified Order Footer Section */}
                    {(() => {
                      const orderTotal = order.items.reduce((sum, item) => {
                        return sum + item.price * item.quantity;
                      }, 0);

                      const deadlineDate = getDeadlineDate(order.date);
                      const orderKey = order.id;
                      const isDropdownOpen = activeDropdownId === orderKey;
                      const savedReview = reviewedItems[orderKey];

                      return (
                        <div className="border-t border-gray-150 pt-5 mt-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-1">
                            <div className="flex items-baseline space-x-2">
                              <span className="text-xs text-gray-500 font-light font-sans">
                                Thành tiền (đã gồm VAT):
                              </span>
                              <span className="text-[#74070e] font-serif font-bold text-sm sm:text-base md:text-lg">
                                {formatVND(orderTotal)}
                              </span>
                            </div>

                            {/* Dynamic status note or review status */}
                            {order.status === "delivered" && (
                              <div className="text-[10px] sm:text-xs text-gray-400 italic font-light">
                                {savedReview ? (
                                  <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                                    <Check className="w-3.5 h-3.5 inline mr-1 shrink-0" />
                                    <span>
                                      Quý cô đã đánh giá {savedReview.rating}★
                                      vào ngày {savedReview.date}
                                    </span>
                                  </span>
                                ) : (
                                  <span>
                                    Nhận xét đơn hàng trước {deadlineDate}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Multi-action buttons at order level, styled strictly matched & high-end */}
                          {order.status === "delivered" && (
                            <div className="grid grid-cols-12 gap-1.5 w-full xs:w-[245px] sm:w-[255px] md:w-[260px] lg:w-[275px] relative shrink-0">
                              {/* Review Action Trigger Button */}
                              {savedReview ? (
                                <button
                                  type="button"
                                  disabled
                                  className="col-span-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[8px] xs:text-[9px] uppercase tracking-wider h-9 rounded-sm font-bold flex items-center justify-center whitespace-nowrap w-full text-center px-0.5"
                                >
                                  <Check className="w-2.5 h-2.5 mr-0.5 shrink-0" />
                                  <span>Đã ĐG</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const itemsNames = order.items
                                      .map((it) => {
                                        const matched = getMatchingProduct({
                                          productId: it.productId,
                                          productName: it.productName,
                                        });
                                        return matched
                                          ? matched.name
                                          : it.productName;
                                      })
                                      .join(", ");
                                    setReviewTarget({
                                      orderId: order.id,
                                      isOrderReview: true,
                                      itemsSummary: itemsNames,
                                      productId:
                                        order.items[0]?.productId || "",
                                      productName: `Đơn hàng #${order.id}`,
                                      price: orderTotal,
                                      size: "",
                                      colorName: "",
                                    });
                                    setReviewRating(5);
                                    setReviewText("");
                                    setSelectedReviewPreset("");
                                    setReviewModalOpen(true);
                                  }}
                                  className="col-span-3 bg-[#74070e] hover:bg-[#5a050a] text-white text-[8px] xs:text-[9.5px] uppercase tracking-wider h-9 rounded-sm font-bold transition-all cursor-pointer whitespace-nowrap text-center justify-center flex items-center w-full"
                                >
                                  Đánh giá
                                </button>
                              )}

                              {/* Refund request button */}
                              <button
                                type="button"
                                onClick={() => {
                                  showToast(
                                    `Ghi nhận yêu cầu Trả hàng/Hoàn tiền cho đơn hàng ${order.id}. Nhân viên sẽ gọi điện chăm sóc ngay 🌹`,
                                    "success",
                                  );
                                }}
                                className="col-span-6 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-[8px] xs:text-[9px] uppercase tracking-wider h-9 rounded-sm font-bold transition-all whitespace-nowrap text-center justify-center flex items-center w-full px-0.5"
                              >
                                Trả hàng/Hoàn tiền
                              </button>

                              {/* More Dropdown Menu button */}
                              <div className="col-span-3 relative w-full">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveDropdownId(
                                      isDropdownOpen ? null : orderKey,
                                    );
                                  }}
                                  className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-[8px] xs:text-[9.5px] uppercase tracking-wider h-9 rounded-sm flex items-center justify-center space-x-0.5 cursor-pointer whitespace-nowrap w-full font-bold text-center"
                                >
                                  <span>Thêm</span>
                                  <span className="text-[7px] ml-0.5">▼</span>
                                </button>

                                {/* Dropdown popup portal */}
                                {isDropdownOpen && (
                                  <div className="absolute right-0 bottom-full mb-1 sm:bottom-auto sm:top-full sm:mt-1 w-40 bg-white border border-gray-100 rounded-md shadow-lg py-1.5 z-40 animate-fade-in text-left">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveDropdownId(null);
                                        window.dispatchEvent(
                                          new Event("open_cheri_chat"),
                                        );
                                        showToast(
                                          "Đã kết nối với chuyên viên tư vấn riêng của Quý cô! 🌸",
                                          "success",
                                        );
                                      }}
                                      className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-[11px] text-gray-700 flex items-center space-x-2"
                                    >
                                      <span>💬 Liên hệ người bán</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveDropdownId(null);
                                        // Reorder all items in order
                                        order.items.forEach((it) => {
                                          const matched = getMatchingProduct({
                                            productId: it.productId,
                                            productName: it.productName,
                                          });
                                          const dispName = matched
                                            ? matched.name
                                            : it.productName;
                                          handleReorderItem(
                                            it.productId,
                                            dispName,
                                            it.size,
                                            it.colorName,
                                          );
                                        });
                                      }}
                                      className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-[11px] text-gray-700 flex items-center space-x-2 border-t border-gray-50"
                                    >
                                      <span>🛍️ Mua lại đơn</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Order footer delivery note */}
                    <div className="bg-[#FAF8F5]/80 rounded-lg p-3 text-[11px] text-gray-500 space-y-1 font-light border border-gray-50/50">
                      <p className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#74070e]" />
                        <span>
                          Giao đến: Sđt <strong>{order.phone}</strong> | Địa
                          chỉ: {order.address}
                        </span>
                      </p>
                    </div>

                    {/* Total pricing calculator & General Action Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs pt-3 border-t border-gray-100 gap-3 w-full">
                      {order.status !== "cancelled" &&
                      order.status !== "returned" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setTrackingOrderId(order.id);
                            setTrackingPhone(order.phone);
                            setCurrentPage("tracking");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="bg-[#74070e]/5 font-medium hover:bg-[#74070e] hover:text-white text-[#74070e] text-[10px] uppercase tracking-widest py-2 px-4 rounded-md transition-all flex items-center space-x-1.5 cursor-pointer outline-none border border-[#74070e]/20"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Theo dõi vận trình</span>
                        </button>
                      ) : (
                        <div className="text-[11px] text-gray-400 italic">
                          {order.status === "cancelled"
                            ? "Đơn hàng đã hủy"
                            : "Yêu cầu Trả hàng/Hoàn tiền đang xử lý"}
                        </div>
                      )}

                      <div className="flex items-center space-x-2 ml-auto">
                        <span className="text-gray-400 font-medium text-[11px]">
                          Thành tiền:
                        </span>
                        <strong className="text-sm font-bold text-[#74070e] font-sans">
                          {formatVND(order.total)}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl font-light text-gray-400 text-xs flex flex-col items-center justify-center space-y-3">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
                <span>Quý cô chưa có đơn hàng nào ở danh mục này.</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage("products")}
                  className="bg-[#74070e] hover:bg-[#5a050a] text-white text-[10px] uppercase tracking-wider px-4 py-2 rounded"
                >
                  Khám phá BST mới
                </button>
              </div>
            )}
          </div>

          {/* Right Profile updates (4 cols) */}
          <div className="lg:col-span-4 bg-[#FCFBF9] border border-gray-100 rounded-xl p-6 space-y-6">
            <h3 className="text-sm uppercase tracking-widest font-semibold text-gray-800 border-l-2 border-[#74070e] pl-2">
              Hồ sơ
            </h3>

            <form
              onSubmit={handleUpdateProfile}
              className="space-y-4 text-xs font-light"
            >
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  required
                  value={userProfile.name}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, name: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 outline-none px-3 py-2.5 rounded-lg text-gray-800 focus:border-gray-300"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                  Email liên lạc
                </label>
                <input
                  type="email"
                  required
                  readOnly
                  value={userProfile.email}
                  className="w-full bg-gray-50 border border-gray-200 outline-none px-3 py-2.5 rounded-lg text-gray-500 cursor-not-allowed"
                  title="Email không thể thay đổi sau khi đăng ký"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                  Điện thoại liên hệ
                </label>
                <input
                  type="tel"
                  required
                  value={userProfile.phone}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, phone: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 outline-none px-3 py-2.5 rounded-lg text-gray-800 focus:border-gray-300"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                  Địa chỉ giao hàng mặc định
                </label>
                <textarea
                  required
                  value={userProfile.address}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, address: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-white border border-gray-200 outline-none px-3 py-2 rounded-lg text-gray-800 resize-none focus:border-gray-300"
                />
              </div>

              <div className="border-t border-gray-100/80 pt-4 space-y-3.5">
                <h4 className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  Đổi mật khẩu
                </h4>
                <div>
                  <label className="block text-[9px] text-gray-400 mb-1">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    placeholder="Để trống nếu không muốn đổi"
                    value={accPassword}
                    onChange={(e) => setAccPassword(e.target.value)}
                    minLength={6}
                    className="w-full bg-white border border-gray-200 outline-none px-3 py-1.5 rounded-lg text-gray-800 focus:border-[#74070e]/45"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-gray-400 mb-1">
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    type="password"
                    placeholder="Để trống nếu không muốn đổi"
                    value={accConfirmPassword}
                    onChange={(e) => setAccConfirmPassword(e.target.value)}
                    minLength={6}
                    className="w-full bg-white border border-gray-200 outline-none px-3 py-1.5 rounded-lg text-gray-800 focus:border-[#74070e]/45"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#74070e] hover:bg-[#5a050a] text-white text-[10px] uppercase tracking-widest py-3.5 rounded-lg shadow-xs transition-colors cursor-pointer font-sans font-normal"
              >
                LƯU
              </button>
            </form>

            <div className="border-t border-gray-200 pt-5 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLoggedIn(false);
                  setUserProfile(GUEST_USER);
                  safeLocalStorage.setItem("cheri_is_logged_in", "false");
                  safeLocalStorage.removeItem("cheri_user");
                  showToast("Đăng xuất thành công", "info");
                  setCurrentPage("home");
                }}
                className="text-red-700 font-sans tracking-widest text-[11px] uppercase hover:opacity-80 flex items-center justify-center space-x-2 mx-auto cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất tài khoản</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
