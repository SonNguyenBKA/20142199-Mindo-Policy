import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CtaLink } from "@/components/ui/CtaLink";
import { MARK, markArcPath } from "@/components/ui/Logo";
import { CONTACT_LABEL, COVER_TAGS, HERO } from "@/lib/content";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { TagMarquee } from "@/components/motion/TagMarquee";

/*
 * Vòng hero là logo Mindo phóng to: cùng tỉ lệ với MARK (48 → 400, hệ số 25/3),
 * nên r = 125, nét dày ≈ 43.4, lõi ≈ 36.2, khoảng hở từ 12 giờ tới 2 giờ.
 */
const SCALE = 400 / MARK.box;
const R = MARK.r * SCALE;
const RING_WIDTH = MARK.width * SCALE;
const CORE_R = MARK.core * SCALE;
const RING_PATH = markArcPath(200, 200, R);

/** Các chấm "dữ liệu" bay từ ngoài vào lõi. Toạ độ cố định để SSR khớp client. */
const DATA_DOTS = [
  [200, 18], [362, 96], [388, 248], [300, 374], [120, 380],
  [22, 262], [40, 98], [150, 12], [380, 170], [250, 392],
];

/*
 * Hero chiếm trọn màn hình đầu tiên: cao đúng khung nhìn trừ header dính, dải
 * lĩnh vực luôn nằm sát đáy màn hình, phần còn lại căn giữa theo chiều dọc.
 * Dùng dvh để không nhảy khi thanh địa chỉ trên điện thoại co giãn.
 */
export function Hero() {
  return (
    <section
      id="dau-trang"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] flex-col overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_30%,rgb(30_60_110/0.5),transparent_60%)]"
      />
      <HeroMotion className="flex flex-1 flex-col">
        <div className="container-page relative grid flex-1 content-center items-center gap-10 py-10 md:py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
          <div>
            <p
              data-hero
              className="text-[13px] font-semibold uppercase tracking-[0.18em] text-haze"
            >
              {HERO.eyebrow}
            </p>
            <h1 className="mt-5 text-[3.2rem] font-extrabold leading-[1.04] tracking-tight md:text-7xl lg:text-[3.9rem] xl:text-7xl 2xl:text-[4.9rem]">
              <span data-mask-line>
                <span>Từ dữ liệu</span>
              </span>
              <span data-mask-line>
                <span>
                  đến <span className="text-lime">quyết định.</span>
                </span>
              </span>
            </h1>
            {/* Không ẩn chờ hiệu ứng: đây là phần tử LCP trên mobile */}
            <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-haze 2xl:max-w-[42rem] 2xl:text-xl"
            >
              {HERO.lead}
            </p>
            <div data-hero className="mt-9 flex flex-wrap gap-3">
              <CtaLink href="#lien-he">
                {CONTACT_LABEL}
                <ArrowRight size={18} weight="bold" />
              </CtaLink>
              <CtaLink href="#cong-ty" variant="ghost">
                Xem hồ sơ
              </CtaLink>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[380px] lg:max-w-[min(500px,calc(100dvh-var(--header-height)-12rem))] 2xl:max-w-[min(600px,calc(100dvh-var(--header-height)-12rem))]">
            <div
              aria-hidden="true"
              data-hero-glow
              className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle,rgb(180_208_1/0.3),transparent_68%)] blur-2xl"
            />
            <svg
              viewBox="0 0 400 400"
              className="relative size-full overflow-visible"
              role="img"
              aria-label="Dữ liệu từ nhiều nguồn hội tụ về một quyết định"
            >
              <g data-hero-ring-spin>
                <path
                  data-hero-ring
                  d={RING_PATH}
                  fill="none"
                  stroke="rgb(214 226 240 / 0.24)"
                  strokeWidth={RING_WIDTH}
                  strokeLinecap="round"
                />
              </g>
              {DATA_DOTS.map(([x, y], i) => (
                <circle
                  key={i}
                  data-hero-dot
                  cx={x}
                  cy={y}
                  r={i % 3 === 0 ? 4 : 3}
                  fill={i % 2 ? "var(--color-azure-soft)" : "var(--color-snow)"}
                  opacity="0"
                />
              ))}
              <circle
                data-hero-core
                cx="200"
                cy="200"
                r={CORE_R}
                fill="var(--color-lime)"
               
              />
            </svg>
          </div>
        </div>
      </HeroMotion>

      <TagMarquee tags={COVER_TAGS} />
    </section>
  );
}
