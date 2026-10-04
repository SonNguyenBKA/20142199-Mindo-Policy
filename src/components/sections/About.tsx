import { DaySky } from "@/components/bg/NightSky";
import {
  Compass,
  Crosshair,
  Cube,
  RocketLaunch,
  SquaresFour,
  Target,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ABOUT, STATS } from "@/lib/content";

/** Icon theo thứ tự STATS: thành lập, nhân sự, sản phẩm, dịch vụ. */
const STAT_ICONS = [RocketLaunch, UsersThree, Cube, SquaresFour];

/** Chương 01 · Công ty */
export function About() {
  return (
    <section id="cong-ty" className="theme-light section-sheet relative isolate anchor-offset bg-night py-24 md:py-32">
      <DaySky seed={101} />
      <div className="container-page">
        <SectionHeader id="cong-ty" title={ABOUT.title} lead={ABOUT.lead} />

        <dl data-stagger className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => {
            const Icon = STAT_ICONS[i];
            return (
            <div
              key={s.label}
              // Rê chuột: thẻ phóng nhẹ. Dùng thuộc tính CSS `scale` (Tailwind 4)
              // nên không đụng transform mà GSAP dùng cho hiệu ứng hiện thẻ.
              className="theme-dark group relative flex min-h-36 flex-col overflow-hidden rounded-2xl bg-navy p-5 transition-[scale,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-10 hover:scale-[1.04] hover:shadow-[0_24px_48px_rgb(2_8_20/0.55)] sm:p-6 md:min-h-44 md:p-7"
            >
              {/* Quầng xanh (dữ liệu) ở góc trên phải, ngay sau icon chìm */}
              <span
                aria-hidden="true"
                className="absolute -top-8 -right-8 size-36 rounded-full bg-[radial-gradient(circle,rgb(143_180_255/0.14),transparent_70%)] transition-opacity duration-500"
              />
              {/*
               * Icon lùi ra sau làm nền: nét mảnh, nhỏ, rất mờ, nằm gọn ở góc trên
               * phải. Nhãn chừa lề phải cho icon; con số ở đáy thẻ luôn trống,
               * kể cả "09/2025" dài nhất.
               */}
              <Icon
                aria-hidden="true"
                weight="thin"
                className="pointer-events-none absolute top-3 right-3 size-12 text-azure-soft sm:size-16 opacity-[0.12] blur-[0.5px] transition-[opacity,rotate,scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-6 group-hover:opacity-25 md:top-4 md:right-4 md:size-20"
              />
              <dt className="relative text-sm leading-snug text-haze sm:pr-14 md:pr-20">{s.label}</dt>
              <dd className="relative mt-auto pt-6 text-[1.85rem] font-bold tracking-tight tabular-nums sm:text-4xl md:text-5xl">
                {s.count === null ? (
                  s.value
                ) : (
                  <span data-count={s.count} data-pad={s.pad}>
                    {s.value}
                  </span>
                )}
                {s.suffix && <span className="text-lime">{s.suffix}</span>}
              </dd>
            </div>
            );
          })}
        </dl>

        <div data-stagger className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.35fr_1fr]">
          <article className="rounded-2xl border-t-[3px] border-lime bg-navy/60 p-7">
            <Target size={26} className="text-lime" />
            <h3 className="mt-4 text-xl font-semibold">Sứ mệnh</h3>
            <p className="mt-3 leading-relaxed text-haze">{ABOUT.mission}</p>
          </article>

          <article className="rounded-2xl border-t-[3px] border-line bg-navy/60 p-7">
            <Crosshair size={26} className="text-haze" />
            <h3 className="mt-4 text-xl font-semibold">Lĩnh vực hoạt động</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ABOUT.fields.map((f) => (
                <li
                  key={f}
                  className="rounded-full bg-snow/[0.06] px-3 py-1.5 text-[13px] font-medium text-snow/90 ring-1 ring-snow/10"
                >
                  {f}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border-t-[3px] border-line bg-navy/60 p-7">
            <Compass size={26} className="text-haze" />
            <h3 className="mt-4 text-xl font-semibold">Thị trường mục tiêu</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] text-haze">
              {ABOUT.markets.map((m) => (
                <li key={m} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-haze/60" />
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-4 text-[15px] leading-relaxed text-snow">
              {ABOUT.reach}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
