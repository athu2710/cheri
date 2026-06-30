import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "initial",
      role: "assistant",
      content:
        "Kính chào Quý khách! Chéri rất hân hạnh được lắng nghe và tư vấn phong cách riêng cho bạn. Hôm nay em có thể trợ giúp chị tìm kiếm kiểu sơ mi lụa mềm mại, đầm tiệc sang trọng hay gợi ý chọn size vừa vặn nhất cho vóc dáng kiều diễm của chị ạ? ✨",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Global event listener to trigger chatbot open
  useEffect(() => {
    const handleTrigger = () => {
      setIsOpen(true);
    };
    window.addEventListener("open_cheri_chat", handleTrigger);
    return () => {
      window.removeEventListener("open_cheri_chat", handleTrigger);
    };
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const assistantMessage = {
        id: "assistant-" + Date.now(),
        role: "assistant",
        content:
          data.text ||
          "Dạ Chéri vô cùng xin lỗi, hiện tại kết nối tư vấn đang bận một chút. Chị có thể thử lại ngay sau vài giây được không ạ? 🌹",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbox send error:", error);
      const errorMessage = {
        id: "error-" + Date.now(),
        role: "assistant",
        content:
          "Dạ, em cảm thấy kết nối mạng bị gián đoạn đôi chút. Boutique Chéri rất sẵn lòng đón nhận câu hỏi của chị tại hotline: 0881 1880 080 ạ. ✨",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (suggestionText) => {
    handleSend(suggestionText);
  };

  const suggestions = [
    { label: "Gợi ý váy đi tiệc 🌹" },
    { label: "Áo sơ mi lụa Mulberry ✨" },
    { label: "Địa chỉ Boutique Chéri 📍" },
    { label: "Thời gian giao hàng bao lâu? 📦" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white hover:bg-[#74070e] hover:text-white text-[#74070e] border border-[#74070e] p-4 rounded-none shadow-none flex items-center justify-center cursor-pointer group transition-all duration-300 relative"
        >
          <MessageSquare className="w-5 h-5 transition-transform" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap text-[10px] uppercase tracking-[0.2em] font-light ml-0 group-hover:ml-2.5">
            Stylist Trực Tuyến
          </span>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#74070e]"></span>
          </span>
        </button>
      )}

      {/* Main Chat Drawer */}
      {isOpen && (
        <div className="w-full max-w-[390px] h-[550px] bg-white rounded-none shadow-none flex flex-col overflow-hidden border border-[#74070e]/20 transition-all duration-300">
          {/* Header */}
          <div className="bg-white text-[#74070e] border-b border-[#74070e]/10 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-none bg-[#74070e]/5 flex items-center justify-center border border-[#74070e]/10">
                <span className="font-serif italic text-lg text-[#74070e] font-normal">
                  C
                </span>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#74070e]">
                  Chéri Consultant
                </h3>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[9px] text-gray-400 font-light tracking-wide uppercase">
                    Stylist đang hoạt động
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#74070e]/60 hover:text-[#74070e] p-1.5 hover:bg-stone-50 transition-colors cursor-pointer rounded-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Slogan strip */}
          <div className="bg-[#FAF8F5] border-b border-[#74070e]/5 px-5 py-2 flex items-center justify-between text-[11px] text-[#74070e]/60 font-light tracking-widest uppercase">
            <span>Gentle Elegance Boutique</span>
            <Sparkles className="w-3 h-3 text-[#74070e]" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FCFBF9]">
            {messages.map((message) => {
              const isAssistance = message.role === "assistant";
              return (
                <div
                  key={message.id}
                  className={`flex ${isAssistance ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] flex flex-col ${isAssistance ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`rounded-none px-4 py-3 text-[13px] leading-relaxed ${
                        isAssistance
                          ? "bg-white text-gray-800 border border-[#74070e]/5 shadow-none"
                          : "bg-[#74070e] text-white border border-[#74070e] shadow-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-mono">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Waiting loading state */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="bg-white text-gray-800 rounded-none px-4 py-3.5 border border-[#74070e]/5 shadow-none flex items-center space-x-1">
                    <span
                      className="w-2 h-2 rounded-full bg-[#74070e]/40 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full bg-[#74070e]/70 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full bg-[#74070e] animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                  <span className="text-[8px] text-gray-400 mt-1 uppercase tracking-widest">
                    Chéri đang soạn...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Tray */}
          {messages.length === 1 && !isLoading && (
            <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#74070e]/10 flex overflow-x-auto gap-2 no-scrollbar">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestion(sug.label)}
                  className="bg-white border border-[#74070e]/10 hover:border-[#74070e] hover:text-[#74070e] text-[10px] uppercase tracking-[0.1em] text-[#74070e] px-3 py-1.5 rounded-none whitespace-nowrap transition-colors select-none font-light cursor-pointer"
                >
                  {sug.label}
                </button>
              ))}
            </div>
          )}

          {/* Chat text input box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-4 bg-white border-t border-[#74070e]/10 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hỏi Chéri về phối đồ, size, chất liệu..."
              className="flex-1 bg-[#FCFBF9] border border-[#74070e]/10 focus:border-[#74070e] text-xs px-4 py-3 rounded-none outline-none transition-all placeholder:text-gray-400 text-[#74070e] font-light"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#74070e] hover:opacity-95 text-white p-3 rounded-none disabled:bg-stone-50 disabled:text-gray-400 transition-colors flex items-center justify-center cursor-pointer border border-[#74070e]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
