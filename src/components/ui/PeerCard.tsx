import { IdentificationCard, LockOpen, SealCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { LogoMark } from "./Logo";

/**
 * Minh hoạ quyền lợi của chứng nhận Mindo Peer, đặt trong khung điện thoại.
 * Chỉ nêu đúng các ý trong hồ sơ, không bịa số seri hay số liệu.
 */
export function PeerCard() {
  const perks = [
    { icon: SealCheck, text: "Số seri riêng cho từng chứng nhận" },
    { icon: LockOpen, text: "Mở khoá hạn mức AI" },
    { icon: Sparkle, text: "Quyền lợi AI dành riêng" },
    { icon: IdentificationCard, text: "Xác minh CCCD bằng QR" },
  ];
  return (
    <div className="flex size-full flex-col bg-gradient-to-b from-[#0d2550] to-night px-5 pt-14 pb-6">
      <div className="rounded-2xl bg-gradient-to-br from-lime to-[#86a10a] p-5 text-ink shadow-[0_20px_40px_rgb(2_8_20/0.5)]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em]">Chứng nhận số</span>
          <LogoMark size={28} className="text-ink" />
        </div>
        <p className="mt-8 text-2xl font-extrabold tracking-tight">Mindo Peer</p>
        <p className="mt-1 text-xs font-semibold text-ink/70">Số seri riêng</p>
      </div>
      <ul className="mt-6 grid gap-2.5">
        {perks.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="flex items-center gap-3 rounded-xl border border-snow/10 bg-snow/[0.04] px-3.5 py-3 text-[13px] font-medium text-snow"
          >
            <Icon size={18} className="shrink-0 text-lime" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
