import React from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Plus, Search, Trash2 } from "lucide-react";

const initialTasks = [
  { id: 1, title: "Sketch the first screen", status: 0, tag: "DESIGN" },
  { id: 2, title: "Build a reusable task card", status: 1, tag: "REACT" },
  { id: 3, title: "Save my progress", status: 2, tag: "WIN" },
  { id: 4, title: "Add a quick search", status: 0, tag: "IDEA" },
];

const columns = ["TO DO", "IN PROGRESS", "DONE"];

export default function BuildBoardDemo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState("");
  const [newTask, setNewTask] = useState("");
  const [nextId, setNextId] = useState(5);
  const completedCount = tasks.filter((task) => task.status === 2).length;
  const resetDemo = () => { setTasks(initialTasks); setQuery(""); setNewTask(""); setNextId(5); };

  const visibleTasks = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return tasks;
    return tasks.filter((task) => (task.title + " " + task.tag).toLowerCase().includes(value));
  }, [query, tasks]);

  const addTask = (event) => {
    event.preventDefault();
    const title = newTask.trim();
    if (!title) return;
    setTasks((current) => [...current, { id: nextId, title, status: 0, tag: "New" }]);
    setNextId((value) => value + 1);
    setNewTask("");
  };

  const moveTask = (id) => {
    setTasks((current) => current.map((task) => (
      task.id === id ? { ...task, status: Math.min(task.status + 1, 2) } : task
    )));
  };

  const removeTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    <div className="ws-board">
      <div className="ws-demo-welcome">
        <div><span className="ws-demo-eyebrow"><i /> YOUR TURN TO PLAY</span><h4>Small clicks. <em>Real React.</em></h4><p>Add a task, move it forward, or search. Watch the board respond.</p></div>
        <button type="button" className="ws-demo-reset" onClick={resetDemo}>RESET PLAYGROUND <span>↺</span></button>
      </div>
      <div className="ws-board-topbar">
        <div className="ws-board-project">
          <span className="ws-board-logo">B</span>
          <span><b>BuildBoard</b><small>YOUR FIRST REACT PROJECT</small></span>
        </div>
        <div className="ws-board-topbar-meta"><i /> LIVE DEMO <span>·</span> LOCAL STATE</div>
        <span className="ws-board-total">{completedCount}/{tasks.length} COMPLETE</span>
      </div>

      <div className="ws-board-toolbar">
        <div>
          <span className="ws-board-overline">PRODUCT SPACE / 001</span>
          <h3>Team workspace</h3>
        </div>
        <label className="ws-board-search">
          <Search size={15} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a task"
            aria-label="Search tasks"
          />
          <kbd>/</kbd>
        </label>
      </div>

      <form className="ws-board-add" onSubmit={addTask}>
        <label className="ws-sr-only" htmlFor="ws-new-task">New task title</label>
        <input
          id="ws-new-task"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Add a small thing to move forward…"
          maxLength={64}
        />
        <button type="submit" disabled={!newTask.trim()}><Plus size={16} /><span>ADD TASK</span></button>
      </form>

      <div className="ws-board-columns">
        {columns.map((column, status) => {
          const columnTasks = visibleTasks.filter((task) => task.status === status);
          return (
            <section className={"ws-board-column ws-column-" + status} key={column} aria-label={column}>
              <div className="ws-column-heading">
                <span><i />{column}</span><b>{columnTasks.length.toString().padStart(2, "0")}</b>
              </div>
              <div className="ws-task-list">
                <AnimatePresence initial={false} mode="popLayout">
                  {columnTasks.map((task) => (
                    <motion.article
                      className="ws-task-card"
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 14, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    >
                      <div className="ws-task-card-top"><span>{task.tag}</span><button type="button" onClick={() => removeTask(task.id)} aria-label={"Delete " + task.title}><Trash2 size={13} /></button></div>
                      <p>{task.title}</p>
                      <div className="ws-task-card-bottom">
                        <small>BB-{String(task.id).padStart(3, "0")}</small>
                        <button
                          type="button"
                          onClick={() => moveTask(task.id)}
                          disabled={task.status === 2}
                          aria-label={task.status === 2 ? "Task completed" : "Move task to next column"}
                        >
                          {task.status === 2 ? <><Check size={14} /> DONE</> : <>{task.status === 1 ? "FINISH" : "MOVE"} <ArrowRight size={13} /></>}
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
                {!columnTasks.length && <div className="ws-column-empty">{query ? "No matching tasks" : "A little room to think."}</div>}
              </div>
            </section>
          );
        })}
      </div>
      <div className="ws-board-foot">
        <span>YOU JUST CHANGED THE UI WITH STATE.</span>
        <span><b>{completedCount === tasks.length && tasks.length ? "BOARD COMPLETE ✳" : "KEEP MOVING →"}</b></span>
      </div>
    </div>
  );
}
