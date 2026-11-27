import React from "react";
import { ArrowUpRight, Check, Clock3, Laptop2, Sparkles } from "lucide-react";
import { agenda, faqs, method, outcomes, pathway } from "../data";

export function MethodSection() {
  return (
    <section className="ws-method ws-section" id="method">
      <div className="ws-section-top ws-reveal">
        <span className="ws-index">01 / THE APPROACH</span>
        <span className="ws-section-aside">A BETTER WAY TO LEARN</span>
      </div>
      <div className="ws-method-heading">
        <h2 className="ws-display ws-reveal">Less theory<br /><em>in the abstract.</em></h2>
        <p className="ws-lead ws-reveal">A product gives every concept a reason to exist. We learn the idea, use it, and see what it changes.</p>
      </div>
      <div className="ws-method-grid ws-reveal-group">
        {method.map((item) => (
          <article className="ws-method-card ws-reveal-item" key={item.number}>
            <div className="ws-method-card-top"><span>{item.number}</span><ArrowUpRight size={17} /></div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <span className="ws-method-note">{item.note}</span>
          </article>
        ))}
      </div>
      <div className="ws-method-caption"><span>THE RHYTHM</span><b>LOOK → UNDERSTAND → BUILD → EXPLORE</b></div>
    </section>
  );
}

export function OutcomesSection() {
  return (
    <section className="ws-outcomes ws-section" id="outcomes">
      <div className="ws-outcomes-intro">
        <div className="ws-section-top ws-reveal"><span className="ws-index">03 / WHAT STICKS</span><span className="ws-section-aside">THE TAKEAWAYS</span></div>
        <h2 className="ws-display ws-reveal">A few ideas<br />you'll <em>keep.</em></h2>
        <p className="ws-lead ws-reveal">By the end, you'll have a clearer mental model of React and a small project that proves those pieces can work together.</p>
        <div className="ws-outcomes-signoff"><span>01 SESSION</span><span>06 CORE CONCEPTS</span><span>01 WORKING PROJECT</span></div>
      </div>
      <div className="ws-outcome-list ws-reveal-group">
        {outcomes.map(([title, description], index) => (
          <article className="ws-outcome-row ws-reveal-item" key={title}>
            <span className="ws-outcome-number">0{index + 1}</span>
            <div><h3>{title}</h3><p>{description}</p></div>
            <Check size={17} />
          </article>
        ))}
      </div>
    </section>
  );
}

export function AgendaSection() {
  return (
    <section className="ws-agenda ws-section" id="schedule">
      <div className="ws-agenda-heading">
        <div className="ws-section-top ws-reveal"><span className="ws-index">04 / THE RUN OF SHOW</span><span className="ws-section-aside">180 MINUTES, WELL SPENT</span></div>
        <h2 className="ws-display ws-reveal">A clear path.<br /><em>No mystery jumps.</em></h2>
        <p className="ws-lead ws-reveal">The session moves from a product walkthrough to a guided build, then gives you room to stretch what you've learned.</p>
      </div>
      <div className="ws-agenda-list">
        {agenda.map((item, index) => (
          <article className="ws-agenda-row ws-reveal" key={item.time}>
            <div className="ws-agenda-time"><b>{item.time}</b><span>{item.end}</span></div>
            <div className="ws-agenda-content"><span>CHAPTER 0{index + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></div>
            <div className="ws-agenda-duration"><Clock3 size={14} /> {index === 3 ? "10 MIN BREAK" : "GUIDED"}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PathwaySection() {
  return (
    <section className="ws-pathway ws-section" id="pathway">
      <div className="ws-pathway-top">
        <div><span className="ws-index">05 / THE BIGGER PICTURE</span><h2 className="ws-display">One good start<br />opens <em>new doors.</em></h2></div>
        <p className="ws-lead">The first session is deliberately focused. The wider series shows where you can take the same ideas next.</p>
      </div>
      <div className="ws-pathway-list">
        {pathway.map((item, index) => (
          <article className={"ws-pathway-item ws-reveal" + (index === 0 ? " is-current" : "")} key={item.number}>
            <span className="ws-pathway-number">{item.number}</span>
            <div className="ws-pathway-main"><h3>{item.title}</h3><p>{item.detail}</p></div>
            <span className="ws-pathway-status">{item.status}</span>
            <ArrowUpRight size={17} />
          </article>
        ))}
      </div>
      <p className="ws-pathway-footnote"><Sparkles size={15} /> Each workshop is designed to stand on its own. Come back when you're ready for the next layer.</p>
    </section>
  );
}

export function AudienceSection() {
  return (
    <section className="ws-audience ws-section">
      <div className="ws-audience-heading">
        <span className="ws-index">06 / BEFORE YOU JOIN</span>
        <h2 className="ws-display">A good fit<br /><em>starts here.</em></h2>
      </div>
      <div className="ws-audience-grid">
        <article className="ws-audience-card ws-audience-good ws-reveal">
          <span className="ws-audience-label">THIS SESSION IS FOR YOU IF…</span>
          <ul>
            <li><Check size={16} /> You know the basics of HTML, CSS and JavaScript.</li>
            <li><Check size={16} /> You want to understand React by building something.</li>
            <li><Check size={16} /> You learn best by following a real, guided project.</li>
          </ul>
        </article>
        <article className="ws-audience-card ws-audience-setup ws-reveal">
          <span className="ws-audience-label">BRING THESE THREE THINGS</span>
          <ul>
            <li><Laptop2 size={16} /> A laptop and a modern browser.</li>
            <li><Code2Icon /> Node.js and a code editor such as VS Code.</li>
            <li><Sparkles size={16} /> Questions, patience and curiosity.</li>
          </ul>
        </article>
      </div>
      <p className="ws-audience-footnote">No prior React experience is expected. We keep the first session focused on the browser, React and localStorage.</p>
    </section>
  );
}

function Code2Icon() {
  return <span className="ws-code-icon">{"</>"}</span>;
}

export function FAQSection() {
  return (
    <section className="ws-faq ws-section" id="faq">
      <div className="ws-faq-heading">
        <span className="ws-index">07 / GOOD TO KNOW</span>
        <h2 className="ws-display">A few things<br />worth <em>knowing.</em></h2>
      </div>
      <div className="ws-faq-list">
        {faqs.map((item) => (
          <details className="ws-faq-item" key={item.question}>
            <summary><span>{item.question}</span><b>+</b></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function JoinSection() {
  return (
    <section className="ws-join" id="join">
      <div className="ws-join-orb ws-join-orb-one" aria-hidden="true" />
      <div className="ws-join-orb ws-join-orb-two" aria-hidden="true" />
      <div className="ws-join-top"><span>ONE PROJECT. THREE HOURS.</span><span>YOUR TURN TO BUILD</span></div>
      <div className="ws-join-main">
        <div>
          <span className="ws-join-kicker">START WITH A SMALL, REAL THING</span>
          <h2>Let's make<br /><em>your first one.</em></h2>
        </div>
        <div className="ws-join-copy">
          <p>Bring your laptop and your questions. We'll bring a clear path, a working product to build, and space to experiment.</p>
          <a className="ws-button ws-button-dark" href={"mailto:sourabh.k.ravi@gmail.com?subject=" + encodeURIComponent("React workshop interest")}>
            I'M INTERESTED <ArrowUpRight size={17} />
          </a>
          <span>REACT + VITE · 180 MINUTES · GUIDED BUILD</span>
        </div>
      </div>
      <div className="ws-join-bottom">
        <a href="/">← BACK TO PORTFOLIO</a>
        <span>MADE FOR PEOPLE WHO WANT TO MAKE THINGS</span>
        <a href="#top">BACK TO THE TOP ↑</a>
      </div>
    </section>
  );
}
