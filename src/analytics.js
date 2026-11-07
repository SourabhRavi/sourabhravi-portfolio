const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

let initialized = false;
const viewedSections = new Set();
const scrollMilestones = new Set();

function pushAnalyticsEvent(eventName, parameters = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...parameters,
  });

  if (typeof window.clarity === "function") {
    window.clarity("event", eventName);
  }
}

function loadMicrosoftClarity() {
  if (!CLARITY_ID || document.querySelector('script[data-analytics="clarity"]')) return;

  window.clarity =
    window.clarity ||
    function clarity() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_ID)}`;
  script.dataset.analytics = "clarity";
  document.head.appendChild(script);
}

function getSafeUrl(href) {
  try {
    const url = new URL(href, window.location.origin);
    return {
      url: `${url.origin}${url.pathname}`,
      domain: url.hostname,
      isExternal: url.origin !== window.location.origin,
    };
  } catch {
    return { url: "", domain: "", isExternal: false };
  }
}

function getControlLabel(control) {
  return (
    control.getAttribute("aria-label") ||
    control.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) ||
    control.getAttribute("title") ||
    "unlabelled"
  );
}

function trackClick(event) {
  const target = event.target instanceof Element ? event.target : null;
  const control = target?.closest("a, button, [role='button']");
  if (!control) return;

  const anchor = control instanceof HTMLAnchorElement ? control : null;
  const href = anchor?.getAttribute("href") || "";
  const label = getControlLabel(control);
  const sectionElement = control.closest("section");
  const sectionId =
    sectionElement?.id ||
    (sectionElement?.classList.contains("hero") ? "hero" : "global");
  const projectCard = control.closest(".project-card");
  const projectName = projectCard?.querySelector("h3")?.textContent?.trim();
  const destination = href ? getSafeUrl(anchor.href) : null;

  if (anchor?.hasAttribute("download")) {
    pushAnalyticsEvent("resume_download", {
      file_name: anchor.getAttribute("download") || destination?.url.split("/").pop() || "download",
      download_url: destination?.url || "",
      section_id: sectionId,
    });
    return;
  }

  if (projectCard && projectName) {
    pushAnalyticsEvent("project_click", {
      project_name: projectName,
      project_url: destination?.url || "",
      click_text: label,
      section_id: sectionId,
    });
    return;
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    pushAnalyticsEvent("contact_click", {
      contact_method: href.startsWith("mailto:") ? "email" : "phone",
      click_text: label,
      section_id: sectionId,
    });
    return;
  }

  if (destination?.isExternal) {
    const socialPlatforms = {
      "linkedin.com": "linkedin",
      "www.linkedin.com": "linkedin",
      "github.com": "github",
      "www.github.com": "github",
      "upwork.com": "upwork",
      "www.upwork.com": "upwork",
    };
    const platform = socialPlatforms[destination.domain];

    if (platform) {
      pushAnalyticsEvent("social_click", {
        platform,
        link_url: destination.url,
        click_text: label,
        section_id: sectionId,
      });
    } else {
      pushAnalyticsEvent("outbound_click", {
        link_url: destination.url,
        link_domain: destination.domain,
        click_text: label,
        section_id: sectionId,
      });
    }
    return;
  }

  if (
    control.matches(".button, .nav-cta, .contact-big-link, .text-link") ||
    control.closest(".hero-actions")
  ) {
    pushAnalyticsEvent("cta_click", {
      cta_text: label,
      cta_location: sectionId,
      destination: href || "button",
    });
    return;
  }

  if (anchor?.getAttribute("href")?.startsWith("#")) {
    pushAnalyticsEvent("navigation_click", {
      navigation_label: label,
      destination: href,
      section_id: sectionId,
    });
    return;
  }

  pushAnalyticsEvent("portfolio_interaction", {
    click_text: label,
    section_id: sectionId,
    element_type: control.tagName.toLowerCase(),
  });
}

function trackSectionViews() {
  const sections = document.querySelectorAll("main section[data-section]");
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const section = entry.target;
        const sectionId =
          section.id ||
          (section.classList.contains("hero") ? "hero" : "unnamed-section");

        if (viewedSections.has(sectionId)) return;
        viewedSections.add(sectionId);

        pushAnalyticsEvent("section_view", {
          section_id: sectionId,
          section_name:
            section.querySelector("h1, h2")?.textContent?.replace(/\s+/g, " ").trim().slice(0, 100) ||
            sectionId,
        });
      });
    },
    { threshold: 0.35 },
  );

  sections.forEach((section) => observer.observe(section));
}

function trackScrollDepth() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) return;

  const percentage = Math.min(
    100,
    Math.round((window.scrollY / scrollableHeight) * 100),
  );

  [25, 50, 75, 90].forEach((milestone) => {
    if (percentage < milestone || scrollMilestones.has(milestone)) return;

    scrollMilestones.add(milestone);
    pushAnalyticsEvent("scroll_depth", {
      percent_scrolled: milestone,
    });
  });
}

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  // GTM is installed in index.html. Custom events are sent to its dataLayer
  // and forwarded to GA4 by the Google Tag Manager event tag.
  window.dataLayer = window.dataLayer || [];

  loadMicrosoftClarity();

  document.addEventListener("click", trackClick, true);
  window.addEventListener("scroll", trackScrollDepth, { passive: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackSectionViews, { once: true });
  } else {
    trackSectionViews();
  }
}
