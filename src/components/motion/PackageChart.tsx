"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Pkg = { name: string; scope: string; duration: string };

/** Quy "8-10 tuần" / "4-6 tháng" về khoảng tuần để vẽ cùng một trục. */
function toWeeks(d: string): [number, number] {
  const [a, b] = d.match(/\d+/g)!.map(Number);
  const k = d.includes("tháng") ? 4.33 : 1;
  return [a * k, b * k];
}

const AXIS_MAX = 28; // tuần
const TICKS = [0, 4, 8, 12, 16, 20, 24, 28];

/**
 * Gói triển khai dựng sẵn, vẽ thành biểu đồ khoảng thời gian trên cùng một
 * trục tuần: so được ngay gói nào nhanh, gói nào dài. Thanh khoảng mọc ra từ
 * mốc bắt đầu khi cuộn tới.
 */
export function PackageChart({ title, packages }: { title: string; packages: Pkg[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-range]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} data-reveal className="mt-8 rounded-2xl border border-line bg-night/70 p-7 md:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-dim">Thời gian triển khai, quy đổi theo tuần</p>
      </div>

      <div className="mt-8 grid gap-6">
        {packages.map((p) => {
          const [lo, hi] = toWeeks(p.duration);
          return (
            <div key={p.name} className="grid gap-2 md:grid-cols-[19rem_1fr] md:items-center md:gap-8">
              <div>
                <p className="font-semibold text-snow">{p.name}</p>
                <p className="text-sm text-haze">{p.scope}</p>
              </div>
              <div className="relative h-9">
                <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-line" />
                <span
                  data-range
                  className="absolute top-1/2 flex h-7 -translate-y-1/2 items-center justify-center rounded-full bg-azure px-3 text-xs font-bold whitespace-nowrap text-snow"
                  style={{
                    left: `${(lo / AXIS_MAX) * 100}%`,
                    width: `max(${((hi - lo) / AXIS_MAX) * 100}%, 5.5rem)`,
                  }}
                >
                  {p.duration}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trục tuần */}
      <div aria-hidden="true" className="mt-4 hidden md:grid md:grid-cols-[19rem_1fr] md:gap-8">
        <span />
        <div className="relative h-5 border-t border-line">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute top-1.5 -translate-x-1/2 text-[11px] tabular-nums text-dim"
              style={{ left: `${(t / AXIS_MAX) * 100}%` }}
            >
              {t}
            </span>
          ))}
          <span className="absolute top-1.5 right-0 translate-x-[130%] text-[11px] text-dim">tuần</span>
        </div>
      </div>
    </div>
  );
}
