import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { ChapterRail } from "@/components/motion/ChapterRail";
import { NightSky } from "@/components/bg/NightSky";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://mindosoft.vn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mindosoft · Từ dữ liệu đến quyết định",
    template: "%s · Mindosoft",
  },
  description:
    "Mindosoft phát triển sản phẩm trí tuệ nhân tạo, hệ thống hỗ trợ ra quyết định và giải pháp chuyển đổi số cho doanh nghiệp sản xuất, bán lẻ và dịch vụ.",
  keywords: [
    "Mindosoft",
    "hệ hỗ trợ ra quyết định",
    "DSS",
    "chuyển đổi số",
    "trí tuệ nhân tạo",
    "khách sạn thông minh",
    "phòng khám thông minh",
    "Mindo Super App",
  ],
  authors: [{ name: "Mindosoft Co., Ltd." }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Mindosoft",
    title: "Mindosoft · Từ dữ liệu đến quyết định",
    description:
      "Sản phẩm AI, hệ hỗ trợ ra quyết định và chuyển đổi số cho doanh nghiệp Việt.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06111f",
  colorScheme: "dark",
};

/* JS tắt thì GSAP không chạy: bỏ hết trạng thái chờ để nội dung vẫn đọc được. */
const NOSCRIPT_CSS = `
html.motion-ok [data-reveal],html.motion-ok [data-stagger]>*,html.motion-ok [data-hero],html.motion-ok [data-draw],
html.motion-ok [data-mask-line]>span,html.motion-ok [data-hero-core]{opacity:1!important;transform:none!important}
html.motion-ok [data-hero-ring]{stroke-dashoffset:0!important;opacity:1!important}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${beVietnamPro.variable} motion-ok antialiased`}
      suppressHydrationWarning
    >
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        </noscript>
      </head>
      <body className="min-h-dvh bg-night text-snow">
        <NightSky />
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
        >
          Tới nội dung chính
        </a>
        <Header />
        <ChapterRail />
        <main id="noi-dung">{children}</main>
        <Footer />
        <MotionRoot />
      </body>
    </html>
  );
}
