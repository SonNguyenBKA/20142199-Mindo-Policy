import {
  ArrowRight,
  Buildings,
  Lightning,
  SquaresFour,
  Stack,
} from "@phosphor-icons/react/dist/ssr";
import { LogoMark } from "@/components/ui/Logo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ECOSYSTEM } from "@/lib/content";

const ICONS = [null, SquaresFour, Buildings];

/** Chương 02 · Hệ sinh thái sản phẩm */
export function Ecosystem() {
  const [core, ...flagships] = ECOSYSTEM.products;

  return (
    <section id="he-sinh-thai" className="anchor-offset py-24 md:py-32">
      <div className="container-page">
        <SectionHeader id="he-sinh-thai" title={ECOSYSTEM.title} lead={ECOSYSTEM.lead} />

        {/* "Đội kinh doanh chỉ cần nhớ": ai → sản phẩm nào */}
        <div className="mt-14 rounded-2xl border border-line bg-night/60 p-6 md:p-8">
          <p data-reveal="fade" className="text-sm font-semibold text-haze">
            Đội kinh doanh chỉ cần nhớ
          </p>
          <ol className="mt-5 grid gap-4">
            {ECOSYSTEM.routing.map((r) => (
              <li
                key={r.who}
                data-reveal="left"
                className="grid items-center gap-2 sm:grid-cols-[13rem_1fr_auto] sm:gap-5"
              >
                <span className="text-lg font-semibold text-snow">{r.who}</span>
                <span aria-hidden="true" className="relative hidden h-px sm:block">
                  <span data-draw className="absolute inset-0 bg-gradient-to-r from-line via-lime/60 to-lime" />
                </span>
                <a
                  href={r.href}
                  className="group inline-flex items-center gap-2 justify-self-start rounded-full bg-lime/10 px-4 py-2 font-semibold text-lime transition-colors hover:bg-lime hover:text-ink"
                >
                  {r.product}
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div data-stagger className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <article
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#10306a] via-navy to-night p-7 md:p-10 lg:row-span-2"
          >
            <LogoMark
              size={300}
              core="currentColor"
              className="pointer-events-none absolute -right-16 -bottom-20 text-snow/[0.05]"
            />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-lime">{core.kind}</p>
              <h3 className="mt-3 flex items-center gap-3 text-3xl font-bold tracking-tight md:text-4xl">
                <LogoMark size={40} />
                {core.name}
              </h3>
              <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-haze">{core.body}</p>
              <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:max-w-md">
                {["Trợ lý AI đa năng", "Nhắn tin, nhóm chat", "Gọi thoại, video", "Tin tức + AI tóm tắt", "Chứng nhận số Peer", "Xác minh CCCD bằng QR"].map(
                  (f) => (
                    <li key={f} className="rounded-xl border border-snow/10 bg-snow/[0.04] px-3.5 py-3 text-sm font-medium">
                      {f}
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-lime/50 px-4 py-2 text-sm font-bold text-lime-soft">
                <Lightning size={16} weight="fill" />
                {core.fit}
              </p>
            </div>
          </article>

          {flagships.map((p, i) => {
            const Icon = ICONS[i + 1]!;
            return (
              <article
                key={p.name}
                className="rounded-2xl border-t-[3px] border-lime bg-navy p-7 md:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-haze">
                  {p.kind}
                </p>
                <h3 className="mt-3 flex items-center gap-3 text-2xl font-bold tracking-tight">
                  <Icon size={26} />
                  {p.name}
                </h3>
                <p className="mt-3 leading-relaxed text-haze">{p.body}</p>
                <p className="mt-4 text-sm font-semibold text-snow/85">
                  {p.fit}
                </p>
              </article>
            );
          })}
        </div>

        <aside
          data-reveal
          className="mt-6 flex gap-4 rounded-2xl border border-dashed border-line p-6 md:items-center md:p-7"
        >
          <Stack size={28} className="shrink-0 text-haze" />
          <p className="leading-relaxed text-haze">
            <strong className="font-semibold text-snow">{ECOSYSTEM.foundation.title}.</strong>{" "}
            {ECOSYSTEM.foundation.body}
          </p>
        </aside>
      </div>
    </section>
  );
}
