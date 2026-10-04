"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Dải lĩnh vực chạy ngang dưới hero (dải chạy duy nhất của trang).
 * Chạy theo chiều cuộn: cuộn xuống thì trôi sang trái, cuộn lên thì đảo chiều,
 * cuộn nhanh thì trôi nhanh hơn một nhịp rồi êm lại.
 * Giảm chuyển động: thành một hàng thẻ tĩnh, xuống dòng bình thường.
 */
export function TagMarquee({ tags }: { tags: string[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = scope.current?.querySelector<HTMLElement>("[data-track]");
        if (!track) return;
        // Nội dung nhân đôi: trôi đúng một nửa chiều dài là khép vòng liền mạch
        const loop = gsap.to(track, {
          xPercent: -50,
          duration: 38,
          ease: "none",
          repeat: -1,
        });
        // Tua sẵn về giữa chuỗi lặp, để chạy ngược (cuộn lên) không chạm mốc 0
        loop.totalTime(38 * 500);
        const st = ScrollTrigger.create({
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 300, 5);
            gsap.to(loop, {
              timeScale: self.direction * (1 + boost),
              duration: 0.25,
              overwrite: true,
              onComplete: () => {
                gsap.to(loop, { timeScale: self.direction, duration: 0.8 });
              },
            });
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope },
  );

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {tags.map((t) => (
        <li key={t} className="flex items-center">
          <span className="px-6 text-lg font-semibold whitespace-nowrap text-snow/90 md:text-xl">
            {t}
          </span>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-haze/50" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      ref={scope}
      className="relative overflow-hidden border-y border-line bg-navy/50 py-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
    >
      <p className="sr-only">Lĩnh vực: {tags.join(", ")}</p>
      <div data-track className="flex w-max motion-reduce:w-auto motion-reduce:flex-wrap">
        {row(false)}
        <span className="contents motion-reduce:hidden">{row(true)}</span>
      </div>
    </div>
  );
}
