const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

let initialized = false;
const viewedSections = new Set();
const viewedProjects = new Set();
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

function getSectionId(control) {
  const section = control.closest("section");
  return (
    section?.id ||
    (section?.classList.contains("hero") ? "hero" : "global")
  );
}

function trackClick(event) {
  const target = event.target instanceof Element ? event.target : null;
  const control = target?.closest("a, button, [role='button']");
  if (!control) return;

  const anchor = control instanceof HTMLAnchorElement ? control : null;
  const href = anchor?.getAttribute("href") || "";
  const label = getControlLabel(control);
  const sectionId = getSectionId(control);
  const projectCard = control.closest(".project-card");
  const projectName = projectCard?.querySelector("h3")?.textContent?.replace(/\s+/g, " ").trim();
  const destination = href ? getSafeUrl(anchor.href) : null;
  const lowerLabel = label.toLowerCase();
  const isResumeLink =
    lowerLabel.includes("resume") ||
    lowerLabel.includes("cv") ||
    destination?.url.includes("/api/resume") ||
    /\.(pdf|docx?)(?:$|\\?)/i.test(href);

  if (isResumeLink) {
    pushAnalyticsEvent("resume_open", {
      link_text: label,
      link_url: destination?.url || "",
      link_location: sectionId,
      open_in_new_tab: anchor?.target === "_blank",
    });
    return;
  }

  if (projectCard && projectName) {
    pushAnalyticsEvent("project_click", {
      project_name: projectName,
      project_url: destination?.url || "",
      link_text: label,
      link_location: sectionId,
    });
    return;
  }

  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    pushAnalyticsEvent("contact_click", {
      contact_method: href.startsWith("mailto:") ? "email" : "phone",
      link_text: label,
      link_location: sectionId,
    });
    return;
  }

  if (destination?.isExternal) {
    const host = destination.domain.replace(/^www\./, "");
    const socialPlatforms = {
      "linkedin.com": "linkedin",
      "github.com": "github",
      "upwork.com": "upwork",
      "x.com": "x",
      "twitter.com": "x",
      "behance.net": "behance",
      "dribbble.com": "dribbble",
    };
    const platform = socialPlatforms[host];

    if (platform) {
      pushAnalyticsEvent("social_click", {
        platform,
        link_url: destination.url,
        link_text: label,
        link_location: sectionId,
      });
    } else {
      pushAnalyticsEvent("outbound_click", {
        link_url: destination.url,
        link_domain: host,
        link_text: label,
        link_location: sectionId,
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

  if (href.startsWith("#")) {
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

  document.querySelectorAll("main section[data-section]").forEach((section) => {
    observer.observe(section);
  });
}

function trackProjectViews() {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const card = entry.target;
        const projectName = card.querySelector("h3")?.textContent?.replace(/\s+/g, " ").trim();
        if (!projectName || viewedProjects.has(projectName)) return;

        viewedProjects.add(projectName);
        const projectUrl = card.querySelector('a[href]')?.href || "";

        pushAnalyticsEvent("project_view", {
          project_name: projectName,
          project_url: projectUrl ? getSafeUrl(projectUrl).url : "",
        });

        observer.unobserve(card);
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(".project-card").forEach((card) => {
    observer.observe(card);
  });
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

  // GTM is installed in index.html. A GA4 Event tag in GTM must forward
  // the custom dataLayer events listed in ANALYTICS_SETUP.md to GA4.
  window.dataLayer = window.dataLayer || [];

  loadMicrosoftClarity();

  document.addEventListener("click", trackClick, true);
  window.addEventListener("scroll", trackScrollDepth, { passive: true });

  const initObservers = () => {
    trackSectionViews();
    trackProjectViews();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initObservers, { once: true });
  } else {
    initObservers();
  }
}
