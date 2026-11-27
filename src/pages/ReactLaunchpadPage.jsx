import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Clock3, Sparkles } from "lucide-react";
import "./react-launchpad.css";

gsap.registerPlugin(ScrollTrigger);

const agenda = [
 {time:"00:00",duration:"15 min",title:"Welcome + product walkthrough",detail:"Explore the product concept, then understand the React mental model."},
 {time:"00:15",duration:"25 min",title:"JSX, components + props",detail:"Turn the interface into reusable pieces."},
 {time:"00:40",duration:"25 min",title:"State + events",detail:"Create, update and remove tasks with interaction-driven state."},
 {time:"01:05",duration:"10 min",title:"Break",detail:"Reset, stretch and ask questions."},
 {time:"01:15",duration:"30 min",title:"Forms + task workflow",detail:"Controlled inputs and changing task status."},
 {time:"01:45",duration:"25 min",title:"Search + derived state",detail:"Filter the board without duplicating state."},
 {time:"02:10",duration:"25 min",title:"Persistence",detail:"Keep the board alive with localStorage."},
 {time:"02:35",duration:"15 min",title:"Independent mini-challenge",detail:"Choose a small feature and build it yourself."},
 {time:"02:50",duration:"10 min",title:"Showcase + recap",detail:"Share what you built and preview what's next."}
];
const outcomes = [
 {n:"01",title:"A real interface",tag:"COMPONENTS",summary:"Break a useful product into clear React components, then compose them into a coherent interface.",detail:"JSX, component boundaries and props. Every piece has a visible job.",takeaway:"A component-based interface you understand.",skills:["JSX","Components","Props"]},
 {n:"02",title:"UI that responds",tag:"STATE + EVENTS",summary:"Make buttons, forms and status changes feel immediate and intentional.",detail:"Use state and event handlers to make the interface respond to user choices.",takeaway:"A task flow that reacts to every click.",skills:["useState","Events","Forms"]},
 {n:"03",title:"A product that remembers",tag:"PERSISTENCE",summary:"Keep your work after a refresh and understand where browser storage fits.",detail:"Save a small amount of app state with localStorage, without needing a backend.",takeaway:"A board that survives a browser refresh.",skills:["localStorage","JSON","Effects"]},
 {n:"04",title:"Your own feature",tag:"CREATIVE SPRINT",summary:"Choose a mini-challenge, make a small design decision and show what you changed.",detail:"Add a due date, priority filter, task counter or another achievable improvement.",takeaway:"A personal feature you designed and shipped.",skills:["Explore","Design","Build"]}
];
const series = [
 ["01","React foundations","Components, state, events and local persistence.","YOU ARE HERE"],
 ["02","App architecture","Routing, custom hooks and API loading states."],
 ["03","Full-stack workflow","Node.js, Express, PostgreSQL and authentication."],
 ["04","Real-time collaboration","Shared updates and presence with Socket.IO."],
 ["05","AI-powered workflows","Secure AI integration for smarter task planning."],
 ["06","Ship with confidence","Testing, accessibility, security and deployment."]
];

function WorkshopHeader(){
 const [open,setOpen]=useState(false);
 return <header className="wk-nav"><a className="wk-brand" href="/" aria-label="Back to portfolio">SR<span>✳</span></a>
  <nav className={open?"is-open":""} onClick={()=>setOpen(false)}><a href="#experience">The experience</a><a href="#outcomes">What you'll build</a><a href="#agenda">The session</a><a href="#series">The journey</a></nav>
  <a className="wk-nav-cta" href="mailto:sourabh.k.ravi@gmail.com?subject=Workshop%20collaboration">Start a conversation <ArrowUpRight size={15}/></a>
  <button className="wk-menu" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?"Close":"Menu"} <span>＋</span></button>
 </header>;
}

function BoardArtwork(){
 return <div className="wk-board" aria-label="Illustration of the BuildBoard project board">
  <div className="wk-board-top"><span><i/> BUILDBOARD / STUDENT TEAM</span><b>•••</b></div>
  <div className="wk-board-title">Ideas into action<span>03 active projects</span></div>
  <div className="wk-board-columns">
   {["TO DO","IN PROGRESS","DONE"].map((name,i)=><div className="wk-board-col" key={name}><small>{name}<b>{[2,1,2][i]}</b></small>
    {[[["Design the flow","HIGH"],["Set up React","MED"]],[["Build task card","HIGH"]],[["Create project","DONE"],["Plan sprint","DONE"]]][i].map((task,j)=><article className={"wk-task task-"+i} key={task[0]}><span>{task[0]}</span><em>{task[1]}</em><i>{j?"◌":"✳"}</i></article>)}
   </div>)}
  </div>
  <div className="wk-board-foot"><span>LOCAL-FIRST · YOUR WORK, YOUR FLOW</span><span>DRAG THE IDEA FORWARD ↗</span></div>
 </div>;
}

export default function ReactLaunchpadPage(){
 const root=useRef(null),[outcome,setOutcome]=useState(0),[slot,setSlot]=useState(0),[milestone,setMilestone]=useState(0);
 useEffect(()=>{
  const el=root.current;if(!el)return;
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;
  const ctx=gsap.context(()=>{
   const hero=el.querySelector(".wk-hero");
   gsap.timeline({scrollTrigger:{trigger:hero,start:"top top",end:"bottom top",scrub:1.15}})
    .to(".wk-hero-type",{yPercent:-18,scale:.92,opacity:.28,ease:"none"},0)
    .to(".wk-board-wrap",{yPercent:18,rotate:2,scale:.94,ease:"none"},0)
    .to(".wk-hero-orbit",{rotate:28,scale:1.12,ease:"none"},0);
   gsap.utils.toArray("[data-wk-reveal]",el).forEach(node=>{
    gsap.fromTo(node,{y:34,autoAlpha:0},{y:0,autoAlpha:1,duration:.75,ease:"power3.out",scrollTrigger:{trigger:node,start:"top 86%",once:true}});
   });
   const cards=gsap.utils.toArray(".wk-experience-card",el);
   if(cards.length)gsap.fromTo(cards,{y:45,autoAlpha:0},{y:0,autoAlpha:1,stagger:.12,duration:.72,ease:"power3.out",scrollTrigger:{trigger:".wk-experience-grid",start:"top 78%",once:true}});
   const panels=gsap.utils.toArray(".wk-journey-panel",el);
   if(panels.length)gsap.fromTo(panels,{y:30,autoAlpha:0},{y:0,autoAlpha:1,stagger:.08,duration:.6,ease:"power3.out",scrollTrigger:{trigger:".wk-journey-grid",start:"top 80%",once:true}});
  },el);
  return()=>ctx.revert();
 },[]);
 const active=outcomes[outcome],activeAgenda=agenda[slot],activeSeries=series[milestone];
 return <div className="workshops-page" ref={root}>
  <div className="wk-progress" aria-hidden="true"/>
  <WorkshopHeader/>
  <main>
   <section className="wk-hero" id="top">
    <div className="wk-hero-grain" aria-hidden="true"/>
    <div className="wk-hero-inner wk-wrap">
     <div className="wk-hero-type">
      <div className="wk-eyebrow"><span className="wk-live"/> HANDS-ON WORKSHOPS <span>LEARN BY MAKING / 001</span></div>
      <h1>Ideas don't<br/>stay <em>ideas.</em></h1>
      <p>A guided build. A real interface. The first step toward a product you can keep extending.</p>
      <a className="wk-hero-link" href="#experience">Explore the experience <span><ArrowDown size={17}/></span></a>
     </div>
     <div className="wk-board-wrap"><div className="wk-hero-orbit" aria-hidden="true"/><BoardArtwork/><div className="wk-float-note note-a">FROM CONCEPT <b>↗</b></div><div className="wk-float-note note-b">TO SOMETHING REAL <b>✳</b></div></div>
     <div className="wk-hero-bottom"><span>BUILT AROUND CURIOSITY</span><span>SCROLL TO BEGIN ↓</span></div>
    </div>
   </section>

   <section className="wk-experience wk-section" id="experience">
    <div className="wk-wrap">
     <div className="wk-section-top" data-wk-reveal><span>01 / THE EXPERIENCE</span><span>A PROJECT-FIRST INTRODUCTION</span></div>
     <div className="wk-experience-heading" data-wk-reveal><h2>Less watching.<br/><em>More building.</em></h2><p><b>What if your first React lesson ended with something you could actually use?</b><br/>Meet BuildBoard: a lightweight project board for student teams. We build it in small, understandable steps, with each concept introduced right before it becomes useful.</p></div>
     <div className="wk-experience-grid">
      <article className="wk-experience-card wk-card-outcome" tabIndex="0"><span>01 / THE OUTCOME</span><strong>01</strong><h3>A working<br/>project board.</h3><p>Create tasks, move work, search and save progress.</p><div className="wk-card-route">IDEA <i/> INTERFACE <i/> PRODUCT <b>✳</b></div></article>
      <article className="wk-experience-card wk-card-method" tabIndex="0"><span>02 / THE METHOD</span><div><h3>See it.<br/>Build it.<br/><em>Make it yours.</em></h3><p>Observe a real interaction, build it together, then take the wheel.</p></div><div className="wk-build-sequence"><span>SEE</span><i/><span>BUILD</span><i/><span>MAKE</span></div><div className="wk-sequence-bars"><i/><i/><i/><i/><i/></div></article>
      <article className="wk-experience-card wk-card-toolkit" tabIndex="0"><span>03 / THE TOOLKIT</span><div className="wk-tool-pills">{["JSX","Components","Props","useState","Events","Forms","Lists","localStorage"].map(x=><b key={x}>{x}</b>)}</div><h3>Small concepts.<br/>Visible payoff.</h3><p>Every new tool unlocks something you can see and use.</p><div className="wk-tool-orbit" aria-hidden="true">✳</div></article>
      <article className="wk-experience-card wk-card-time" tabIndex="0"><span>04 / THE FORMAT</span><strong>180<small>min</small></strong><p>One focused, hands-on session.</p><div className="wk-time-stamp">3 <small>HOURS</small></div></article>
     </div>
    </div>
   </section>

   <section className="wk-outcomes wk-section" id="outcomes">
    <div className="wk-wrap">
     <div className="wk-section-top" data-wk-reveal><span>02 / YOUR FIRST MILESTONE</span><span>CLICK A SKILL TO EXPLORE</span></div>
     <div className="wk-outcome-heading" data-wk-reveal><h2>From blank canvas<br/>to <em>your first product.</em></h2><p>One evolving interface. Four milestones. Each click reveals the next layer of the build.</p></div>
     <div className="wk-outcome-explorer" data-wk-reveal>
      <div className="wk-outcome-rail" role="tablist" aria-label="Workshop outcomes">{outcomes.map((item,i)=><button key={item.n} role="tab" aria-selected={outcome===i} className={outcome===i?"is-active":""} onClick={()=>setOutcome(i)}><span>{item.n}</span><b>{item.title}</b><small>{item.tag}</small><ArrowUpRight size={16}/></button>)}<div className="wk-rail-foot">SELECT A MILESTONE <span>{String(outcome+1).padStart(2,"0")} / 04</span></div></div>
      <article className="wk-outcome-stage" role="tabpanel" aria-live="polite"><div className="wk-stage-visual"><div className={"wk-stage-symbol stage-"+outcome}>{["▥","↗","◌","✳"][outcome]}</div><span className="wk-stage-orbit orbit-one"/><span className="wk-stage-orbit orbit-two"/><small>SKILL UNLOCKED</small></div><div className="wk-stage-copy" key={outcome}><div className="wk-stage-meta"><span>{active.tag}</span><span>WORKSHOP 01</span></div><h3>{active.title}</h3><p>{active.summary}</p><div className="wk-skill-tags">{active.skills.map(s=><span key={s}>{s}</span>)}</div><div className="wk-stage-takeaway"><small>YOU'LL WALK AWAY WITH</small><b>{active.takeaway}</b></div><div className="wk-stage-next"><div>{outcomes.map((_,i)=><i key={i} className={i<=outcome?"is-filled":""}/>)}</div><button onClick={()=>setOutcome(v=>(v+1)%outcomes.length)}>{outcome===3?"REVISIT FIRST SKILL":"NEXT MILESTONE"} <ArrowUpRight size={14}/></button></div></div></article>
     </div>
    </div>
   </section>

   <section className="wk-agenda wk-section" id="agenda">
    <div className="wk-wrap">
     <div className="wk-section-top" data-wk-reveal><span>03 / THE SESSION</span><span>180 MINUTES · ONE COMPLETE BUILD</span></div>
     <div className="wk-agenda-heading" data-wk-reveal><h2>A clear path<br/><em>to the build.</em></h2><p>Follow the session from first sketch to a working board. Select a block to see what happens inside that part of the workshop.</p></div>
     <div className="wk-agenda-layout" data-wk-reveal><div className="wk-agenda-list" role="tablist" aria-label="Workshop agenda">{agenda.map((item,i)=><button key={item.time} role="tab" aria-selected={slot===i} className={slot===i?"is-active":""} onClick={()=>setSlot(i)}><span>{item.time}</span><b>{item.title}</b><small>{item.duration}</small><ChevronRight size={15}/></button>)}</div><article className="wk-agenda-detail" role="tabpanel" aria-live="polite"><div className="wk-agenda-detail-content" key={slot}><div className="wk-detail-label"><span>SESSION BLOCK / {String(slot+1).padStart(2,"0")}</span><Clock3 size={15}/></div><strong>{activeAgenda.time}</strong><h3>{activeAgenda.title}</h3><p>{activeAgenda.detail}</p><div className="wk-agenda-progress"><i style={{width:((slot+1)/agenda.length*100)+"%"}}/></div><div className="wk-detail-foot"><span>BUILD TOGETHER</span><b>{activeAgenda.duration}</b></div></div><div className="wk-agenda-index">THE WORKSHOP / 01 <span>STEP {String(slot+1).padStart(2,"0")}</span></div></article></div>
    </div>
   </section>

   <section className="wk-journey wk-section" id="series">
    <div className="wk-wrap">
     <div className="wk-section-top" data-wk-reveal><span>04 / THE ROAD AHEAD</span><span>ONE PRODUCT, MORE CAPABILITY</span></div>
     <div className="wk-journey-heading" data-wk-reveal><h2>Start with a board.<br/><em>Grow into a product.</em></h2><p>BuildBoard evolves as the workshops progress. Each session is a milestone, not a prerequisite trap.</p></div>
     <div className="wk-journey-grid"><div className="wk-journey-list">{series.map((item,i)=><button key={item[0]} className={"wk-journey-panel "+(milestone===i?"is-active":"")} onClick={()=>setMilestone(i)}><span>{item[0]}</span><b>{item[1]}</b>{item[3]&&<small>{item[3]}</small>}<ArrowUpRight size={15}/></button>)}</div><article className="wk-journey-detail" aria-live="polite"><div className="wk-journey-detail-inner" key={milestone}><span>THE NEXT MILESTONE / 0{milestone+1}</span><strong>0{milestone+1}</strong><h3>{activeSeries[1]}</h3><p>{activeSeries[2]}</p><div>WORKSHOP SERIES <i>·</i> ONE CONTINUOUS PRODUCT</div></div></article></div>
    </div>
   </section>

   <section className="wk-ready wk-section" id="ready">
    <div className="wk-wrap wk-ready-layout"><div className="wk-ready-copy" data-wk-reveal><div className="wk-section-top"><span>05 / GETTING READY</span><span>NO PRIOR REACT REQUIRED</span></div><h2>Bring your<br/><em>curiosity.</em></h2><p>Basic HTML, CSS and JavaScript are enough to get started. No prior React experience is expected.</p><div className="wk-prerequisites">{["Laptop + browser","VS Code","Node.js + npm","Basic HTML / CSS / JavaScript"].map(x=><span key={x}><Check size={15}/>{x}</span>)}</div></div><aside className="wk-facilitator" data-wk-reveal><span>YOUR FACILITATOR</span><div className="wk-facilitator-mark">SR<span>✳</span></div><h3>Sourabh Kumar Ravi</h3><p>Software engineer working across frontend engineering, full-stack applications and AI-powered products.</p><div className="wk-facilitator-links"><a href="https://sourabhravi.site" target="_blank" rel="noreferrer">Portfolio <ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/in/sourabh-k-ravi/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a></div></aside></div>
   </section>

   <section className="wk-close"><div className="wk-close-shape" aria-hidden="true"/><div className="wk-wrap" data-wk-reveal><span>WORKSHOPS / BUILT TO BEGIN</span><h2>Let's make<br/><em>something useful.</em></h2><p>A first React project, built together.</p><a className="wk-close-cta" href="mailto:sourabh.k.ravi@gmail.com?subject=Workshop%20collaboration">Discuss the workshop <ArrowUpRight size={17}/></a><a className="wk-back" href="/">Back to portfolio ↗</a></div></section>
  </main>
  <footer className="wk-footer"><a href="/">SR✳</a><span>WORKSHOPS · DESIGNED TO BUILD</span><a href="#top">BACK TO TOP ↑</a></footer>
 </div>;
}
