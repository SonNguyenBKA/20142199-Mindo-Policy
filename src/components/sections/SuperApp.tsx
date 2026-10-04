import { DaySky } from "@/components/bg/NightSky";
import type { ReactNode } from "react";
import Image from "next/image";
import { ChatsCircle, Newspaper, SealCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { PeerCard } from "@/components/ui/PeerCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SuperAppStory } from "@/components/motion/SuperAppStory";
import { SUPER_APP } from "@/lib/content";

const ICONS = { ai: Sparkle, chat: ChatsCircle, news: Newspaper, peer: SealCheck };

function Screen({ index }: { index: number }) {
  const f = SUPER_APP.features[index];
  return f.screen ? (
    <Image src={f.screen} alt={f.alt} fill sizes="300px" className="object-cover object-top" />
  ) : (
    <PeerCard />
  );
}

/** Khung máy dùng chung cho màn hình lớn (dính) và mobile (trong từng bước). */
function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`theme-dark relative aspect-[393/852] overflow-hidden rounded-[2.6rem] border-[6px] border-[#0d2247] bg-night shadow-[0_40px_80px_rgb(2_8_20/0.65)] ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute top-2.5 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black"
      />
    </div>
  );
}

/** Chương 03 · Sản phẩm lõi: Mindo Super App */
export function SuperApp() {
  return (
    <section id="mindo-super-app" className="theme-light section-sheet relative isolate anchor-offset bg-night py-24 md:py-32">
      <DaySky seed={211} />
      <div className="container-page">
        <SectionHeader id="mindo-super-app" title={SUPER_APP.title} lead={SUPER_APP.lead} />

        <SuperAppStory>
          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
            {/* Màn hình lớn: một máy dính lại, đổi màn theo tính năng đang đọc */}
            <div className="hidden lg:block">
              <div className="sticky top-[calc(var(--header-height)+6vh)]">
                <div className="relative mx-auto w-[300px]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgb(180_208_1/0.18),transparent_65%)] blur-2xl"
                  />
                  <Phone>
                    {SUPER_APP.features.map((f, i) => (
                      <div
                        key={f.id}
                        data-screen={i}
                        className={`absolute inset-0 ${i === 0 ? "" : "opacity-0"}`}
                      >
                        <Screen index={i} />
                      </div>
                    ))}
                  </Phone>
                </div>
                <ol aria-hidden="true" className="mt-8 flex justify-center gap-2">
                  {SUPER_APP.features.map((f, i) => (
                    <li
                      key={f.id}
                      data-dot={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === 0 ? "w-8 bg-lime" : "w-3 bg-line"}`}
                    />
                  ))}
                </ol>
              </div>
            </div>

            <ol className="grid gap-12 lg:gap-0">
              {SUPER_APP.features.map((f, i) => {
                const Icon = ICONS[f.id as keyof typeof ICONS];
                return (
                  <li
                    key={f.id}
                    data-step={i}
                    className="flex flex-col justify-center lg:min-h-[72vh]"
                  >
                    <div data-reveal className="flex items-center gap-4">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-navy-soft text-lime ring-1 ring-line">
                        <Icon size={24} weight="bold" />
                      </span>
                      <span className="text-sm font-bold tabular-nums text-dim">
                        {String(i + 1).padStart(2, "0")} / {String(SUPER_APP.features.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 data-reveal className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
                      {f.name}
                    </h3>
                    <p data-reveal className="mt-4 max-w-[46ch] text-xl leading-relaxed text-snow">
                      {f.body}
                    </p>
                    <p
                      data-reveal
                      className="mt-6 max-w-[52ch] border-l-2 border-line pl-4 leading-relaxed text-haze"
                    >
                      {f.example}
                    </p>
                    <Phone className="mx-auto mt-8 w-[220px] lg:hidden">
                      <Screen index={i} />
                    </Phone>
                  </li>
                );
              })}
            </ol>
          </div>
        </SuperAppStory>

        {/* Lộ trình: vạch tiến độ vẽ tới giai đoạn đang chạy */}
        <div className="mt-20 rounded-2xl border border-line bg-navy/50 p-7 md:p-10">
          <h3 data-reveal className="text-xl font-semibold">Lộ trình</h3>
          <ol data-stagger className="relative mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
            <span aria-hidden="true" className="absolute top-[11px] right-[16%] left-[16%] hidden h-0.5 bg-line md:block">
              <span data-draw className="absolute inset-y-0 left-0 w-1/2 bg-lime" />
            </span>
            {SUPER_APP.roadmap.map((r) => (
              <li key={r.when} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
                <span
                  className={`relative z-10 mt-0.5 size-6 shrink-0 rounded-full border-4 ${
                    r.now ? "border-lime bg-night shadow-[0_0_0_6px_rgb(180_208_1/0.18)]" : "border-line bg-night"
                  }`}
                />
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.12em] ${r.now ? "text-lime" : "text-dim"}`}>
                    {r.when}
                  </p>
                  <p className="mt-1.5 text-lg font-semibold">{r.what}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
