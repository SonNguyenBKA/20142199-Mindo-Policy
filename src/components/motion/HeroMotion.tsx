"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Timeline mở trang của hero, kể đúng câu khẩu hiệu bằng hình:
 *   1. tiêu đề trượt lên từng dòng, đoạn dẫn và nút hiện theo
 *   2. vòng tròn (dữ liệu) tự vẽ kín, lõi lime (quyết định) bật lên
 *   3. các chấm dữ liệu liên tục bay từ ngoài vào lõi
 * Cuộn xuống thì vòng xoay chậm theo, rời hero thì vòng lặp tạm dừng.
 */
export function HeroMotion({ children, className }: { children: ReactNode; className?: string }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .to("[data-hero]:first-child", { opacity: 1, duration: 0.6 })
          .to(
            "[data-mask-line] > span",
            { y: 0, duration: 1.2, stagger: 0.12 },
            0.1,
          )
          .fromTo(
            "[data-hero]:not(:first-child)",
            { y: 24 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
            0.45,
          )
          .to(
            "[data-hero-ring]",
            { strokeDashoffset: 0, opacity: 1, duration: 1.8, ease: "power3.inOut" },
            0.2,
          )
          .fromTo(
            "[data-hero-core]",
            { scale: 0, svgOrigin: "200 200" },
            { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(2)" },
            1.5,
          )
          .from("[data-hero-glow]", { opacity: 0, scale: 0.6, duration: 1.4 }, 1.4);

        // Mỗi chấm một vòng lặp riêng, lệch pha nhau để dòng dữ liệu đều đặn
        const dots = gsap.timeline({ paused: true });
        gsap.utils.toArray<SVGCircleElement>("[data-hero-dot]").forEach((dot, i) => {
          const dx = 200 - Number(dot.getAttribute("cx"));
          const dy = 200 - Number(dot.getAttribute("cy"));
          const loop = gsap
            .timeline({ repeat: -1, repeatDelay: 0.4 })
            .fromTo(dot, { x: 0, y: 0, opacity: 0 }, { opacity: 0.9, duration: 0.4, ease: "none" })
            .to(dot, { x: dx * 0.62, y: dy * 0.62, duration: 2.2, ease: "power2.in" }, 0)
            .to(dot, { opacity: 0, duration: 0.3, ease: "none" }, 1.9);
          dots.add(loop, i * 0.32);
        });
        intro.add(() => {
          dots.play();
        }, 1.8);

        // Lõi "thở" nhẹ: hệ thống đang chạy, không đứng im
        const pulse = gsap.to("[data-hero-glow]", {
          scale: 1.12,
          opacity: 0.75,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.8,
        });

        gsap.to("[data-hero-ring-spin]", {
          rotate: 70,
          svgOrigin: "200 200",
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            onToggle: (self) => {
              if (self.isActive) {
                if (intro.progress() === 1) dots.play();
                pulse.play();
              } else {
                dots.pause();
                pulse.pause();
              }
            },
          },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
