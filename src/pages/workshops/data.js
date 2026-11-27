export const method = [
  {
    number: "01",
    title: "See the product",
    body: "Start with BuildBoard as a working idea. Understand the interface and the decisions behind it before we write a component.",
    note: "PRODUCT FIRST",
  },
  {
    number: "02",
    title: "Build it together",
    body: "Introduce each React concept at the moment you need it, then use it immediately in the product. Every checkpoint leaves you with something working.",
    note: "LEARN BY DOING",
  },
  {
    number: "03",
    title: "Make it yours",
    body: "Add search, filters and local persistence, then take on a small extension that gives your version its own point of view.",
    note: "YOUR OWN FINISH",
  },
];

export const outcomes = [
  ["Think in components", "Break a screen into focused, reusable pieces."],
  ["Work with state", "Make the interface respond to actions and changing data."],
  ["Handle real inputs", "Build controlled forms and practical task flows."],
  ["Render useful lists", "Display collections with stable keys and clear states."],
  ["Derive interface state", "Search, filter and calculate what the UI should show."],
  ["Keep work around", "Persist the board in the browser with localStorage."],
];

export const agenda = [
  { time: "00:00", end: "00:15", title: "The product, before the code", detail: "Meet BuildBoard, see the finished interaction and get a mental model of React." },
  { time: "00:15", end: "00:40", title: "JSX, components and props", detail: "Turn the first screen into a small set of understandable building blocks." },
  { time: "00:40", end: "01:05", title: "State and events", detail: "Give the board a pulse. Change data and see the interface respond." },
  { time: "01:05", end: "01:15", title: "A short reset", detail: "Ten minutes away from the screen." },
  { time: "01:15", end: "01:45", title: "Forms and task workflows", detail: "Add tasks, manage input and connect actions to the board." },
  { time: "01:45", end: "02:10", title: "Search and derived state", detail: "Find the right task and show useful views without duplicating state." },
  { time: "02:10", end: "02:35", title: "Persistence with localStorage", detail: "Refresh the browser without losing the work you have made." },
  { time: "02:35", end: "02:50", title: "The mini challenge", detail: "Choose an extension and make the product a little more yours." },
  { time: "02:50", end: "03:00", title: "Show, share and recap", detail: "Walk through what you built and connect the concepts." },
];

export const pathway = [
  { number: "01", title: "React foundations", detail: "Components, state, events and local persistence.", status: "START HERE" },
  { number: "02", title: "Apps with a pulse", detail: "Routing, API states and custom hooks.", status: "NEXT CHAPTER" },
  { number: "03", title: "Beyond the browser", detail: "Node, Express, PostgreSQL and authentication.", status: "FULL STACK" },
  { number: "04", title: "Build together", detail: "Real-time collaboration with Socket.IO.", status: "LIVE SYSTEMS" },
  { number: "05", title: "A little intelligence", detail: "AI-assisted workflows through a secure backend.", status: "AI LAB" },
  { number: "06", title: "Ship with confidence", detail: "Testing, accessibility, security and deployment.", status: "PRODUCTION" },
];

export const faqs = [
  {
    question: "Do I need to know React already?",
    answer: "No. This first session is designed for people who are new to React. You should be comfortable with the basics of HTML, CSS and JavaScript, including functions, arrays and objects.",
  },
  {
    question: "What should I bring?",
    answer: "Bring a laptop with a recent version of Node.js installed, a code editor such as VS Code, and a browser. Setup instructions and starter code can be shared before the session.",
  },
  {
    question: "Will we build a complete production app?",
    answer: "We will build a focused, working frontend project. The session covers React fundamentals and browser-based persistence. It does not include a backend, authentication or a database.",
  },
  {
    question: "What if I fall behind?",
    answer: "The workshop is checkpoint-based, and starter code is available so you can rejoin the build. The goal is to understand the pieces, not to race through the exercises.",
  },
  {
    question: "Are the later workshops required?",
    answer: "No. Each chapter is designed to stand on its own. The series shows a possible path forward, but you can join a later topic when it fits your goals and experience.",
  },
];
