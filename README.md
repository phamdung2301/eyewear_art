# LUNET® — Eyewear & Accessories

Landing page concept kiểu Awwwards cho nhãn hàng kính mắt & phụ kiện thời trang.
Theme **"Atelier Quang Học"** (sáng): quartz trắng + havana acetate `#b06a35` +
Manrope caps + Playfair Display italic.

## Stack

- Vite 7 + React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@theme` tokens trong `src/index.css`)
- three.js r178 — kính procedural (không GLTF): gọng torus + tròng transmission
- GSAP + ScrollTrigger (masked lines, reveals, clip-path, scrub)
- Lenis smooth scroll (trên GSAP ticker)
- Không backend — catalog tĩnh `src/data/collections.ts` (data ladder rung 0-1)

## Chạy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc --noEmit && vite build → dist/
npm run preview
```

## Tính năng

- **Preloader** counter 000→100 + màn trập, hero masked-lines stagger.
- **Kính 3D procedural**: 2 gọng torus, sống mũi, đệm mũi, tròng transmission
  glass, càng gập, ốc vít vàng — lắp ráp từ offset khi vào trang, nghiêng theo
  con trỏ (lerp), quay chậm.
- **Frame Lab**: 4 swatch (Havana / Crystal / Ink / Gold wire) đổi vật liệu gọng
  + giá live — pattern Shade Lab của LUMIÈRE.
- **Bộ sưu tập**: 8 SKU, SVG kính parametric 3 hình dáng (round / rect / cat-eye),
  hover lens-glare sweep.
- **Đo nhanh**: slider mô phỏng độ cận -4.00 → 0.00, ảnh mờ → sắc
  (DOM-machine của ASCENZA).
- **Craft / Ghé showroom** / custom cursor / motion-pause button /
  reduced-motion đầy đủ.

## Nâng cấp lên bán hàng thật

- Level 1 (form → email): thêm form "Đặt lịch đo" + Formspree — xem
  `concept-to-production` references/data-ladder.md.
- Level 2 (admin xem booking): Supabase table `bookings` + trang admin.
- Level 3: tham chiếu kiến trúc đã ship tại `D:\Frame_Motion\wedding_dress_shop`.

## Ghi chú kỹ thuật

- Bundle JS ~868KB (three + gsap + react) — nếu cần, code-split three bằng
  dynamic `import()` khi build production thật.
- Trang này là CONCEPT: giá, SĐT, địa chỉ là placeholder — chưa duyệt thương
  hiệu thật.
