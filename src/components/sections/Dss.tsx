import { DaySky } from "@/components/bg/NightSky";
import { ChartLineUp, Robot, TreeStructure } from "@phosphor-icons/react/dist/ssr";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DayTimeline } from "@/components/motion/DayTimeline";
import { DSS } from "@/lib/content";

const MODULE_STYLE = [
  { icon: TreeStructure, border: "border-lime", chip: "bg-lime text-ink", tone: "text-lime" },
  { icon: ChartLineUp, border: "border-haze/40", chip: "bg-snow/10 text-snow", tone: "text-haze" },
  { icon: Robot, border: "border-azure", chip: "bg-azure text-snow", tone: "text-azure-soft" },
];

/** Chương 05 · Sản phẩm chủ lực 01: Hệ hỗ trợ ra quyết định */
export function Dss() {
  return (
    <section id="dss" className="theme-light section-sheet relative isolate anchor-offset bg-night py-24 md:py-32">
      <DaySky seed={307} />
      <div className="container-page">
        <SectionHeader id="dss" title={DSS.title} lead={DSS.lead} />

        <div data-stagger className="mt-14 grid gap-4 lg:grid-cols-[1.35fr_1fr_1fr]">
          {DSS.modules.map((m, i) => {
            const st = MODULE_STYLE[i];
            const Icon = st.icon;
            return (
              <article
                key={m.code}
                className={`rounded-2xl border-t-[3px] p-7 ${st.border} ${
                  i === 0 ? "bg-[radial-gradient(ellipse_at_top_left,rgb(180_208_1/0.14),transparent_65%)] bg-navy md:p-8" : "bg-navy"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-lg px-2.5 py-1 text-sm font-bold tabular-nums ${st.chip}`}>
                    {m.code}
                  </span>
                  <Icon size={28} className={st.tone} />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{m.title}</h3>
                <ul className="mt-5 grid gap-3">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-haze">
                      <span aria-hidden="true" className={`mt-[0.65em] size-1.5 shrink-0 rounded-full bg-current ${st.tone}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <h3 data-reveal className="mt-20 text-2xl font-bold tracking-tight md:text-3xl">
          {DSS.dayTitle}
        </h3>
        <DayTimeline rows={DSS.day} />
      </div>
    </section>
  );
}
