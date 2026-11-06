const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

let initialized = false;

function loadGoogleAnalytics() {
  if (!GA_ID || document.querySelector('script[data-analytics="ga4"]')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: true,
    anonymize_ip: true,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  script.dataset.analytics = "ga4";
  document.head.appendChild(script);
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

function getDestination(anchor) {
  const href = anchor.getAttribute("href") || "";
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";

  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin
      ? `${url.pathname}${url.hash}`
      : `${url.origin}${url.pathname}`;
  } catch {
    return href.split("?")[0];
  }
}

function trackInteraction(event) {
  const target = event.target instanceof Element ? event.target : null;
  const control = target?.closest("a, button, [role='button']");
  if (!control) return;

  const anchor = control instanceof HTMLAnchorElement ? control : null;
  const projectCard = control.closest(".project-card");
  const projectName = projectCard?.querySelector("h3")?.textContent?.trim();
  const section = control.closest("section")?.id || "global";
  const label =
    control.getAttribute("aria-label") ||
    control.textContent?.replace(/\s+/g, " ").trim().slice(0, 100) ||
    "unlabelled";

  let eventName = "portfolio_interaction";
  let clickType = "button";

  if (projectCard) {
    eventName = "project_click";
    clickType = "project";
  } else if (anchor?.getAttribute("href")?.startsWith("mailto:")) {
    eventName = "contact_click";
    clickType = "email";
  } else if (anchor?.getAttribute("href")?.startsWith("tel:")) {
    eventName = "contact_click";
    clickType = "phone";
  } else if (anchor?.hasAttribute("download")) {
    eventName = "resume_download";
    clickType = "download";
  } else if (anchor?.getAttribute("href")?.startsWith("#")) {
    eventName = "navigation_click";
    clickType = "navigation";
  } else if (anchor) {
    const destination = new URL(anchor.href, window.location.origin);
    eventName =
      destination.origin === window.location.origin
        ? "internal_link_click"
        : "outbound_click";
    clickType = destination.origin === window.location.origin ? "internal" : "outbound";
  }

  const params = {
    click_type: clickType,
    click_text: label,
    destination: anchor ? getDestination(anchor) : "button",
    section,
  };

  if (projectName) params.project_name = projectName;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (typeof window.clarity === "function") {
    window.clarity("event", eventName);
  }
}

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  loadGoogleAnalytics();
  loadMicrosoftClarity();
  document.addEventListener("click", trackInteraction, { capture: true });
}
