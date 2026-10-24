import { useEffect, useRef, useState } from "react";
import { createGlassesScene, type GlassesController } from "../three/glasses";
import { FRAMES, formatVnd, type FrameConfig } from "../data/collections";

/* Kính 3D + Frame Lab swatches (lumiere Shade Lab pattern, một canvas duy nhất) */
export function GlassesStage({
  entered,
  onReady,
}: {
  entered: boolean;
  onReady?: (c: GlassesController | null) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const ctrl = useRef<GlassesController | null>(null);
  const ready = useRef(onReady);
  ready.current = onReady;
  const [failed, setFailed] = useState(false);
  const [frame, setFrame] = useState<FrameConfig>(FRAMES[0]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("no-webgl");
      setFailed(true);
      ready.current?.(null);
      return;
    }
    const c = createGlassesScene(el);
    if (!c) {
      el.classList.add("no-webgl");
      setFailed(true);
      ready.current?.(null);
      return;
    }
    ctrl.current = c;
    ready.current?.(c);
    return () => {
      c.dispose();
      ctrl.current = null;
      ready.current?.(null);
    };
  }, []);

  useEffect(() => {
    if (entered) ctrl.current?.assemble();
  }, [entered]);

  useEffect(() => {
    ctrl.current?.setFrame(frame);
  }, [frame]);

  return (
    <div className="hero-stage">
      <div
        ref={host}
        className={`stage ${failed ? "no-webgl" : ""}`}
        id="stage3d"
        role="img"
        aria-label="Mô hình 3D gọng kính LUNET — di chuột để xoay, chọn swatch để đổi màu acetate"
      >
        <span className="stage-hint" aria-hidden="true">
          Di chuột để xoay ↻
        </span>
        <div className="stage-fallback" aria-hidden="true">
          <div>
            <svg viewBox="0 0 120 60" width="150" aria-hidden="true">
              <circle cx="38" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="86" cy="30" r="22" fill="none" stroke="#b06a35" strokeWidth="3" />
              <path d="M60 24c-3-4 3-6 0-10" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <p>Trình duyệt không hỗ trợ WebGL —<br />hiển thị bản phác thảo.</p>
          </div>
        </div>
      </div>

      <div className="stage-caption">
        <span className="stage-fig">
          <b>FIG. 01</b> — {frame.label} ·{" "}
          {frame.material === "metal" ? "Titanium siêu nhẹ" : "Acetate nhà ép 72 giờ"}
        </span>
        <div className="lab-swatches" role="group" aria-label="Frame Lab — đổi màu gọng">
          {FRAMES.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`swatch ${f.id === frame.id ? "on" : ""}`}
              style={{ background: f.color }}
              onClick={() => setFrame(f)}
              aria-label={`Gọng ${f.label} — ${formatVnd(f.price)}`}
              aria-pressed={f.id === frame.id}
              data-cursor={f.label.toUpperCase()}
            />
          ))}
        </div>
        <span className="lab-price">{formatVnd(frame.price)}</span>
      </div>
    </div>
  );
}
