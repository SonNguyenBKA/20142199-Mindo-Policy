import type { CSSProperties } from "react";
import { round, seededRandom } from "@/lib/random";

/**
 * Bảng màu sao theo nền.
 *  - dark : sao trắng/xanh nhạt, lime chỉ điểm xuyết (1/6) để không tranh với
 *           các điểm nhấn lime của nội dung (nút, chữ nhấn)
 *  - light: cùng kiểu sao nhưng tông đậm (navy, xanh, ô-liu) mới thấy được trên
 *           nền sáng; độ đậm thấp để không làm khó đọc chữ
 */
const PALETTES = {
  dark: {
    dot: "#eef3f9",
    dotOpacity: [0.1, 0.3, 0.5, 1] as const, // [min-thấp, min-cao, max-thấp, max-cao]
    sparkles: ["#eef3f9", "#8fb4ff", "#eef3f9", "#8fb4ff", "#eef3f9", "#b4d001"],
    meteors: ["#eef3f9", "#8fb4ff", "#eef3f9"],
    glow: true,
  },
  light: {
    dot: "#0b1b33",
    dotOpacity: [0.12, 0.22, 0.4, 0.65] as const,
    sparkles: ["#2a62d0", "#0b1b33", "#2a62d0", "#5a6d00", "#2a62d0", "#0b1b33"],
    meteors: ["#2a62d0", "#0b1b33", "#2a62d0"],
    glow: false,
  },
} as const;

type Tone = keyof typeof PALETTES;

/** Sao 4 cánh: hai cánh dọc/ngang thắt lại ở giữa. */
const SPARKLE_PATH =
  "M12 0c.7 6.3 4.9 10.6 12 12-7.1 1.4-11.3 5.7-12 12-.7-6.3-4.9-10.6-12-12C7.1 10.6 11.3 6.3 12 0Z";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

function Dots({
  tone,
  seed,
  count,
  minSize,
  maxSize,
}: {
  tone: Tone;
  seed: number;
  count: number;
  minSize: number;
  maxSize: number;
}) {
  const { dot, dotOpacity } = PALETTES[tone];
  const [minLo, minHi, maxLo, maxHi] = dotOpacity;
  const rand = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const size = round(minSize + rand() * (maxSize - minSize));
    return (
      <span
        key={i}
        className="sky-twinkle absolute rounded-full"
        style={{
          backgroundColor: dot,
          left: `${round(rand() * 100)}%`,
          top: `${round(rand() * 100)}%`,
          width: size,
          height: size,
          ...v({
            "--tw-min": round(minLo + rand() * (minHi - minLo)),
            "--tw-max": round(maxLo + rand() * (maxHi - maxLo)),
            "--tw-dur": `${round(2.4 + rand() * 4.6)}s`,
            "--tw-delay": `${round(rand() * 6)}s`,
          }),
        }}
      />
    );
  });
}

function Sparkles({ tone, seed, count }: { tone: Tone; seed: number; count: number }) {
  const { sparkles, glow } = PALETTES[tone];
  const rand = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const size = round(8 + rand() * 10);
    const color = sparkles[Math.floor(rand() * sparkles.length)];
    return (
      <svg
        key={i}
        viewBox="0 0 24 24"
        className={`sky-sparkle absolute ${tone === "light" ? "sky-sparkle-soft" : ""}`}
        style={{
          left: `${round(rand() * 100)}%`,
          top: `${round(rand() * 100)}%`,
          width: size,
          height: size,
          // Quầng sáng cùng màu chỉ hợp trên nền tối; trên nền sáng sẽ thành vệt mờ
          filter: glow ? `drop-shadow(0 0 ${round(size / 3)}px ${color})` : undefined,
          ...v({
            "--sp-rot": `${round(rand() * 45)}deg`,
            "--tw-dur": `${round(3 + rand() * 4)}s`,
            "--tw-delay": `${round(rand() * 7)}s`,
          }),
        }}
      >
        <path d={SPARKLE_PATH} fill={color} />
      </svg>
    );
  });
}

function Meteors({ tone, seed, count }: { tone: Tone; seed: number; count: number }) {
  const { meteors, glow } = PALETTES[tone];
  const rand = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const length = round(120 + rand() * 180);
    const color = meteors[Math.floor(rand() * meteors.length)];
    return (
      <div
        key={i}
        className="sky-meteor absolute"
        style={{
          // Xuất phát từ dải trên-trái, có cả điểm nằm ngoài khung để vệt
          // bay vào từ mép chứ không hiện ra giữa chừng
          left: `${round(-15 + rand() * 75)}%`,
          top: `${round(-10 + rand() * 55)}%`,
          width: length,
          height: round(1.2 + rand() * 1),
          ...v({
            // Cả trận mưa sao cùng một hướng chéo, lệch nhau vài độ cho tự nhiên
            "--mt-angle": `${round(30 + rand() * 10)}deg`,
            "--mt-travel": `${round(55 + rand() * 45)}vw`,
            "--mt-dur": `${round(7 + rand() * 9)}s`,
            "--mt-delay": `${round(rand() * 12)}s`,
          }),
        }}
      >
        <div
          className="size-full rounded-full"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${color}00 6%, ${color}${tone === "light" ? "a0" : "b0"})`,
          }}
        />
        <div
          className="absolute top-1/2 right-0 size-[3px] -translate-y-1/2 rounded-full"
          style={{ backgroundColor: color, boxShadow: glow ? `0 0 8px 2px ${color}` : undefined }}
        />
      </div>
    );
  });
}

/**
 * Bầu trời đêm phía sau toàn trang: cố định theo khung nhìn, nên chỉ có một
 * bộ sao cho cả trang dài.
 *
 *  - lớp xa: nhiều chấm nhỏ, mờ, trôi chậm khi cuộn
 *  - lớp gần: chấm to hơn và sao 4 cánh lấp lánh, trôi nhanh hơn (parallax do
 *    MotionRoot điều khiển qua `data-sky-depth`)
 *  - sao băng chạy chéo, lặp vô hạn, mỗi vệt một nhịp riêng
 *
 * Toàn bộ là animation CSS thuần (chỉ opacity/transform), tự tắt khi người
 * dùng bật giảm chuyển động.
 */
export function NightSky() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Lớp cao hơn khung nhìn để còn chỗ trôi lên khi parallax */}
      <div data-sky-depth="0.06" className="absolute inset-x-0 top-0 h-[125%]">
        <Dots tone="dark" seed={11} count={120} minSize={0.8} maxSize={1.6} />
      </div>
      <div data-sky-depth="0.14" className="absolute inset-x-0 top-0 h-[135%]">
        <Dots tone="dark" seed={23} count={40} minSize={1.6} maxSize={2.6} />
        <Sparkles tone="dark" seed={37} count={16} />
      </div>
      <Meteors tone="dark" seed={53} count={8} />
    </div>
  );
}

/**
 * Sao cho section nền sáng (nền sáng đặc nên che mất bầu trời cố định phía
 * sau). Đặt làm con đầu tiên của section có class `isolate`: lớp này mang
 * `-z-10` nên nằm trên nền section nhưng dưới toàn bộ nội dung.
 * `seed` khác nhau giữa các section để bố cục sao không lặp lại.
 */
export function DaySky({ seed }: { seed: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
      <Dots tone="light" seed={seed} count={140} minSize={1.2} maxSize={2.4} />
      <Sparkles tone="light" seed={seed + 7} count={24} />
      <Meteors tone="light" seed={seed + 13} count={7} />
    </div>
  );
}
