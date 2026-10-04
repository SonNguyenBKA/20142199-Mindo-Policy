import { ArrowRight, Star } from "@phosphor-icons/react/dist/ssr";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CAPABILITY } from "@/lib/content";

/** Chương 08 · Năng lực: bản đồ 18 dịch vụ trong 5 nhóm */
export function CapabilityMap() {
  return (
    <section id="nang-luc" className="anchor-offset py-24 md:py-32">
      <div className="container-page">
        <SectionHeader id="nang-luc" title={CAPABILITY.title} lead={CAPABILITY.lead} />

        {/* Mobile: cuộn ngang từng cột. md: 2 cột. xl: đủ 5 nhóm trên một hàng. */}
        <div data-stagger className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-5">
          {CAPABILITY.groups.map((g) => (
            <a
              key={g.name}
              href={g.href}
              className={`group flex w-[80%] shrink-0 snap-start flex-col rounded-2xl border-t-[3px] p-6 md:w-auto ${
                g.flagship ? "border-lime bg-lime/[0.08]" : g.tone === "data" ? "border-azure bg-night/70" : "border-line bg-night/70"
              }`}
            >
              {g.flagship ? (
                <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-md bg-lime px-2 py-0.5 text-[11px] font-bold uppercase text-ink">
                  <Star size={11} weight="fill" />
                  {g.flagship}
                </span>
              ) : (
                <span className="mb-3 h-[22px]" aria-hidden="true" />
              )}
              <h3 className="text-lg leading-snug font-semibold">{g.name}</h3>
              <ul className="mt-5 grid gap-3.5">
                {g.services.map(([code, name]) => (
                  <li key={code} className="flex gap-3 border-b border-line/70 pb-3 text-[15px] leading-snug last:border-0">
                    <span className={`w-6 shrink-0 font-bold tabular-nums ${g.flagship ? "text-lime" : g.tone === "data" ? "text-azure-soft" : "text-dim"}`}>
                      {code}
                    </span>
                    <span className="text-haze">{name}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-snow/80 transition-colors group-hover:text-lime">
                Xem chi tiết
                <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>

        {/* Ba cách bắt đầu rộng và đậm dần theo quy mô cam kết: nhỏ → ghép dần → trọn gói */}
        <ol data-stagger className="mt-12 grid gap-4 md:grid-cols-[1fr_1.15fr_1.3fr]">
          {CAPABILITY.paths.map((p, i) => (
            <li
              key={p.title}
              className={`relative rounded-2xl p-7 ${
                ["bg-night/70", "bg-navy", "border border-lime/40 bg-lime/[0.09]"][i]
              }`}
            >
              <span className="text-sm font-bold text-haze">Cách {i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-haze">{p.body}</p>
              {i < CAPABILITY.paths.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-[18px] z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-night text-lime md:flex"
                >
                  <ArrowRight size={14} weight="bold" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
