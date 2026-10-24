import { useEffect, useRef } from "react";
import { GlassesStage } from "./GlassesStage";
import { gsap } from "../lib/gsap";
import { DUR, EASE } from "../lib/motion";
import type { GlassesController } from "../three/glasses";

export function Hero({
  entered,
  onStageReady,
}: {
  entered: boolean;
  onStageReady?: (c: GlassesController | null) => void;
}) {
  const copy = useRef<HTMLDivElement>(null);

  /* entrance: masked line stagger (moc pattern) — chạy khi curtain vừa nhấc */
  useEffect(() => {
    if (!entered) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof gsap === "undefined") return;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.7, ease: EASE.soft }, 0)
        .from(
          ".hero-line > span",
          { yPercent: 118, duration: DUR.enter, stagger: 0.1, ease: EASE.out },
          0.05
        )
        .from(".hero-sub", { opacity: 0, y: 22, duration: 0.9, ease: EASE.soft }, 0.5)
        .from(".site-header", { yPercent: -100, duration: 0.9, ease: "power3.out" }, 0.35)
        .from(".hero-stage", { opacity: 0, y: 26, duration: 1.05, ease: EASE.soft }, 0.45)
        .from(".hero-bottom > *", { opacity: 0, y: 12, stagger: 0.08, duration: 0.7, ease: EASE.soft }, 0.85);
    }, copy);
    return () => ctx.revert();
  }, [entered]);

  /* scrub-out khi rời hero */
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof gsap === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-copy", {
        y: -60,
        opacity: 0.25,
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 },
      });
    }, copy);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-eyebrow">
        <span className="eyebrow" style={{ justifyContent: "flex-start" }}>
          01 / Eyewear &amp; Accessories — Est. 2026
        </span>
        <span className="eyebrow" style={{ color: "var(--color-muted)" }}>
          Sài Gòn · 10.7766° N
        </span>
      </div>

      <div className="hero-copy" ref={copy}>
        <h1 className="hero-title" id="hero-title">
          <span className="hero-line">
            <span>Ánh nhìn</span>
          </span>
          <span className="hero-line">
            <span>
              là <em className="acc">trang sức</em>
            </span>
          </span>
          <span className="hero-line">
            <span>tinh tế nhất.</span>
          </span>
        </h1>
        <p className="hero-sub reveal" style={{ maxWidth: "44ch", color: "var(--color-muted)", marginTop: 22 }}>
          Gọng <b>acetate ép 72 giờ</b>, tròng quang học <b>1.61 index</b>, và một niềm
          tin rất LUNET: kính không để sửa khuyết — kính để nhìn đẹp hơn.
        </p>
      </div>

      <GlassesStage entered={entered} onReady={onStageReady} />

      <div className="hero-bottom">
        <span>FIG. 01 — GỌNG LUNET, TRÒNG 1.61 / 9 LỚP ACETATE</span>
        <span className="mid">
          Cuộn để chọn <span className="scroll-arrow">↓</span>
        </span>
        <span className="end">45.0835° N / 7.4419° E — MAZZUCCHELLI MILANO</span>
      </div>
    </section>
  );
}
