"use client";

import { useRef, type ReactNode } from "react";
import { gsap, HEADER_OFFSET, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Dải dịch vụ cuộn ngang (từ lg trở lên, khi được phép chuyển động):
 * khung dừng lại ngay dưới header, cuộn dọc bao nhiêu thì dải trượt ngang bấy
 * nhiêu, thanh tiến độ cho biết đã đi qua mấy phần dải. Thẻ ở rìa phải nhỏ
 * hơn một chút rồi lớn dần khi vào giữa khung (không làm mờ chữ).
 *
 * Mobile hoặc giảm chuyển động: các thẻ xếp dọc như danh sách thường.
 */
export function HorizontalPan({
  children,
  label,
  hint,
}: {
  children: ReactNode;
  /** Dòng nhãn trên dải, giữ ngữ cảnh chương khi tiêu đề đã cuộn khỏi màn. */
  label: string;
  hint: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const el = wrap.current!;
        const track = el.querySelector<HTMLElement>("[data-pan-track]")!;
        const bar = el.querySelector<HTMLElement>("[data-pan-bar]");
        const distance = () => track.scrollWidth - el.clientWidth;

        const pan = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: `top top+=${HEADER_OFFSET}`,
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        if (bar) {
          gsap.fromTo(
            bar,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: `top top+=${HEADER_OFFSET}`,
                end: () => `+=${distance()}`,
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        gsap.utils.toArray<HTMLElement>("[data-pan-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.94 },
            {
              scale: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: pan,
                start: "left 95%",
                end: "left 60%",
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: wrap },
  );

  return (
    <div
      ref={wrap}
      className="overflow-hidden lg:flex lg:h-[calc(100dvh-var(--header-height))] lg:flex-col lg:justify-center motion-reduce:lg:h-auto"
    >
      <div className="container-page mb-8 hidden items-baseline justify-between gap-6 lg:flex motion-reduce:hidden">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-haze">{label}</p>
        <p className="text-sm text-dim">{hint}</p>
      </div>
      <div className="container-page lg:max-w-none lg:px-0">
        <div
          data-pan-track
          className="grid gap-4 py-14 lg:flex lg:w-max lg:gap-5 lg:py-0 lg:pr-[10vw] lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] motion-reduce:lg:grid motion-reduce:lg:w-auto motion-reduce:lg:grid-cols-3 motion-reduce:lg:px-10 motion-reduce:lg:py-14"
        >
          {children}
        </div>
      </div>
      <div className="container-page mt-10 hidden lg:block motion-reduce:hidden">
        <div className="h-0.5 overflow-hidden rounded-full bg-line">
          <span data-pan-bar className="block h-full origin-left scale-x-0 bg-lime" />
        </div>
      </div>
    </div>
  );
}
