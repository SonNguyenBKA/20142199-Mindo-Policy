"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Chương Kiến trúc & quy trình:
 *  - năm lớp xây từ dưới lên (lớp 1 Nguồn trước, lớp 5 Quyết định sau), đúng
 *    chiều dữ liệu đi trong kiến trúc
 *  - vạch nối năm bước vẽ dần theo cuộn, bước nào được vạch chạm tới thì
 *    vòng số đổ đầy lime
 */
export function ArchitectureMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-layer]").reverse();
        gsap.from(layers, {
          opacity: 0,
          y: 40,
          scale: 0.96,
          duration: 0.8,
          ease: "back.out(1.4)",
          stagger: 0.14,
          scrollTrigger: { trigger: "[data-layers]", start: "top 70%", once: true },
        });

        gsap.fromTo(
          "[data-steps-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 65%", end: "bottom 65%", scrub: 0.4 },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-step-item]").forEach((item) => {
          const no = item.querySelector("[data-step-no]");
          ScrollTrigger.create({
            trigger: item,
            start: "top 65%",
            onEnter: () => {
              gsap.to(no, { backgroundColor: "#b4d001", color: "#071426", duration: 0.4 });
            },
            // Cuộn ngược: trả về đúng màu gốc của vùng (sáng hay tối) do CSS quy định
            onLeaveBack: () => {
              gsap.set(no, { clearProps: "backgroundColor,color" });
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
