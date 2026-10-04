"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Các hiệu ứng dùng chung toàn trang, gắn theo thuộc tính data-* để section
 * vẫn là Server Component:
 *
 *  - `data-reveal`        hiện dần khi cuộn tới, các phần tử cùng lượt chạy so le
 *  - `data-stagger`       lưới thẻ: các thẻ con chạy từ dưới lên lần lượt theo
 *                         thứ tự trong lưới khi lưới cuộn tới
 *  - `data-draw`          vạch kẻ tự vẽ từ trái sang
 *  - `data-count="30"`    số chạy từ 0 lên khi cuộn tới (`data-pad` giữ số 0 đầu)
 *  - `data-progress`      thanh tiến độ đọc trang ở mép dưới header
 *
 * Không render ra DOM.
 */
export function MotionRoot() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      // Hiện dần theo lượt: phần tử nào vào màn cùng lúc thì chạy so le nhau,
      // để mắt đọc theo đúng thứ tự trên trang.
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.09,
            overwrite: true,
            // Bỏ thuộc tính sau khi chạy xong: nếu chỉ xoá style inline thì
            // luật CSS trạng thái chờ (translateY 32px) lại áp vào phần tử.
            onComplete: () =>
              els.forEach((el) => {
                el.removeAttribute("data-reveal");
                gsap.set(el, { clearProps: "transform,opacity" });
              }),
          }),
      });

      // Lưới thẻ: mỗi lưới một trigger, thẻ chạy lên theo đúng thứ tự đọc
      // (trái sang phải, trên xuống dưới) để mắt đi theo từng thẻ.
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((grid) => {
        const cards = Array.from(grid.children) as HTMLElement[];
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: grid, start: "top 85%", once: true },
          // Xong thì đánh dấu lưới để luật CSS trạng thái chờ thôi áp dụng,
          // rồi mới xoá style inline (giống cách xử lý data-reveal).
          onComplete: () => {
            grid.setAttribute("data-stagger-done", "");
            gsap.set(cards, { clearProps: "transform,opacity" });
          },
        });
      });

      ScrollTrigger.batch("[data-draw]", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            scaleX: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.1,
          }),
      });

      // Số liệu chạy từ 0: nhấn mạnh đây là con số thật, đọc một lần là nhớ.
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const pad = Number(el.dataset.pad ?? 0);
        const state = { v: 0 };
        el.textContent = String(0).padStart(pad, "0");
        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.v)).padStart(pad, "0");
          },
        });
      });

      // Bầu trời trôi chậm theo cuộn, lớp gần trôi nhanh hơn lớp xa: tạo chiều
      // sâu cho nền mà không lấy mất sự chú ý của nội dung.
      gsap.utils.toArray<HTMLElement>("[data-sky-depth]").forEach((layer) => {
        const depth = Number(layer.dataset.skyDepth);
        gsap.to(layer, {
          yPercent: -depth * 100,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      });

      const bar = document.querySelector<HTMLElement>("[data-progress]");
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          },
        );
      }
    });

    // Font và ảnh tải xong làm đổi chiều cao trang: tính lại mốc trigger.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  });

  return null;
}
