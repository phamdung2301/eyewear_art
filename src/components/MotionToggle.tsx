import { useState } from "react";

/* Nút tạm dừng chuyển động — a11y invariant của thư viện */
export function MotionToggle({ onToggle }: { onToggle: (paused: boolean) => void }) {
  const [paused, setPaused] = useState(false);
  return (
    <button
      className="motion-btn"
      type="button"
      aria-pressed={paused}
      onClick={() => {
        const next = !paused;
        setPaused(next);
        document.documentElement.classList.toggle("motion-paused", next);
        onToggle(next);
      }}
    >
      {paused ? "▶ Tiếp tục chuyển động" : "❚❚ Tạm dừng chuyển động"}
    </button>
  );
}
