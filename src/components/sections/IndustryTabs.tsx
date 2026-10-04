"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Bed, FirstAidKit, Robot, ShieldCheck } from "@phosphor-icons/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { INDUSTRY } from "@/lib/content";

const ICONS = { "khach-san": Bed, "phong-kham": FirstAidKit, robot: Robot };
const TABS = INDUSTRY.solutions;

/**
 * Ba giải pháp ngành dạng tab: một lúc chỉ đọc kỹ một giải pháp.
 * Viên lime trượt theo tab đang chọn; nội dung mới hiện theo lượt từng dòng.
 */
export function IndustryTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const scope = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = TABS[active];

  // Viên chỉ báo đi theo tab đang chọn (cả khi đổi cỡ màn hình)
  useGSAP(
    () => {
      const btn = tabRefs.current[active];
      const pill = scope.current?.querySelector<HTMLElement>("[data-pill]");
      if (!btn || !pill) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const place = (animate: boolean) =>
        gsap.to(pill, {
          x: btn.offsetLeft,
          width: btn.offsetWidth,
          duration: animate && !reduce ? 0.55 : 0,
          ease: "expo.out",
        });
      place(true);

      gsap.fromTo(
        "[data-panel-item]",
        { opacity: 0, y: reduce ? 0 : 18 },
        { opacity: 1, y: 0, duration: reduce ? 0 : 0.6, stagger: 0.05, ease: "power3.out" },
      );

      const onResize = () => place(false);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope, dependencies: [active] },
  );

  // Phím mũi tên chuyển tab, đúng mẫu tablist của WAI-ARIA
  function onKeyDown(e: KeyboardEvent) {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + TABS.length) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div ref={scope} className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-12">
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
        <div
          role="tablist"
          aria-label="Giải pháp chuyên ngành"
          onKeyDown={onKeyDown}
          className="relative flex w-max gap-2 lg:w-auto lg:flex-col"
        >
          {/* Viên lime: trên mobile trượt ngang, trên lg ẩn đi và dùng nền nút */}
          <span
            data-pill
            aria-hidden="true"
            className="absolute top-0 left-0 h-full rounded-full bg-lime lg:hidden"
          />
          {TABS.map((t, i) => {
            const Icon = ICONS[t.id as keyof typeof ICONS];
            const selected = i === active;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`${baseId}-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-3 rounded-full px-5 py-3 text-left text-[15px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime lg:rounded-2xl lg:px-5 lg:py-4 ${
                  selected
                    ? "text-ink lg:bg-lime"
                    : "text-haze hover:text-snow lg:bg-night/60 lg:hover:bg-navy"
                }`}
              >
                <span
                  className={`hidden rounded-md px-1.5 py-0.5 text-xs font-bold tabular-nums lg:inline ${
                    selected ? "bg-ink/15" : "bg-line text-snow"
                  }`}
                >
                  {t.code}
                </span>
                <Icon size={20} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${tab.id}`}
        className="rounded-2xl border border-line bg-night/70 p-7 md:p-10"
      >
        <p data-panel-item className="text-sm font-bold text-haze">
          Dịch vụ {tab.code}
        </p>
        <h3 data-panel-item className="mt-2 text-3xl font-bold tracking-tight">
          {tab.label}
        </h3>
        <p data-panel-item className="mt-4 max-w-[60ch] text-lg leading-relaxed text-snow">
          {tab.summary}
        </p>
        <ul key={tab.id} className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {tab.points.map((p, i) => (
            <li key={p} data-panel-item className="flex gap-3 leading-relaxed text-haze">
              <span className="mt-0.5 text-sm font-bold tabular-nums text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {tab.note && (
          <p
            data-panel-item
            className="mt-8 flex items-start gap-3 rounded-2xl bg-azure/15 px-5 py-4 text-sm font-medium text-[#b7cdff]"
          >
            <ShieldCheck size={20} className="shrink-0" />
            {tab.note}
          </p>
        )}
      </div>
    </div>
  );
}
