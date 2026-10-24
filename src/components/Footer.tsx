export function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand" href="#top" style={{ fontSize: 19, color: "var(--color-ink)" }}>
        LUN<em>et</em>
        <sup>®</sup>
      </a>
      <span className="tags">Eyewear ✳ Accessories ✳ Sài Gòn — EST. 2026</span>
      <button className="replay-btn" type="button" onClick={() => window.location.reload()}>
        ↻ Xem lại từ đầu
      </button>
    </footer>
  );
}
