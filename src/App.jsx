import { useEffect, useRef, useState } from "react";
import React from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Github,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react";
import { capabilities, experience, profile, projects } from "./data";
import { usePortfolioMotion } from "./usePortfolioMotion";
import GlowCursor from "./components/GlowCursor/GlowCursor";
import GradientBlinds from "./components/GradientBlinds/GradientBlinds";

function PortfolioGlowCursor() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setIsSupported(media.matches);

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (!isSupported) return null;

  return (
    <GlowCursor
      className="portfolio-glow-cursor"
      color="#c7ff4a"
      secondaryColor="#a58bff"
      intensity={1.1}
      trailWidth={3.2}
      linger={1.25}
      glow={1.35}
      hotspot={0.85}
      followSpeed={0.68}
      quality="medium"
      maxDevicePixelRatio={1.5}
      clickBurst={false}
      theme="dark"
      blendMode="screen"
      aria-hidden="true"
    />
  );
}

function SectionLabel({ index, children, right }) {
  return (
    <div className="section-label" data-reveal data-direction="left">
      <span className="section-index">{index} /</span>
      <span>{children}</span>
      {right && <span className="section-label-right">{right}</span>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Work", "#work"],
    ["Experience", "#experience"],
    ["About", "#about"],
  ];

  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Sourabh Ravi, back to top">
        SR<span className="brand-mark">✳</span>
      </a>
      <div className="header-presence">
        <span className="presence-dot" />
        OPEN TO OPPORTUNITIES
      </div>
      <button
        className="menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={open ? "main-nav is-open" : "main-nav"}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          Let's talk <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  );
}

const projectImages = import.meta.glob(
  "./images/**/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

function ProjectVisual({ project }) {
  const projectKey = (project.visual || project.name).toLowerCase();

  const image = Object.entries(projectImages).find(([path]) => {
    const filename = path.split("/").pop().toLowerCase();
    return filename.includes(projectKey);
  })?.[1];

  if (!image) return null;

  return (
    <div className={`project-art-inner project-image-visual ${project.visual}-screen`}>
      <img
        className="project-preview-image"
        src={image}
        alt={`${project.name} project screenshot`}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card project-${project.visual}`}>
      <div className={`project-visual visual-${project.accent}`}>
        <ProjectVisual project={project} />
      </div>
      <div className="project-info">
        <div className="project-meta" data-reveal data-distance="12">
          <span>{project.type}</span>
          <span>{project.contribution}</span>
        </div>
        <div className="project-heading-row" data-reveal data-distance="18">
          <div>
            <h3>
              {project.name}
              <span className="project-period">.</span>
            </h3>
            <p className="project-tagline">{project.tagline}</p>
          </div>
          {project.url ? (
            <a
              className="project-open"
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name}`}>
              <ArrowUpRight size={21} />
            </a>
          ) : (
            <span
              className="project-open project-open-muted"
              aria-label="Project details available on request">
              <ArrowUpRight size={21} />
            </span>
          )}
        </div>
        <p className="project-description" data-reveal data-distance="18">
          {project.description}
        </p>
        <div className="project-stack" data-stagger>
          {project.stack.map((item) => (
            <span data-stagger-item key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="project-foot" data-reveal data-distance="12">
          <span>SELECTED WORK · {project.number}</span>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer">
              EXPLORE PROJECT <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="case-study-note">
              CASE STUDY AVAILABLE ON REQUEST
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function CapabilityRow({ item }) {
  return (
    <article className="capability-row" data-stagger-item>
      <span className="capability-index">{item.index}</span>
      <div className="capability-copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <div className="capability-tools">{item.tools}</div>
      <ArrowUpRight className="capability-arrow" size={20} />
    </article>
  );
}

function ExperienceItem({ item }) {
  return (
    <article className="experience-item" data-stagger-item>
      <div className="experience-period">{item.period}</div>
      <div className="experience-main">
        <div className="experience-company-row">
          <h3>{item.company}</h3>
          <span className="experience-role">{item.role}</span>
        </div>
        <p>{item.detail}</p>
        <div className="experience-tags">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      {/* <ArrowUpRight className="experience-arrow" size={18} /> */}
    </article>
  );
}

function ContactLinks() {
  const links = [
    profile.email
      ? {
          label: "EMAIL",
          href: `mailto:${profile.email}`,
          icon: <Mail size={15} />,
        }
      : null,
    profile.linkedin
      ? {
          label: "LINKEDIN",
          href: profile.linkedin,
          icon: <Linkedin size={15} />,
        }
      : null,
    profile.github
      ? { label: "GITHUB", href: profile.github, icon: <Github size={15} /> }
      : null,
    profile.upwork
      ? {
          label: "UPWORK",
          href: profile.upwork,
          icon: <ArrowUpRight size={15} />,
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="contact-links">
      {links.length ? (
        links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer">
            {link.icon}
            {link.label}
            <ArrowUpRight size={13} />
          </a>
        ))
      ) : (
        <span className="contact-config-note">
          Add your email and profile URLs in <code>src/data.js</code> before
          publishing.
        </span>
      )}
    </div>
  );
}

export default function App() {
  const rootRef = useRef(null);
  usePortfolioMotion(rootRef);

  return (
    <div className="app-shell" id="top" ref={rootRef}>
      <GradientBlinds
        className="site-gradient-blinds"
        gradientColors={["#FF9FFC", "#5227FF"]}
        angle={20}
        noise={0.3}
        blindCount={16}
        blindMinWidth={60}
        mouseDampening={0.15}
        mirrorGradient={true}
        spotlightRadius={0.32}
        shine={0.5}
        relief={0.5}
        glow={0.4}
        sway={0.37}
        speed={1}
        hoverTilt={0.6}
        perspective={-0.22}
        gradientSpeed={0}
        distortAmount={0}
        clickEffect="ripple"
        idle="drift"
        intro={true}
        mixBlendMode="lighten"
      />      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <PortfolioGlowCursor />
      <Header />
      <main>
        <section className="hero" data-section>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-inner page-width">
            <div className="hero-copy-block">
              <div className="hero-eyebrow">
                <span className="eyebrow-pill">
                  <i /> SOFTWARE ENGINEER / PRODUCT BUILDER
                </span>
                <span className="eyebrow-side">
                  INDEPENDENT THINKING. INTENTIONAL BUILDING.
                </span>
              </div>
              <h1 className="hero-title">
                <span className="hero-title-mask">
                  <span className="hero-title-line">I build</span>
                </span>
                <span className="hero-title-mask">
                  <span className="hero-title-line title-outline">digital</span>
                </span>
                <span className="hero-title-mask">
                  <span className="hero-title-line">
                    experiences<span className="hero-asterisk">✳</span>
                  </span>
                </span>
                <span className="hero-title-mask">
                  <span className="hero-title-line title-last">
                    that <em>move.</em>
                  </span>
                </span>
              </h1>
              <p className="hero-description">
                I'm <strong>Sourabh Ravi</strong>, a product-minded software
                engineer turning complex ideas into clear, useful and engaging
                digital products.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  EXPLORE MY WORK <ArrowUpRight size={16} />
                </a>
                <a className="text-link" href="#contact">
                  LET'S CONNECT <ArrowDownRight size={16} />
                </a>
              </div>
            </div>

            <div
              className="hero-art"
              role="img"
              aria-label="Creative Engine: ideas become systems, then meaningful digital experiences"
              onPointerMove={(event) => {
                if (event.pointerType === "touch") return;
                const bounds = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                event.currentTarget.style.setProperty(
                  "--pointer-x",
                  `${x.toFixed(3)}`,
                );
                event.currentTarget.style.setProperty(
                  "--pointer-y",
                  `${y.toFixed(3)}`,
                );
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--pointer-x", "0");
                event.currentTarget.style.setProperty("--pointer-y", "0");
              }}>
              <div className="hero-art-kicker">
                <span className="engine-live-dot" /> THE CREATIVE ENGINE{" "}
                <span>01 — 03</span>
              </div>
              <div className="hero-orbit-system">
                <div className="hero-orbit-track" aria-hidden="true">
                  {/* <div className="hero-ring ring-one" /> */}
                  <div className="hero-ring ring-two" />
                  <div className="hero-ring ring-three" />
                  <span className="orbit-node node-one" />
                  <span className="orbit-node node-two" />
                  <span className="orbit-node node-three" />
                </div>
                <div className="hero-cross cross-one">✳</div>
                <div className="hero-cross cross-two">✳</div>
                <div className="hero-orb">
                  <div className="orb-inner">
                    <span>SR</span>
                    <i>✳</i>
                    <small>THE BUILDER</small>
                  </div>
                  <span className="orb-scanline" />
                </div>
                <div className="hero-stage stage-ideas">
                  <i>01 / DISCOVER</i>
                  <b>IDEAS</b>
                  <span>Find the signal</span>
                  <em>↗</em>
                </div>
                <div className="hero-stage stage-systems">
                  <i>02 / ENGINEER</i>
                  <b>SYSTEMS</b>
                  <span>Make it work beautifully</span>
                  <em>↗</em>
                </div>
                <div className="hero-stage stage-experiences">
                  <i>03 / DELIVER</i>
                  <b>EXPERIENCES</b>
                  <span>Make it matter</span>
                  <em>↗</em>
                </div>
                <div className="engine-core-label">
                  A LOOP OF CURIOSITY <span>↻</span>
                </div>
              </div>
              <div className="hero-art-caption">
                <span>THOUGHT → INTERACTION → IMPACT</span>
                <br />
                GOOD IDEAS DESERVE
                <br />
                GREAT EXECUTION.
              </div>
            </div>
            <div className="hero-bottom">
              <div className="hero-meta">
                <span>BASED IN INDIA</span>
                <i /> <span>OPEN TO REMOTE & RELOCATION</span>
              </div>
              <a className="hero-scroll" href="#intro">
                <span>SCROLL TO EXPLORE</span>
                <span className="scroll-arrow">
                  <ArrowDownRight size={16} />
                </span>
              </a>
            </div>
          </div>
          <div className="hero-side-index">PORTFOLIO / 2026</div>
        </section>

        <section className="intro-section section-pad" id="intro" data-section>
          <div className="page-width">
            <SectionLabel index="01" right="A LITTLE CONTEXT">
              THE PERSON BEHIND THE PIXELS
            </SectionLabel>
            <div className="intro-layout">
              <h2 data-reveal data-distance="72">
                Not just
                <br />
                interfaces.
                <br />
                <span>Experiences.</span>
              </h2>
              <div className="intro-copy">
                <div className="intro-marker" data-reveal data-scale="0.6">
                  <Sparkles size={18} /> THE SHORT VERSION
                </div>
                <p className="intro-lead" data-reveal data-distance="28">
                  I work at the intersection of{" "}
                  <em>engineering, product thinking and interaction design.</em>
                </p>
                <p data-reveal data-distance="24">
                  My foundation is frontend engineering: building interfaces
                  that are fast, understandable and dependable. I also enjoy the
                  systems behind the screen, from APIs and data models to
                  AI-powered workflows.
                </p>
                <p data-reveal data-distance="24">
                  I care about the details, but I care more about whether those
                  details make the product genuinely better for the person using
                  it.
                </p>
                <div
                  className="intro-signoff"
                  data-reveal
                  data-direction="right">
                  THOUGHTFUL BY DESIGN. PRACTICAL BY NATURE. <span>↗</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Build, learn, refine, repeat">
          <div className="marquee-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i}>
                THINK DEEPLY <b>✳</b> BUILD CLEARLY <b>✳</b> SHIP THOUGHTFULLY{" "}
                <b>✳</b> KEEP LEARNING <b>✳</b>
              </span>
            ))}
          </div>
        </section>

        <section className="work-section section-pad" id="work" data-section>
          <div className="page-width">
            <SectionLabel index="02" right="SELECTED PROJECTS">
              BUILT WITH CURIOSITY
            </SectionLabel>
            <div className="section-heading-row">
              <h2 data-reveal data-distance="65">
                Ideas, meet
                <br />
                <span>implementation.</span>
              </h2>
              <p data-reveal data-direction="right">
                A selection of products and experiments where engineering meets
                a real user problem. Each one taught me something worth keeping.
              </p>
            </div>
            <div className="project-list">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.number}
                  project={project}
                  index={index}
                />
              ))}
            </div>
            <div className="work-footnote" data-reveal>
              <span>MORE IN THE WORKSHOP</span>
              <p>
                There are more experiments, prototypes and product stories
                behind the scenes.
              </p>
              <a href="#contact">
                Ask me about them <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className="statement-section" data-section>
          <div className="statement-grid" aria-hidden="true" />

          <div className="page-width statement-inner">
            <div className="statement-copy">
              <span
                className="statement-kicker"
                data-reveal
                data-direction="left">
                A PRINCIPLE I BUILD BY
              </span>

              <h2 data-reveal data-distance="80">
                The best tech
                <br />
                doesn't ask for
                <br />
                <em>attention.</em>
                <br />
                It earns trust<span className="statement-dot">.</span>
              </h2>

              <div className="statement-bottom-note" data-reveal>
                <span className="statement-bottom-mark">✳</span>
                <p>
                  Technology should feel effortless. The thinking behind it
                  shouldn't be.
                </p>
              </div>
            </div>

            <div className="principles-panel">
              <div
                className="principles-heading"
                data-reveal
                data-direction="right">
                <div>
                  <span className="principles-kicker">
                    THE WAY I APPROACH THE WORK
                  </span>
                  <h3>Three things. One mindset.</h3>
                </div>
                <span className="principles-count">01 — 03</span>
              </div>

              <div className="principles-list" data-stagger>
                <article
                  className="principle-card principle-clarity"
                  data-stagger-item
                  tabIndex={0}>
                  <div className="principle-card-top">
                    <span className="principle-number">01</span>
                    <span className="principle-symbol">⌕</span>
                  </div>

                  <div className="principle-card-content">
                    <span className="principle-label">DISCOVER</span>
                    <h4>Find the signal.</h4>
                    <p>
                      Understand the problem, question assumptions and make
                      complexity easier to navigate.
                    </p>
                  </div>

                  <span className="principle-card-foot">
                    CLARITY BEFORE COMPLEXITY <span>↗</span>
                  </span>
                </article>

                <article
                  className="principle-card principle-craft"
                  data-stagger-item
                  tabIndex={0}>
                  <div className="principle-card-top">
                    <span className="principle-number">02</span>
                    <span className="principle-symbol">✳</span>
                  </div>

                  <div className="principle-card-content">
                    <span className="principle-label">ENGINEER</span>
                    <h4>Build with intent.</h4>
                    <p>
                      Thoughtful architecture, purposeful interactions and
                      details that make a product feel right.
                    </p>
                  </div>

                  <span className="principle-card-foot">
                    CRAFT OVER SHORTCUTS <span>↗</span>
                  </span>
                </article>

                <article
                  className="principle-card principle-impact"
                  data-stagger-item
                  tabIndex={0}>
                  <div className="principle-card-top">
                    <span className="principle-number">03</span>
                    <span className="principle-symbol">↗</span>
                  </div>

                  <div className="principle-card-content">
                    <span className="principle-label">DELIVER</span>
                    <h4>Make it matter.</h4>
                    <p>
                      Turn good ideas into useful experiences that solve real
                      problems for real people.
                    </p>
                  </div>

                  <span className="principle-card-foot">
                    IMPACT OVER IMPRESSION <span>↗</span>
                  </span>
                </article>
              </div>

              <div className="principles-footer" data-reveal>
                <span className="principles-footer-dot" />
                <span>THOUGHT → CRAFT → IMPACT</span>
                <span className="principles-footer-note">
                  THAT'S THE PROCESS.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="capabilities-section section-pad"
          id="capabilities"
          data-section>
          <div className="page-width">
            <SectionLabel index="03" right="HOW I CAN CONTRIBUTE">
              A TOOLKIT WITH RANGE
            </SectionLabel>
            <div className="section-heading-row">
              <h2 data-reveal data-distance="62">
                From first
                <br />
                <span>pixel to product.</span>
              </h2>
              <p data-reveal data-direction="right">
                Frontend is my strongest lane. I bring enough range across the
                stack to connect the interface to the system behind it.
              </p>
            </div>
            <div className="capability-list" data-stagger>
              {capabilities.map((item) => (
                <CapabilityRow key={item.index} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="experience-section section-pad"
          id="experience"
          data-section>
          <div className="page-width">
            <SectionLabel index="04" right="PRODUCTION EXPERIENCE">
              WHERE THE WORK HAPPENED
            </SectionLabel>
            <div className="section-heading-row experience-heading">
              <h2 data-reveal data-distance="62">
                Built for
                <br />
                <span>the real world.</span>
              </h2>
              <div
                className="experience-intro"
                data-reveal
                data-direction="right">
                <p>
                  I've worked on customer-facing products and enterprise
                  experiences where clarity, reliability and collaboration
                  matter just as much as the code.
                </p>
                <div className="experience-proof">
                  <strong>
                    15K<span>+</span>
                  </strong>
                  <span>
                    users on a ticketing
                    <br />
                    platform I helped build
                  </span>
                </div>
              </div>
            </div>
            <div className="experience-list" data-stagger>
              {experience.map((item) => (
                <ExperienceItem key={item.company} item={item} />
              ))}
            </div>
            <div className="experience-note" data-reveal>
              <span>ALSO IN THE TOOLBOX</span>
              <p>
                Performance-minded frontend work, microfrontend delivery, API
                integration and modern application architecture.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about" data-section>
          <div className="page-width">
            <SectionLabel index="05" right="OUTSIDE THE COMPONENT TREE">
              A HUMAN, NOT A FRAMEWORK
            </SectionLabel>
            <div className="about-layout">
              <div className="about-heading">
                <div
                  className="about-orbit"
                  data-scrub
                  data-scrub-y="-54"
                  data-scrub-rotate="12">
                  <span>✳</span>
                </div>
                <h2 data-reveal data-distance="68">
                  Curious
                  <br />
                  by <em>default.</em>
                </h2>
                <div
                  className="about-sticker"
                  data-reveal
                  data-scale="0.65"
                  data-rotate="-12">
                  ALWAYS
                  <br />
                  LEARNING <span>↗</span>
                </div>
              </div>
              <div className="about-copy">
                <p className="about-lead" data-reveal data-distance="30">
                  I like figuring out how things work, why they break, and how
                  to make them feel effortless.
                </p>
                <p data-reveal data-distance="26">
                  I enjoy learning new tools, exploring product ideas and
                  building small experiments that stretch my thinking. I'm at my
                  best when I can understand the problem, collaborate with
                  people and turn a fuzzy idea into something concrete.
                </p>
                <p data-reveal data-distance="26">
                  I value direct communication, thoughtful trade-offs and teams
                  that care about what they ship. A little humour helps, too.
                </p>
                <div
                  className="about-signoff"
                  data-reveal
                  data-direction="right">
                  THAT'S THE HUMAN BEHIND THE COMMITS.
                  {/* <b>— SOURABH</b> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="contact-section section-pad"
          id="contact"
          data-section>
          <div className="contact-glow" aria-hidden="true" />
          <div className="page-width contact-inner">
            <SectionLabel index="06" right="YOUR MOVE">
              HAVE SOMETHING IN MIND?
            </SectionLabel>
            <div className="contact-main">
              <div>
                <span
                  className="contact-kicker"
                  data-reveal
                  data-direction="left">
                  LET'S MAKE IT REAL
                </span>
                <h2 data-reveal data-distance="82">
                  Have a good
                  <br />
                  <em>problem?</em>
                </h2>
              </div>
              <div className="contact-copy" data-reveal data-direction="right">
                <p>
                  I'm open to frontend and full-stack opportunities, product
                  collaborations and interesting problems worth solving.
                </p>
                <a
                  className="contact-big-link"
                  href={
                    profile.email ? `mailto:${profile.email}` : "#contact-links"
                  }>
                  START A CONVERSATION <ArrowUpRight size={20} />
                </a>
              </div>
            </div>
            <div className="contact-bottom" id="contact-links">
              <div className="contact-location">
                <span className="presence-dot" /> {profile.location}
              </div>
              <ContactLinks />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" className="brand">
          SR<span className="brand-mark">✳</span>
        </a>
        <span>DESIGNED WITH INTENT. BUILT WITH CURIOSITY.</span>
        <a href="#top" className="back-top">
          BACK TO TOP <MoveUpRight size={13} />
        </a>
        <span>© {new Date().getFullYear()} SOURABH RAVI</span>
      </footer>
    </div>
  );
}
