import { DaySky } from "@/components/bg/NightSky";
import { CloudArrowUp, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchitectureMotion } from "@/components/motion/ArchitectureMotion";
import { ARCHITECTURE } from "@/lib/content";

/* Màu năm lớp: navy đậm (quyết định, trên cùng) tới lime (nguồn, dưới cùng). */
const LAYER_TONES: Record<number, string> = {
  5: "bg-[#0b1d3d] text-snow",
  4: "bg-[#143066] text-snow",
  3: "bg-azure text-snow",
  2: "bg-[#86a10a] text-ink",
  1: "bg-lime text-ink",
};

/** Chương 11 · Kiến trúc & quy trình */
export function Architecture() {
  return (
    <section id="kien-truc-quy-trinh" className="theme-light section-sheet relative isolate anchor-offset bg-night py-24 md:py-32">
      <DaySky seed={607} />
      <div className="container-page">
        <SectionHeader id="kien-truc-quy-trinh" title={ARCHITECTURE.title} lead={ARCHITECTURE.lead} />

        <ArchitectureMotion>
          <div className="mt-14 grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            {/* Năm lớp xây từ dưới lên khi cuộn tới: nguồn trước, quyết định sau */}
            <div>
              <h3 className="text-lg font-semibold text-haze">Nền tảng năm lớp</h3>
              <ol data-layers className="mt-5 grid gap-2.5">
                {ARCHITECTURE.layers.map((l) => (
                  <li
                    key={l.no}
                    data-layer
                    className="grid overflow-hidden rounded-2xl border border-line sm:grid-cols-[9rem_1fr]"
                  >
                    <div className={`flex flex-col justify-center px-5 py-4 ${l.no >= 3 ? "theme-dark" : ""} ${LAYER_TONES[l.no]}`}>
                      <span className="text-[11px] font-bold uppercase opacity-70">Lớp {l.no}</span>
                      <span className="text-lg leading-tight font-bold">{l.name}</span>
                    </div>
                    <div className="bg-navy px-5 py-4">
                      <p className="font-semibold text-snow">{l.title}</p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {l.items.map((it) => (
                          <li key={it} className="rounded-full bg-snow/[0.05] px-2.5 py-1 text-xs text-haze">
                            {it}
                          </li>
                        ))}
                      </ul>
                      {l.note && <p className="mt-2 text-sm text-haze">{l.note}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Năm bước: vạch nối các bước vẽ dần theo cuộn */}
            <div>
              <h3 className="text-lg font-semibold text-haze">Triển khai năm bước</h3>
              <ol data-steps className="relative mt-5 grid gap-8">
                <span aria-hidden="true" className="absolute top-5 bottom-5 left-[19px] w-0.5 bg-line">
                  <span data-steps-line className="absolute inset-0 origin-top bg-lime" />
                </span>
                {ARCHITECTURE.steps.map((s, i) => (
                  <li key={s.title} data-step-item className="relative grid grid-cols-[2.5rem_1fr] gap-5">
                    <span
                      data-step-no
                      className="relative z-10 flex size-10 items-center justify-center rounded-full border-2 border-lime bg-night text-sm font-bold text-lime"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="pt-1.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h4 className="text-lg font-semibold">{s.title}</h4>
                        <span className="rounded-full bg-snow/[0.06] px-2.5 py-0.5 text-sm font-bold text-snow">
                          {s.duration}
                        </span>
                      </div>
                      <p className="mt-1.5 leading-relaxed text-haze">{s.output}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ArchitectureMotion>

        <div data-stagger className="mt-12 grid gap-4 md:grid-cols-2">
          {ARCHITECTURE.notes.map((n, i) => {
            const Icon = i === 0 ? ShieldCheck : CloudArrowUp;
            return (
              <div
                key={n.title}
                className="flex gap-4 rounded-2xl border-t-[3px] border-line bg-navy/60 p-6"
              >
                <Icon size={26} className="text-haze" />
                <div>
                  <h4 className="font-semibold">{n.title}</h4>
                  <p className="mt-1 text-haze">{n.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
