import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrubQuote } from "@/components/motion/ScrubQuote";
import { CONTEXT } from "@/lib/content";

/** Chương 04 · Bối cảnh */
export function Context() {
  return (
    <section id="boi-canh" className="anchor-offset py-24 md:py-32">
      <div className="container-page">
        <SectionHeader id="boi-canh" title={CONTEXT.title} lead={CONTEXT.lead} />

        <ol data-stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CONTEXT.items.map((item, i) => {
            return (
              // Hiệu ứng nổi khi rê chuột nằm ở thẻ con, tách khỏi transform của reveal
              <li key={item.title} className="group">
                <div
                  className="relative h-full overflow-hidden rounded-2xl border-t-[3px] border-line bg-night/70 p-7 transition-[translate,border-color] duration-500 group-hover:-translate-y-1 group-hover:border-lime/70"
                >
                {/*
                 * Chỉ một số thứ tự: số lớn ở góc trên phải. Thứ tự đã có
                 * trong <ol>, nên số chỉ là trang trí (::before, aria-hidden).
                 */}
                <span
                  aria-hidden="true"
                  data-n={String(i + 1).padStart(2, "0")}
                  className="pointer-events-none absolute top-5 right-6 text-[5.5rem] leading-none font-extrabold text-snow/[0.1] transition-colors duration-500 before:content-[attr(data-n)] group-hover:text-lime/30"
                />
                <h3 className="relative mt-[4.5rem] text-xl font-semibold">{item.title}</h3>
                <p className="relative mt-3 leading-relaxed text-haze">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <ScrubQuote start={CONTEXT.quoteStart} end={CONTEXT.quoteEnd} />
      </div>
    </section>
  );
}
