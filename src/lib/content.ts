/**
 * Toàn bộ nội dung trang, chép đủ từ "Mindosoft · Hồ sơ năng lực 2026" (v3.1),
 * giữ đúng thứ tự 11 chương của hồ sơ. Các section chỉ lo trình bày; sửa chữ
 * hay số liệu thì sửa ở đây.
 *
 * Quy ước: không dùng gạch dài (—, –) trong chữ hiển thị. Khoảng số viết bằng
 * gạch ngắn ("2-4 tuần"), ý nối câu thì tách câu hoặc dùng dấu phẩy.
 */

export const COMPANY = {
  name: "Mindosoft",
  legalName: "Mindosoft Co., Ltd.",
  website: "https://mindosoft.vn",
  slogan: "Từ dữ liệu đến quyết định",
  address:
    "Tầng 2, Tầng 3, Căn số 20-TT3, Khu nhà ở Đài phát sóng phát thanh Mễ Trì, Phường Đại Mỗ, Thành phố Hà Nội, Việt Nam",
  closing:
    "Mỗi doanh nghiệp đều có sẵn dữ liệu để ra quyết định tốt hơn. Việc của Mindosoft là biến dữ liệu ấy thành những quyết định nhanh và đúng, mỗi ngày.",
};

/** Một nhãn duy nhất cho mọi nút "liên hệ" trên trang. */
export const CONTACT_LABEL = "Liên hệ tư vấn";

/** 11 chương, đúng số và tên trong hồ sơ. `id` là anchor của section. */
export const CHAPTERS = [
  { no: "01", id: "cong-ty", label: "Công ty" },
  { no: "02", id: "he-sinh-thai", label: "Hệ sinh thái sản phẩm" },
  { no: "03", id: "mindo-super-app", label: "Sản phẩm lõi" },
  { no: "04", id: "boi-canh", label: "Bối cảnh" },
  { no: "05", id: "dss", label: "Chủ lực 01: Điều hành & ra quyết định" },
  { no: "06", id: "giai-phap-nganh", label: "Chủ lực 02: Giải pháp chuyên ngành" },
  { no: "07", id: "dinh-vi", label: "Định vị" },
  { no: "08", id: "nang-luc", label: "Năng lực" },
  { no: "09", id: "nen-tang-ai", label: "Nền tảng số & trí tuệ nhân tạo" },
  { no: "10", id: "phat-trien-van-hanh", label: "Phát triển & vận hành hệ thống" },
  { no: "11", id: "kien-truc-quy-trinh", label: "Kiến trúc & quy trình" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];

export function chapter(id: ChapterId) {
  return CHAPTERS.find((c) => c.id === id)!;
}

export const NAV = [
  { href: "#cong-ty", label: "Công ty" },
  { href: "#he-sinh-thai", label: "Sản phẩm" },
  { href: "#nang-luc", label: "Năng lực" },
  { href: "#kien-truc-quy-trinh", label: "Quy trình" },
  { href: "#lien-he", label: "Liên hệ" },
];

/* ------------------------------------------------------------------ */
/* Bìa                                                                  */
/* ------------------------------------------------------------------ */

export const HERO = {
  eyebrow: "Hồ sơ năng lực 2026",
  // Bản rút gọn (~20 từ) của câu giới thiệu trên bìa; câu đầy đủ nằm ở meta description
  lead: "Sản phẩm AI, hệ hỗ trợ ra quyết định và chuyển đổi số cho doanh nghiệp sản xuất, bán lẻ, dịch vụ.",
};

/** Năm thẻ trên bìa hồ sơ, chạy thành dải dưới hero. */
export const COVER_TAGS = [
  "Mindo Super App",
  "Hệ hỗ trợ ra quyết định",
  "Khách sạn thông minh",
  "Phòng khám thông minh",
  "Chuyển đổi số & AI",
  "Website",
  "Ứng dụng di động",
  "HRM",
  "CRM",
];

/* ------------------------------------------------------------------ */
/* 01 · Công ty                                                         */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  title: "Mindosoft là ai",
  lead: "Công ty công nghệ chuyên về chuyển đổi số, ứng dụng trí tuệ nhân tạo và xây dựng hệ thống hỗ trợ ra quyết định. Chúng tôi không dừng ở việc viết phần mềm. Chúng tôi đưa dữ liệu rời rạc của doanh nghiệp về một mối, biến nó thành chỉ số điều hành, rồi đặt vào tay người lãnh đạo một buồng lái để quyết nhanh và quyết đúng.",
  mission:
    "Rút ngắn khoảng cách giữa dữ liệu và quyết định, từ hàng tuần xuống hàng phút, và mỗi cảnh báo đều đi kèm một đề xuất hành động cụ thể.",
  fields: [
    "Sản phẩm AI cho người dùng",
    "Tư vấn chuyển đổi số",
    "Nền tảng dữ liệu",
    "AI ứng dụng",
    "DSS, Dashboard",
    "Website, ứng dụng",
    "HRM, CRM",
    "Tích hợp, IoT",
    "Khách sạn, phòng khám",
  ],
  markets: [
    "Sản xuất",
    "Bán lẻ và chuỗi cửa hàng",
    "Phân phối, logistics",
    "Lưu trú",
    "Y tế, phòng khám",
    "Giáo dục",
    "Bất động sản",
  ],
  reach: "Nhận dự án trên toàn quốc, hướng tới Nhật Bản và Đông Nam Á.",
};

/** `count` là phần số chạy được; `pad` giữ số 0 đứng đầu như "03". */
export const STATS = [
  { value: "09/2025", count: null, pad: 0, suffix: "", label: "Thành lập" },
  { value: "30", count: 30, pad: 0, suffix: "+", label: "Nhân sự, tính đến 09/2026" },
  { value: "03", count: 3, pad: 2, suffix: "", label: "Sản phẩm: 1 lõi, 2 chủ lực" },
  { value: "18", count: 18, pad: 0, suffix: "", label: "Dịch vụ trong 5 nhóm năng lực" },
];

/* ------------------------------------------------------------------ */
/* 02 · Hệ sinh thái sản phẩm                                           */
/* ------------------------------------------------------------------ */

export const ECOSYSTEM = {
  title: "Một sản phẩm lõi, hai sản phẩm chủ lực",
  lead: "Ba sản phẩm cùng một nền tảng dịch vụ, dùng chung đội ngũ, kiến trúc dữ liệu và năng lực trí tuệ nhân tạo của Mindosoft.",
  /** "Đội kinh doanh chỉ cần nhớ": ai dùng sản phẩm nào. */
  routing: [
    { who: "Người dùng cá nhân", product: "Mindo Super App", href: "#mindo-super-app" },
    { who: "Doanh nghiệp", product: "Hệ hỗ trợ ra quyết định", href: "#dss" },
    { who: "Lưu trú và y tế", product: "Khách sạn, phòng khám thông minh", href: "#giai-phap-nganh" },
  ],
  products: [
    {
      kind: "Sản phẩm lõi, cho người dùng cá nhân",
      name: "Mindo Super App",
      body: "Siêu ứng dụng gom trợ lý AI, nhắn tin, gọi video, tin tức thị trường và chứng nhận số Mindo Peer vào một tài khoản. Là sản phẩm Mindosoft tự phát triển, tự vận hành.",
      fit: "Bản MVP ra mắt đầu tháng 10/2026",
    },
    {
      kind: "Sản phẩm chủ lực 01, cho doanh nghiệp",
      name: "Hệ hỗ trợ ra quyết định (DSS)",
      body: "Buồng lái điều hành cho ban lãnh đạo: cây chỉ số xuyên suốt, bảng điều hành đa tầng, cảnh báo sớm kèm phương án xử lý, hỏi đáp số liệu bằng tiếng Việt.",
      fit: "Khách phù hợp: sản xuất, bán lẻ, chuỗi cửa hàng, phân phối",
    },
    {
      kind: "Sản phẩm chủ lực 02, chuyên ngành",
      name: "Khách sạn & Phòng khám thông minh",
      body: "Giải pháp trọn gói dựng sẵn: tự động hoá từ đặt phòng, đặt lịch tới thanh toán; kiosk và robot lễ tân AI; bảng điều hành doanh thu cho chủ đầu tư.",
      fit: "Khách phù hợp: khách sạn, resort, phòng khám, chuỗi phòng khám",
    },
  ],
  foundation: {
    title: "Nền tảng dịch vụ: 18 dịch vụ, 5 nhóm năng lực",
    body: "Tư vấn chuyển đổi số, nền tảng dữ liệu, AI ứng dụng, website, ứng dụng, HRM, CRM, tích hợp và vận hành. Vừa bán độc lập, vừa là phần móng để triển khai các sản phẩm chủ lực.",
  },
};

/* ------------------------------------------------------------------ */
/* 03 · Mindo Super App                                                 */
/* ------------------------------------------------------------------ */

export const SUPER_APP = {
  title: "Mindo Super App: một tài khoản, cả thế giới số",
  lead: "Siêu ứng dụng do Mindosoft phát triển cho người làm nội dung, nhà đầu tư và người theo dõi thị trường: vàng, dầu, hàng hoá, bất động sản, chứng khoán, ngoại hối. Thay vì mở năm ứng dụng mỗi sáng, người dùng hỏi AI, nhắn tin, gọi điện và đọc tin thị trường ngay trong Mindo.",
  features: [
    {
      id: "ai",
      name: "Trợ lý AI",
      body: "Hỏi đáp, đọc ảnh và tài liệu, tạo ảnh, tạo file, dịch Việt ⇄ Anh, Hàn, Trung.",
      example:
        "Hỏi “giá dầu tăng thì ngành nào được lợi”, nhận tóm tắt theo ngành, dịch sang tiếng Hàn và xuất file Excel theo dõi ngay trong một cuộc trò chuyện.",
      screen: "/phones/ai-chat.png",
      alt: "Màn hình trò chuyện với trợ lý AI Mindo",
    },
    {
      id: "chat",
      name: "Nhắn tin & gọi điện",
      body: "Chat thời gian thực, nhóm chat, gọi thoại và video.",
      example:
        "Cuộc gọi đến hiện như cuộc gọi điện thoại thường, kể cả khi máy đang khoá.",
      screen: "/phones/video-call.png",
      alt: "Màn hình gọi video trên Mindo",
    },
    {
      id: "news",
      name: "Tin tức thị trường",
      body: "Tin tài chính, kinh tế theo lĩnh vực quan tâm, AI tóm tắt và phân tích.",
      example:
        "Mỗi bài có phần tóm tắt và phân tích do AI viết, kèm số lượt tóm tắt còn lại trong tháng.",
      screen: "/phones/hero-news.png",
      alt: "Màn hình tin tức trên Mindo",
    },
    {
      id: "peer",
      name: "Mindo Peer",
      body: "Chứng nhận số có số seri riêng, mở khoá hạn mức và quyền lợi AI.",
      example: "Xác minh danh tính bằng CCCD và mã QR trước khi cấp chứng nhận.",
      screen: null,
      alt: "Thẻ chứng nhận số Mindo Peer",
    },
  ],
  roadmap: [
    { when: "Giai đoạn 1, đầu 10/2026", what: "MVP: AI, liên lạc, tin tức, Peer", now: true },
    { when: "Giai đoạn 2", what: "Mạng xã hội & video ngắn", now: false },
    { when: "Giai đoạn 3", what: "Tác tử AI chủ động", now: false },
  ],
};

/* ------------------------------------------------------------------ */
/* 04 · Bối cảnh                                                        */
/* ------------------------------------------------------------------ */

export const CONTEXT = {
  title: "Sáu điểm nghẽn khiến doanh nghiệp ra quyết định chậm",
  lead: "Đây là những gì chúng tôi gặp lại gần như nguyên vẹn ở phần lớn doanh nghiệp Việt Nam quy mô vừa trở lên, bất kể ngành nghề.",
  items: [
    {
      title: "Quản trị cảm tính",
      body: "Quyết định dựa vào kinh nghiệm và báo cáo miệng. Khi sai thì đã muộn, và không ai truy được sai từ đâu.",
    },
    {
      title: "Dữ liệu phân tán",
      body: "Mỗi phòng một tệp bảng tính, mỗi hệ thống một con số. Họp nửa buổi chỉ để thống nhất xem doanh thu thật là bao nhiêu.",
    },
    {
      title: "Chỉ số hình thức",
      body: "Bộ chỉ số lập ra cho có, không nối được với lợi nhuận và không ai bị ràng buộc trách nhiệm theo chỉ số đó.",
    },
    {
      title: "Hệ thống rời rạc",
      body: "Kế toán, bán hàng, kho, nhân sự chạy trên các phần mềm không nói chuyện được với nhau. Nhân viên trở thành cầu nối thủ công.",
    },
    {
      title: "Thiếu buồng lái điều hành",
      body: "Lãnh đạo không có một màn hình duy nhất để nhìn toàn cảnh doanh nghiệp theo thời gian thực.",
    },
    {
      title: "AI thử nghiệm rời rạc",
      body: "Đã thử vài công cụ nhưng chỉ dừng ở mức trình diễn, không gắn vào quy trình nên không tạo ra kết quả kinh doanh.",
    },
  ],
  quoteStart:
    "Trong mười năm tới, cạnh tranh không còn là doanh nghiệp lớn thắng doanh nghiệp nhỏ, mà là",
  quoteEnd: "doanh nghiệp ra quyết định nhanh thắng doanh nghiệp ra quyết định chậm.",
};

/* ------------------------------------------------------------------ */
/* 05 · DSS                                                             */
/* ------------------------------------------------------------------ */

export const DSS = {
  title: "Hệ hỗ trợ ra quyết định: buồng lái cho ban lãnh đạo",
  lead: "Nơi dữ liệu, chỉ số và trí tuệ nhân tạo hội tụ thành công cụ điều hành hằng ngày. Đây là sản phẩm thể hiện rõ nhất khẩu hiệu “Từ dữ liệu đến quyết định”.",
  modules: [
    {
      code: "07",
      title: "DSS: cây chỉ số & cảnh báo",
      points: [
        "Cây chỉ số xuyên suốt, nối kết quả từng bộ phận với lợi nhuận chung",
        "Trung tâm cảnh báo theo ngưỡng và theo mô hình phát hiện bất thường",
        "Truy nguyên đa chiều: từ tổng số xuống tận đơn hàng, ca sản xuất",
        "Mô phỏng kịch bản trước khi quyết",
      ],
    },
    {
      code: "08",
      title: "Dashboard điều hành đa tầng",
      points: [
        "Hội đồng quản trị: tăng trưởng, hiệu quả vốn, cơ cấu nợ",
        "Tổng giám đốc: lợi nhuận ròng, vòng quay hàng tồn, chu kỳ tiền mặt",
        "Giám đốc khối: hiệu suất thiết bị, tỷ lệ lỗi, độ phủ phân phối",
        "Xem trên máy tính, màn hình phòng họp và điện thoại",
      ],
    },
    {
      code: "09",
      title: "Trợ lý AI & cảnh báo sớm",
      points: [
        "Hỏi đáp bằng tiếng Việt tự nhiên, trả lời kèm biểu đồ",
        "Cảnh báo chủ động qua ứng dụng nhắn tin và email",
        "Mỗi cảnh báo kèm nguyên nhân nghi ngờ và hai đến ba phương án xử lý",
        "Tóm tắt tình hình đầu ngày gửi riêng cho từng vai trò",
      ],
    },
  ],
  dayTitle: "Một ngày điều hành cùng Mindosoft",
  day: [
    {
      time: "07:30",
      system:
        "Gửi bản tóm tắt đầu ngày riêng cho từng vai trò: số liệu hôm qua, việc cần chú ý hôm nay.",
      leader:
        "Đọc trên điện thoại trong 3 phút, biết ngay hôm nay cần bám việc gì.",
    },
    {
      time: "10:15",
      system:
        "Phát hiện tỷ lệ lỗi một dây chuyền vượt ngưỡng, nhắn cảnh báo kèm ước tính thiệt hại nếu để tới cuối ca.",
      leader:
        "Giám đốc sản xuất cho dừng kiểm tra ngay, không đợi báo cáo cuối ngày.",
    },
    {
      time: "16:30",
      system:
        "Trả lời câu hỏi bằng lời của tổng giám đốc về doanh thu theo vùng, kèm biểu đồ so cùng kỳ.",
      leader:
        "Chốt phương án đẩy hàng cho vùng đang chậm ngay trong cuộc họp.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 06 · Khách sạn & Phòng khám                                          */
/* ------------------------------------------------------------------ */

export const INDUSTRY = {
  title: "Khách sạn thông minh & Phòng khám thông minh",
  lead: "Hai giải pháp trọn gói theo ngành, dựng sẵn trên nền tảng chung của Mindosoft. Khách hàng không phải mô tả nghiệp vụ từ đầu: chúng tôi mang tới bộ khung đã chạy thật, chỉ điều chỉnh cho khớp cách vận hành riêng.",
  solutions: [
    {
      id: "khach-san",
      code: "16",
      label: "Khách sạn thông minh",
      summary:
        "Tự động hoá toàn tuyến từ lúc khách đặt phòng tới lúc trả phòng, kèm bảng điều hành doanh thu cho chủ đầu tư.",
      points: [
        "Nhận phòng tự động qua kiosk hoặc điện thoại, khoá phòng mở bằng điện thoại",
        "Trợ lý giọng nói trong phòng: gọi dịch vụ, đặt bàn, báo hỏng",
        "Quản lý buồng phòng, nhà hàng, đồ uống theo thời gian thực",
        "Đồng bộ tồn phòng với kênh bán, gợi ý giá theo mùa và lượng đặt còn trống",
        "Công suất phòng, giá phòng bình quân, doanh thu trên mỗi phòng sẵn có",
      ],
      note: null,
    },
    {
      id: "phong-kham",
      code: "17",
      label: "Phòng khám thông minh",
      summary:
        "Một hệ thống duy nhất chạy suốt từ đặt lịch, tiếp đón, khám, kê đơn, thu ngân tới nhắc tái khám.",
      points: [
        "Đặt lịch trực tuyến, tự lấy số và xếp hàng điện tử",
        "Tiếp đón tự động qua kiosk, quét thẻ căn cước lấy thông tin",
        "Bệnh án điện tử, kê đơn điện tử, cảnh báo tương tác thuốc và dị ứng",
        "Kết nối máy xét nghiệm, quản lý kho thuốc, thu ngân, nhắc tái khám",
        "Báo cáo theo bác sĩ, theo dịch vụ, thời gian chờ, tỷ lệ quay lại",
      ],
      note: "Dữ liệu bệnh nhân đặt được tại máy chủ của cơ sở y tế khi khách hàng yêu cầu.",
    },
    {
      id: "robot",
      code: "18",
      label: "Robot lễ tân AI & kiosk",
      summary:
        "Điểm tiếp đón hoạt động liên tục, nghe và nói tiếng Việt tự nhiên, trả lời theo đúng kho tri thức của cơ sở.",
      points: [
        "Nhận diện khuôn mặt, chỉ đường",
        "Gọi món, lấy số, in phiếu",
        "Thanh toán ngay tại điểm tiếp đón",
        "Hỗ trợ đa ngôn ngữ",
        "Dùng chung cho khách sạn, phòng khám, cửa hàng, trung tâm thương mại và sảnh văn phòng",
      ],
      note: null,
    },
  ],
  packagesTitle: "Gói triển khai dựng sẵn theo quy mô",
  packages: [
    { name: "Phòng khám một cơ sở", scope: "Phần mềm lõi + một kiosk tiếp đón", duration: "8-10 tuần" },
    { name: "Chuỗi phòng khám 3-10 cơ sở", scope: "Thêm kho dữ liệu chung và bảng điều hành chuỗi", duration: "4-6 tháng" },
    { name: "Khách sạn dưới 100 phòng", scope: "Phần mềm lõi + khoá thông minh + kiosk", duration: "10-14 tuần" },
    { name: "Khách sạn, khu nghỉ dưỡng trên 150 phòng", scope: "Trọn bộ + trợ lý trong phòng", duration: "4-6 tháng" },
  ],
};

/* ------------------------------------------------------------------ */
/* 07 · Định vị                                                         */
/* ------------------------------------------------------------------ */

export const POSITIONING = {
  title: "Vì sao khách hàng chọn Mindosoft",
  lead: "Thị trường không thiếu đơn vị làm phần mềm. Sáu điều dưới đây là chỗ chúng tôi làm khác, và là sáu câu trả lời khi khách hỏi “sao phải là Mindosoft?”.",
  reasons: [
    {
      title: "Đi ngược từ quyết định về dữ liệu",
      body: "Bắt đầu bằng câu hỏi “ban lãnh đạo cần quyết điều gì, bao lâu một lần?” rồi mới lần ngược ra chỉ số, ra dữ liệu, ra hệ thống cần tích hợp.",
    },
    {
      title: "Một đội đi trọn tuyến",
      body: "Tư vấn, kỹ sư dữ liệu, kỹ sư trí tuệ nhân tạo, lập trình viên và đội vận hành nằm cùng một nhà. Khách hàng không phải làm trọng tài giữa ba nhà thầu.",
    },
    {
      title: "Không bắt bỏ hệ thống đang chạy",
      body: "Phần mềm kế toán, bán hàng, kho hiện có vẫn giữ nguyên. Mindosoft kết nối qua API, rủi ro thấp hơn nhiều so với thay mới.",
    },
    {
      title: "Có kết quả đo được trong 6-8 tuần đầu",
      body: "Giai đoạn đầu luôn được cắt nhỏ để trong vòng hai tháng lãnh đạo đã nhìn thấy một bảng điều hành chạy trên dữ liệu thật của chính doanh nghiệp mình.",
    },
    {
      title: "Bàn giao kèm chuyển giao năng lực",
      body: "Mã nguồn, tài liệu và quyền quản trị thuộc về khách hàng. Đào tạo đội nội bộ tự cấu hình chỉ số, tự thêm báo cáo, không khoá nhà cung cấp.",
    },
    {
      title: "Tự làm sản phẩm AI của chính mình",
      body: "Mindo Super App là sản phẩm AI do chính đội Mindosoft xây và vận hành. Kinh nghiệm thật được mang vào dự án của khách hàng, triển khai được cả trên đám mây lẫn máy chủ riêng.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 08 · Bản đồ năng lực                                                 */
/* ------------------------------------------------------------------ */

export const CAPABILITY = {
  title: "Bản đồ năng lực: 18 dịch vụ, 5 nhóm",
  lead: "Doanh nghiệp có thể bắt đầu từ bất kỳ ô nào và mở rộng dần. Các nhóm dùng chung một nền tảng dữ liệu, nên ghép lại thành một hệ thống thống nhất chứ không phải các gói rời rạc.",
  groups: [
    {
      name: "Nền tảng số & Dữ liệu",
      flagship: null,
      tone: "data",
      href: "#nen-tang-ai",
      services: [
        ["01", "Tư vấn & lộ trình chuyển đổi số"],
        ["02", "Số hoá quy trình & giấy tờ"],
        ["03", "Nền tảng dữ liệu hợp nhất"],
      ],
    },
    {
      name: "Trí tuệ nhân tạo ứng dụng",
      flagship: null,
      tone: "data",
      href: "#nen-tang-ai",
      services: [
        ["04", "Ứng dụng AI vào nghiệp vụ"],
        ["05", "Trợ lý AI & tri thức nội bộ"],
        ["06", "Tự động hoá quy trình bằng AI"],
      ],
    },
    {
      name: "Điều hành & Ra quyết định",
      flagship: "Chủ lực 01",
      tone: "flagship",
      href: "#dss",
      services: [
        ["07", "DSS, hỗ trợ ra quyết định"],
        ["08", "Dashboard điều hành đa tầng"],
        ["09", "Trợ lý AI & cảnh báo sớm"],
      ],
    },
    {
      name: "Phát triển & Vận hành hệ thống",
      flagship: null,
      tone: "neutral",
      href: "#phat-trien-van-hanh",
      services: [
        ["10", "Website & cổng thông tin"],
        ["11", "Ứng dụng di động"],
        ["12", "Quản trị nội bộ, HRM, CRM"],
        ["13", "Phần mềm theo yêu cầu & MVP"],
        ["14", "Tích hợp hệ thống & IoT"],
        ["15", "Hạ tầng, bảo mật & vận hành"],
      ],
    },
    {
      name: "Giải pháp chuyên ngành",
      flagship: "Chủ lực 02",
      tone: "flagship",
      href: "#giai-phap-nganh",
      services: [
        ["16", "Khách sạn thông minh"],
        ["17", "Phòng khám thông minh"],
        ["18", "Robot lễ tân AI & kiosk"],
      ],
    },
  ],
  paths: [
    {
      title: "Bắt đầu nhỏ",
      body: "Phần lớn khách hàng khởi động bằng dịch vụ 01, 08 hoặc 12, thấy kết quả nhanh, đủ cơ sở để quyết định mở rộng.",
    },
    {
      title: "Ghép dần",
      body: "Các dịch vụ dùng chung một nền tảng dữ liệu, nên mở rộng về sau không phải làm lại từ đầu.",
    },
    {
      title: "Hoặc trọn gói",
      body: "Doanh nghiệp đã có sẵn quyết tâm có thể chạy song song nhiều nhóm, rút tổng thời gian xuống còn khoảng hai phần ba.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 09 · Nền tảng số & trí tuệ nhân tạo (dịch vụ 01-06)                  */
/* ------------------------------------------------------------------ */

export const PLATFORM_AI = {
  title: "Chuyển đổi số, nền tảng dữ liệu và trí tuệ nhân tạo",
  lead: "Sáu dịch vụ đặt móng: đưa quy trình lên phần mềm, gom dữ liệu về một mối, rồi gắn trí tuệ nhân tạo vào đúng chỗ tạo ra kết quả.",
  groups: [
    {
      name: "Nền tảng số & dữ liệu",
      services: [
        {
          code: "01",
          title: "Tư vấn & lộ trình chuyển đổi số",
          body: "Khảo sát 2-4 tuần cùng từng bộ phận, kiểm kê dữ liệu, dựng cây chỉ số. Kết quả là lộ trình có thứ tự ưu tiên kèm tiêu chí nghiệm thu, đủ cơ sở để ban lãnh đạo phê duyệt.",
        },
        {
          code: "02",
          title: "Số hoá quy trình & giấy tờ",
          body: "Đề xuất, duyệt, chấm công, phiếu kho, ký hồ sơ lên phần mềm. Biểu mẫu điện tử, ký số, nhận dạng chữ trên hoá đơn. Mỗi bước có người chịu trách nhiệm và dấu vết thời gian.",
        },
        {
          code: "03",
          title: "Nền tảng dữ liệu hợp nhất",
          body: "Gom dữ liệu từ mọi hệ thống đang chạy về một kho chung, chuẩn hoá cách gọi tên và cách tính. Điều kiện bắt buộc để bảng điều hành và trí tuệ nhân tạo cho ra con số tin được.",
        },
      ],
    },
    {
      name: "Trí tuệ nhân tạo ứng dụng",
      services: [
        {
          code: "04",
          title: "Ứng dụng AI vào nghiệp vụ",
          body: "Dự báo nhu cầu và sản lượng bán, dự báo dòng tiền, chấm điểm rủi ro công nợ, phát hiện gian lận, hao hụt, thiết bị sắp hỏng, gợi ý giá và combo theo nhóm khách.",
        },
        {
          code: "05",
          title: "Trợ lý AI & tri thức nội bộ",
          body: "Trợ lý trả lời dựa trên tài liệu riêng của doanh nghiệp, luôn trích rõ nguồn. Nhân sự mới bắt nhịp nhanh, tri thức của công ty được giữ lại thay vì đi theo người nghỉ việc.",
        },
        {
          code: "06",
          title: "Tự động hoá quy trình bằng AI",
          body: "Bóc tách hoá đơn và chứng từ, đối soát ngân hàng với bán hàng và kế toán, phân loại và định tuyến yêu cầu khách hàng, soạn báo cáo định kỳ và thư trả lời.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 10 · Phát triển & vận hành hệ thống (dịch vụ 10-15)                  */
/* ------------------------------------------------------------------ */

export const BUILD_RUN = {
  title: "Website, ứng dụng, hệ thống quản trị nội bộ và vận hành",
  lead: "Phần việc nền tảng mà doanh nghiệp nào cũng cần, và cũng là điểm khởi đầu tự nhiên: làm xong lớp này là đã có dữ liệu sạch để lắp bảng điều hành phía trên.",
  services: [
    {
      code: "10",
      title: "Website & cổng thông tin",
      body: "Website doanh nghiệp, trang thương mại điện tử, cổng cho đại lý và khách hàng. Hệ quản trị nội dung để tự cập nhật, tối ưu tốc độ và tìm kiếm.",
    },
    {
      code: "11",
      title: "Ứng dụng di động",
      body: "iOS và Android cho khách hàng cuối, nhân viên hiện trường hoặc đại lý. Kèm phần máy chủ, trang quản trị và phát hành lên App Store và Google Play.",
    },
    {
      code: "12",
      title: "Quản trị nội bộ, HRM, CRM",
      body: "Nhân sự, chấm công, lương. Khách hàng, cơ hội bán, chăm sóc sau bán. Kho, mua hàng, tài sản. Công việc và dự án.",
    },
    {
      code: "13",
      title: "Phần mềm theo yêu cầu & MVP",
      body: "Khi bài toán đặc thù tới mức không phần mềm đóng gói nào khớp, hoặc cần bản tối giản để kiểm chứng thị trường trước khi đầu tư lớn.",
    },
    {
      code: "14",
      title: "Tích hợp hệ thống & IoT",
      body: "Nối phần mềm quản trị, bán hàng, kế toán, thanh toán, vận chuyển với cảm biến, camera, thiết bị giám sát nhiệt độ, định vị phương tiện.",
    },
    {
      code: "15",
      title: "Hạ tầng, bảo mật & vận hành",
      body: "Đám mây hoặc máy chủ đặt tại chỗ, sao lưu và khôi phục, phân quyền và mã hoá, giám sát liên tục kèm cam kết mức dịch vụ (SLA).",
    },
  ],
  principlesTitle: "Cách chúng tôi làm ở nhóm này",
  principles: [
    {
      title: "Bàn giao theo đợt hai tuần",
      body: "Kết thúc mỗi đợt luôn có một bản chạy được để khách hàng dùng thử. Không có chuyện chờ tới ngày nghiệm thu mới nhìn thấy sản phẩm.",
    },
    {
      title: "Mã nguồn thuộc về khách hàng",
      body: "Bàn giao đầy đủ mã nguồn, tài liệu và quyền quản trị khi nghiệm thu, kèm đào tạo để đội nội bộ tự vận hành được.",
    },
    {
      title: "Dùng lại được cho lớp phía trên",
      body: "Hệ thống ở nhóm này sinh ra dữ liệu sạch, là nguồn đầu vào tự nhiên cho nền tảng dữ liệu và bảng điều hành về sau.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 11 · Kiến trúc & quy trình                                           */
/* ------------------------------------------------------------------ */

export const ARCHITECTURE = {
  title: "Nền tảng năm lớp, triển khai năm bước",
  lead: "Mọi giải pháp của Mindosoft dựng trên cùng một kiến trúc, nên doanh nghiệp có thể bắt đầu ở bất kỳ lớp nào mà không phải làm lại phần đã đầu tư. Dự án được cắt thành các đợt hai tuần để khách hàng thấy kết quả sớm.",
  /** Từ trên xuống: lớp 5 → lớp 1. */
  layers: [
    {
      no: 5,
      name: "Quyết định",
      title: "Người ra quyết định hành động",
      items: ["Hội đồng quản trị", "Tổng giám đốc", "Giám đốc khối", "Quản lý"],
      note: "Nhận cảnh báo, chọn phương án, giao việc, kết quả đo ngược lại vào hệ thống.",
    },
    {
      no: 4,
      name: "Điều hành",
      title: "Buồng lái của doanh nghiệp",
      items: [
        "Bảng điều hành đa tầng",
        "Trung tâm cảnh báo",
        "Trợ lý AI hỏi đáp",
        "Ứng dụng di động cho lãnh đạo",
        "Mô phỏng kịch bản",
      ],
      note: null,
    },
    {
      no: 3,
      name: "Phân tích & AI",
      title: "Biến dữ liệu thành hiểu biết",
      items: [
        "Kho chỉ số dùng chung",
        "Mô hình dự báo",
        "Phát hiện bất thường",
        "Chấm điểm rủi ro",
        "Mô hình ngôn ngữ lớn kết hợp tri thức nội bộ",
      ],
      note: null,
    },
    {
      no: 2,
      name: "Hợp nhất",
      title: "Đưa dữ liệu về một mối",
      items: [
        "Cổng API",
        "Luồng trích xuất và chuẩn hoá",
        "Kho dữ liệu hồ và kho dữ liệu phân tích",
        "Quản trị dữ liệu chủ",
        "Kiểm soát chất lượng",
      ],
      note: null,
    },
    {
      no: 1,
      name: "Nguồn",
      title: "Nơi dữ liệu phát sinh",
      items: [
        "Phần mềm quản trị tổng thể",
        "Quản lý khách hàng",
        "Điều hành sản xuất",
        "Bán hàng tại quầy",
        "Nhân sự",
        "Kế toán",
        "Thương mại điện tử",
        "Thiết bị hiện trường",
      ],
      note: null,
    },
  ],
  steps: [
    { title: "Khảo sát & chuẩn hoá", duration: "2-4 tuần", output: "Báo cáo hiện trạng + cây chỉ số + phạm vi đã chốt" },
    { title: "Thiết kế giải pháp", duration: "2-3 tuần", output: "Hồ sơ thiết kế + nguyên mẫu bấm thử được" },
    { title: "Xây dựng theo đợt", duration: "6-16 tuần", output: "Mỗi hai tuần một bản chạy trên môi trường thử" },
    { title: "Kiểm thử & chuyển giao", duration: "2-4 tuần", output: "Nghiệm thu + tài liệu vận hành + mã nguồn" },
    { title: "Vận hành & tiến hoá", duration: "Liên tục", output: "Giám sát theo SLA, huấn luyện lại mô hình, thêm chỉ số mới" },
  ],
  notes: [
    { title: "Không phá bỏ cái đang chạy", body: "Lớp 1 giữ nguyên, Mindosoft bổ sung từ lớp 2 trở lên." },
    { title: "Đặt ở đâu cũng được", body: "Đám mây hoặc máy chủ tại doanh nghiệp, tuỳ yêu cầu bảo mật." },
  ],
};
