import React from "react";
import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";

export default function AboutPage() {
  // Editorial fade-in variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A1A1A] overflow-hidden leading-relaxed font-sans selection:bg-[#74070e]/10 select-none">
      {/* 1. HERO SECTION: 75vh layout */}
      <section
        id="hero"
        className="relative min-h-[75vh] flex flex-col md:flex-row items-stretch border-b border-stone-200/60 bg-[#FDFBF7]"
      >
        {/* Left Side: Elegant headline and typography */}
        <div className="w-full md:w-1/2 bg-[#FDFBF7] px-6 sm:px-12 lg:px-20 py-16 md:py-8 flex flex-col justify-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 max-w-xl"
          >
            <motion.span
              variants={fadeInUp}
              className="text-stone-400 font-medium tracking-[0.35em] text-[10px] md:text-[11px] uppercase block"
            >
              HAUTE COUTURE & HERITAGE
            </motion.span>

            <motion.div variants={fadeInUp} className="space-y-1">
              <h1 className="font-logo text-7xl sm:text-8xl md:text-9xl text-[#74070e] leading-none select-none">
                Chéri
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-[#1A1A1A] text-sm sm:text-base font-light leading-relaxed font-sans pt-2 text-justify md:max-w-md"
            >
              Sự hòa quyện giữa nghệ thuật tôn vinh vóc dáng và ngôn ngữ thời
              trang lãng mạn. Chéri khơi dậy phong thái sang trọng, tối giản
              nhưng đầy cuốn hút, cùng nàng đi qua mọi thăng trầm của thời gian.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="pt-6 flex items-center space-x-3 text-[#1A1A1A]"
            >
              <span className="h-[1px] w-12 bg-[#74070E]"></span>
              <span className="font-sans font-light tracking-[0.25em] text-[11px] uppercase">
                EST. 2026 / SÀI GÒN
              </span>
            </motion.div>
          </motion.div>

          {/* Subtle watermark */}
          <div className="absolute left-6 bottom-4 text-[9px] text-[#74070e]/25 uppercase tracking-[0.25em] font-mono hidden md:block">
            Chéri Luxury Editorial — No. 01
          </div>
        </div>

        {/* Right Side: Portrait Image fitted perfectly with larger display size */}
        <div className="w-full md:w-1/2 relative min-h-[500px] md:min-h-0 bg-[#FDFBF7] flex items-center justify-center p-0 border-l border-stone-100">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex items-center justify-center relative overflow-hidden group"
          >
            <img
              src="https://static.wixstatic.com/media/983f45_6715224f014543ad84db8479b07c64b7~mv2.webp"
              alt="Chéri Boutique Model"
              referrerPolicy="no-referrer"
              className="h-[80vh] w-auto max-w-full object-contain mx-auto select-none pointer-events-none transition-transform duration-[1200ms] group-hover:scale-[1.02]"
            />

            {/* Elegant corner overlay label */}
            <div className="absolute bottom-6 right-6 text-[9px] text-stone-400 bg-[#FDFBF7]/70 backdrop-blur-xs px-3 py-1.5 border border-stone-200/55 tracking-[0.15em] font-mono uppercase">
              Full Look Editorial • Atelier View
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TẦM NHÌN (VISION) SECTION */}
      <section
        id="vision"
        className="bg-[#FFFFFF] py-20 px-6 sm:px-12 lg:px-20 border-b border-stone-100 relative"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Side: Model portrait (No bounding box, highly expanded image size based on request) */}
          <div className="md:col-span-6 flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center overflow-hidden"
            >
              <img
                src="https://static.wixstatic.com/media/911b80_5fd5270f88dd4f0cbe7e4f286303305b~mv2.jpg"
                alt="Chéri Boutique Vision Look"
                referrerPolicy="no-referrer"
                className="w-full max-w-full h-auto md:h-[80vh] md:max-h-[80vh] object-cover md:object-contain select-none pointer-events-none scale-102 hover:scale-105 transition-all duration-[1000ms]"
              />
            </motion.div>
          </div>

          {/* Right Side: Vision content styled identically to description text style */}
          <div className="md:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-2.5 text-[#74070E]">
                <Sparkles className="w-5 h-5 text-[#74070E] animate-pulse" />
                <h3 className="font-lux-garamond text-2xl sm:text-3xl tracking-[0.15em] font-bold uppercase text-[#74070E] mt-0.5">
                  TẦM NHÌN
                </h3>
              </div>

              <div className="h-[1.5px] w-12 bg-[#74070E] mt-1 mb-4"></div>

              <p className="text-[#1A1A1A] text-sm sm:text-base font-light leading-relaxed font-sans text-justify pt-1">
                “Xây dựng thương hiệu thời trang Việt Nam vươn tầm khu vực, nơi
                gặp gỡ của sự tinh tế thế giới.”
              </p>
            </motion.div>

            <div className="border-t border-stone-100 pt-5 mt-4 flex items-center justify-between text-[9px] tracking-[0.2em] font-mono text-stone-400">
              <span>Chéri Boutique</span>
              <span className="text-[#74070E] font-medium tracking-[0.25em] uppercase">
                Visionary
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SỨ MỆNH (MISSION) SECTION */}
      <section
        id="mission"
        className="bg-[#FFFFFF] py-20 px-6 sm:px-12 lg:px-20 border-b border-stone-100 relative"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Side: Mission content styled identically to description text style */}
          <div className="md:col-span-6 order-2 md:order-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-2.5 text-[#74070E]">
                <Heart className="w-5 h-5 text-[#74070E]" />
                <h3 className="font-lux-garamond text-2xl sm:text-3xl tracking-[0.15em] font-bold uppercase mt-0.5 text-[#74070E]">
                  SỨ MỆNH
                </h3>
              </div>

              <div className="h-[1.5px] w-12 bg-[#74070E] mt-1 mb-4"></div>

              <p className="text-[#1A1A1A] text-sm sm:text-base font-light leading-relaxed font-sans text-justify pt-1">
                “Chéri cam kết đồng hành cùng mọi cô gái, bất kể hình thể hay
                vóc dáng, trên hành trình nuôi dưỡng sự tự tin và tỏa sáng theo
                cách riêng của mình.”
              </p>
            </motion.div>

            <div className="border-t border-stone-100 pt-5 mt-4 flex items-center justify-between text-[9px] tracking-[0.2em] font-mono text-stone-400">
              <span>Empowerment Standard</span>
              <span className="text-[#74070E] font-semibold tracking-[0.25em] uppercase">
                Mission
              </span>
            </div>
          </div>

          {/* Right Side: Model portrait (No bounding box, image: 911b80_4df1d6cd9a02449e8aee4298dc414fae~mv2.jpg, highly expanded image size based on request) */}
          <div className="md:col-span-6 order-1 md:order-2 flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex items-center justify-center overflow-hidden"
            >
              <img
                src="https://static.wixstatic.com/media/911b80_4df1d6cd9a02449e8aee4298dc414fae~mv2.jpg"
                alt="Chéri Boutique Mission Look"
                referrerPolicy="no-referrer"
                className="w-full max-w-full h-auto md:h-[80vh] md:max-h-[80vh] object-cover md:object-contain select-none pointer-events-none scale-102 hover:scale-105 transition-all duration-[1000ms]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FULL-WIDTH BANNER IMAGE (NARROW HEIGHT TO 1/2 of original) */}
      <section className="w-full relative overflow-hidden bg-[#FAF6EE] h-[25vh] sm:h-[35vh] md:h-[45vh] lg:h-[50vh]">
        <img
          src="https://static.wixstatic.com/media/911b80_5dc0e0a23453442a98d222f21c738e01~mv2.jpg"
          alt="Chéri Grand Campaign Layout"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </section>

      {/* 5. FADE-OUT TERMINOLOGY LOGO (py-20 reduced to py-7, i.e., 1/3 of previous padding) */}
      <section className="bg-[#FAF6EE] py-7 px-6 sm:px-12 text-center border-t border-[#D4AF37]/10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-lg"
        >
          <span className="font-logo text-6xl sm:text-7xl block text-[#74070e] leading-none mb-1">
            Chéri
          </span>
        </motion.div>
      </section>
    </div>
  );
}
