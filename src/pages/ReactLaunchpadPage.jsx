import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Sparkles,
  Zap,
} from "lucide-react";
import "./react-launchpad.css";

const agenda = [
  { time: "00:00", duration: "15 min", title: "Welcome + product walkthrough", detail: "Explore the product concept, then understand the React mental model." },
  { time: "00:15", duration: "25 min", title: "JSX, components + props", detail: "Turn the interface into reusable pieces." },
  { time: "00:40", duration: "25 min", title: "State + events", detail: "Create, update and remove tasks with interaction-driven state." },
  { time: "01:05", duration: "10 min", title: "Break", detail: "Reset, stretch and ask questions." },
  { time: "01:15", duration: "30 min", title: "Forms + task workflow", detail: "Controlled inputs and changing task status." },
  { time: "01:45", duration: "25 min", title: "Search + derived state", detail: "Filter the board without duplicating state." },
  { time: "02:10", duration: "25 min", title: "Persistence", detail: "Keep the board alive with localStorage." },
  { time: "02:35", duration: "15 min", title: "Independent mini-challenge", detail: "Choose a small feature and build it yourself." },
  { time: "02:50", duration: "10 min", title: "Showcase + recap", detail: "Share what you built and preview what's next." },
];

const series = [
  ["01", "React foundations", "Components, state, events and local persistence.", "YOU ARE HERE"],
  ["02", "App architecture", "Routing, custom hooks and API loading states."],
  ["03", "Full-stack workflow", "Node.js, Express, PostgreSQL and authentication."],
  ["04", "Real-time collaboration", "Shared updates and presence with Socket.IO."],
  ["05", "AI-powered workflows", "Secure AI integration for smarter task planning."],
  ["06", "Ship with confidence", "Testing, accessibility, security and deployment."],
];

const outcomes = [
 {number:"01",title:"A real interface",tag:"COMPONENTS",summary:"Break a useful product into clear React components, then compose them into a coherent interface.",detail:"JSX, component boundaries and props. Every piece has a visible job.",takeaway:"A component-based interface you understand.",symbols:["▥","JSX","PROPS"],skills:["JSX","Components","Props"]},
 {number:"02",title:"UI that responds",tag:"STATE + EVENTS",summary:"Make buttons, forms and status changes feel immediate and intentional.",detail:"Use state and event handlers to make the interface respond to user choices.",takeaway:"A task flow that reacts to every click.",symbols:["↗","STATE","EVENTS"],skills:["useState","Events","Forms"]},
 {number:"03",title:"A product that remembers",tag:"PERSISTENCE",summary:"Keep your work after a refresh and understand where browser storage fits.",detail:"Save a small amount of app state with localStorage, without needing a backend.",takeaway:"A board that survives a browser refresh.",symbols:["◌","SAVE","RESTORE"],skills:["localStorage","JSON","Effects"]},
 {number:"04",title:"Your own feature",tag:"CREATIVE SPRINT",summary:"Choose a mini-challenge, make a small design decision and show what you changed.",detail:"Add a due date, priority filter, task counter or another achievable improvement.",takeaway:"A personal feature you designed and shipped.",symbols:["✳","IDEA","SHIP"],skills:["Explore","Design","Build"]}
];


function WorkshopHeader({ mobileMenuOpen, setMobileMenuOpen }) {
  return <header className="rl-header">
    <a href="/" className="rl-monogram" aria-label="Back to Sourabh's portfolio">SR<span>✳</span></a>
    <button className="rl-menu-toggle" aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenuOpen} onClick={()=>setMobileMenuOpen(v=>!v)}>{mobileMenuOpen ? "CLOSE" : "MENU"} <span>{mobileMenuOpen ? "×" : "＋"}</span></button><nav className={mobileMenuOpen?"is-open":""} onClick={()=>setMobileMenuOpen(false)}><a href="#experience">The experience</a><a href="#outcomes">Outcomes</a><a href="#agenda">Agenda</a><a href="#series">The series</a></nav>
    <a className="rl-header-cta" href="mailto:sourabh.k.ravi@gmail.com?subject=RVS%20React%20Launchpad">Discuss the workshop <ArrowUpRight size={15}/></a>
  </header>;
}

export default function ReactLaunchpadPage() {
  const [activeAgenda, setActiveAgenda] = useState(0);
  const [activeOutcome, setActiveOutcome] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pageRef = useRef(null);
  const progressRef = useRef(null);
  const [expandedSeries, setExpandedSeries] = useState(0);

  // One choreographed motion system: the hero assembles on entry,
  // then its layers settle together as the visitor scrolls into the story.
  useEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(".rl-kicker", { y: 12, autoAlpha: 0, duration: .4 })
        .from(".rl-overline", { y: 12, autoAlpha: 0, duration: .35 }, "-=.2")
        .from(".rl-hero h1", { y: 34, autoAlpha: 0, duration: .7 }, "-=.12")
        .from(".rl-hero-subtitle,.rl-hero-description", { y: 14, autoAlpha: 0, stagger: .1, duration: .42 }, "-=.28")
        .from(".rl-hero-actions,.rl-hero-facts", { y: 12, autoAlpha: 0, stagger: .08, duration: .38 }, "-=.18")
        .from(".rl-hero-art", { y: 28, scale: .96, autoAlpha: 0, duration: .72 }, "-=.3")
        .from(".rl-hero-bottom", { autoAlpha: 0, y: 8, duration: .3 }, "-=.25");

      const hero = root.querySelector(".rl-hero");
      if (hero && window.matchMedia("(min-width: 761px)").matches) {
        const story = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom 18%",
            scrub: 1.1,
            invalidateOnRefresh: true
          }
        });
        story
          .to(".rl-hero-copy", { y: -22, ease: "none" }, 0)
          .to(".rl-pane-main", { x: 0, y: 0, rotate: 0, scale: 1.035, ease: "none" }, 0)
          .to(".rl-pane-side", { x: 0, y: 0, rotate: 0, scale: 1.015, ease: "none" }, 0)
          .to(".rl-chip-a", { x: 10, y: -12, ease: "none" }, 0)
          .to(".rl-chip-b", { x: -8, y: 10, ease: "none" }, 0)
          .to(".rl-glow-one", { x: -24, y: 34, scale: 1.12, ease: "none" }, 0)
          .to(".rl-glow-two", { x: 28, y: -18, scale: .96, ease: "none" }, 0);
      }

      // A shared reveal rhythm carries the visual from section to section.
      // Cards enter in one direction and stop; no perpetual or random motion.
      const revealTargets = [
        ".rl-intro-layout", ".rl-outcomes-heading", ".rl-outcome-explorer",
        ".rl-agenda-heading", ".rl-agenda-layout", ".rl-series-heading",
        ".rl-series-layout", ".rl-logistics-grid", ".rl-close .rl-section-wrap"
      ];
      revealTargets.forEach(selector => {
        gsap.utils.toArray(selector, root).forEach(node => {
          gsap.fromTo(node,
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: .68, ease: "power3.out",
              scrollTrigger: { trigger: node, start: "top 82%", once: true } }
          );
        });
      });
      const outcomeVisual = root.querySelector(".rl-stage-art");
      if (outcomeVisual) gsap.fromTo(outcomeVisual, { y: 34, scale: .94, autoAlpha: 0, rotate: -2 }, { y: 0, scale: 1, autoAlpha: 1, rotate: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: ".rl-outcome-explorer", start: "top 76%", once: true } });

      const cards = gsap.utils.toArray(".rl-bento-story > article", root);
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 28, autoAlpha: 0, scale: .985 },
          { y: 0, autoAlpha: 1, scale: 1, duration: .62, stagger: .11,
            ease: "power3.out",
            scrollTrigger: { trigger: ".rl-bento-story", start: "top 78%", once: true } }
        );
      }
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const stage = pageRef.current?.querySelector(".rl-outcome-stage");
    if (!stage) return;
    stage.classList.remove("rl-stage-updated");
    // Force a single animation restart after the selected milestone changes.
    void stage.offsetWidth;
    stage.classList.add("rl-stage-updated");
  }, [activeOutcome]);


  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const onAnchorClick = event => {
      const link = event.target.closest("a[href^='#']");
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = root.querySelector(id);
      if (!target) return;
      event.preventDefault();
      if (window.location.hash !== id) window.history.pushState(null, "", id);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };
    root.addEventListener("click", onAnchorClick);
    return () => root.removeEventListener("click", onAnchorClick);
  }, []);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const root = pageRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const links = [...root.querySelectorAll(".rl-header nav a[href^='#']")];
    const sections = links.map(link => root.querySelector(link.getAttribute("href"))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.toggle("rl-nav-active", link.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-22% 0px -68% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <div className="react-launchpad-page" ref={pageRef}>
    <div className="rl-scroll-progress" ref={progressRef} aria-hidden="true"/>
    <WorkshopHeader mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}/>
    <main>
      <section className="rl-hero" id="top">
        <div className="rl-hero-glow rl-glow-one"/><div className="rl-hero-glow rl-glow-two"/>
        <div className="rl-hero-content">
          <div className="rl-kicker"><span className="rl-kicker-dot"/> RVS COLLEGE OF ENGINEERING & TECHNOLOGY <span className="rl-kicker-line"/> WORKSHOP SERIES / 2026</div>
          <div className="rl-hero-grid">
            <div className="rl-hero-copy">
              <p className="rl-overline">THE FIRST RELEASE · REACT EDITION</p>
              <h1>Make ideas<br/><em>interactive.</em></h1>
              <p className="rl-hero-subtitle">Build your first project board with React.</p>
              <p className="rl-hero-description">A hands-on, three-hour workshop where React fundamentals become a product you can make your own.</p>
              <div className="rl-hero-actions"><a className="rl-button-primary" href="#outcomes">Explore the workshop <ArrowUpRight size={16}/></a><a className="rl-text-cta" href="#agenda">See the session <ArrowDown size={15}/></a></div>
              <div className="rl-hero-facts"><span><b>180</b> minutes</span><i/><span><b>01</b> product</span><i/><span><b>Zero</b> React required</span></div>
            </div>
            <div className="rl-hero-art">
              <div className="rl-gradient-pane rl-pane-main"><span className="rl-pane-no">01 / MAKE</span><div className="rl-glass-orb"/><div className="rl-pane-caption"><b>BuildBoard</b><span>Ideas into action.</span></div></div>
              <div className="rl-gradient-pane rl-pane-side"><span>02 / MOVE</span><div className="rl-side-streak"/></div>
              <div className="rl-floating-chip rl-chip-a"><Sparkles size={14}/> Learn by building</div><div className="rl-floating-chip rl-chip-b"><Zap size={14}/> React foundations</div>
            </div>
          </div>
          <div className="rl-hero-bottom"><span>DESIGNED FOR CURIOUS BEGINNERS</span><a href="#experience">SCROLL TO EXPLORE <ArrowDown size={13}/></a></div>
        </div>
      </section>

      <section className="rl-intro" id="experience">
        <div className="rl-section-wrap">
          <div className="rl-section-eyebrow"><span>01</span> THE EXPERIENCE <i> / </i> A PROJECT-FIRST INTRODUCTION</div>
          <div className="rl-intro-layout"><h2>Less watching.<br/><em>More building.</em></h2><div><p className="rl-intro-lead">What if your first React lesson ended with something you could actually use?</p><p>Meet BuildBoard: a lightweight project board for student teams. We'll build it in small, understandable steps, with every concept introduced right before it becomes useful.</p></div></div>
          <div className="rl-bento rl-bento-story" aria-label="Four stages of the workshop">
            <article className="rl-bento-product rl-tilt-card"><span className="rl-card-index">01 / THE OUTCOME</span><div className="rl-bento-number">01</div><h3>A working<br/>project board.</h3><p>Create tasks, move work, search and save progress.</p><div className="rl-bento-card-orbit" aria-hidden="true">✳</div><div className="rl-bento-product-track"><span>IDEA</span><i/><span>INTERFACE</span><i/><span>PRODUCT</span></div></article>
            <article className="rl-bento-method rl-tilt-card"><span className="rl-card-index">02 / THE METHOD</span><div className="rl-bento-method-copy"><h3>See it.<br/>Build it.<br/><em>Make it yours.</em></h3><p>Observe a real interaction, build it together, then take the wheel.</p></div><div className="rl-method-steps"><span>SEE</span><b>→</b><span>BUILD</span><b>→</b><span>MAKE</span></div><div className="rl-bento-signal" aria-hidden="true"><span/><span/><span/><span/><span/></div></article>
            <article className="rl-bento-concepts rl-tilt-card"><span className="rl-card-index">03 / THE TOOLKIT</span><div className="rl-concept-pills">{["JSX","Components","Props","useState","Events","Forms","Lists","localStorage"].map(x=><span key={x}>{x}</span>)}</div><h3>Small concepts.<br/>Visible payoff.</h3><p>Every new tool unlocks something you can see.</p></article>
            <article className="rl-bento-time rl-tilt-card"><span className="rl-card-index">04 / THE FORMAT</span><strong>180<span>min</span></strong><p>One focused, hands-on session.</p><div className="rl-time-ring">3<br/><small>HOURS</small></div><div className="rl-time-pulse" aria-hidden="true"/></article>
          </div>
        </div>
      </section>


      <section className="rl-outcomes rl-outcomes-reimagined" id="outcomes">
        <div className="rl-section-wrap">
          <div className="rl-section-eyebrow"><span>02</span> THE TAKEAWAY <i> / </i> YOUR FIRST REACT MILESTONE</div>
          <div className="rl-outcomes-heading"><div><h2>From blank canvas<br/><em>to your first product.</em></h2><p>A guided build, a creative challenge, and a foundation you can keep extending.</p></div><span className="rl-outcomes-stamp"><Sparkles size={16}/> MADE BY YOU</span></div>
          <div className="rl-outcome-explorer">
            <div className="rl-outcome-rail" role="tablist" aria-label="Workshop outcomes">
              {outcomes.map((item,index)=><button key={item.number} className={activeOutcome===index?"rl-outcome-choice is-active":"rl-outcome-choice"} role="tab" id={`rl-outcome-tab-${index}`} aria-selected={activeOutcome===index} aria-controls="rl-outcome-showcase" onClick={()=>setActiveOutcome(index)}><span className="rl-outcome-choice-number">{item.number}</span><span className="rl-outcome-choice-copy"><b>{item.title}</b><small>{item.tag}</small></span><ArrowUpRight size={16} className="rl-outcome-choice-arrow"/></button>)}
              <div className="rl-outcome-rail-footer"><span>SELECT A MILESTONE</span><span>0{activeOutcome+1} <i>/ 04</i></span></div>
            </div>
            <div className="rl-outcome-stage" id="rl-outcome-showcase" role="tabpanel" aria-labelledby={`rl-outcome-tab-${activeOutcome}`}>
              <div className={"rl-stage-art rl-stage-art-" + activeOutcome} aria-hidden="true"><div className="rl-stage-halo"/><div className="rl-art-frame rl-art-components"><div className="rl-art-window"><span className="rl-art-window-dots">•••</span><small>TaskCard.jsx</small><div className="rl-art-code"><i/><i/><i/><i/><i/></div></div><div className="rl-art-float-card"><b>TaskCard</b><span>Reusable component</span><em>↗</em></div></div><div className="rl-art-frame rl-art-state"><div className="rl-art-board"><span>TO DO</span><b>Design card</b><small>Priority · High</small><div className="rl-art-moving-task">Build UI <i>→</i></div></div><div className="rl-art-state-cursor">↗</div></div><div className="rl-art-frame rl-art-memory"><div className="rl-art-storage"><span>LOCAL STORAGE</span><b>buildboard.tasks</b><div>{"{ tasks: [...] }"}</div><small>Saved in this browser</small></div><div className="rl-art-refresh">↻</div></div><div className="rl-art-frame rl-art-sprint"><div className="rl-art-sprint-note"><span>MINI CHALLENGE</span><b>Make it yours.</b><small>+ Add a due date</small><small>✓ Filter by priority</small></div><div className="rl-art-spark">✳</div></div><div className="rl-stage-art-caption"><span>BUILDBOARD / MILESTONE 0{activeOutcome+1}</span><i/></div></div>
              <div className="rl-stage-content"><span className="rl-stage-kicker"><Sparkles size={13}/> SKILL UNLOCKED <i>{outcomes[activeOutcome].tag}</i></span><h3>{outcomes[activeOutcome].title}</h3><p>{outcomes[activeOutcome].summary}</p><div className="rl-stage-skills">{outcomes[activeOutcome].skills.map(skill=><span key={skill}>{skill}</span>)}</div><div className="rl-stage-takeaway"><span>YOU’LL WALK AWAY WITH</span><b>{outcomes[activeOutcome].takeaway}</b></div><div className="rl-stage-controls"><div className="rl-stage-progress" aria-hidden="true">{outcomes.map((item,index)=><i key={item.number} className={index<=activeOutcome?"is-filled":""}/>)}</div><button type="button" onClick={()=>setActiveOutcome((activeOutcome+1)%outcomes.length)} aria-label="Explore next outcome">NEXT OUTCOME <ArrowUpRight size={15}/></button></div></div>
            </div>
          </div>
          <div className="rl-outcomes-note"><span className="rl-note-mark">✳</span><p><b>One product. Every concept has a purpose.</b><br/>React + Vite + JavaScript + CSS + localStorage. No backend setup or advanced state libraries in session one.</p></div>
        </div>
      </section>

      <section className="rl-agenda" id="agenda">
        <div className="rl-section-wrap">
          <div className="rl-section-eyebrow"><span>03</span> THE SESSION <i> / </i> 180 MINUTES</div>
          <div className="rl-agenda-heading"><h2>A clear path<br/><em>to the build.</em></h2><p>Open any session stop to see what happens inside that block.</p></div>
          <div className="rl-agenda-layout">
            <div className="rl-agenda-list">{agenda.map((item,index)=><button key={item.time} className={activeAgenda===index?"rl-agenda-item is-active":"rl-agenda-item"} onClick={()=>setActiveAgenda(index)}><span className="rl-agenda-time">{item.time}</span><span className="rl-agenda-title">{item.title}</span><span className="rl-agenda-duration">{item.duration}</span><ChevronDown size={15}/></button>)}</div>
            <article className="rl-agenda-detail" aria-live="polite"><div className="rl-agenda-detail-content" key={activeAgenda}><span>SESSION BLOCK / {String(activeAgenda+1).padStart(2,"0")}</span><div className="rl-agenda-detail-time">{agenda[activeAgenda].time}</div><h3>{agenda[activeAgenda].title}</h3><p>{agenda[activeAgenda].detail}</p><div className="rl-agenda-progress"><i style={{width:`${((activeAgenda+1)/agenda.length)*100}%`}}/></div><div className="rl-agenda-detail-foot"><span>WORKSHOP 01</span><span>{agenda[activeAgenda].duration}</span></div></div></article>
          </div>
        </div>
      </section>

      <section className="rl-series" id="series">
        <div className="rl-section-wrap">
          <div className="rl-section-eyebrow"><span>04</span> THE ROAD AHEAD <i> / </i> ONE PRODUCT, MORE CAPABILITY</div>
          <div className="rl-series-heading"><h2>Start with a board.<br/><em>Grow into a product.</em></h2><p>BuildBoard evolves as the workshops progress. Each session is a milestone, not a prerequisite trap.</p></div>
          <div className="rl-series-layout">
            <div className="rl-series-list">{series.map((item,index)=><button key={item[0]} className={expandedSeries===index?"rl-series-item is-active":"rl-series-item"} onClick={()=>setExpandedSeries(index)}><span>{item[0]}</span><b>{item[1]}</b>{item[3]&&<i>{item[3]}</i>}<ArrowUpRight size={16}/></button>)}</div>
            <article className="rl-series-detail" aria-live="polite"><div className="rl-series-detail-content" key={expandedSeries}><div className="rl-series-orb">0{expandedSeries+1}</div><span>THE NEXT MILESTONE</span><h3>{series[expandedSeries][1]}</h3><p>{series[expandedSeries][2]}</p><div>RVS REACT LAUNCHPAD <i>·</i> WORKSHOP SERIES</div></div></article>
          </div>
        </div>
      </section>

      <section className="rl-logistics">
        <div className="rl-section-wrap rl-logistics-grid">
          <div><div className="rl-section-eyebrow"><span>05</span> GETTING READY</div><h2>Bring your<br/><em>curiosity.</em></h2><p>Basic HTML, CSS and JavaScript are enough to get started. No prior React experience is expected.</p><div className="rl-setup-list"><span><Check/> Laptop + browser</span><span><Check/> VS Code</span><span><Check/> Node.js + npm</span><span><Check/> Basic HTML/CSS/JavaScript</span></div></div>
          <div className="rl-facilitator"><span>YOUR FACILITATOR</span><h3>Sourabh Kumar Ravi</h3><p>Software engineer working across frontend engineering, full-stack applications and AI-powered products.</p><div className="rl-facilitator-links"><a href="https://sourabhravi.site" target="_blank" rel="noreferrer">Portfolio <ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/in/sourabh-k-ravi/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a></div></div>
        </div>
      </section>

      <section className="rl-close">
        <div className="rl-close-orb"/><div className="rl-section-wrap"><span>RVS REACT LAUNCHPAD / WORKSHOP 01</span><h2>Let's make<br/><em>something useful.</em></h2><p>A first React project, built together.</p><a href="mailto:sourabh.k.ravi@gmail.com?subject=RVS%20React%20Launchpad%20at%20RVS%20College">Discuss the workshop <ArrowUpRight size={17}/></a><a className="rl-back" href="/">← Back to portfolio</a></div>
      </section>
    </main>
    <footer className="rl-footer"><a href="/">SR✳</a><span>RVS REACT LAUNCHPAD · DESIGNED TO BUILD</span><a href="#top">BACK TO TOP ↑</a></footer>
  </div>;
}
