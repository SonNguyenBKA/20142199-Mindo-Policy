"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

/**
 * Điều kiện chạy hiệu ứng. Mọi animation đều bọc trong
 * `gsap.matchMedia().add(MOTION_OK, ...)`: người dùng bật giảm chuyển động thì
 * không có gì chạy, CSS (globals.css) tự hiện sẵn nội dung.
 */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Header dính cao 72px: mọi pin/trigger tính mốc "đỉnh" từ dưới header. */
export const HEADER_OFFSET = 72;

export { gsap, ScrollTrigger, useGSAP };
