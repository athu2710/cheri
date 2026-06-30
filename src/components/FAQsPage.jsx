import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ_DATA = [
  {
    id: 1,
    question: "CHÉRI có những phương thức thanh toán nào?",
    answer:
      "CHÉRI hỗ trợ chuyển khoản ngân hàng, thanh toán khi nhận hàng (COD), ví điện tử và thẻ quốc tế.",
  },
  {
    id: 2,
    question: "Bao lâu tôi sẽ nhận được đơn hàng?",
    answer:
      "Thời gian giao hàng thông thường từ 2–4 ngày làm việc tùy khu vực. Đơn hàng ưu tiên sẽ được xử lý nhanh hơn.",
  },
  {
    id: 3,
    question: "Tôi có thể đổi hoặc trả sản phẩm không?",
    answer:
      "CHÉRI hỗ trợ đổi trả theo chính sách hiện hành đối với các sản phẩm đáp ứng điều kiện đổi trả của thương hiệu.",
  },
  {
    id: 4,
    question: "Làm thế nào để theo dõi đơn hàng?",
    answer:
      "Bạn có thể theo dõi trạng thái đơn hàng thông qua tài khoản CHÉRI hoặc mã đơn hàng được gửi sau khi đặt hàng thành công.",
  },
  {
    id: 5,
    question: "Tôi cần làm gì nếu nhận được sản phẩm lỗi?",
    answer:
      "Vui lòng liên hệ đội ngũ Chăm sóc Khách hàng của CHÉRI trong thời gian sớm nhất để được hỗ trợ.",
  },
  {
    id: 6,
    question: "CHÉRI có giao hàng toàn quốc không?",
    answer:
      "CHÉRI hiện hỗ trợ giao hàng trên toàn quốc thông qua các đối tác vận chuyển uy tín.",
  },
  {
    id: 7,
    question: "Làm thế nào để trở thành Hội viên CHÉRI?",
    answer:
      "Đăng ký tài khoản trên website để trở thành Hội viên CHÉRI và tận hưởng những quyền lợi dành riêng cho khách hàng thân thiết.",
  },
];

export default function FAQsPage() {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-12 py-16 animate-fade-in space-y-12 font-sans">
      {/* Header Banner */}
      <div
        id="faq-header"
        className="text-left space-y-3 pb-6 border-b border-gray-100"
      >
        <h2 className="text-[18px] font-sans font-bold text-[#74070E]">
          Câu hỏi thường gặp
        </h2>
        <div className="h-0.5 w-16 bg-[#74070e]/20 mt-4"></div>
      </div>

      {/* Accordions Container */}
      <div className="space-y-4">
        {FAQ_DATA.map((faq) => {
          const isOpen = activeId === faq.id;
          return (
            <div
              key={faq.id}
              id={`faq-item-${faq.id}`}
              className="rounded-[20px] border border-[#ECECEC] bg-white overflow-hidden transition-all duration-300 hover:shadow-xs hover:border-[#74070e]/25"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left outline-none cursor-pointer group"
              >
                <span className="text-sm font-medium text-gray-800 font-serif group-hover:text-[#74070e] transition-colors pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-[#74070e]/5 text-gray-500 group-hover:text-[#74070e]">
                  {isOpen ? (
                    <Minus className="w-4 h-4 transition-transform duration-300 transform rotate-180" />
                  ) : (
                    <Plus className="w-4 h-4 transition-transform duration-300" />
                  )}
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen
                    ? "max-h-40 border-t border-gray-50 opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="p-6 text-[14px] font-sans text-gray-600 font-light leading-relaxed bg-[#FCFBF9]/40">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
