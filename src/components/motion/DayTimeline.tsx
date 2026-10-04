"use client";

import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Row = { time: string; system: string; leader: string };

/**
 * "Một ngày điều hành": trục thời gian dọc chạy theo cuộn. Vạch lime đi xuống
 * tới đâu, mốc giờ ở đó sáng lên và dòng "hệ thống làm → lãnh đạo làm" trượt vào vị trí
 * (chữ không bị làm mờ, để luôn đủ độ tương phản):
 * người đọc đi qua đúng một ngày làm việc theo thứ tự giờ.
 */
export function DayTimeline({ rows }: { rows: Row[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-day-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-day-list]",
              start: "top 65%",
              end: "bottom 65%",
              scrub: 0.4,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-day-row]").forEach((row) => {
          const dot = row.querySelector("[data-day-dot]");
          const body = row.querySelectorAll("[data-day-body]");
          gsap.set(body, { x: 16 });
          gsap.set(dot, { scale: 0.6, backgroundColor: "#1d3050" });
          ScrollTrigger.create({
            trigger: row,
            start: "top 65%",
            onEnter: () => {
              gsap.to(dot, { scale: 1, backgroundColor: "#b4d001", duration: 0.4, ease: "back.out(3)" });
              gsap.to(body, { x: 0, duration: 0.7, stagger: 0.12 });
            },
            onLeaveBack: () => {
              gsap.to(dot, { scale: 0.6, backgroundColor: "#1d3050", duration: 0.3 });
              gsap.to(body, { x: 16, duration: 0.4 });
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <div className="mt-8 hidden grid-cols-[8.5rem_1fr_2.5rem_1fr] gap-6 pl-0 text-xs font-semibold uppercase tracking-wider text-dim md:grid">
        <span className="pl-10">Thời điểm</span>
        <span>Hệ thống làm gì</span>
        <span />
        <span>Lãnh đạo làm gì</span>
      </div>
      <ol data-day-list className="relative mt-4 grid gap-4">
        <span aria-hidden="true" className="absolute top-8 bottom-8 left-[11px] w-0.5 bg-line">
          <span data-day-line className="absolute inset-0 origin-top bg-lime" />
        </span>
        {rows.map((r) => (
          <li
            key={r.time}
            data-day-row
            className="relative grid gap-3 pl-10 md:grid-cols-[8.5rem_1fr_2.5rem_1fr] md:items-center md:gap-6"
          >
            <span
              data-day-dot
              aria-hidden="true"
              className="absolute top-3 left-[3px] size-[18px] rounded-full border-4 border-night bg-lime md:top-1/2 md:-translate-y-1/2"
            />
            <span className="text-3xl font-bold tabular-nums text-snow md:text-4xl">{r.time}</span>
            <p data-day-body className="rounded-2xl border border-line bg-navy/60 p-5 leading-relaxed text-haze">
              {r.system}
            </p>
            <ArrowRight data-day-body size={22} className="hidden text-dim md:block" aria-hidden="true" />
            <p data-day-body className="rounded-2xl bg-lime/10 p-5 font-medium leading-relaxed text-snow">
              {r.leader}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
