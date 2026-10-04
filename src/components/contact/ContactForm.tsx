"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  CaretDown,
  Check,
  CheckCircle,
  CircleNotch,
  PaperPlaneTilt,
  WarningCircle,
} from "@phosphor-icons/react";
import { NEEDS } from "@/lib/contact-needs";
// Chỉ import kiểu: zod không bị kéo vào bundle phía trình duyệt
import type { ContactFieldErrors } from "@/lib/contact-schema";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; message: string }
  | { kind: "error"; message: string };

/* Ô nhập: nền tối hơn thẻ, viền đủ đậm để thấy ranh giới; placeholder đạt 4.5:1 */
const FIELD =
  "w-full rounded-xl border border-line bg-night/70 px-4 text-[15px] text-snow placeholder:text-dim " +
  "outline-none transition-colors focus:border-lime/70 focus:ring-2 focus:ring-lime/25 " +
  "aria-[invalid=true]:border-[#f87171]/70";

/**
 * Form đăng ký tư vấn. Dữ liệu được kiểm ở /api/contact (zod, phía máy chủ);
 * lỗi trả về hiện ngay dưới từng ô. Kết quả báo bằng vùng `role=status` để
 * trình đọc màn hình đọc lên.
 */
export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Giữ tham chiếu form: sau `await`, event.currentTarget đã thành null
    const form = event.currentTarget;
    const data = new FormData(form);
    const candidate = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      need: String(data.get("need") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
    };

    setErrors({});
    setStatus({ kind: "sending" });

    type ApiResponse = { ok: boolean; message?: string; fieldErrors?: ContactFieldErrors };
    let payload: ApiResponse;
    let httpOk: boolean;
    // Chỉ bọc phần gọi mạng, để lỗi lập trình không bị báo nhầm thành lỗi kết nối
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate),
      });
      httpOk = res.ok;
      payload = (await res.json()) as ApiResponse;
    } catch {
      setStatus({ kind: "error", message: "Không kết nối được tới máy chủ. Kiểm tra mạng rồi thử lại." });
      return;
    }

    if (!httpOk || !payload.ok) {
      // Lỗi theo từng ô thì đã hiện dưới ô, không cần thêm thông báo chung
      if (payload.fieldErrors) {
        setErrors(payload.fieldErrors);
        setStatus({ kind: "idle" });
        return;
      }
      setStatus({ kind: "error", message: payload.message ?? "Gửi không thành công. Vui lòng thử lại." });
      return;
    }

    setStatus({ kind: "sent", message: payload.message ?? "Đã gửi." });
    form.reset();
  }

  const sending = status.kind === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Đăng ký tư vấn"
      className="grid gap-5 rounded-2xl border border-line bg-navy/80 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Họ và tên" error={errors.name}>
          <input id={`${uid}-name`} name="name" type="text" autoComplete="name" placeholder="Trần Thu Hà"
            aria-invalid={!!errors.name} className={`${FIELD} h-12`} />
        </Field>
        <Field id={`${uid}-company`} label="Doanh nghiệp" error={errors.company}>
          <input id={`${uid}-company`} name="company" type="text" autoComplete="organization" placeholder="Tên doanh nghiệp"
            aria-invalid={!!errors.company} className={`${FIELD} h-12`} />
        </Field>
        <Field id={`${uid}-email`} label="Email" error={errors.email}>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" placeholder="ban@doanhnghiep.vn"
            aria-invalid={!!errors.email} className={`${FIELD} h-12`} />
        </Field>
        <Field id={`${uid}-phone`} label="Số điện thoại" error={errors.phone}>
          <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="09xx xxx xxx"
            aria-invalid={!!errors.phone} className={`${FIELD} h-12`} />
        </Field>
      </div>

      <Field id={`${uid}-need`} label="Bạn quan tâm tới" error={errors.need}>
        <div className="relative">
          <select id={`${uid}-need`} name="need" defaultValue={NEEDS[0]} aria-invalid={!!errors.need}
            className={`${FIELD} h-12 cursor-pointer appearance-none pr-11`}>
            {NEEDS.map((n) => (
              <option key={n} value={n} className="bg-navy text-snow">
                {n}
              </option>
            ))}
          </select>
          <CaretDown size={16} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-haze" />
        </div>
      </Field>

      <Field id={`${uid}-message`} label="Ban lãnh đạo đang cần quyết điều gì?" error={errors.message}>
        <textarea id={`${uid}-message`} name="message" rows={4}
          placeholder="Ví dụ: muốn theo dõi doanh thu theo vùng hằng ngày thay vì chờ báo cáo cuối tháng."
          aria-invalid={!!errors.message} className={`${FIELD} min-h-28 resize-y py-3`} />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <span className="relative mt-0.5 flex size-5 shrink-0">
            <input type="checkbox" name="consent" aria-invalid={!!errors.consent}
              className="peer size-5 cursor-pointer appearance-none rounded-md border border-haze/50 bg-night/70 transition-colors checked:border-lime checked:bg-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime" />
            <Check size={14} weight="bold" className="pointer-events-none absolute inset-0 m-auto text-ink opacity-0 peer-checked:opacity-100" />
          </span>
          <span className="text-sm leading-relaxed text-haze">
            Tôi đồng ý để Mindosoft dùng thông tin này để liên hệ lại về đúng yêu cầu trên.
          </span>
        </label>
        {errors.consent && <p className="mt-2 text-sm text-[#fca5a5]">{errors.consent}</p>}
      </div>

      <button type="submit" disabled={sending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-lime px-6 text-[15px] font-semibold whitespace-nowrap text-ink transition-[transform,background-color] hover:bg-lime-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime">
        {sending ? (
          <>
            <CircleNotch size={18} className="animate-spin" />
            Đang gửi
          </>
        ) : (
          <>
            Gửi yêu cầu
            <PaperPlaneTilt size={18} weight="bold" />
          </>
        )}
      </button>

      <div role="status" aria-live="polite">
        {status.kind === "sent" && (
          <p className="flex items-start gap-2.5 rounded-xl border border-lime/30 bg-lime/10 px-4 py-3 text-sm leading-relaxed text-lime-soft">
            <CheckCircle size={20} className="shrink-0" />
            {status.message}
          </p>
        )}
        {status.kind === "error" && (
          <p className="flex items-start gap-2.5 rounded-xl border border-[#f87171]/35 bg-[#f87171]/10 px-4 py-3 text-sm leading-relaxed text-[#fca5a5]">
            <WarningCircle size={20} className="shrink-0" />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

/** Nhãn nằm trên ô nhập, lỗi nằm dưới (không dùng placeholder thay nhãn). */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-snow">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-[#fca5a5]">{error}</p>}
    </div>
  );
}
