import { useEffect } from "react";
import { gsap } from "../lib/gsap";

/* Reveals chuẩn: mọi .reveal trượt lên khi vào viewport.
   Guard reduced-motion; ScrollTrigger tự hủy khi unmount. */
export function useReveals(): void {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
        gsap.from(el, {
          y: 55,
          opacity: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        })
      );
      /* collection cards: clip-path reveal */
      gsap.utils.toArray<HTMLElement>(".coll-card").forEach((card, i) => {
        gsap.from(card, {
          clipPath: "inset(0 0 100% 0 round 22px)",
          duration: 1.05,
          ease: "power3.inOut",
          delay: (i % 2) * 0.12,
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
      /* craft rows trượt xen kẽ */
      gsap.utils.toArray<HTMLElement>(".craft-row").forEach((row, i) =>
        gsap.from(row, {
          x: i % 2 ? 46 : -46,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        })
      );
      /* visit link masked rise */
      gsap.from(".visit-line > span", {
        yPercent: 118,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: ".visit", start: "top 70%" },
      });
    });

    return () => ctx.revert();
  }, []);
}
