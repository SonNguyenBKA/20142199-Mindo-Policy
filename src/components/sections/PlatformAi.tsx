import { DaySky } from "@/components/bg/NightSky";
import { Brain, Database } from "@phosphor-icons/react/dist/ssr";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HorizontalPan } from "@/components/motion/HorizontalPan";
import { PLATFORM_AI } from "@/lib/content";

const GROUP_STYLE = [
  { icon: Database, card: "border-t-[3px] border-azure bg-gradient-to-br from-[#122b5c] to-navy text-snow", code: "text-azure-soft" },
  { icon: Brain, card: "border-t-[3px] border-azure bg-gradient-to-br from-azure to-[#163a86] text-snow", code: "text-azure-soft" },
];

/** Chương 09 · Nền tảng số & trí tuệ nhân tạo (dịch vụ 01-06) */
export function PlatformAi() {
  return (
    <section id="nen-tang-ai" className="theme-light section-sheet relative isolate anchor-offset bg-night pt-24 pb-12 md:pt-32 md:pb-16">
      <DaySky seed={503} />
      <div className="container-page">
        <SectionHeader id="nen-tang-ai" title={PLATFORM_AI.title} lead={PLATFORM_AI.lead} />
      </div>

      <HorizontalPan label="Chương 09: sáu dịch vụ đặt móng" hint="Cuộn xuống để xem lần lượt dịch vụ 01 đến 06">
        {PLATFORM_AI.groups.flatMap((g, gi) => {
          const st = GROUP_STYLE[gi];
          const Icon = st.icon;
          return [
            <article
              key={g.name}
              data-pan-card
              className={`theme-dark flex w-full shrink-0 flex-col justify-between rounded-2xl p-8 lg:h-[26rem] lg:w-[20rem] ${st.card}`}
            >
              <Icon size={40} weight="duotone" />
              <div className="mt-10">
                <p className="text-sm font-bold uppercase tracking-[0.14em] opacity-75">Nhóm {gi + 1}</p>
                <h3 className="mt-2 text-3xl leading-tight font-bold tracking-tight">{g.name}</h3>
                <p className="mt-3 text-sm font-semibold opacity-80">
                  Dịch vụ {g.services[0].code} đến {g.services.at(-1)!.code}
                </p>
              </div>
            </article>,
            ...g.services.map((s) => (
              <article
                key={s.code}
                data-pan-card
                className="group relative flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-navy p-8 lg:h-[26rem] lg:w-[25rem]"
              >
                <span className={`relative text-5xl font-extrabold tabular-nums ${st.code}`}>{s.code}</span>
                <h4 className="relative mt-6 text-2xl font-semibold tracking-tight">{s.title}</h4>
                <p className="relative mt-4 leading-relaxed text-haze">{s.body}</p>
              </article>
            )),
          ];
        })}
      </HorizontalPan>
    </section>
  );
}
