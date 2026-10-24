import type { Sku } from "../data/collections";

/* SVG kính line-art parametric — 3 hình dáng, màu theo SKU (moc menu-art pattern).
   Hover: vệt lens-glare chạy qua (CSS .glare). */
export function GlassesArt({ sku }: { sku: Sku }) {
  const ink = "var(--color-ink)";
  const stroke = 2.6;

  const lens = (cx: number, fill: string) =>
    sku.shape === "rect" ? (
      <rect x={cx - 24} y={22} width={48} height={34} rx={9} fill={fill} stroke="none" />
    ) : sku.shape === "cat" ? (
      <path
        d={`M${cx - 25} 26 C ${cx - 20} 16, ${cx + 16} 16, ${cx + 25} 26 C ${cx + 27} 44, ${cx + 12} 58, ${cx - 6} 56 C ${cx - 22} 54, ${cx - 28} 40, ${cx - 25} 26 Z`}
        fill={fill}
        stroke="none"
      />
    ) : (
      <circle cx={cx} cy={39} r={22} fill={fill} stroke="none" />
    );

  const rim = (cx: number) =>
    sku.shape === "rect" ? (
      <rect x={cx - 24} y={22} width={48} height={34} rx={9} fill="none" stroke={ink} strokeWidth={stroke} />
    ) : sku.shape === "cat" ? (
      <path
        d={`M${cx - 25} 26 C ${cx - 20} 16, ${cx + 16} 16, ${cx + 25} 26 C ${cx + 27} 44, ${cx + 12} 58, ${cx - 6} 56 C ${cx - 22} 54, ${cx - 28} 40, ${cx - 25} 26 Z`}
        fill="none"
        stroke={ink}
        strokeWidth={stroke}
      />
    ) : (
      <circle cx={cx} cy={39} r={22} fill="none" stroke={ink} strokeWidth={stroke} />
    );

  return (
    <svg viewBox="0 0 220 80" role="img" aria-label={`Kính ${sku.name}`}>
      {/* càng kính */}
      <path d="M188 34 h26" stroke={ink} strokeWidth={stroke - 0.6} strokeLinecap="round" />
      <path d="M32 34 H6" stroke={ink} strokeWidth={stroke - 0.6} strokeLinecap="round" />
      {/* sống mũi */}
      <path d="M104 30 c 4 -6 8 -6 12 0" fill="none" stroke={ink} strokeWidth={stroke - 0.4} strokeLinecap="round" />
      {/* tròng */}
      {lens(62, sku.lens)}
      {lens(158, sku.lens)}
      {/* highlight trong tròng */}
      <path d={`M${sku.shape === "cat" ? 52 : 52} ${sku.shape === "rect" ? 30 : 28} q 8 -5 16 -2`} fill="none" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
      <path d="M150 28 q 8 -5 16 -2" fill="none" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
      {/* gọng màu acetate */}
      {rim(62)}
      {rim(158)}
    </svg>
  );
}
