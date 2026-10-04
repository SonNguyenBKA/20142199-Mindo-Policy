import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { SuperApp } from "@/components/sections/SuperApp";
import { Context } from "@/components/sections/Context";
import { Dss } from "@/components/sections/Dss";
import { Industry } from "@/components/sections/Industry";
import { Positioning } from "@/components/sections/Positioning";
import { CapabilityMap } from "@/components/sections/CapabilityMap";
import { PlatformAi } from "@/components/sections/PlatformAi";
import { BuildRun } from "@/components/sections/BuildRun";
import { Architecture } from "@/components/sections/Architecture";
import { Contact } from "@/components/sections/Contact";

/** Đúng thứ tự hồ sơ năng lực: bìa, 11 chương, lời cảm ơn. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Ecosystem />
      <SuperApp />
      <Context />
      <Dss />
      <Industry />
      <Positioning />
      <CapabilityMap />
      <PlatformAi />
      <BuildRun />
      <Architecture />
      <Contact />
    </>
  );
}
