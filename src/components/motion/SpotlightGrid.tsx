"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Lưới thẻ có quầng sáng theo con trỏ: phản hồi ngay thẻ nào đang được trỏ.
 * Ghi thẳng biến CSS lên thẻ, không qua state React nên không render lại.
 */
export function SpotlightGrid({
  children,
  className,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  /** Bật hiệu ứng các thẻ con chạy lên theo thứ tự (xem `data-stagger` ở MotionRoot). */
  stagger?: boolean;
}) {
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-spot]");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - r.left}px`);
    card.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <div className={className} onPointerMove={onPointerMove} data-stagger={stagger || undefined}>
      {children}
    </div>
  );
}
