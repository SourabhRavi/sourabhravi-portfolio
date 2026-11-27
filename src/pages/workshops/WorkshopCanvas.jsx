import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Laptop,
  Sparkles, Terminal
} from "lucide-react";
import "./workshop-canvas.css";

gsap.registerPlugin(ScrollTrigger);

const starterTasks = [
  { id: 1, title: "Sketch the first screen", tag: "DESIGN", status: "todo" },
  { id: 2, title: "Build a TaskCard component", tag: "REACT", status: "doing" },
  { id: 3, title: "Make the board respond", tag: "STATE", status: "done" },
];
const columns = [
  { key: "todo", label: "UP NEXT", color: "blue" },
  { key: "doing", label: "IN THE WORKS", color: "orange" },
  { key: "done", label: "SHIPPED", color: "green" },
];

function BoardPlayground() {
  const [tasks, setTasks] = useState(starterTasks);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("");
  const moveTask = (id, status) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task));
  const addTask = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks((current) => [...current, { id: Date.now(), title: title.trim(), tag: "YOUR IDEA", status: "todo" }]);
    setTitle("");
  };
  const visibleTasks = tasks.filter((task) => task.title.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="wc-board" aria-label="Interactive preview of the workshop project board">
      <div className="wc-board-top">
        <div className="wc-board-brand"><span className="wc-board-mark">B</span><div><strong>buildboard</strong><small>YOUR FIRST REACT PRODUCT</small></div></div>
        <label className="wc-board-search"><span>⌕</span><input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Find a task..." aria-label="Search tasks" /></label>
        <span className="wc-board-live"><i /> LIVE DEMO</span>
      </div>
      <form className="wc-add-task" onSubmit={addTask}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a task to your board..." aria-label="New task title" maxLength={70} />
        <button type="submit" disabled={!title.trim()}><span>ADD TASK</span><ArrowRight size={16}/></button>
      </form>
      <div className="wc-board-columns">
        {columns.map((column) => (
          <section className={`wc-board-column wc-column-${column.color}`} key={column.key}>
            <header><span className="wc-column-dot"/><span>{column.label}</span><b>{visibleTasks.filter((task) => task.status === column.key).length.toString().padStart(2, "0")}</b></header>
            <div className="wc-task-list">
              {visibleTasks.filter((task) => task.status === column.key).map((task) => (
                <article className="wc-task" key={task.id}>
                  <span className="wc-task-tag">{task.tag}</span><p>{task.title}</p>
                  <div className="wc-task-foot"><span>#{String(task.id).slice(-3)}</span>
                    <div className="wc-task-actions">
                      {columns.filter((item) => item.key !== task.status).map((item) => <button key={item.key} onClick={() => moveTask(task.id, item.key)} aria-label={`Move ${task.title} to ${item.label}`} title={`Move to ${item.label}`}>→</button>)}
                    </div>
                  </div>
                </article>
              ))}
              {visibleTasks.filter((task) => task.status === column.key).length === 0 && <div className="wc-empty">Nothing here. Yet.</div>}
            </div>
          </section>
        ))}
      </div>
      <div className="wc-board-bottom"><span><span className="wc-board-check">✓</span> Changes happen in your browser</span><span>{tasks.length} TASKS <i>·</i> 3 STATES</span></div>
    </div>
  );
}

function SectionStamp({ number, label, light = false }) {
  return <div className={`wc-stamp ${light ? "wc-stamp-light" : ""}`}><span>{number}</span><b>{label}</b><i /></div>;
}

export default function WorkshopCanvas() {
  const root = useRef(null);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (!root.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.utils.toArray(".wc-reveal").forEach((element) => {
        gsap.fromTo(element, { y: 28, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true }
        });
      });
      gsap.to(".wc-progress>div", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.25 }
      });
      gsap.utils.toArray(".wc-line-reveal").forEach((element) => {
        gsap.fromTo(element, { clipPath: "inset(0 0 100% 0)" }, {
          clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.inOut",
          scrollTrigger: { trigger: element, start: "top 86%", once: true }
        });
      });
      gsap.to(".wc-hero-orbit", { rotation: "+=360", duration: 34, ease: "none", repeat: -1 });
      gsap.to(".wc-mini-window", { y: -13, rotation: -1.5, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".wc-art-sticker", { y: 12, rotation: 18, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".wc-hero-orbit span:nth-child(1)", { scale: 1.55, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".wc-hero-orbit span:nth-child(2)", { scale: 1.35, duration: 2.3, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".wc-hero-orbit span:nth-child(3)", { scale: 1.7, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".wc-hero-art", { y: -24, ease: "none", scrollTrigger: { trigger: ".wc-hero", start: "top top", end: "bottom top", scrub: 1 } });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <main className="workshop-canvas" ref={root}>
      <div className="wc-progress" aria-hidden="true"><div /></div>
      <header className="wc-nav">
        <a className="wc-wordmark" href="/workshops/react-launchpad" aria-label="Workshop home"><span>W</span><b>WORKSHOP<br/>SERIES / 01</b></a>
        <div className="wc-nav-note"><i/> OPEN FOR COLLEGE COLLABORATIONS</div>
        <a className="wc-nav-cta" href="#register">SAVE YOUR SEAT <ArrowUpRight size={15}/></a>
      </header>

      <section className="wc-hero" id="top">
        <div className="wc-hero-grid" aria-hidden="true"/>
        <div className="wc-hero-inner">
          <div className="wc-hero-copy">
            <div className="wc-kicker"><span>REACT STARTER WORKSHOP</span><b>NO EXPERIENCE WITH REACT? GOOD.</b></div>
            <h1 className="wc-line-reveal">Your first<br/>React app<br/><em>starts here.</em></h1>
            <p className="wc-hero-lead">Skip the tutorial tab spiral. Build a real, interactive project board with a team that makes the code make sense.</p>
            <div className="wc-hero-actions"><a className="wc-button wc-button-yellow" href="#build">SEE WHAT YOU'LL BUILD <ArrowDown size={17}/></a><a className="wc-hero-textlink" href="#workshop">THE 3-HOUR PLAN <ArrowRight size={16}/></a></div>
            <div className="wc-hero-facts"><span><b>03</b> HOURS</span><i/><span><b>01</b> WORKING APP</span><i/><span><b>0</b> REACT REQUIRED</span></div>
          </div>
          <div className="wc-hero-art" aria-label="Animated BuildBoard project interface preview"><span className="wc-hero-particle wc-particle-one" aria-hidden="true"/><span className="wc-hero-particle wc-particle-two" aria-hidden="true"/><span className="wc-hero-particle wc-particle-three" aria-hidden="true"/>
            <div className="wc-art-label wc-art-label-a">FROM STUDENT<br/>TO BUILDER <span>↗</span></div>
            <div className="wc-hero-orbit" aria-hidden="true"><span/><span/><span/></div>
            <div className="wc-art-sticker"><Sparkles size={18}/><b>LEARN<br/>BY MAKING</b></div>
            <div className="wc-mini-window">
              <div className="wc-mini-window-bar"><span/><span/><span/><b>buildboard.jsx</b></div>
              <div className="wc-mini-code"><small>01</small><code><i>const</i> idea = <em>"something real"</em>;</code><small>02</small><code><i>function</i> <strong>Build</strong>() {"{"}</code><small>03</small><code>  <u>learn</u>();</code><small>04</small><code>  <u>make</u>();</code><small>05</small><code>  <u>ship</u>();</code><small>06</small><code>{"}"}</code></div>
              <div className="wc-mini-window-foot"><span><i/> YOUR NEXT PROJECT</span><b>01 / 01</b></div>
            </div>
            <div className="wc-art-label wc-art-label-b">BASIC JS IN.<br/>CONFIDENCE OUT.</div>
          </div>
        </div>
        <div className="wc-hero-bottom"><span>SCROLL TO GET THE BLUEPRINT</span><span>↓</span><span>BUILT FOR CURIOUS BTECH STUDENTS</span></div>
      </section>

      <section className="wc-intro wc-reveal-group">
        <div className="wc-intro-side"><SectionStamp number="01" label="THE WHY"/><span>LESS WATCHING.<br/>MORE BUILDING.</span></div>
        <h2 className="wc-reveal">React clicks when<br/>you <em>make it move.</em></h2>
        <p className="wc-reveal">You already know the web can do more than display a page. In this workshop, you'll make a small product respond to people: add work, change its state, find tasks, and keep your progress after refresh.</p>
        <div className="wc-intro-badge wc-reveal"><span>THE TAKEAWAY</span><b>A working project.<br/>A clearer mental model.</b><i>✳</i></div>
      </section>

      <section className="wc-build" id="build">
        <div className="wc-build-head wc-reveal-group">
          <SectionStamp number="02" label="THE BUILD"/>
          <div className="wc-build-title"><span className="wc-overline">MEET YOUR WORKSHOP PROJECT</span><h2 className="wc-line-reveal">This is <em>BuildBoard.</em></h2><p>A project board inspired by the tools real teams use. Familiar enough to understand. Rich enough to teach you React.</p></div>
          <div className="wc-build-note"><span>PRODUCT BRIEF / 001</span><b>Not a screenshot.<br/>A set of decisions.</b><p>Every button has a job. Every interaction teaches a concept.</p></div>
        </div>
        <div className="wc-demo-wrap wc-reveal"><div className="wc-demo-top"><span><i/> TRY THE MINI BOARD</span><span>INTERACTIVE · NO SIGN-IN</span></div><BoardPlayground/><div className="wc-demo-caption"><span>PLAY WITH IT.</span><p>Add a task. Move it through the workflow. That's state, events and rendering working together.</p><b>YOU'LL BUILD THE FULL VERSION IN THE SESSION ↗</b><a className="wc-demo-faq-link" href="#faq">Got questions before you join? Browse the FAQs ↗</a></div></div>
        <div className="wc-build-bottom"><span>THE STACK</span><div><b>REACT</b><b>VITE</b><b>JAVASCRIPT</b><b>CSS</b><b>LOCALSTORAGE</b></div><span>NO BACKEND. NO MAGIC.</span></div>
      </section>

      <section className="wc-outcomes wc-reveal-group">
        <div className="wc-outcomes-heading"><SectionStamp number="03" label="WHAT YOU LEARN" light/><h2 className="wc-reveal">Concepts you'll<br/><em>actually use.</em></h2><p className="wc-reveal">No slide-deck marathon. Each concept appears because the product needs it, then you use it straight away.</p></div>
        <div className="wc-concept-grid">
          {[["01","JSX + components","Turn a screen into reusable pieces."],["02","Props + composition","Pass data and build UI from parts."],["03","State + events","Make the interface react to actions."],["04","Controlled forms","Handle user input properly."],["05","Lists + keys","Render changing collections reliably."],["06","Derived state","Search and filter without duplicating data."],["07","localStorage","Keep the board after a refresh."]].map(([n,title,body])=><article className="wc-concept wc-reveal" key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowUpRight size={17}/></article>)}
        </div>
      </section>

      <section className="wc-agenda" id="workshop">
        <div className="wc-agenda-head wc-reveal-group"><SectionStamp number="04" label="THE SESSION"/><h2 className="wc-line-reveal">180 minutes.<br/><em>One big leap.</em></h2><p>A paced, checkpoint-based session. You'll have time to understand, build, reset and show what you made.</p><div className="wc-agenda-total"><b>03:00</b><span>HOURS TOTAL<br/>INCLUDING A SHORT BREAK</span></div></div>
        <div className="wc-timeline">
          {[["00:00","00:15","Meet the product","See the finished board. Understand the goal before opening the editor."],["00:15","00:40","Components, JSX + props","Build the first pieces and connect them."],["00:40","01:05","State + events","Make the board respond to clicks and changes."],["01:05","01:15","Reset break","Ten minutes away from the screen."],["01:15","01:45","Forms + task flow","Create tasks and wire up user input."],["01:45","02:10","Search + derived state","Filter the board without duplicating state."],["02:10","02:35","Save it with localStorage","Refresh without losing the work."],["02:35","02:50","Mini challenge","Add a small feature of your own."],["02:50","03:00","Demo + recap","Share the build and connect the dots."]].map(([start,end,title,detail],i)=><article className="wc-time-row wc-reveal" key={start}><span className="wc-time">{start}<small>– {end}</small></span><span className="wc-time-node">{i===3?<span>Ⅱ</span>:String(i+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{detail}</p></div><span className="wc-time-duration">{i===3?"BREAK":i===8?"WRAP":"BUILD"}</span></article>)}
        </div>
      </section>

      <section className="wc-prereq wc-reveal-group">
        <SectionStamp number="06" label="BEFORE YOU JOIN"/>
        <div className="wc-prereq-content"><h2 className="wc-reveal">You don't need React.<br/><em>Just the web basics.</em></h2><div className="wc-prereq-cards"><article className="wc-prereq-card wc-reveal"><Laptop size={22}/><h3>Bring your laptop</h3><p>VS Code (or your editor), a modern browser and Node.js installed. Setup guidance can be shared before the session.</p></article><article className="wc-prereq-card wc-reveal"><Code2 size={22}/><h3>Know the basics</h3><p>HTML, CSS, JavaScript fundamentals: functions, arrays and objects. React experience is not expected.</p></article><article className="wc-prereq-card wc-reveal"><Terminal size={22}/><h3>Start where you are</h3><p>If a setup issue or concept slows you down, checkpoints and starter code help you rejoin the build.</p></article></div></div>
      </section>

      <section className="wc-faq" id="faq">
        <div className="wc-faq-inner">
          <div className="wc-faq-heading">
            <SectionStamp number="07" label="GOOD TO KNOW"/>
            <h2 className="wc-reveal">Questions?<br/><em>Good ones.</em></h2>
            <p className="wc-reveal">The practical details, without the mystery.</p>
            <a className="wc-faq-contact" href="mailto:sourabh.k.ravi@gmail.com?subject=React%20Workshop%20Question">ASK SOMETHING ELSE <ArrowUpRight size={15}/></a>
          </div>
          <div className="wc-faq-list">
            {[
              ["Do I need to know React already?","No. The workshop starts with the fundamentals. Basic HTML, CSS and JavaScript are the prerequisites."],
              ["What should I install before joining?","Bring a laptop with VS Code (or another editor), a modern browser and Node.js. Setup guidance can be shared before the session."],
              ["What will I build?","A small interactive project board called BuildBoard. You'll add tasks, move them between states, search and save the board in your browser."],
              ["Is this a 3-hour lecture?","No. It's a guided build with checkpoints, a short break, a mini challenge and a final showcase."],
              ["Do I need a backend or paid tools?","No backend, account or paid tool is required. The project uses React, Vite, JavaScript, CSS and localStorage."],
              ["Will I leave with a project?","You'll work toward a functioning starter project and learn how its pieces fit together. Your final progress depends on participation and setup."],
              ["How do I arrange a workshop?","Use the enquiry button below or email directly. Share your preferred dates and approximate participant count."]
            ].map(([question,answer],index)=><details className="wc-faq-item wc-reveal" key={question}><summary><span>{String(index+1).padStart(2,"0")}</span><b>{question}</b><i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}
          </div>
        </div>
        <div className="wc-faq-bottom"><span>STILL CURIOUS?</span><p>Tell me what you're wondering. I'll help you figure out whether this workshop fits.</p><a href="mailto:sourabh.k.ravi@gmail.com?subject=React%20Workshop%20Enquiry">LET'S TALK ABOUT IT <ArrowUpRight size={16}/></a></div>
      </section>

      <section className="wc-next wc-reveal-group"><div className="wc-next-top"><SectionStamp number="08" label="AFTER THIS"/></div><h2 className="wc-line-reveal">One project down.<br/><em>A whole stack ahead.</em></h2><p className="wc-reveal">This is chapter one. Later sessions can take the same product further: APIs, routing, databases, real-time features, AI integrations and the practices that help software ship responsibly.</p><div className="wc-next-path">{[["02","Connect it","Routing + APIs"],["03","Store it","Node + database"],["04","Make it live","Realtime systems"],["05","Add intelligence","AI + responsible integration"],["06","Ship it","Testing + accessibility"]].map(([n,a,b])=><div key={n}><span>{n}</span><b>{a}</b><small>{b}</small></div>)}</div></section>

      <section className="wc-register" id="register"><div className="wc-register-pattern" aria-hidden="true"/><div className="wc-register-inner"><span className="wc-register-kicker"><i/> THE FIRST BUILD IS YOURS</span><h2>Less scrolling.<br/><em>More shipping.</em></h2><p>Bring your curiosity. Leave with a project you can explain, extend and make your own.</p><a className="wc-button wc-button-dark" href="mailto:sourabh.k.ravi@gmail.com?subject=React%20Workshop%20%7C%20College%20Collaboration">ENQUIRE ABOUT A WORKSHOP <ArrowUpRight size={18}/></a><span className="wc-register-foot">FOR STUDENT GROUPS · TECH CLUBS · AI COMMUNITIES</span></div><div className="wc-register-side"><span>WORKSHOP / 001</span><b>LEARN<br/>THROUGH<br/>BUILDING.</b><span>REACT FOUNDATIONS</span></div></section>
      <footer className="wc-footer"><a href="#top" className="wc-footer-mark">W<span>.</span></a><span>MAKE THE WEB MAKE SENSE.</span><a href="/">BACK TO PORTFOLIO ↗</a><span>© {new Date().getFullYear()} WORKSHOP SERIES</span></footer>
    </main>
  );
}
