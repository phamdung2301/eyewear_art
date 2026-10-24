const ROWS = [
  {
    num: "01",
    title: "Acetate",
    sub: "Material — Mazzucchelli",
    body: (
      <>
        Tấm acetate <b>Mazzucchelli 1849</b> (Milano) được ép và ủ <b>72 giờ</b> trước
        khi vào tay thợ — vì vậy gọng LUNET không cong veo theo mùa, không gãy vụn
        theo mồ hôi.
      </>
    ),
  },
  {
    num: "02",
    title: "Mài",
    sub: "Craft — 60 giờ",
    body: (
      <>
        Mỗi gọng qua <b>9 công đoạn mài thủ công</b>, từ thô 240 grit đến bóng
        3000 grit — tổng cộng <b>60 giờ</b>. Sống mũi được đo lại theo từng khuôn
        mặt, không theo form sẵn.
      </>
    ),
  },
  {
    num: "03",
    title: "Tròng",
    sub: "Optics — 1.61 index",
    body: (
      <>
        Tròng <b>1.61 index, 9 lớp phủ chống phản xạ</b>, cắt laser theo thông số
        đo mắt miễn phí tại showroom. Kính đọc xong <b>20 phút</b> sau khi bạn ký
        đơn — hết là hẹn lại, không làm ẩu.
      </>
    ),
  },
];

export function Craft() {
  return (
    <section className="section" id="craft" aria-labelledby="craft-title">
      <div className="sec-head">
        <p className="eyebrow reveal">04 / Craft</p>
        <h2 className="sec-title reveal" id="craft-title">
          Chậm 60 giờ, <em className="acc">rõ</em> 2 năm.
        </h2>
        <p className="story-quote reveal" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(21px,2.4vw,30px)", lineHeight: 1.45 }}>
          “Kính tốt là kính bạn quên mình đang đeo — chúng tôi chỉ làm ba thứ,
          nhưng làm chậm.” <span style={{ color: "var(--color-havana)" }}>✳</span>
        </p>
      </div>

      <div className="principles-wrap">
        {ROWS.map((r) => (
          <div className="craft-row reveal" key={r.num}>
            <span className="craft-num" aria-hidden="true">
              {r.num}
            </span>
            <h3>
              {r.title}
              <small>{r.sub}</small>
            </h3>
            <p>{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
