import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  ["The approach", "#method"],
  ["The project", "#build"],
  ["What you'll learn", "#outcomes"],
  ["The schedule", "#schedule"],
  ["Questions", "#faq"],
];

export default function WorkshopHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="ws-header">
      <a className="ws-brand" href="/" aria-label="Back to portfolio">
        <span className="ws-brand-mark">SR<span>✳</span></span>
        <span className="ws-brand-label">WORKSHOPS<br />LEARN BY BUILDING</span>
      </a>

      <div className="ws-header-edition">
        <span className="ws-header-dot" />
        A SMALL SERIES ABOUT MAKING REAL THINGS
      </div>

      <button
        className="ws-menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="ws-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={18} /> : <><span>INDEX</span><Menu size={17} /></>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="ws-navigation"
            className="ws-menu-panel"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ws-menu-heading">ON THIS PAGE <span>↘</span></div>
            {links.map(([label, href], index) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                <small>0{index + 1}</small>
                <span>{label}</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
            <a className="ws-menu-cta" href="#join" onClick={() => setOpen(false)}>
              Join the next session <ArrowDownRight size={16} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
