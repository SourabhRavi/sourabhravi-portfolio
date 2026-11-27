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
  const essentials = ["A laptop", "Node.js installed", "A code editor + browser"];
  const [ready, setReady] = React.useState([]);
  const toggleReady = (item) => setReady((current) =>
    current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
  );

  return (
    <section className="ws-audience ws-section" id="prepare">
      <div className="ws-audience-heading ws-reveal">
        <span className="ws-index">06 / YOUR STARTING POINT</span>
        <h2 className="ws-display">Curious is enough.<br /><em>Let's get ready.</em></h2>
        <p className="ws-lead">You don't need a React portfolio or a perfect setup. Just a few basics and the willingness to try.</p>
      </div>
      <div className="ws-audience-grid">
        <article className="ws-audience-card ws-audience-good ws-reveal">
          <div className="ws-audience-card-head"><span className="ws-audience-label">THE STARTING LINE</span><span className="ws-audience-stamp">NO REACT NEEDED</span></div>
          <h3>You'll feel at home if…</h3>
          <ul>
            <li><Check size={16} /> HTML and CSS feel familiar.</li>
            <li><Check size={16} /> You know a little JavaScript: functions, arrays and objects.</li>
            <li><Check size={16} /> You'd rather learn by making than watching another tutorial.</li>
          </ul>
          <p className="ws-audience-card-note">New to React? Perfect. This session starts at the beginning.</p>
        </article>
        <article className="ws-audience-card ws-audience-setup ws-reveal">
          <div className="ws-audience-card-head"><span className="ws-audience-label">A TINY PRE-FLIGHT CHECK</span><span className="ws-audience-stamp">{ready.length}/{essentials.length} READY</span></div>
          <h3>Bring your build kit.</h3>
          <p className="ws-setup-intro">Tick these off before we meet. No complicated setup or accounts required.</p>
          <div className="ws-ready-list">
            {essentials.map((item, index) => (
              <button type="button" className={"ws-ready-item" + (ready.includes(item) ? " is-ready" : "")} key={item} onClick={() => toggleReady(item)} aria-pressed={ready.includes(item)}>
                <span className="ws-ready-check">{ready.includes(item) ? <Check size={14} /> : String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span><span className="ws-ready-toggle">{ready.includes(item) ? "READY" : "CHECK"}</span>
              </button>
            ))}
          </div>
          <p className="ws-ready-feedback" aria-live="polite">{ready.length === essentials.length ? "You're set. See you at the build." : "A quick check now means more time making later."}</p>
        </article>
      </div>
      <div className="ws-audience-footnote"><span>THE PROMISE</span><b>One focused frontend project. No backend, auth or database detours.</b></div>
    </section>
  );
}

function Code2Icon() {
  return <span className="ws-code-icon">{"</>"}</span>;
}

export function FAQSection() {
  return (
    <section className="ws-faq ws-section" id="faq">
      <div className="ws-faq-heading ws-reveal">
        <span className="ws-index">07 / THE PRACTICAL DETAILS</span>
        <h2 className="ws-display">Before you say<br /><em>I'm in.</em></h2>
        <p className="ws-lead">The useful details, without the fine-print fog.</p>
        <a className="ws-faq-contact" href={"mailto:sourabh.k.ravi@gmail.com?subject=" + encodeURIComponent("Question about the React workshop")}>Still wondering? Ask me <ArrowUpRight size={15} /></a>
      </div>
      <div className="ws-faq-side">
        <div className="ws-faq-note"><span>QUICK ANSWERS</span><b>01—05</b></div>
        <div className="ws-faq-list">
          {faqs.map((item, index) => (
            <details className="ws-faq-item ws-reveal" key={item.question}>
              <summary><span className="ws-faq-number">0{index + 1}</span><span className="ws-faq-question">{item.question}</span><b aria-hidden="true">+</b></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JoinSection() {
  return (
    <section className="ws-join" id="join">
      <div className="ws-join-gradient" aria-hidden="true"><i /><i /><i /></div>
      <div className="ws-join-top"><span>WORKSHOP 01 <i>·</i> REACT FOUNDATIONS</span><span>THREE HOURS / ONE REAL BUILD</span></div>
      <div className="ws-join-main">
        <div className="ws-join-headline ws-reveal">
          <span className="ws-join-kicker">A SMALL FIRST STEP. A REAL THING YOU MADE.</span>
          <h2>Your first React project<br /><em>starts here.</em></h2>
          <div className="ws-join-details"><span>01 <b>Guided build</b></span><span>02 <b>Hands-on checkpoints</b></span><span>03 <b>Your own mini-feature</b></span></div>
        </div>
        <div className="ws-join-copy ws-reveal">
          <p>Build a project board from a blank canvas to a working interface. Leave with the code, the concepts behind it, and a clearer next step.</p>
          <a className="ws-button ws-button-dark" href={"mailto:sourabh.k.ravi@gmail.com?subject=" + encodeURIComponent("I'm interested in the React workshop")}>
            TELL ME ABOUT THE NEXT SESSION <ArrowUpRight size={17} />
          </a>
          <a className="ws-join-secondary" href="#build">EXPLORE THE PROJECT FIRST <ArrowUpRight size={15} /></a>
          <span>NO PRIOR REACT EXPERIENCE · STARTER CODE FOR CATCH-UP</span>
        </div>
      </div>
      <div className="ws-join-bottom">
        <a href="/">← BACK TO PORTFOLIO</a>
        <span>MAKE SOMETHING. UNDERSTAND HOW IT WORKS.</span>
        <a href="#top">BACK TO THE TOP ↑</a>
      </div>
    </section>
  );
}
