import type { ReactNode } from "react";
import { chapter, type ChapterId } from "@/lib/content";

type SectionHeaderProps = {
  id: ChapterId;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
};

/**
 * Đầu chương thống nhất cho cả trang: số chương + tên chương (đúng như hồ sơ),
 * tiêu đề, vạch lime tự vẽ, rồi đoạn dẫn. Người đọc luôn biết mình đang ở
 * chương nào trong 11 chương.
 */
export function SectionHeader({ id, title, lead, className = "" }: SectionHeaderProps) {
  const c = chapter(id);
  return (
    <header className={`max-w-4xl ${className}`}>
      <p data-reveal="fade" className="flex items-center gap-3 text-sm font-semibold">
        <span className="rounded-full bg-lime/12 px-2.5 py-0.5 tabular-nums text-lime-soft ring-1 ring-lime/25">
          {c.no}
        </span>
        <span className="uppercase tracking-[0.14em] text-haze">{c.label}</span>
      </p>
      <h2
        data-reveal
        className="mt-5 text-[2.1rem] font-bold leading-[1.12] tracking-tight text-balance md:text-5xl"
      >
        {title}
      </h2>
      <span aria-hidden="true" data-draw className="mt-8 block h-1 w-14 rounded-full bg-lime" />
      {lead && (
        <p data-reveal className="mt-6 max-w-[68ch] text-lg leading-relaxed text-haze">
          {lead}
        </p>
      )}
    </header>
  );
}
