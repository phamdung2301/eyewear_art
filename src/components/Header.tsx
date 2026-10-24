export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="LUNET — về đầu trang">
        LUN<em>et</em>
        <sup>®</sup>
      </a>
      <nav className="site-nav" aria-label="Điều hướng chính">
        <a href="#collection">Bộ sưu tập<sup>01</sup></a>
        <a href="#vision">Đo nhanh<sup>02</sup></a>
        <a href="#craft">Craft<sup>03</sup></a>
      </nav>
      <a className="header-cta" href="tel:+842838221127" data-cursor="GỌI">
        Đặt lịch đo ↗
      </a>
    </header>
  );
}
