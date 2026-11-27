import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useWorkshopMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const context = gsap.context(() => {
      gsap.utils.toArray(".ws-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray(".ws-reveal-group").forEach((group) => {
        const children = group.querySelectorAll(".ws-reveal-item");
        if (!children.length) return;

        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      const heroImage = root.querySelector(".ws-hero-photo img");
      if (heroImage) {
        gsap.to(heroImage, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".ws-hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      }

      const projectImage = root.querySelector(".ws-build-photo img");
      if (projectImage) {
        gsap.fromTo(
          projectImage,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".ws-build-feature",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      }
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      context.revert();
      ScrollTrigger.refresh();
    };
  }, [rootRef]);
}
