import { DaySky } from "@/components/bg/NightSky";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OutlineNumbers } from "@/components/motion/OutlineNumbers";
import { POSITIONING } from "@/lib/content";

/** Chương 07 · Định vị */
export function Positioning() {
  return (
    <section id="dinh-vi" className="theme-light section-sheet relative isolate anchor-offset bg-night py-24 md:py-32">
      <DaySky seed={401} />
      <div className="container-page">
        <SectionHeader id="dinh-vi" title={POSITIONING.title} lead={POSITIONING.lead} />

        <OutlineNumbers>
          <ol data-stagger className="mt-14 grid gap-x-14 gap-y-4 md:grid-cols-2">
            {POSITIONING.reasons.map((r, i) => (
              <li
                key={r.title}
                data-reason
                className="grid grid-cols-[4.5rem_1fr] gap-5 border-t border-line py-8"
              >
                <span
                  aria-hidden="true"
                  data-reason-no
                  className="text-6xl leading-none font-extrabold text-transparent [-webkit-text-stroke:1.5px_var(--color-haze)]"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{r.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-haze">{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </OutlineNumbers>
      </div>
    </section>
  );
}
