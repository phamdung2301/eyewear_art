const ITEMS = ["Acetate nhà ép", "Titanium siêu nhẹ", "Tròng 1.61", "Đo mắt miễn phí", "Bảo hành 2 năm", "Đổi tròng tại chỗ"];

/* Ticker marquee: 2 nửa giống hệt nhau (10 spans) → translateX(-40%) liền mạch */
export function Ticker() {
  const half = ITEMS.slice(0, 5);
  const spans = [...half, ...half];
  const row = [...spans, ...spans].map((t, i) => <span key={i}>{t}</span>);
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">{row}</div>
    </div>
  );
}
