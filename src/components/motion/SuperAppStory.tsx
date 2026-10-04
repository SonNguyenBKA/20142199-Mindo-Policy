"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Kể tính năng Mindo theo cuộn (từ lg trở lên): điện thoại dính bên trái luôn
 * hiện đúng màn của tính năng người đọc đang xem bên phải, bước đang đọc sáng
 * rõ, các bước khác mờ đi.
 *
 * Đổi màn là thông tin chứ không phải trang trí, nên vẫn chạy khi giảm chuyển
 * động, chỉ bỏ phần trượt/phóng.
 */
export function SuperAppStory({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
          if (!desktop) return;

          const screens = gsap.utils.toArray<HTMLElement>("[data-screen]");
          const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
          const dots = gsap.utils.toArray<HTMLElement>("[data-dot]");
          let current = -1;

          const show = (i: number) => {
            if (i === current) return;
            const prev = current;
            current = i;
            screens.forEach((s, k) => {
              if (k === i) {
                gsap.fromTo(
                  s,
                  { opacity: 0, scale: reduce ? 1 : 1.06, yPercent: reduce ? 0 : prev < i ? 6 : -6 },
                  { opacity: 1, scale: 1, yPercent: 0, duration: reduce ? 0 : 0.7, ease: "expo.out", overwrite: true },
                );
              } else {
                gsap.to(s, { opacity: 0, duration: reduce ? 0 : 0.4, overwrite: true });
              }
            });
            steps.forEach((s, k) => gsap.to(s, { opacity: k === i ? 1 : 0.28, duration: reduce ? 0 : 0.5 }));
            dots.forEach((d, k) => {
              d.classList.toggle("w-8", k === i);
              d.classList.toggle("bg-lime", k === i);
              d.classList.toggle("w-3", k !== i);
              d.classList.toggle("bg-line", k !== i);
            });
          };

          show(0);
          steps.forEach((step, i) =>
            ScrollTrigger.create({
              trigger: step,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) => self.isActive && show(i),
            }),
          );

          return () => {
            gsap.set(steps, { clearProps: "opacity" });
          };
        },
      );
      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
