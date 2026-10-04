"use client";

import { useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { CHAPTERS } from "@/lib/content";

/**
 * Mục lục dọc bám mép phải màn hình rộng: cho biết đang đọc chương nào trong
 * 11 chương của hồ sơ và nhảy nhanh sang chương khác.
 *
 * State chỉ đổi khi sang chương mới (onToggle), không đổi theo từng khung cuộn.
 */
export function ChapterRail() {
  const [active, setActive] = useState<string | null>(null);

  useGSAP(() => {
    const triggers = CHAPTERS.map((c) => {
      const el = document.getElementById(c.id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        // Tạo trước các section có pin: tính mốc sau cùng để cộng đủ khoảng pin
        refreshPriority: -1,
        onToggle: (self) => {
          if (self.isActive) setActive(c.id);
        },
      });
    });
    // Lên lại tới hero thì không chương nào sáng
    const first = document.getElementById(CHAPTERS[0].id);
    const top = first
      ? ScrollTrigger.create({
          trigger: first,
          start: "top 45%",
          refreshPriority: -1,
          onLeaveBack: () => setActive(null),
        })
      : null;
    return () => {
      triggers.forEach((t) => t?.kill());
      top?.kill();
    };
  });

  return (
    <nav
      aria-label="Mục lục hồ sơ"
      className={`fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 transition-opacity duration-500 min-[1440px]:block ${
        // Ẩn ở hero và khi dải dịch vụ cuộn ngang đang chạy tràn hết bề ngang
        active && active !== "nen-tang-ai" ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ol className="flex flex-col items-end gap-2.5">
        {CHAPTERS.map((c) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "true" : undefined}
                className="group flex items-center justify-end gap-3"
              >
                {/* Tên chương chỉ hiện khi rê chuột: luôn hiện thì ở 1440px sẽ đè lên nội dung */}
                <span
                  className={`pointer-events-none translate-x-2 rounded-full bg-night/90 px-2.5 py-1 text-xs font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
                    on ? "text-lime" : "text-haze"
                  }`}
                >
                  {c.label}
                </span>
                <span
                  className={`w-5 text-right text-[11px] font-bold tabular-nums transition-colors ${
                    on ? "text-lime" : "text-dim group-hover:text-snow"
                  }`}
                >
                  {c.no}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    on ? "w-6 bg-lime" : "w-3 bg-line group-hover:bg-haze"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
