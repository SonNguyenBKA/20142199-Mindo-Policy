"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/ui/Logo";
import { CONTACT_LABEL, NAV } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);

  // Khoá cuộn trang khi menu mobile đang mở
  useEffect(() => {
    document.body.dataset.scrollLocked = open ? "true" : "false";
    return () => {
      document.body.dataset.scrollLocked = "false";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 h-[var(--header-height)] border-b border-white/5 bg-[#06111f]/90 backdrop-blur-xl">
      <div className="container-page flex h-full items-center justify-between gap-6">
        <a href="#dau-trang" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Điều hướng chính" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[15px] text-haze">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-snow"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#lien-he"
          className="hidden rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-lime-soft active:scale-[0.98] lg:inline-flex"
        >
          {CONTACT_LABEL}
        </a>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-line text-snow lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {/* Tiến độ đọc trang, GSAP kéo giãn theo vị trí cuộn */}
      <span
        aria-hidden="true"
        data-progress
        className="absolute bottom-[-1px] left-0 h-0.5 w-full origin-left scale-x-0 bg-lime"
      />

      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 bg-night px-4 pt-6 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-4 text-lg font-medium text-snow hover:bg-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#lien-he"
            onClick={() => setOpen(false)}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-lime px-6 py-3.5 font-semibold text-ink"
          >
            {CONTACT_LABEL}
          </a>
        </div>
      )}
    </header>
  );
}
