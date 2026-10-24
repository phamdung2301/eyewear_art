import { useEffect } from "react";
import { gsap } from "../lib/gsap";

/* Custom cursor: dot + context label (moc pattern) — chỉ fine pointer */
export function Cursor() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    if (reduced || !fine || window.innerWidth < 1000 || typeof gsap === "undefined")
      return;

    document.body.classList.add("has-cursor");
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const label = document.querySelector<HTMLElement>(".cursor-label");
    if (!dot || !label) return;
    gsap.set([dot, label], { x: -100, y: -100 });

    const dx = gsap.quickTo(dot, "x", { duration: 0.16, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.16, ease: "power3" });
    const lx = gsap.quickTo(label, "x", { duration: 0.3, ease: "power3" });
    const ly = gsap.quickTo(label, "y", { duration: 0.3, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      lx(e.clientX);
      ly(e.clientY);
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        label.textContent = (t as HTMLElement).dataset.cursor ?? "";
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.25 });
      } else {
        gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-label" aria-hidden="true" />
    </>
  );
}
