# MindoSoft

Landing page giới thiệu Mindosoft, nội dung lấy từ *Hồ sơ năng lực 2026*.

- Next.js 16 (App Router) + Tailwind CSS 4, cùng bộ khung với Mindo-Landing
- Hiệu ứng: GSAP + ScrollTrigger (`@gsap/react`); icon: `@phosphor-icons/react`
- Nội dung đi đúng 11 chương của hồ sơ; mỗi chương một file trong `src/components/sections/`, hiệu ứng tách riêng ở `src/components/motion/`
- Hiệu ứng dùng chung gắn bằng thuộc tính `data-reveal`, `data-draw`, `data-count` (xem `MotionRoot.tsx`); bật giảm chuyển động hoặc tắt JS thì nội dung vẫn hiện đủ
- Toàn bộ chữ và số liệu nằm ở `src/lib/content.ts`

```bash
npm install
npm run dev    # http://localhost:3002
npm run build && npm start
```

Cổng 3002 để không đụng Mindo-Landing (3000) và Mindo-Web (3001).
