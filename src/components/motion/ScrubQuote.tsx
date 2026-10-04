"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Câu kết của chương Bối cảnh. Chữ sáng dần từng từ theo đúng nhịp cuộn,
 * như người đọc đang đọc thành tiếng; phần kết luận sáng lên màu lime.
 */
export function ScrubQuote({ start, end }: { start: string; end: string }) {
  const scope = useRef<HTMLQuoteElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.08,
            scrollTrigger: {
              trigger: scope.current,
              start: "top 80%",
              end: "bottom 45%",
              scrub: 0.5,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope },
  );

  const words = (text: string, lime: boolean) =>
    text.split(" ").map((w, i) => (
      <span key={`${lime}-${i}`} data-word className={lime ? "text-lime" : undefined}>
        {w}{" "}
      </span>
    ));

  return (
    <blockquote
      ref={scope}
      className="mt-16 rounded-2xl border border-azure/30 bg-gradient-to-br from-[#173a80] via-[#0f2752] to-night px-7 py-12 md:px-14 md:py-16"
    >
      <p className="max-w-5xl text-2xl font-bold leading-snug tracking-tight md:text-4xl md:leading-tight">
        {words(start, false)}
        {words(end, true)}
      </p>
    </blockquote>
  );
}
