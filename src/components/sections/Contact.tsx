import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { CtaLink } from "@/components/ui/CtaLink";
import { LogoMark } from "@/components/ui/Logo";
import { SpinOnScroll } from "@/components/motion/SpinOnScroll";
import { ContactForm } from "@/components/contact/ContactForm";
import { COMPANY } from "@/lib/content";

/**
 * Trang cuối hồ sơ: lời cảm ơn bên trái, form đăng ký tư vấn bên phải.
 * Đây là đích của mọi nút "Liên hệ tư vấn" trên trang.
 */
export function Contact() {
  return (
    <section id="lien-he" className="anchor-offset py-20 md:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#0e2448] via-navy to-night px-5 py-12 sm:px-8 md:p-12 lg:p-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-24 size-[34rem] rounded-full bg-[radial-gradient(circle,rgb(180_208_1/0.12),transparent_65%)]"
          />
          <SpinOnScroll className="pointer-events-none absolute -bottom-40 -left-40 hidden md:block">
            <LogoMark size={520} core="currentColor" className="text-snow/[0.06]" />
          </SpinOnScroll>

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="flex flex-col">
              <p data-reveal="fade" className="text-[13px] font-semibold uppercase tracking-[0.18em] text-haze">
                Lời cảm ơn
              </p>
              <h2 data-reveal className="mt-5 text-5xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
                Cảm ơn
                <br />
                đã <span className="text-lime">đồng hành.</span>
              </h2>
              <p data-reveal className="mt-7 max-w-[46ch] text-lg leading-relaxed text-haze">
                {COMPANY.closing}
              </p>
              <p data-reveal className="mt-5 max-w-[46ch] leading-relaxed text-snow">
                Để lại vài dòng về điều ban lãnh đạo đang cần quyết. Mindosoft sẽ liên hệ lại để đặt lịch khảo
                sát.
              </p>

              <div className="mt-auto pt-10">
                <span data-draw aria-hidden="true" className="block h-px w-full bg-line" />
                <address data-reveal className="mt-6 flex gap-3 text-[15px] not-italic leading-relaxed text-haze">
                  <MapPin size={22} className="mt-0.5 shrink-0 text-haze" />
                  <span>
                    <span className="font-semibold text-snow">Trụ sở: </span>
                    {COMPANY.address}
                  </span>
                </address>
                <div data-reveal className="mt-6">
                  <CtaLink href={COMPANY.website} external variant="ghost">
                    Truy cập mindosoft.vn
                    <ArrowUpRight size={18} weight="bold" />
                  </CtaLink>
                </div>
              </div>
            </div>

            <div data-reveal>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
