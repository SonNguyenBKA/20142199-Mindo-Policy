import type { ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-[15px] font-semibold transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime";

const VARIANTS = {
  primary: "bg-lime text-ink hover:-translate-y-0.5 hover:bg-lime-soft",
  ghost:
    "border border-line text-snow hover:-translate-y-0.5 hover:border-haze/60",
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
