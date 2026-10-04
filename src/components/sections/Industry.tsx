import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndustryTabs } from "./IndustryTabs";
import { PackageChart } from "@/components/motion/PackageChart";
import { INDUSTRY } from "@/lib/content";

/** Chương 06 · Sản phẩm chủ lực 02: Khách sạn & Phòng khám thông minh */
export function Industry() {
  return (
    <section
      id="giai-phap-nganh"
      className="anchor-offset py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeader id="giai-phap-nganh" title={INDUSTRY.title} lead={INDUSTRY.lead} />

        <div data-reveal className="mt-14">
          <IndustryTabs />
        </div>

        <PackageChart title={INDUSTRY.packagesTitle} packages={INDUSTRY.packages} />
      </div>
    </section>
  );
}
