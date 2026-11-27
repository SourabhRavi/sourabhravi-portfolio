import React, { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  MousePointer2,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import "./WorkshopPage.css";

const chapters = [
  { number: "01", label: "SEE THE SHAPE", title: "Start with a real thing.", copy: "Meet BuildBoard, a tiny project board with a surprisingly big lesson: interfaces are systems of decisions, not just pixels.", signal: "A product before a lecture", icon: Layers3 },
  { number: "02", label: "MAKE IT RESPOND", title: "Give every action a reaction.", copy: "Build components, connect state, and make the board respond to the person using it. No mystery code. Every piece earns its place.", signal: "Components · Props · State", icon: Workflow },
  { number: "03", label: "MAKE IT YOURS", title: "Take the wheel.", copy: "Search, filter, persist your work, then stretch the brief with a feature of your own. The last part belongs to you.", signal: "A working product, not a screenshot", icon: Sparkles },
];

const initialTasks = [
  { id: 1, title: "Sketch the first screen", status: 0, color: "coral" },
  { id: 2, title: "Build a task component", status: 1, color: "violet" },
  { id: 3, title: "Make state persist", status: 2, color: "lime" },
];

const tracks = [
  { n: "01", name: "React foundations", detail: "BuildBoard · state · interaction", duration: "180 MIN", accent: "lime" },
  { n: "02", name: "Apps with a pulse", detail: "Routing · APIs · custom hooks", duration: "NEXT SESSION", accent: "violet" },
  { n: "03", name: "Beyond the browser", detail: "Node · database · authentication", duration: "FULL STACK", accent: "coral" },
  { n: "04", name: "Build together", detail: "Real-time collaboration · Socket.IO", duration: "LIVE SYSTEMS", accent: "blue" },
  { n: "05", name: "A little intelligence", detail: "AI-assisted workflows · safe integration", duration: "AI LAB", accent: "amber" },
];

function MagneticLink({ href, children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduce = useReducedMotion();
  return <motion.a href={href} className={className} style={{ x, y }}
    onPointerMove={(e) => { if (reduce || e.pointerType === "touch") return; const r=e.currentTarget.getBoundingClientRect(); x.set((e.clientX-r.left-r.width/2)*.12); y.set((e.clientY-r.top-r.height/2)*.16); }}
    onPointerLeave={() => { x.set(0); y.set(0); }}>
    {children}
  </motion.a>;
}

function WorkshopHeader() {
  const [menu, setMenu] = useState(false);
  return <header className="wl-header">
    <a className="wl-wordmark" href="/" aria-label="Portfolio home"><span>SR</span><i>✳</i></a>
    <div className="wl-header-center"><span className="wl-live" /> WORKSHOPS <span className="wl-header-slash">/</span> LEARN BY MAKING</div>
    <button className="wl-menu-button" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu(v=>!v)}>{menu ? <X/> : <span>INDEX <b>＋</b></span>}</button>
    <AnimatePresence>{menu && <motion.nav className="wl-menu-panel" initial={{clipPath:"inset(0 0 100% 0)",opacity:0}} animate={{clipPath:"inset(0 0 0% 0)",opacity:1}} exit={{clipPath:"inset(0 0 100% 0)",opacity:0}} transition={{duration:.42,ease:[.22,1,.36,1]}}>
      {[["The experience","#experience"],["BuildBoard","#build"],["The journey","#journey"],["Join the workshop","#join"]].map(([label,href],i)=><a key={href} href={href} onClick={()=>setMenu(false)}><small>0{i+1}</small>{label}<ArrowUpRight/></a>)}
    </motion.nav>}</AnimatePresence>
  </header>;
}

function Hero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress,{stiffness:90,damping:24,restDelta:.001});
  const titleY = useTransform(smooth,[0,1],[0,-155]);
  const titleScale = useTransform(smooth,[0,.8],[1,.82]);
  const artY = useTransform(smooth,[0,1],[0,230]);
  const artRotate = useTransform(smooth,[0,1],[0,28]);
  const glow = useTransform(smooth,[0,1],[.8,.15]);
  return <section className="wl-hero" ref={ref} id="top">
    <div className="wl-hero-grid" aria-hidden="true"/>
    <motion.div className="wl-hero-glow" style={{opacity:glow}} aria-hidden="true"/>
    <div className="wl-hero-topline"><span>AN OPEN INVITATION TO BUILD</span><span>REACT / 001 <b>●</b> HANDS-ON SERIES</span></div>
    <div className="wl-hero-stage">
      <motion.div className="wl-hero-copy" style={{y:titleY,scale:titleScale}}>
        <motion.p className="wl-eyebrow" initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{delay:.18,duration:.7}}>A LITTLE CURIOSITY. A REAL FIRST BUILD.</motion.p>
        <h1><span>Learn by</span><span className="wl-outline-word">making</span><span className="wl-accent-word">something real<span className="wl-period">.</span></span></h1>
        <motion.p className="wl-hero-deck" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.75,duration:.65}}>A hands-on React experience. Follow an idea, shape an interface, and watch your first product come to life.</motion.p>
        <div className="wl-hero-actions"><MagneticLink href="#experience" className="wl-button wl-button-bright">ENTER THE EXPERIENCE <ArrowDown size={16}/></MagneticLink><span>FIRST STOP <b>REACT</b></span></div>
      </motion.div>
      <motion.div className="wl-hero-object" style={{y:artY,rotate:artRotate}} initial={{opacity:0,scale:.7,rotate:-22}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1.3,delay:.25,ease:[.16,1,.3,1]}} aria-label="Abstract layered interactive workshop object">
        <div className="wl-object-orbit orbit-a"/><div className="wl-object-orbit orbit-b"/><div className="wl-object-orbit orbit-c"/>
        <motion.div className="wl-object-core" animate={{rotate:[0,90,180,270,360]}} transition={{duration:34,repeat:Infinity,ease:"linear"}}><span>W</span><i>✳</i></motion.div>
        <span className="wl-object-tag tag-top">CURIOSITY / 01</span><span className="wl-object-tag tag-bottom">MAKE IT MOVE ↗</span>
        <motion.span className="wl-object-satellite" animate={{x:[0,16,0],y:[0,-18,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}>+</motion.span>
      </motion.div>
    </div>
    <div className="wl-hero-bottom"><span>SCROLL TO UNFOLD <ArrowDown size={14}/></span><motion.div className="wl-progress-line" style={{scaleX:smooth,transformOrigin:"left"}}/><span>01 — 05</span></div>
  </section>;
}

function ExperienceSection() {
  const [active,setActive] = useState(0);
  return <section className="wl-experience" id="experience">
    <div className="wl-section-heading"><span className="wl-index">01 / THE METHOD</span><h2>Learn it.<br/><em>By living it.</em></h2><p>Not a playlist of concepts. A sequence of moments where the code starts to make sense because you can see it working.</p></div>
    <div className="wl-chapter-layout">
      <div className="wl-chapter-nav" role="tablist" aria-label="Workshop experience">
        {chapters.map((c,i)=><button key={c.number} role="tab" aria-selected={active===i} className={active===i?"is-active":""} onClick={()=>setActive(i)}>
          <span className="wl-chapter-number">{c.number}</span><span className="wl-chapter-label">{c.label}</span><span className="wl-chapter-arrow"><ArrowUpRight size={17}/></span><motion.i layoutId="chapter-active" className="wl-chapter-active-bar"/>
        </button>)}
        <div className="wl-chapter-nav-foot"><span>SELECT A MOMENT</span><span>0{active+1} / 03</span></div>
      </div>
      <div className="wl-chapter-visual">
        <div className="wl-visual-top"><span>FIELD NOTES / REACT LAUNCH</span><span>LIVE LEARNING SYSTEM <i/></span></div>
        <AnimatePresence mode="wait">
          <motion.div className={"wl-chapter-scene scene-"+active} key={active} initial={{opacity:0,y:24,filter:"blur(8px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-16,filter:"blur(5px)"}} transition={{duration:.45,ease:[.22,1,.36,1]}}>
            <div className="wl-scene-symbol">{active===0?<Layers3/>:active===1?<Workflow/>:<Sparkles/>}<span>0{active+1}</span></div>
            <div className="wl-scene-copy"><span>{chapters[active].label}</span><h3>{chapters[active].title}</h3><p>{chapters[active].copy}</p><b>{chapters[active].signal}</b></div>
            <div className="wl-scene-bottom"><span>OBSERVE</span><i/><span>BUILD</span><i/><span>OWN</span></div>
          </motion.div>
        </AnimatePresence>
        <div className="wl-visual-footer"><span>YOUR CURIOSITY SETS THE PACE</span><span>CLICK TO EXPLORE ↗</span></div>
      </div>
    </div>
  </section>;
}

function BuildBoard() {
  const [tasks,setTasks] = useState(initialTasks);
  const [next,setNext] = useState(4);
  const [newTask,setNewTask] = useState("");
  const moveTask = (id) => setTasks(items=>items.map(t=>t.id===id?{...t,status:(t.status+1)%3}:t));
  const addTask = (e) => {e.preventDefault(); if(!newTask.trim())return;setTasks(items=>[...items,{id:next,title:newTask.trim(),status:0,color:"blue"}]);setNext(n=>n+1);setNewTask("");};
  const columns=["IDEAS","IN MOTION","SHIPPED"];
  return <section className="wl-build" id="build">
    <div className="wl-build-head"><div><span className="wl-index">02 / THE THING YOU'LL MAKE</span><h2>Meet <em>BuildBoard.</em></h2></div><p>A small project board for student teams. You'll build the real interactions, not just recreate the screenshot.</p></div>
    <motion.div className="wl-board-shell" whileHover={{borderColor:"rgba(205,255,76,.5)"}} transition={{duration:.3}}>
      <div className="wl-board-top"><div className="wl-board-brand"><span className="wl-board-mark">B</span><div><b>BuildBoard</b><small>STUDENT PROJECTS / SPACE 01</small></div></div><div className="wl-board-status"><i/> LOCAL DEMO <span>·</span> INTERACTIVE</div><div className="wl-board-count">{tasks.length.toString().padStart(2,"0")} TASKS</div></div>
      <form className="wl-board-add" onSubmit={addTask}><label htmlFor="wl-new-task">ADD A THOUGHT</label><input id="wl-new-task" value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="What should we build next?" maxLength={60}/><button type="submit" aria-label="Add task"><span>ADD</span><ArrowRight size={16}/></button></form>
      <div className="wl-board-columns">{columns.map((column,index)=><div className={"wl-board-column col-"+index} key={column}><div className="wl-column-head"><span><i/>{column}</span><b>{tasks.filter(t=>t.status===index).length.toString().padStart(2,"0")}</b></div>
        <div className="wl-task-list">{tasks.filter(t=>t.status===index).map(task=><motion.button layout key={task.id} className={"wl-task task-"+task.color} onClick={()=>moveTask(task.id)} whileHover={{y:-4,rotate:index%2?1:-1}} whileTap={{scale:.97}} title="Click to move this task to the next stage"><span className="wl-task-title">{task.title}</span><span className="wl-task-foot"><small>BB-{String(task.id).padStart(3,"0")}</small><span>{index===2?<Check size={14}/>:<ArrowRight size={14}/>}</span></span></motion.button>)}
          {index===0&&<div className="wl-task-hint"><MousePointer2 size={14}/> CLICK A TASK TO MOVE IT</div>}
        </div></div>)}</div>
      <div className="wl-board-bottom"><span>TRY IT: ADD A TASK. MOVE IT. WATCH THE BOARD RESPOND.</span><span>STATE → UI <b>✳</b></span></div>
    </motion.div>
    <motion.div className="wl-build-foot" initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{duration:.6}}> <span>THE FIRST MILESTONE</span><p>Create, edit, search, filter and save tasks. Then add one feature that makes the board yours.</p><span className="wl-build-stamp">REACT + VITE<br/>LOCAL STORAGE</span></motion.div>
  </section>;
}

function JourneySection() {
  const [selected,setSelected]=useState(0);
  return <section className="wl-journey" id="journey">
    <div className="wl-journey-heading"><span className="wl-index">03 / THE LONGER STORY</span><h2>One workshop<br/>opens <em>another door.</em></h2><p>Each chapter stands on its own. Together, they take you from your first component to systems that people can use together.</p></div>
    <div className="wl-track">
      <div className="wl-track-line"><motion.i style={{scaleX:(selected+1)/tracks.length,transformOrigin:"left"}}/></div>
      {tracks.map((track,i)=><motion.button key={track.n} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.55,delay:i*.07,ease:[.22,1,.36,1]}} className={"wl-track-item accent-"+track.accent+(selected===i?" selected":"")} onClick={()=>setSelected(i)} whileHover={{y:-7}} whileTap={{scale:.985}}>
        <span className="wl-track-top"><small>{track.n} / CHAPTER</small><ArrowUpRight size={17}/></span><span className="wl-track-dot"><i/></span><span className="wl-track-name">{track.name}</span><span className="wl-track-detail">{track.detail}</span><span className="wl-track-duration">{track.duration}</span>
      </motion.button>)}
    </div>
    <AnimatePresence mode="wait"><motion.div className="wl-track-selected" key={selected} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.25}}><span>YOUR NEXT CURIOSITY</span><strong>{tracks[selected].name}</strong><p>{selected===0?"Start here. Leave with a project that remembers what you changed.":"A future chapter in the same learning journey. Bring your questions and keep building."}</p><b>CHAPTER {tracks[selected].n} ↗</b></motion.div></AnimatePresence>
  </section>;
}

function CuriositySection() {
  const [focus,setFocus]=useState("Explore");
  const modes={Explore:"Find the small detail that makes the whole thing click.",Design:"Make a decision. Give the interface a point of view.",Build:"Turn that idea into an interaction someone can feel."};
  return <motion.section className="wl-curiosity" initial={{opacity:.6,clipPath:"inset(5% 0 5% 0)"}} whileInView={{opacity:1,clipPath:"inset(0% 0 0% 0)"}} viewport={{once:true,amount:.12}} transition={{duration:1.05,ease:[.22,1,.36,1]}}> 
    <div className="wl-curiosity-stamp" aria-hidden="true">STAY<br/>CURIOUS<span>✳</span></div>
    <div className="wl-curiosity-copy"><span className="wl-index">04 / YOUR TURN</span><h2>Bring your<br/><em>curiosity.</em></h2><p>There's no perfect way to begin. There's only the next thing you're curious enough to try.</p><div className="wl-mode-buttons">{Object.keys(modes).map(mode=><button key={mode} className={focus===mode?"active":""} onClick={()=>setFocus(mode)}>{mode}<span>↗</span></button>)}</div><AnimatePresence mode="wait"><motion.div className="wl-mode-note" key={focus} initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:.24}}><span>YOUR CREATIVE PROMPT</span><strong>{modes[focus]}</strong></motion.div></AnimatePresence></div>
    <div className="wl-curiosity-art"><motion.div className="wl-curiosity-ring ring-1" animate={{rotate:360}} transition={{duration:42,repeat:Infinity,ease:"linear"}}/><motion.div className="wl-curiosity-ring ring-2" animate={{rotate:-360}} transition={{duration:32,repeat:Infinity,ease:"linear"}}/><motion.div className="wl-curiosity-core" whileHover={{scale:1.08,rotate:12}} whileTap={{scale:.95}}><Sparkles/><span>MAKE<br/>SOMETHING</span></motion.div><span className="wl-curiosity-orbit-label label-a">IDEA / 001</span><span className="wl-curiosity-orbit-label label-b">POSSIBLE → REAL</span></div>
  </motion.section>;}

function JoinSection() {
  return <section className="wl-join" id="join"><div className="wl-join-top"><span>05 / TAKE THE FIRST STEP</span><span>NO EXPERIENCE WITH REACT REQUIRED</span></div><div className="wl-join-main"><motion.h2 initial={{opacity:0,y:45,filter:"blur(8px)"}} whileInView={{opacity:1,y:0,filter:"blur(0px)"}} viewport={{once:true,amount:.35}} transition={{duration:.9,ease:[.22,1,.36,1]}}>Your first<br/><em>build starts here.</em></motion.h2><div className="wl-join-side"><p>Bring your laptop, your questions and a little curiosity. We'll bring the product, the path and the room to experiment.</p><MagneticLink href="mailto:sourabh.k.ravi@gmail.com?subject=Workshop%20interest" className="wl-button wl-button-light">I'M INTERESTED <ArrowUpRight size={17}/></MagneticLink><span>3 HOURS · REACT + VITE · GUIDED BUILD</span></div></div><div className="wl-join-footer"><a href="/">← BACK TO PORTFOLIO</a><span>MADE FOR PEOPLE WHO WANT TO MAKE THINGS</span><a href="#top">BACK TO THE TOP ↑</a></div></section>;
}

export default function WorkshopPage() {
  const {scrollYProgress}=useScroll();
  const progress=useSpring(scrollYProgress,{stiffness:100,damping:28});
  const scale=useTransform(progress,[0,1],[0,1]);
  return <main className="workshop-page">
    <motion.div className="wl-reading-progress" style={{scaleX:scale}}/>
    <WorkshopHeader/><Hero/><ExperienceSection/><BuildBoard/><JourneySection/><CuriositySection/><JoinSection/>
  </main>;
}
