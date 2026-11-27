import { ArrowDownRight, ArrowUpRight, Clock3, Code2, MousePointer2 } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="ws-hero" id="top">
      <div className="ws-hero-backdrop" aria-hidden="true" />
      <div className="ws-hero-topline">
        <span>THE REACT WORKSHOP <i>·</i> FIELD SESSION 001</span>
        <span>LEARN BY MAKING <b>↘</b></span>
      </div>

      <div className="ws-hero-layout">
        <div className="ws-hero-copy">
          <motion.div
            className="ws-hero-kicker"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <span className="ws-kicker-mark"><Code2 size={14} /></span>
            A PRACTICAL INTRODUCTION TO REACT
          </motion.div>

          <h1 aria-label="Build your first real React app">
            <span className="ws-title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}>Build your</motion.span></span>
            <span className="ws-title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}>first <em>real</em></motion.span></span>
            <span className="ws-title-line ws-title-line-last"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.95, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}>React app<span>.</span></motion.span></span>
          </h1>

          <motion.p
            className="ws-hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Three hours. One useful product. A much clearer feel for how React works.
            Build a project board from the first component to the final interaction.
          </motion.p>

          <motion.div
            className="ws-hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.88 }}
          >
            <a className="ws-button ws-button-primary" href="#build">
              SEE WHAT YOU'LL BUILD <ArrowDownRight size={17} />
            </a>
            <a className="ws-text-link" href="#method">
              HOW IT WORKS <ArrowUpRight size={15} />
            </a>
          </motion.div>

          <div className="ws-hero-meta ws-reveal-group">
            <div className="ws-hero-meta-item ws-reveal-item">
              <Clock3 size={16} />
              <span><b>03 HOURS</b><small>Focused session</small></span>
            </div>
            <div className="ws-hero-meta-item ws-reveal-item">
              <Code2 size={16} />
              <span><b>REACT + VITE</b><small>Browser-first build</small></span>
            </div>
            <div className="ws-hero-meta-item ws-reveal-item">
              <MousePointer2 size={16} />
              <span><b>HANDS-ON</b><small>Follow every step</small></span>
            </div>
          </div>
        </div>

        <div className="ws-hero-art">
          <div className="ws-hero-photo">
            <img
              src="https://images.unsplash.com/photo-1759505385072-253906776c84?auto=format&fit=crop&w=1800&q=88"
              alt="A sunlit workspace with a laptop, notebook and room to build"
              fetchPriority="high"
            />
            <div className="ws-photo-shade" />
            <div className="ws-photo-caption">
              <span>THE FIRST BUILD</span>
              <span>AN IDEA, MADE INTERACTIVE ↗</span>
            </div>
          </div>

          <motion.div
            className="ws-floating-note"
            initial={{ opacity: 0, y: 24, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.9, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ws-note-top"><span>YOUR PROJECT</span><span>001 / 001</span></div>
            <div className="ws-note-brand"><span className="ws-note-icon">B</span><b>BuildBoard</b><i>●</i></div>
            <p>A little space to organise the work that matters.</p>
            <div className="ws-note-columns">
              <span><b>03</b><small>TO DO</small></span>
              <span><b>02</b><small>IN PROGRESS</small></span>
              <span><b>04</b><small>DONE</small></span>
            </div>
            <div className="ws-note-bottom"><span>MADE WITH REACT</span><span>↗</span></div>
          </motion.div>

          <span className="ws-art-index">FIG. 01 <i>—</i> FROM IDEA TO INTERFACE</span>
          <span className="ws-art-sticker" aria-hidden="true">MAKE<br />IT<br /><em>REAL.</em></span>
        </div>
      </div>

      <div className="ws-hero-bottom">
        <span>01 — A FIRST PRINCIPLE: START WITH SOMETHING REAL</span>
        <a href="#method">SCROLL TO EXPLORE <ArrowDownRight size={15} /></a>
      </div>
    </section>
  );
}
