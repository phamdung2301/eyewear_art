import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { DUR, EASE } from "../lib/motion";

/* Preloader counter-then-curtain (moc/aurum pattern). Luôn tự giải phóng. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    if (!el) return;

    if (reduced || typeof gsap === "undefined") {
      el.style.display = "none";
      done.current();
      return;
    }

    const count = el.querySelector<HTMLElement>(".loader-count");
    const bar = el.querySelector<HTMLElement>(".loader-line span");
    const o = { v: 0 };
    const tl = gsap
      .timeline()
      .to(o, {
        v: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count) count.textContent = String(Math.round(o.v)).padStart(3, "0");
          if (bar) bar.style.width = o.v + "%";
        },
      })
      .to(el, { yPercent: -101, duration: DUR.curtain, ease: "power4.inOut" }, "+=0.12")
      .call(() => {
        el.style.display = "none";
        done.current();
      });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div>
        <div className="loader-word">
          LUN<em>ET</em>
        </div>
        <div className="loader-line">
          <span />
        </div>
        <div className="loader-count">000</div>
      </div>
    </div>
  );
}

export const HERO_EASE = EASE.out;
