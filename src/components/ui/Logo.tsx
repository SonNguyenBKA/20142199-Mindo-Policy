/*
 * Dấu hiệu Mindosoft: vòng tròn hở màu trắng + lõi lime, đúng như bìa hồ sơ.
 *
 *   r = 13 → chu vi ≈ 81.68; khoảng hở ≈ 13.1, nét liền ≈ 68.6
 * SVG vẽ nét từ hướng 3 giờ theo chiều kim đồng hồ nên khoảng hở nằm ngay
 * trên hướng 3 giờ; xoay thêm -25° để nó rơi về góc trên-phải.
 */
const RING_DASH = 68.6;
const RING_GAP = 13.1;

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
      <circle
        cx="24"
        cy="24"
        r="13"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${RING_DASH} ${RING_GAP}`}
        transform="rotate(-25 24 24)"
      />
      <circle cx="24" cy="24" r="4.4" fill={core} />
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
