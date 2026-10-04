"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Sáu lý do của chương Định vị: số viền rỗng được "đổ đầy" lime khi lý do đó
 * đi qua giữa màn hình, như đánh dấu đã đọc xong từng ý.
 */
export function OutlineNumbers({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-reason]").forEach((item) => {
          const no = item.querySelector("[data-reason-no]");
          // Màu đổ lấy theo vùng sáng/tối: lime trên nền tối, ô-liu đậm trên nền sáng
          const fill = getComputedStyle(item).getPropertyValue("--accent-text").trim() || "#b4d001";
          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            onEnter: () => gsap.to(no, { color: fill, duration: 0.5 }),
            onLeaveBack: () => gsap.to(no, { color: "rgba(0,0,0,0)", duration: 0.4 }),
          });
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
