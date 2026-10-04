import { Logo } from "@/components/ui/Logo";
import { COMPANY, NAV } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-night">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-md">
          <Logo />
          <p className="mt-5 text-[15px] leading-relaxed text-haze">
            {COMPANY.closing}
          </p>
        </div>
        <nav aria-label="Liên kết cuối trang">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-haze">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-snow">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-line/60 py-6 text-[13px] text-dim md:flex-row md:justify-between">
        <span>© 2026 {COMPANY.legalName}</span>
        <a href={COMPANY.website} className="hover:text-haze">
          mindosoft.vn
        </a>
      </div>
    </footer>
  );
}
