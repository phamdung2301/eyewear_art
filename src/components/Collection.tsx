import { useState } from "react";
import { COLLECTION, formatVnd, type Sku } from "../data/collections";
import { GlassesArt } from "./GlassesArt";

function Card({ sku, index }: { sku: Sku; index: number }) {
  const [added, setAdded] = useState(false);
  return (
    <article className="coll-card" data-cursor="THỬ ✓">
      <div className="coll-top">
        <span className="coll-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="coll-cat">{sku.cat}</span>
      </div>
      <div className="coll-art" aria-hidden="true">
        <GlassesArt sku={sku} />
        <span className="glare" />
      </div>
      <h3 className="coll-name">
        {sku.name}
        <span className="coll-en">{sku.en}</span>
      </h3>
      <div className="coll-bottom">
        <span className="coll-price">{formatVnd(sku.price)}</span>
        <button
          className={`coll-add ${added ? "done" : ""}`}
          type="button"
          aria-label={`Chọn ${sku.name}`}
          onClick={() => {
            if (added) return;
            setAdded(true);
            setTimeout(() => setAdded(false), 1700);
          }}
        >
          {added ? "✓" : "＋"}
        </button>
      </div>
    </article>
  );
}

export function Collection() {
  return (
    <section className="section" id="collection" aria-labelledby="coll-title">
      <div className="sec-head">
        <p className="eyebrow reveal">02 / Bộ sưu tập</p>
        <h2 className="sec-title reveal" id="coll-title">
          Sáu mươi giờ <em className="acc">mài</em> một gọng.
        </h2>
        <p className="sec-note reveal">08 mẫu — acetate Ý &amp; titanium — cập nhật 10 / 2026</p>
      </div>
      <div className="coll-grid">
        {COLLECTION.map((sku, i) => (
          <Card key={sku.id} sku={sku} index={i} />
        ))}
      </div>
      <p className="sec-note reveal" style={{ marginTop: 40 }}>
        ✳ Giá tham khảo của bản concept — chỉ giao diện, không bán hàng thật.
      </p>
    </section>
  );
}
