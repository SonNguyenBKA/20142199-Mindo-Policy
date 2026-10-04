/*
 * Hình học logo Mindo, đo trực tiếp trên file logo gốc (img_peer_logo của
 * Mindo-App), quy về hệ toạ độ 48×48:
 *   vòng r = 15, nét dày = 0.35·r (5.21), đầu nét bo tròn
 *   lõi lime r = 0.29·r (4.34)
 *   khoảng hở nhìn thấy từ ngay sau 12 giờ tới khoảng 2 giờ; tính cả phần bo
 *   của hai đầu nét thì nét liền chiếm 282° (dash 73.83, gap 20.42)
 *   xoay -14° để nét bắt đầu ngay dưới hướng 2 giờ và kết thúc ở hướng 12 giờ
 * Hero dùng lại đúng các tỉ lệ này (xem MARK) để logo lớn và nhỏ y hệt nhau.
 */
export const MARK = {
  box: 48,
  r: 15,
  width: 5.21,
  dash: 73.83,
  gap: 20.42,
  core: 4.34,
  rotate: -14,
} as const;

/**
 * Vòng logo dưới dạng MỘT cung tròn liền (SVG path), không dùng
 * stroke-dasharray: Figma và một số trình xuất SVG hiểu sai nét đứt (vòng vỡ
 * thành nhiều đoạn hoặc thành vòng kín). Cung đi từ góc `rotate` theo chiều
 * kim đồng hồ đúng phần nét liền của logo (dash / (dash + gap) vòng).
 */
export function markArcPath(cx: number, cy: number, r: number) {
  const sweep = (MARK.dash / (MARK.dash + MARK.gap)) * 360;
  const a1 = (MARK.rotate * Math.PI) / 180;
  const a2 = ((MARK.rotate + sweep) * Math.PI) / 180;
  const f = (n: number) => Math.round(n * 1000) / 1000;
  const x1 = f(cx + r * Math.cos(a1));
  const y1 = f(cy + r * Math.sin(a1));
  const x2 = f(cx + r * Math.cos(a2));
  const y2 = f(cy + r * Math.sin(a2));
  return `M${x1} ${y1} A${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

export function LogoMark({
  size = 32,
  className = "",
  core = "var(--color-lime)",
}: {
  size?: number;
  className?: string;
  /** Màu lõi. Logo chìm làm nền thì truyền "currentColor" để lõi mờ theo vòng. */
  core?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d={markArcPath(24, 24, MARK.r)}
        stroke="currentColor"
        strokeWidth={MARK.width}
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r={MARK.core} fill={core} />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-snow ${className}`}
      role="img"
      aria-label="Mindosoft"
    >
      <LogoMark size={34} />
      <span className="text-[17px] tracking-[0.14em]" aria-hidden="true">
        <span className="font-bold">MINDO</span>
        <span className="font-normal text-haze">SOFT</span>
      </span>
    </span>
  );
}
