import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { contactSchema, toFieldErrors } from "@/lib/contact-schema";

/** Chặn spam thô: tối đa 5 yêu cầu hợp lệ mỗi IP trong 10 phút. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/**
 * Bộ đếm nằm trong RAM của tiến trình: đủ cho một server đơn lẻ. Chạy nhiều
 * instance hoặc serverless thì phải chuyển sang Redis/KV.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function hasQuota(ip: string) {
  const entry = hits.get(ip);
  return !entry || Date.now() > entry.resetAt || entry.count < RATE_LIMIT_MAX;
}

/** Chỉ tính lượt khi dữ liệu đã hợp lệ, để gõ sai vài lần không bị chặn oan. */
function recordHit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  else entry.count += 1;
}

function sweep() {
  const now = Date.now();
  for (const [ip, entry] of hits) if (now > entry.resetAt) hits.delete(ip);
}

/**
 * Nơi lưu yêu cầu: mỗi dòng một JSON trong `data/contact-requests.jsonl`
 * (thư mục `data/` đã nằm trong .gitignore vì chứa thông tin cá nhân).
 */
const STORE = path.join(process.cwd(), "data", "contact-requests.jsonl");

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  sweep();
  if (!hasQuota(ip)) {
    return NextResponse.json(
      { ok: false, message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Vui lòng kiểm tra lại các trường được đánh dấu.",
        fieldErrors: toFieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  recordHit(ip);
  // `consent` luôn là true sau khi qua schema nên không cần lưu
  const { name, company, email, phone, need, message } = parsed.data;
  const data = { name, company, email, phone, need, message };
  const record = { ...data, ip, at: new Date().toISOString() };

  // TODO: khi có hộp thư nhận, gửi thêm email/CRM/Slack ở đây (Resend, SMTP...).
  // Hiện lưu vào file để không mất yêu cầu nào trong lúc chưa cấu hình kênh nhận.
  try {
    await mkdir(path.dirname(STORE), { recursive: true });
    await appendFile(STORE, JSON.stringify(record) + "\n", "utf8");
    console.info("[contact] yêu cầu mới", { need: data.need, email: data.email, at: record.at });
  } catch {
    // Môi trường serverless (Vercel) có ổ đĩa chỉ đọc: ghi đủ nội dung vào log
    // để còn tra lại trong Runtime Logs. Cần nối email/kho lưu thật để giữ lâu dài.
    console.info("[contact] yêu cầu mới (chưa có kho lưu, chỉ ghi log)", JSON.stringify(record));
  }

  return NextResponse.json({
    ok: true,
    message: "Mindosoft đã nhận yêu cầu của bạn và sẽ liên hệ lại qua email hoặc số điện thoại bạn để lại.",
  });
}
