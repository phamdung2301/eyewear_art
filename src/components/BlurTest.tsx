import { useState } from "react";

/* Slider "Độ cận": kéo từ -4.00 về 0.00 — ảnh mờ dần rồi sắc nét.
   Đơn giản: React state + CSS filter, không WebGL (ascenza DOM-machine spirit). */
export function BlurTest() {
  const [diopter, setDiopter] = useState(4);
  const clear = diopter < 0.05;
  const blurPx = Math.round(diopter * 7 * 10) / 10;

  return (
    <section className="section blur-sec" id="vision" aria-labelledby="vision-title">
      <div className="sec-head" style={{ marginBottom: 0 }}>
        <p className="eyebrow reveal">03 / Đo nhanh</p>
        <h2 className="sec-title reveal" id="vision-title">
          Kéo về <em className="acc" style={{ color: "#e9c58c" }}>0.00</em> —<br />
          thế giới rõ lại.
        </h2>
      </div>

      <div className="blur-grid">
        <div className="blur-copy reveal">
          <p>
            Đây là những gì tròng LUNET 1.61 làm cho mắt bạn: xóa quang sai, trả
            độ tương phản, và khiến màu sắc sắc lại như ngày đầu. Kéo thanh trượt
            để cảm nhận — từ <b style={{ color: "#e9c58c" }}>-4.00 cận nặng</b> về{" "}
            <b style={{ color: "#e9c58c" }}>0.00 chuẩn quang học</b>.
          </p>
          <div className="blur-readout" aria-live="polite">
            {diopter === 0 ? "0.00" : `-${diopter.toFixed(2)}`}
            <small>
              {clear ? "TRÒNG LUNET ĐANG ĐEO — SẮC NÉT 100%" : "MÀN NHÌN KHÔNG KÍNH"}
            </small>
          </div>
          <input
            className="range"
            type="range"
            min={0}
            max={4}
            step={0.25}
            value={4 - diopter}
            onChange={(e) => setDiopter(4 - Number(e.target.value))}
            aria-label="Điều chỉnh độ cận mô phỏng"
          />
          <div className="range-labels">
            <span>-4.00 · Cận nặng</span>
            <span>0.00 · Rõ</span>
          </div>
        </div>

        <div className={`blur-stage reveal ${clear ? "is-clear" : ""}`}>
          <img
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=75"
            alt="Chân dung phụ nữ đeo kính tại Sài Gòn — ảnh mô phỏng độ rõ của tròng"
            loading="lazy"
            style={{ ["--blur" as string]: `${blurPx}px` }}
          />
          <span className={`blur-badge ${clear ? "sharp" : ""}`}>
            {clear ? "LUNET ON — RÕ TỪNG NÉT" : "NHÌN QUA -4.00 DIỐP"}
          </span>
        </div>
      </div>
    </section>
  );
}
