import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useWorkshopMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    const ctx = gsap.context(() => {
      // Editorial reveals: copy arrives in short, readable beats.
      gsap.utils.toArray(".ws-reveal").forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 44 }, {
          autoAlpha: 1, y: 0, duration: .9, ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: element, start: "top 86%", once: true }
        });
      });

      gsap.utils.toArray(".ws-reveal-group").forEach((group) => {
        const children = group.querySelectorAll(".ws-reveal-item");
        if (!children.length) return;
        gsap.fromTo(children, { autoAlpha: 0, y: 28 }, {
          autoAlpha: 1, y: 0, duration: .75, stagger: .13, ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: group, start: "top 83%", once: true }
        });
      });

      // The hero's color architecture moves at different speeds as the page opens.
      const hero = root.querySelector(".ws-gradient-gallery");
      if (hero) {
        gsap.to(hero.querySelector(".ws-gradient-panel-main"), {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: ".ws-hero", start: "top top", end: "bottom top", scrub: 1 }
        });
        gsap.to(hero.querySelector(".ws-gradient-panel-side"), {
          yPercent: -9, ease: "none",
          scrollTrigger: { trigger: ".ws-hero", start: "top top", end: "bottom top", scrub: 1.2 }
        });
        gsap.to(hero.querySelector(".ws-gradient-board"), {
          y: -70, rotate: -5, ease: "none",
          scrollTrigger: { trigger: ".ws-hero", start: "top top", end: "bottom top", scrub: 1.1 }
        });
      }

      // A cinematic, responsive reveal for the build artwork, with no raster assets.
      const buildArt = root.querySelector(".ws-build-gradient-art");
      if (buildArt) {
        gsap.fromTo(buildArt.querySelector(".ws-build-art-window"), { y: 90, rotate: -11, scale: .88 }, {
          y: -12, rotate: -5, scale: 1, ease: "none",
          scrollTrigger: { trigger: buildArt, start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.to(buildArt.querySelector(".ws-build-art-orbit"), {
          rotate: 18, scale: 1.08, ease: "none",
          scrollTrigger: { trigger: buildArt, start: "top bottom", end: "bottom top", scrub: 1.4 }
        });
      }

      // Progressively draw section dividers and let each agenda row enter as a set.
      gsap.utils.toArray(".ws-agenda-row").forEach((row, index) => {
        gsap.fromTo(row, { x: index % 2 ? 28 : -28, autoAlpha: 0 }, {
          x: 0, autoAlpha: 1, duration: .65, ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true }
        });
      });
      gsap.utils.toArray(".ws-outcome-row").forEach((row) => {
        gsap.fromTo(row, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)", duration: .75, ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true }
        });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    requestAnimationFrame(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [rootRef]);
}
