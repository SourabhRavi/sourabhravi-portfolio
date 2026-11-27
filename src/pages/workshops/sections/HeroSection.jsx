import React from "react";
import { ArrowDownRight, ArrowUpRight, Clock3, Code2, MousePointer2 } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section className="ws-hero" id="top">
      <div className="ws-hero-topline">
        <span>WORKSHOP SERIES <i>·</i> FIELD SESSION 001</span>
        <span>LEARN BY MAKING <b>↘</b></span>
      </div>

      <div className="ws-hero-layout">
        <div className="ws-hero-copy">
          <motion.div className="ws-hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <span className="ws-kicker-mark"><Code2 size={14} /></span>
            A PRACTICAL INTRODUCTION TO REACT
          </motion.div>

          <h1 aria-label="Build your first real React app">
            <span className="ws-title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: .8, delay: .12, ease: [ .22, 1, .36, 1 ] }}>Build your</motion.span></span>
            <span className="ws-title-line"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: .85, delay: .2, ease: [ .22, 1, .36, 1 ] }}>first <em>real</em></motion.span></span>
            <span className="ws-title-line ws-title-line-last"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .28, ease: [ .22, 1, .36, 1 ] }}>React app<span>.</span></motion.span></span>
          </h1>

          <motion.p className="ws-hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .5 }}>
            Three hours. One useful product. A much clearer feel for how React works. Build a project board from the first component to the final interaction.
          </motion.p>

          <motion.div className="ws-hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .65 }}>
            <a className="ws-button ws-button-primary" href="#build">SEE WHAT YOU'LL BUILD <ArrowDownRight size={17} /></a>
            <a className="ws-text-link" href="#method">HOW IT WORKS <ArrowUpRight size={15} /></a>
          </motion.div>

          <div className="ws-hero-meta ws-reveal-group">
            <div className="ws-hero-meta-item ws-reveal-item"><Clock3 size={16} /><span><b>03 HOURS</b><small>Focused session</small></span></div>
            <div className="ws-hero-meta-item ws-reveal-item"><Code2 size={16} /><span><b>REACT + VITE</b><small>Browser-first build</small></span></div>
            <div className="ws-hero-meta-item ws-reveal-item"><MousePointer2 size={16} /><span><b>HANDS-ON</b><small>Follow every step</small></span></div>
          </div>
        </div>

        <div className="ws-hero-art" aria-label="Abstract gradient artwork with a preview of the workshop project">
          <div className="ws-gradient-gallery">
            <div className="ws-gradient-panel ws-gradient-panel-main">
              <div className="ws-gradient-grain" />
              <div className="ws-gradient-ribbons" aria-hidden="true"><i /><i /><i /><i /><i /></div>
              <div className="ws-gradient-panel-copy">
                <span>THE FIRST BUILD / 001</span>
                <strong>Make an<br />idea <em>move.</em></strong>
                <p>A project board built by you, one interaction at a time.</p>
              </div>
              <div className="ws-gradient-panel-foot"><span>REACT · VITE · CSS</span><span>↗</span></div>
            </div>
            <div className="ws-gradient-panel ws-gradient-panel-side"><span>BUILD<br />SOMETHING<br /><em>USEFUL.</em></span><small>WORKSHOP / 01</small></div>
            <motion.div className="ws-gradient-board" initial={{ opacity: 0, y: 22, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: -2 }} transition={{ duration: .8, delay: .45, ease: [ .22, 1, .36, 1 ] }}>
              <div className="ws-gradient-board-top"><span><i /> BUILDBOARD</span><span>LIVE PREVIEW ↗</span></div>
              <div className="ws-gradient-board-columns">
                <div><small>TO DO <b>02</b></small><span className="ws-mini-task">Sketch the idea</span><span className="ws-mini-task">Build a component</span></div>
                <div><small>IN PROGRESS <b>01</b></small><span className="ws-mini-task ws-mini-task-active">Make it interactive</span></div>
                <div><small>DONE <b>01</b></small><span className="ws-mini-task ws-mini-task-done">Set up the project</span></div>
              </div>
            </motion.div>
          </div>
          <span className="ws-art-index">FIG. 01 <i>—</i> FROM IDEA TO INTERFACE</span>
        </div>
      </div>

      <div className="ws-hero-bottom"><span>01 — START WITH SOMETHING REAL</span><a href="#method">SCROLL TO EXPLORE <ArrowDownRight size={15} /></a></div>
    </section>
  );
}