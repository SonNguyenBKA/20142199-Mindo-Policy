import {
  Browser,
  Code,
  DeviceMobile,
  PlugsConnected,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightGrid } from "@/components/motion/SpotlightGrid";
import { BUILD_RUN } from "@/lib/content";

const ICONS = [Browser, DeviceMobile, UsersThree, Code, PlugsConnected, ShieldCheck];

/** Chương 10 · Phát triển & vận hành hệ thống (dịch vụ 10-15) */
export function BuildRun() {
  return (
    <section
      id="phat-trien-van-hanh"
      className="anchor-offset py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeader id="phat-trien-van-hanh" title={BUILD_RUN.title} lead={BUILD_RUN.lead} />

        <SpotlightGrid stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BUILD_RUN.services.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <article key={s.code} data-spot className="group relative overflow-hidden rounded-2xl border border-line bg-night/80 p-7">
                {/* Quầng sáng đi theo con trỏ, vị trí lấy từ biến --x/--y */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgb(180 208 1 / 0.12), transparent 70%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-navy-soft text-snow ring-1 ring-line transition-colors duration-300 group-hover:text-lime">
                    <Icon size={26} />
                  </span>
                  <span className="text-3xl font-extrabold tabular-nums text-white/15">{s.code}</span>
                </div>
                <h3 className="relative mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="relative mt-3 leading-relaxed text-haze">{s.body}</p>
              </article>
            );
          })}
        </SpotlightGrid>

        <h3 data-reveal className="mt-20 text-2xl font-bold tracking-tight">
          {BUILD_RUN.principlesTitle}
        </h3>
        <ol data-stagger className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {BUILD_RUN.principles.map((p, i) => (
            <li key={p.title} className={i === 0 ? "md:pr-8" : "md:px-8"}>
              <span data-draw className="block h-1 w-10 rounded-full bg-haze/40" aria-hidden="true" />
              <h4 className="mt-5 text-lg font-semibold">{p.title}</h4>
              <p className="mt-2 leading-relaxed text-haze">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
