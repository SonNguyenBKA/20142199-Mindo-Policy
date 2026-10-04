import { z } from "zod";
import { NEEDS } from "./contact-needs";

export { NEEDS };

/**
 * Schema kiểm dữ liệu form liên hệ, chạy ở /api/contact (phía máy chủ).
 * Không import vào code phía trình duyệt để zod không vào bundle; form chỉ
 * dùng kiểu ContactFieldErrors (import type).
 */
export const contactSchema = z.object({
  name: z
    .string({ error: "Vui lòng nhập họ và tên." })
    .trim()
    .min(2, "Vui lòng nhập họ và tên (ít nhất 2 ký tự).")
    .max(100, "Họ và tên quá dài."),
  company: z.string().trim().max(150, "Tên doanh nghiệp quá dài.").optional().default(""),
  email: z
    .string({ error: "Vui lòng nhập email." })
    .trim()
    .min(1, "Vui lòng nhập email.")
    .email("Email chưa đúng định dạng.")
    .max(200, "Email quá dài."),
  phone: z
    .string()
    .trim()
    .max(20, "Số điện thoại quá dài.")
    .refine((v) => v === "" || /^[+0-9 ().-]{8,20}$/.test(v), "Số điện thoại chưa đúng định dạng.")
    .optional()
    .default(""),
  need: z.enum(NEEDS, { message: "Vui lòng chọn nhu cầu." }),
  message: z
    .string({ error: "Vui lòng mô tả nhu cầu." })
    .trim()
    .min(10, "Vui lòng mô tả rõ hơn (ít nhất 10 ký tự).")
    .max(4000, "Nội dung quá dài (tối đa 4000 ký tự)."),
  consent: z.literal(true, { message: "Bạn cần đồng ý để Mindosoft liên hệ lại." }),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Lỗi theo từng trường, hiển thị ngay dưới ô nhập tương ứng. */
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

/** Gom lỗi của Zod thành `{ tên trường: thông báo đầu tiên }`. */
export function toFieldErrors(error: z.ZodError): ContactFieldErrors {
  const out: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
