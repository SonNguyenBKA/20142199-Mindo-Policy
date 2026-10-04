/**
 * Nhu cầu tư vấn: khớp với các sản phẩm và nhóm dịch vụ trong hồ sơ năng lực.
 * Tách khỏi contact-schema để form phía trình duyệt dùng được mà không kéo
 * theo thư viện zod vào bundle.
 */
export const NEEDS = [
  "Hệ hỗ trợ ra quyết định (DSS)",
  "Khách sạn thông minh",
  "Phòng khám thông minh",
  "Chuyển đổi số & AI ứng dụng",
  "Website, ứng dụng, HRM, CRM",
  "Mindo Super App",
  "Khác",
] as const;
