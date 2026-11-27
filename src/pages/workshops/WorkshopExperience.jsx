import React from "react";
import { useRef } from "react";
import { motion, MotionConfig, useScroll, useSpring } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import WorkshopHeader from "./components/WorkshopHeader.jsx";
import BuildBoardDemo from "./components/BuildBoardDemo.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import {
  AgendaSection,
  AudienceSection,
  FAQSection,
  JoinSection,
  MethodSection,
  OutcomesSection,
  PathwaySection,
} from "./sections/WorkshopSections.jsx";
import { useWorkshopMotion } from "./hooks/useWorkshopMotion.js";
import "./styles/workshop.css";

export default function WorkshopExperience() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  useWorkshopMotion(pageRef);

  return (
    <MotionConfig reducedMotion="user">
      <main className="workshop-experience" ref={pageRef}>
        <motion.div className="ws-reading-progress" style={{ scaleX: smoothProgress }} aria-hidden="true" />
        <WorkshopHeader />
        <HeroSection />

        <div className="ws-intro-band">
          <div className="ws-intro-band-label"><span>THE IDEA</span><i>✳</i><span>THE INTERACTION</span></div>
          <p className="ws-intro-statement ws-reveal">The best way to understand a tool is to <em>make something with it.</em></p>
          <span className="ws-intro-index">A NOTE ON HOW WE LEARN / 001</span>
        </div>

        <MethodSection />

        <section className="ws-build ws-section" id="build">
          <div className="ws-build-heading">
            <div><span className="ws-index">02 / THE THING YOU'LL MAKE</span><h2 className="ws-display">Meet <em>BuildBoard.</em></h2></div>
            <p className="ws-lead">A small project board with the right amount of complexity. You'll build the interactions, not just recreate a picture.</p>
          </div>

          <div className="ws-build-feature">
            <div className="ws-build-photo ws-product-preview" aria-label="A polished visual preview of the BuildBoard project participants will create">
              <div className="ws-preview-glow ws-preview-glow-one" aria-hidden="true" />
              <div className="ws-preview-glow ws-preview-glow-two" aria-hidden="true" />
              <div className="ws-preview-app">
                <div className="ws-preview-appbar"><span className="ws-preview-brand"><i>B</i> buildboard</span><span className="ws-preview-appbar-note">YOUR PROJECT / 01</span><span className="ws-preview-avatar">S</span></div>
                <div className="ws-preview-welcome"><div><small>MONDAY, BUILD DAY</small><b>Make room for<br /><em>good ideas.</em></b></div><span className="ws-preview-new">＋ NEW TASK</span></div>
                <div className="ws-preview-mini-board">
                  <div className="ws-preview-lane"><span><i className="ws-dot-todo" /> TO DO <b>02</b></span><article><small>DESIGN</small><strong>Sketch the first screen</strong><footer>BB-001 <i>↗</i></footer></article><article><small>IDEA</small><strong>Choose a color palette</strong><footer>BB-004 <i>↗</i></footer></article></div>
                  <div className="ws-preview-lane"><span><i className="ws-dot-progress" /> IN PROGRESS <b>01</b></span><article className="ws-preview-card-active"><small>REACT</small><strong>Build a task card</strong><footer>BB-002 <i>↗</i></footer></article></div>
                  <div className="ws-preview-lane"><span><i className="ws-dot-done" /> DONE <b>01</b></span><article className="ws-preview-card-done"><small>SETUP</small><strong>Start the project</strong><footer>BB-003 <i>✓</i></footer></article></div>
                </div>
                <div className="ws-preview-appfoot"><span><i /> SAVED IN YOUR BROWSER</span><span>MADE WITH REACT <b>✳</b></span></div>
              </div>
              <div className="ws-preview-caption"><span>THE FINISH LINE</span><b>Not a mockup.<br />A working little product.</b><i>01 ↗</i></div>
            </div>
            <div className="ws-build-aside">
              <span>THE PRODUCT BRIEF / 001</span>
              <h3>One board.<br /><em>Many small decisions.</em></h3>
              <p>Create tasks, move them between stages, search the work and keep it in the browser. A familiar product that makes React concepts easier to see.</p>
              <div className="ws-build-stack"><span>REACT</span><span>VITE</span><span>JAVASCRIPT</span><span>CSS</span><span>LOCALSTORAGE</span></div>
            </div>
          </div>

          <div className="ws-demo-heading ws-reveal"><div><span className="ws-index">TRY THE INTERACTION</span><h3>A tiny preview. <em>Go on, change something.</em></h3></div><span>DEMO / LOCAL STATE</span></div>
          <BuildBoardDemo />
          <p className="ws-build-note"><ArrowDownRight size={15} /> The workshop version adds task details, status flows, filtering and browser persistence step by step.</p>

          <div className="ws-challenge-strip ws-reveal">
            <div className="ws-challenge-heading">
              <span>THE MINI CHALLENGE / YOUR OWN EXTENSION</span>
              <h3>One more detail.<br /><em>Make it yours.</em></h3>
              <p>After the guided build, choose a small feature and take the board a step further.</p>
            </div>
            <div className="ws-challenge-ideas">
              <span><b>01</b> Due dates</span>
              <span><b>02</b> Live task counts</span>
              <span><b>03</b> Priority filters</span>
              <span><b>04</b> Delete confirmation</span>
            </div>
          </div>

          <div className="ws-concept-note">
            <span>CONCEPTS IN CONTEXT</span>
            <p>JSX · Components · Props · useState · Events · Controlled forms · Lists & keys · Conditional rendering · Derived state · localStorage</p>
          </div>
        </section>

        <OutcomesSection />
        <AgendaSection />
        <PathwaySection />
        <AudienceSection />
        <FAQSection />
        <JoinSection />

        <footer className="ws-footer">
          <a href="/" className="ws-footer-brand">W<span>.</span></a>
          <span>LEARN A THING. BUILD A THING. KEEP GOING.</span>
          <a href="#top">BACK TO THE BEGINNING ↑</a>
        </footer>
      </main>
    </MotionConfig>
  );
}
