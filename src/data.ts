import { Product } from "./types";

export const CHERI_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Áo Sơ Mi Lụa Mulberry (Mulberry Silk Shirt)",
    price: 1250000,
    originalPrice: 1750000,
    category: "tops",
    categoryName: "Áo Thiết Kế",
    image: "https://images.unsplash.com/photo-1548624149-f95ab51fc05b?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Kem Ngọc Trai", hex: "#FFFDF6" },
      { name: "Đỏ Chéri Trầm", hex: "#74070e" },
      { name: "Cát Beige Warm", hex: "#D4C5B9" }
    ],
    sizes: ["S", "M", "L"],
    description: "Được may thủ công hoàn toàn từ 100% sợi tơ tằm Mulberry tự nhiên hảo hạng, chiếc áo sơ mi mang đến cảm giác mướt mát nuông chiều từng tế bào da. Phom dáng suông rơi bay bổng nhẹ tênh, kết hợp đường may giấu chỉ vô cùng tinh tế, toát lên thần thái lịch duyệt mộc mạc mà sang trọng kín đáo của phái nữ ngày nay.",
    details: [
      "100% Lụa Mulberry tự nhiên dệt tay truyền thống",
      "Phom dáng Relaxed-fit rộng rủ vừa vặn, vát đuôi tôm nhẹ nhã nhặn",
      "Khuy cài từ vỏ ngọc trai tự nhiên xà cừ óng ánh tinh xảo",
      "Cổ áo đức được tinh toán kỹ lưỡng nâng niu khuôn cổ gợi cảm",
      "Giặt khô hoặc giặt tay nước mát nhẹ nhàng để bảo tồn sợi tơ tằm óng mượt"
    ],
    rating: 4.9,
    isNew: true,
    inStock: true
  },
  {
    id: "2",
    name: "Đầm Dạ Hội Satin Classic (Classic Satin Evening Dress)",
    price: 2450000,
    category: "dresses",
    categoryName: "Đầm Thiết Kế",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Đỏ Chéri Hoàng Gia", hex: "#74070e" },
      { name: "Đen Nhung Huyền", hex: "#1A1A1A" },
      { name: "Xanh Emerald", hex: "#0F4633" }
    ],
    sizes: ["S", "M", "L"],
    description: "Khơi gợi vẻ quyến rũ vương bá trường tồn, chiếc đầm Satin Ý cắt xéo dệt bóng mượt nương theo tuyệt đối từng đường cong phái đẹp một cách kín đáo và trân trọng. Phần tà xẻ đùi ẩn hiện nhịp bước thướt tha kết hợp chiếc cổ khoét lưng sâu duyên dáng, lôi cuốn dạt dào ánh mắt trong mọi dạ tiệc thượng lưu.",
    details: [
      "Chất liệu lụa Satin Ý cao cấp, bóng tinh sảo và có độ nặng rơi sang trọng",
      "Đường cắt bias dệt xéo vải giúp nương nhẹ vừa vặn cơ thể hoàn mĩ",
      "Chi tiết cổ bẻ trùm vai mềm rủ hờ hững kiêu kỳ",
      "Khóa kéo ẩn chìm sắc sảo dọc lưng mượt mà dễ mặc",
      "Bên trong lót lụa habutai dịu nhẹ thoáng mát ôm da"
    ],
    rating: 5.0,
    isNew: true,
    inStock: true
  },
  {
    id: "3",
    name: "Áo Blazer Dạ Tweed Phối Khuy Gold (Gold-Button Tweed Blazer)",
    price: 1850000,
    originalPrice: 2200000,
    category: "outerwear",
    categoryName: "PHỤ KIỆN",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Trắng Ivory", hex: "#FDFDFD" },
      { name: "Hắc Trân Châu Đen", hex: "#1C1C1E" }
    ],
    sizes: ["S", "M", "L"],
    description: "Hòa nhịp giữa sự quyền quý và lãng mạn nước Pháp, chiếc áo Blazer vải Tweed dệt kim sợi thô lốm đốm sang quý của Chéri đứng phom cứng cáp nhưng tôn dáng tuyệt hảo. Được đính hàng khuy đồng vát góc cổ điển đúc nổi chìm, mang đậm hơi thở thượng lưu Paris thanh thế.",
    details: [
      "Vải Tweed dệt tay tự nhiên đan sợi len nhũ lóng lánh",
      "Đệm vai nhẹ gọn tôn bờ vai thanh mảnh chuẩn tỷ lệ",
      "Hàng khuy kim loại đúc mạ vàng 18K khuyên vát tinh xảo",
      "Hai túi ốp viền tua rua thêu chỉ tơ tằm cổ điển",
      "Lót gió cao cấp mượt mát chống bám dính tiện phối đồ layer"
    ],
    rating: 4.8,
    isNew: false,
    inStock: true
  },
  {
    id: "4",
    name: "Quần Tây Ống Suông Silk Crepe (Wide-Leg Silk Crepe Trousers)",
    price: 1150000,
    category: "bottoms",
    categoryName: "Chân Váy & Quần",
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Beige Caramel", hex: "#CDB39E" },
      { name: "Đen Obsidian", hex: "#111111" },
      { name: "Trắng Off-white", hex: "#FAF8F5" }
    ],
    sizes: ["S", "M", "L"],
    description: "Kiến tạo chiều cao lý tưởng và độ thong thả quyến rũ khó cưỡng, chiếc quần tây ống suông rộng rãi được cắt may bằng chất lụa cát dầy Silk Crepe đẳng cấp. Ly quần ủi thẳng nếp sắc nét vĩnh viễn mang lại phom dáng tự do phóng khoáng, vô cùng chuyên nghiệp khi diện công sở hay đầy thong dong dạo phố.",
    details: [
      "Vải lụa cát Crepe dày dặn, không nhăn nhàu, bay bay thướt tha",
      "Thiết kế lưng cao giấu khóa thắt khuyết chìm cực sạch dáng",
      "Ống rủ đứng thẳng tắp dài chấm gót, ăn gian chiều cao xuất sắc",
      "Túi chéo hai bên thời thượng sâu rộng thực dụng",
      "Đường khâu vắt gấu tỉ mỉ thủ công vô cùng cao quý"
    ],
    rating: 4.7,
    isNew: false,
    inStock: true
  },
  {
    id: "5",
    name: "Đầm Lụa Cát Tay Bồng Chiết Eo (Puff-Sleeve Silk Sand Dress)",
    price: 1950000,
    category: "dresses",
    categoryName: "Đầm Thiết Kế",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Hồng Nude Phấn", hex: "#EAD6D2" },
      { name: "Kem Sữa Cozy", hex: "#F3ECE3" }
    ],
    sizes: ["S", "M"],
    description: "Như một bài thơ mùa hè dịu êm, đầm lụa cát tay bồng phảng phất hương vị thơ ngây cổ điển hoàng hoàng. Thiết kế chiết nhún eo cao kết hợp tà rủ thướt tha, tay phồng bong bóng nhẹ hờ hững che khuyết điểm bờ vai đầy nữ tính. Thích hợp cho những buổi tiệc trà hoàng hôn rực rỡ.",
    details: [
      "Lụa cát Sa-tanh cát mịn óng mờ trang nhã",
      "Cổ vuông vát nhẹ thanh khiết khoe xương quai xanh gợi cảm",
      "Tay áo bồng bo chun nhẹ tinh nghịch lịch thiệp",
      "Dây thắt eo nơ lụa mảnh thanh tú quyến rũ phía sau",
      "Cắt may rủ xuôi tự nhiên hạn chế bắt bẩn tối đa"
    ],
    rating: 4.9,
    isNew: true,
    inStock: true
  },
  {
    id: "6",
    name: "Chân Váy Xếp Ly Satin Hoàng Gia (Premium Pleated Satin Skirt)",
    price: 950000,
    originalPrice: 1250000,
    category: "bottoms",
    categoryName: "Chân Váy & Quần",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Vàng Champagne", hex: "#EAD8C3" },
      { name: "Đỏ Chéri Ấm", hex: "#74070e" },
      { name: "Xám Bạc Khói", hex: "#A8A9AD" }
    ],
    sizes: ["S", "M", "L"],
    description: "Nhịp nhàng theo chuyển động uyển chuyển, dải xếp ly mượt mà như những đợt sóng satin vàng lấp lánh phản quang đầy quyến rũ. Bản cạp dệt chun thêu vân nhã nhặn co giãn êm ái, chân váy ôm thon tại eo rồi rũ rộng bay bổng lãng mạn. Một thiết kế đa dụng dễ phối ghép đẳng cấp vô ngần.",
    details: [
      "Vải Satin bóng nhẹ tinh tế đặc hữu xuất xứ Hàn Quốc",
      "Quy trình dập ly nhiệt bền bỉ, sắc sảo từ nếp gấp nhỏ đến lớn dần quy chuẩn",
      "Lớp lót chống tĩnh điện mượt mát bảo bọc trọn vẹn sự tự tin",
      "Màu Champagne đắp nhũ bóng quý phái nâng tầm trang phục phối kèm",
      "Dễ dàng phối cùng sơ mi lụa Chéri hoặc blazer sang chảnh"
    ],
    rating: 4.8,
    isNew: false,
    inStock: true
  },
  {
    id: "7",
    name: "Áo Gile Kaki Dáng Hộp Cổ Điển (Classic Boxy Khaki Gile)",
    price: 1350000,
    category: "tops",
    categoryName: "Áo Thiết Kế",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Ghi Sáng Minimal", hex: "#DDDCD8" },
      { name: "Beige Cát Cổ Điển", hex: "#D6C3B3" }
    ],
    sizes: ["S", "M", "L"],
    description: "Hiện thân hoàn mĩ cho trào lưu tối giản Minimalist tinh xảo, áo gile dáng hộp cắt góc dứt khoát mang đến sự uy quyền thản nhiên của một quý cô bận rộn. Chất vải kaki thô Pháp dệt vân mật độ cao giữ phom hộp sắc sảo, đính nút sừng sẫm màu mộc mạc làm dịu đi sự cứng cáp.",
    details: [
      "Kaki Pháp thượng hạng dệt từ sợi organic bông tự nhiên 100%",
      "Phom suông hộp hiện đại cá tính nâng tầm outfit độc bản",
      "Cổ V cắt sâu thanh mảnh đắt giá tinh giản",
      "Hàng khuy sừng bò tự nhiên mầu gỗ trầm mộc mạc",
      "Mẫu gile lý tưởng phối độc lập tự tin hoặc khoác ngoài sơ mi lụa"
    ],
    rating: 4.6,
    isNew: false,
    inStock: true
  },
  {
    id: "8",
    name: "Áo Len Cashmere Cổ Lọ Chéri (Chéri Cashmere Sweater)",
    price: 1650000,
    category: "outerwear",
    categoryName: "PHỤ KIỆN",
    image: "https://images.unsplash.com/photo-1574164904299-3a102b110380?auto=format&fit=crop&q=80&w=800",
    secondaryImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Beige Oatmeal", hex: "#E9E0D2" },
      { name: "Nâu Chocolate Cổ Điển", hex: "#3D241C" },
      { name: "Đỏ Chéri Classic", hex: "#74070e" }
    ],
    sizes: ["S", "M"],
    description: "Nhẹ tênh tựa như làn khói sương mai ôm ấp, dệt từ sợi lông dê Cashmere thượng đẳng siêu mềm dẻo dai ấm áp kỳ lạ. Thớ dệt gân tăm mảnh tạo độ giãn tinh tế mềm tự nhiên tại phần cổ cao thanh tú, bảo vệ phái nữ trước cơn gió lạnh mùa Thu Đông mà vẫn khoe khéo bờ vai lãng mạn nhẹ tênh.",
    details: [
      "100% Sợi len lông dê Cashmere chọn lọc từ đồng cỏ cao nguyên Alashan",
      "Sợi tơ ấm mảnh tơ nhuyễn nhẹ thanh thoát không gây ngứa hay dính ráp",
      "Thiết kế cổ lọ dệt bo gân nâng đỡ độ đứng cổ ấm cúng và tôn cằm kiêu sa",
      "Thương hiệu Chéri thêu tay nhỏ tinh xảo bằng chỉ đỏ tại gấu áo phải",
      "Tông màu đất thanh bình nhã nhặn, vượt thời gian dễ mặc"
    ],
    rating: 5.0,
    isNew: true,
    inStock: true
  }
];

export const CHERI_CATEGORIES = [
  { id: "all", name: "Tất Cả Sản Phẩm" },
  { id: "tops", name: "Áo Thiết Kế" },
  { id: "bottoms", name: "Chân Váy & Quần" },
  { id: "dresses", name: "Đầm Thiết Kế" },
  { id: "outerwear", name: "PHỤ KIỆN" }
];

export const BLOGS = [
  {
    id: "b1",
    title: "Triết lý Tối giản - Đỉnh cao tối thượng của Sự Sang Trọng Lịch Thiệp",
    excerpt: "Sự thanh lịch tinh tế của người phụ nữ hiện đại không nằm ở độ rườm rà chói lóa, mà ở chất liệu lụa satin mượt rủ cùng gam sắc dịu phẳng lặng tinh khôi.",
    date: "14 Tháng 6, 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "b2",
    title: "Hướng dẫn lựa chọn loại vải Tơ Tằm tự nhiên Mulberry đúng điệu boutique",
    excerpt: "Lụa Mulberry hay sợi Tơ tằm Mulberry được mệnh danh là nữ hoàng tơ lụa. Cùng Chéri khám phá bí quyết giữ gìn độ bóng óng mịn như mây bền ròn của loại lụa vương giả này.",
    date: "08 Tháng 6, 2026",
    image: "https://images.unsplash.com/photo-1548624149-f95ab51fc05b?auto=format&fit=crop&q=80&w=800"
  }
];
