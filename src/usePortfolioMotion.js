import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Portfolio motion system:
 * - Cinematic hero entrance
 * - Unified Creative Engine orbit
 * - Reversible scroll-triggered reveals
 * - Coordinated stagger animations
 * - Independent decorative scroll movement
 * - Full GSAP cleanup on unmount
 */
export function usePortfolioMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const mm = gsap.matchMedia(root);
    let active = true;

    mm.add(
      {
        motionOK: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 900px)",
      },
      (context) => {
        const { motionOK, desktop } = context.conditions;
        if (!motionOK) return undefined;

        const select = (selector, scope = root) =>
          gsap.utils.toArray(selector, scope);

        // -----------------------------------------
        // HERO ENTRANCE
        // -----------------------------------------

        const hero = select(".hero")[0];

        if (hero) {
          const heroTimeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            delay: 0.12,
          });

          heroTimeline
            .fromTo(
              ".site-header",
              { autoAlpha: 0, y: -18, filter: "blur(8px)" },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.7,
              },
              0,
            )
            .fromTo(
              ".hero-eyebrow",
              { autoAlpha: 0, y: 24, x: -18, rotation: -3 },
              {
                autoAlpha: 1,
                y: 0,
                x: 0,
                rotation: 0,
                duration: 0.65,
              },
              0.16,
            )
            .fromTo(
              ".hero-title-line",
              {
                autoAlpha: 0,
                yPercent: 115,
                rotation: 2,
                filter: "blur(10px)",
              },
              {
                autoAlpha: 1,
                yPercent: 0,
                rotation: 0,
                filter: "blur(0px)",
                duration: 1.05,
                stagger: 0.16,
                ease: "power4.out",
              },
              0.34,
            )
            .fromTo(
              ".hero-description, .hero-actions",
              { autoAlpha: 0, y: 24 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
              },
              1.08,
            )
            .fromTo(
              ".hero-art",
              {
                autoAlpha: 0,
                scale: 0.72,
                rotation: -12,
                x: 60,
                y: 36,
                filter: "blur(12px)",
              },
              {
                autoAlpha: 1,
                scale: 1,
                rotation: 0,
                x: 0,
                y: 0,
                filter: "blur(0px)",
                duration: 1.25,
                ease: "elastic.out(1, 0.62)",
              },
              0.62,
            )
            .fromTo(
              ".hero-stage, .hero-art-kicker, .hero-meta",
              { autoAlpha: 0, y: 18, scale: 0.92 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.55,
                stagger: 0.1,
              },
              1.5,
            )
            .fromTo(
              ".hero-scroll",
              { autoAlpha: 0, y: 12 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
              },
              1.72,
            );

          // -----------------------------------------
          // CREATIVE ENGINE IDLE MOTION
          // -----------------------------------------

          // Only the core floats.
          // The orbit rings must remain a single unified group.
          heroTimeline.call(() => {
            gsap.to(".hero-orb", {
              y: -10,
              duration: 3.1,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          });

          // Background grid depth movement.
          gsap.to(".hero-grid", {
            yPercent: 18,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // -----------------------------------------
        // REVERSIBLE SCROLL REVEALS
        // -----------------------------------------

        select("[data-reveal]").forEach((element) => {
          const distance = Number(element.dataset.distance || 34);
          const direction = element.dataset.direction || "up";

          const fromVars = {
            autoAlpha: 0,
            y:
              direction === "up"
                ? distance
                : direction === "down"
                  ? -distance
                  : 0,
            x:
              direction === "left"
                ? distance
                : direction === "right"
                  ? -distance
                  : 0,
            rotation: Number(element.dataset.rotate || 0),
            scale: Number(element.dataset.scale || 1),
          };

          gsap.fromTo(element, fromVars, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: Number(element.dataset.duration || 0.72),
            ease: element.dataset.ease || "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: element,
              start: element.dataset.start || "top 88%",
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
          });
        });

        // -----------------------------------------
        // STAGGERED SECTION ANIMATIONS
        // -----------------------------------------

        select("[data-stagger]").forEach((group) => {
          const children = select(":scope > [data-stagger-item]", group);

          if (!children.length) return;

          gsap.fromTo(
            children,
            {
              autoAlpha: 0,
              y: 26,
              rotation: 1.5,
            },
            {
              autoAlpha: 1,
              y: 0,
              rotation: 0,
              duration: 0.62,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 84%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

        // -----------------------------------------
        // SCROLL-LINKED DECORATIVE ELEMENTS
        // -----------------------------------------

        select("[data-scrub]").forEach((element) => {
          const amount = Number(element.dataset.scrub || 1);
          const y = Number(element.dataset.scrubY || -34);
          const rotate = Number(element.dataset.scrubRotate || 0);

          gsap.to(element, {
            y,
            rotation: rotate,
            ease: "none",
            scrollTrigger: {
              trigger: element.closest("[data-section]") || element,
              start: "top bottom",
              end: "bottom top",
              scrub: amount,
              invalidateOnRefresh: true,
            },
          });
        });

        // -----------------------------------------
        // MARQUEE
        // -----------------------------------------

        const marquee = select(".marquee-track")[0];

        if (marquee) {
          gsap.to(marquee, {
            xPercent: desktop ? -16 : -7,
            ease: "none",
            scrollTrigger: {
              trigger: marquee.closest(".marquee"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        }

        // -----------------------------------------
        // PROJECT MOCKUP DEPTH
        // -----------------------------------------

        select(".project-art-inner").forEach((art, index) => {
          gsap.to(art, {
            y: index % 2 === 0 ? -24 : 24,
            scale: 1.035,
            ease: "none",
            scrollTrigger: {
              trigger: art.closest(".project-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          });
        });

        // -----------------------------------------
        // SMALL ACCENTS
        // -----------------------------------------

        select(".sparkle[data-scrub]").forEach((sparkle) => {
          gsap.to(sparkle, {
            rotation: 150,
            scale: 1.25,
            ease: "none",
            scrollTrigger: {
              trigger: sparkle.closest("[data-section]") || sparkle,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        });

        // -----------------------------------------
        // REFRESH
        // -----------------------------------------

        requestAnimationFrame(() => {
          if (active) ScrollTrigger.refresh();
        });

        return undefined;
      },
    );

    const refresh = () => {
      if (active) ScrollTrigger.refresh();
    };

    const onLoad = () => refresh();

    window.addEventListener("load", onLoad, { once: true });

    document.fonts?.ready?.then(refresh);

    // -----------------------------------------
    // CLEANUP
    // -----------------------------------------

    return () => {
      active = false;
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, [rootRef]);
}
