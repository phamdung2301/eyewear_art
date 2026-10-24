# STYLE CONTRACT — LUNET® Eyewear (Atelier Quang Học)

## Tokens
--bg (quartz) #f2f0ea · --paper #faf9f5 · --ink #1b1b18
--muted rgba(27,27,24,.58) · --accent (havana) #b06a35 · --havana-deep #8a4f24
--ice (lens fill) #cfe0e8 · --line rgba(27,27,24,.14)

## Type
Display: Manrope 700 CAPS, tracking -.055em, H1 clamp(44px,5.6vw,92px)/0.98
Em word: Playfair Display italic 500, havana, KHÔNG uppercase
Body: Manrope 400 15px/1.65 · System voice: JetBrains Mono 10-11px caps ls 2.2px
Eyebrow: 34px hairline + mono caps

## Grammar
Header 78px, mix-blend difference, nav sup counters, CTA hairline pill
Hero: đúng 1 viewport (100svh - header), grid 1fr/1.25fr, 3 masked lines,
3D stage phải + FIG caption + Frame Lab swatches + giá, meta row 3-col
Sections: clamp(80px,12vh,150px) padding
Collection: 2-col grid, even +52px, 22px radius cards paper bg
Blur section: full ink band, readout 120px Manrope
Craft rows: ghost number stroke havana + mono title + body
Visit: full havana band, giant underline link, 3-col meta
Breakpoints 1100 / 980 / 640

## Texture
Grain feTurbulence .05 · ambient glow blob havana/10 trên hero
Selection: havana bg + white text · scrollbar thumb #c9c4b8→havana

## Motion
Loader: counter 000→100 power2.inOut 1.5s + curtain power4.inOut .95s
Entrance: masked lines yPercent 118 power4.out stagger .1
Reveals: y 55 power3.out "top 90%" · cards clip-path round 22px
Ticker: havana band, -40%, 36s · Lens-glare sweep .9s on hover
3D: pointer tilt lerp .04 (±.45rad Y), idle spin .16 rad/s, rings bob
Assembly: parts từ offset, stagger .05, back.out(1.5)

## 3D & art
three r178 ESM, RoomEnvironment PMREM, DPR ≤1.75, ShadowMaterial ground .22,
transmission lens (ior 1.45, roughness .06), frame = 14 parts có home+offset
SVG art: 220×80 line-art 2.6px, 3 shapes (round/rect/cat), lens tint + white
highlight, glare overlay gradient 115deg
