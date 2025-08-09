import React, { useMemo, useState } from "react";

/**
 * VSCode-inspired Skills Explorer + Tabs
 * - Left: Explorer with skill categories
 * - Top: Tab bar for opened skills
 * - Right: Editor panel with dynamic content
 * Tailwind required.
 */

const theme = {
  bg: "bg-[#1e1e1e]",
  panel: "bg-[#252526]",
  surface: "bg-[#2d2d2d]",
  surfaceAlt: "bg-[#1f2428]",
  border: "border border-[#3c3c3c]",
  text: "text-[#d4d4d4]",
  subtext: "text-[#9da5b4]",
  accent: "text-[#79b8ff]",
  green: "text-[#89d185]",
  yellow: "text-[#dcdcaa]",
};

const RAW_SKILLS = {
  "Programming & Tools": [
    "Python",
    "Javascript",
    "Cpp",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "OpenCV",
    "NLTK",
    "Langchain",
    "SQL (PostgreSQL, MySQL)",
    "Linux",
    "Power BI",
  ],
  "Machine Learning": [
    "Supervised & Unsupervised Learning",
    "Data Preprocessing & Feature Engineering",
    "Model Evaluation & Hyperparameter Tuning",
    "Scikit-learn",
    "PyTorch",
  ],
  "Web Technologies": [
    "ReactJS",
    "NextJS",
    "TailwindCSS",
    "MongoDB",
    "Firebase",
    "REST APIs",
    "Flask",
    "Django",
  ],
  "Soft Skills": ["Analytical Thinking", "Communication & Teaching", "Agile & Team Collaboration"],
  Languages: ["Arabic (Native)", "English (C1)", "French (C1)", "German (A2+)"],
};

const iconFor = (name) => {
  const n = name.toLowerCase();

  // Languages (human)
  if (n.startsWith("arabic")) return { icon: "🕌", hint: "Language" };
  if (n.startsWith("english")) return { icon: "🇬🇧", hint: "Language" };
  if (n.startsWith("french")) return { icon: "🇫🇷", hint: "Language" };
  if (n.startsWith("german")) return { icon: "🇩🇪", hint: "Language" };

  // Programming languages & tools
  if (n === "python") return { icon: "🐍", hint: "Programming Language" };
  if (n === "javascript") return { icon: "🟨", hint: "Programming Language" };
  if (n === "cpp" || n === "c++") return { icon: "💠", hint: "Programming Language" };
  if (n.includes("sql")) return { icon: "🗄️", hint: "Databases & SQL" };
  if (n === "linux") return { icon: "🐧", hint: "OS / DevOps" };
  if (n.includes("power bi")) return { icon: "📊", hint: "BI / Analytics" };

  // Python ecosystem
  if (n.includes("pandas")) return { icon: "🧮", hint: "DataFrame / Analysis" };
  if (n.includes("numpy")) return { icon: "📐", hint: "Numerical" };
  if (n.includes("matplotlib")) return { icon: "📈", hint: "Plotting" };
  if (n.includes("opencv")) return { icon: "👁️", hint: "Computer Vision" };
  if (n.includes("nltk")) return { icon: "🔤", hint: "NLP" };
  if (n.includes("langchain")) return { icon: "🧩", hint: "LLM Tooling" };
  if (n.includes("scikit")) return { icon: "🧠", hint: "ML Library" };

  // Web / frameworks
  if (n === "reactjs" || n === "react") return { icon: "⚛️", hint: "Frontend" };
  if (n === "nextjs" || n === "next") return { icon: "⬛", hint: "React Framework" };
  if (n === "tailwindcss" || n === "tailwind") return { icon: "🌬️", hint: "CSS Utility" };
  if (n === "flask") return { icon: "🧪", hint: "Python Web" };
  if (n === "django") return { icon: "🟩", hint: "Python Web" };
  if (n === "rest apis" || n.includes("rest")) return { icon: "🔗", hint: "API" };
  if (n === "mongodb") return { icon: "🍃", hint: "Database" };
  if (n === "firebase") return { icon: "🔥", hint: "Backend-as-a-Service" };

  // Soft skills
  if (n.includes("analytical")) return { icon: "🧩", hint: "Thinking" };
  if (n.includes("communication")) return { icon: "💬", hint: "Communication" };
  if (n.includes("agile")) return { icon: "🏃", hint: "Agile" };
  if (n.includes("team")) return { icon: "🤝", hint: "Teamwork" };

  return { icon: "📄", hint: "Skill" };
};

const LevelBadge = ({ label }) => {
  const match = label.match(/\(([^)]+)\)/);
  if (!match) return null;
  const lvl = match[1];
  const lvll = lvl.toLowerCase();
  const color =
    lvll.includes("native") ? "bg-emerald-600" :
    lvll.includes("c1") ? "bg-blue-600" :
    lvll.includes("a2") || lvll.includes("b") ? "bg-yellow-600" :
    "bg-gray-600";
  return (
    <span className={`ml-2 px-2 py-0.5 rounded text-xs ${color} text-white`}>{lvl}</span>
  );
};

const descriptionFor = (name, category) => {
  const n = name.toLowerCase();
  if (category === "Languages") return `Spoken language proficiency: ${name}.`;
  if (n === "python") return "General-purpose language used for ML, data, scripting, and backends.";
  if (n === "pandas") return "DataFrame manipulation, joins, groupby, time series, and analysis.";
  if (n === "numpy") return "Vectorized numerical computing; arrays, broadcasting, linear algebra.";
  if (n === "matplotlib") return "Plotting primitives; quick visuals and custom charts.";
  if (n === "opencv") return "Computer vision toolkit for images, video, and classical CV ops.";
  if (n === "nltk") return "Classic NLP pre-processing, tokenization, tagging, etc.";
  if (n === "langchain") return "LLM orchestration for RAG, tools, agents.";
  if (n.includes("sql")) return "Relational data querying, schema design, joins, indexes.";
  if (n === "scikit-learn") return "Classical ML modeling: preprocessing, pipelines, grid search.";
  if (n === "pytorch") return "Deep learning framework for tensors, autograd, and training loops.";
  if (n === "reactjs" || n === "react") return "Component-based UI, hooks, and virtual DOM rendering.";
  if (n === "nextjs") return "React framework with routing, SSR/SSG, API routes.";
  if (n === "tailwindcss") return "Utility-first CSS for rapid, consistent styling.";
  if (n === "flask") return "Lightweight Python web framework for APIs and small apps.";
  if (n === "django") return "Batteries-included Python web framework (ORM, admin, auth).";
  if (n === "mongodb") return "Document database for flexible JSON-like data.";
  if (n === "firebase") return "Hosting, auth, DB, functions, analytics — fast app backends.";
  return `Category: ${category}.`;
};

const ExplorerItem = ({ name, depth = 0, onOpen }) => {
  const { icon, hint } = iconFor(name);
  return (
    <button
      onClick={onOpen}
      className={`w-full text-left px-2 py-1 rounded hover:${theme.surface} ${theme.text}`}
      title={hint}
      style={{ paddingLeft: `${8 + depth * 12}px` }}
      aria-label={`Open ${name}`}
    >
      <span className="mr-2">{icon}</span>
      <span className="align-middle">{name}</span>
    </button>
  );
};

const Tab = ({ title, active, onClose, onClick }) => (
  <div
    className={`group flex items-center gap-2 px-3 py-1.5 cursor-pointer ${active ? "bg-[#1f2428]" : "bg-[#2a2f34] hover:bg-[#333a41]"} ${theme.border} rounded-t-md`}
    role="tab"
    aria-selected={active}
    aria-label={`Tab ${title}`}
    onClick={onClick}
  >
    <span className="text-sm truncate max-w-[16ch]">{title}</span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="opacity-60 group-hover:opacity-100 hover:scale-110 transition"
      aria-label={`Close ${title}`}
      type="button"
    >
      ✕
    </button>
  </div>
);

const EditorPanel = ({ name, category }) => {
  const { icon, hint } = iconFor(name);
  const showSample =
    category !== "Languages" &&
    /python|react|next|pytorch|scikit|opencv|langchain|flask|django|sql|mongodb|firebase/i.test(name);

  const Quote = () => <span>&quot;</span>;

  return (
    <div className={`h-full w-full ${theme.panel} ${theme.border} rounded-b-md p-4`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#3c3c3c] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h3 className={`text-lg ${theme.text} font-semibold`}>
            {name}
            {category === "Languages" ? <LevelBadge label={name} /> : null}
          </h3>
        </div>
        <span className={`text-xs ${theme.subtext}`}>{hint}</span>
      </div>

      {/* Code-like description */}
      <div className={`font-mono text-sm leading-7 ${theme.text}`}>
        <div className="opacity-70">{'// about'}</div>
        <div>
          <span className={theme.green}>const</span> <span className={theme.accent}>skill</span>{" "}
          = &#123;
        </div>
        <div className="ml-6">
          <span className={theme.yellow}>name</span>: <Quote /><span>{name}</span><Quote />, 
        </div>
        <div className="ml-6">
          <span className={theme.yellow}>category</span>: <Quote /><span>{category}</span><Quote />, 
        </div>
        <div className="ml-6">
          <span className={theme.yellow}>description</span>: <Quote />
          <span>{descriptionFor(name, category)}</span><Quote />, 
        </div>
        <div>&#125;;</div>

        {/* Extras */}
        {category === "Languages" ? (
          <>
            <div className="mt-4 opacity-70">{'// proficiency demo'}</div>
            <div>
              <span>{'/*'}</span> Example: 🇩🇪 small-talk · 🇫🇷 professional email · 🇬🇧 tech interview <span>{'*/'}</span>
            </div>
          </>
        ) : showSample ? (
          <>
            <div className="mt-4 opacity-70">{'// sample snippet'}</div>
            <pre className="mt-1 overflow-auto p-3 rounded bg-[#1b1f23] text-[#c9d1d9]">
{`// TODO: Replace with a real snippet from your repos
function demo() {
  console.log("${name} in action 🚀");
}`}
            </pre>
          </>
        ) : null}
      </div>
    </div>
  );
};

const SkillsVSCode = () => {
  const [collapsed, setCollapsed] = useState({
    "Programming & Tools": false,
    "Machine Learning": false,
    "Web Technologies": false,
    "Soft Skills": false,
    Languages: false,
  });

  const [tabs, setTabs] = useState([]); // [{title, category}]
  const [active, setActive] = useState(null);

  const toggle = (folder) =>
    setCollapsed((s) => ({ ...s, [folder]: !s[folder] }));

  const openTab = (title, category) => {
    setTabs((t) => {
      const exists = t.find((x) => x.title === title);
      if (exists) {
        setActive(title);
        return t;
      }
      const next = [...t, { title, category }];
      setActive(title);
      return next;
    });
  };

  const closeTab = (title) => {
    setTabs((t) => {
      const idx = t.findIndex((x) => x.title === title);
      if (idx === -1) return t;
      const next = t.filter((x) => x.title !== title);
      if (active === title) {
        const neighbor = next[idx - 1] || next[idx] || null;
        setActive(neighbor ? neighbor.title : null);
      }
      return next;
    });
  };

  const activeTab = useMemo(
    () => tabs.find((t) => t.title === active) || null,
    [tabs, active]
  );

  return (
    <div className={`min-h-screen ${theme.bg} text-white`}>
      <div className="grid grid-cols-12">
        {/* Explorer */}
        <aside className={`col-span-12 md:col-span-3 xl:col-span-2 ${theme.panel} ${theme.border}`} aria-label="Skills Explorer">
          <div className="px-1 pb-3">
            {Object.entries(RAW_SKILLS).map(([category, items]) => (
              <div key={category} className="mb-2">
                <button
                  onClick={() => toggle(category)}
                  className={`w-full text-left px-2 py-1 font-semibold ${theme.text} hover:${theme.surface}`}
                  aria-expanded={!collapsed[category]}
                  aria-controls={`section-${category}`}
                >
                  {collapsed[category] ? "▸" : "▾"} {category}
                </button>
                {!collapsed[category] && (
                  <div id={`section-${category}`} className="mt-1">
                    {items.map((skill) => (
                      <ExplorerItem
                        key={skill}
                        name={skill}
                        depth={1}
                        onOpen={() => openTab(skill, category)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Editor area */}
        <main className="col-span-12 md:col-span-9 xl:col-span-10">
          {/* Tabs */}
          <div className={`flex flex-wrap gap-1 px-3 pt-3 ${theme.bg}`} role="tablist" aria-label="Open skills">
            {tabs.length === 0 ? (
              <div className={`text-sm ${theme.subtext} px-2 py-1`}>Open a skill from the Explorer…</div>
            ) : (
              tabs.map((t) => (
                <Tab
                  key={t.title}
                  title={t.title}
                  active={active === t.title}
                  onClose={() => closeTab(t.title)}
                  onClick={() => setActive(t.title)}
                />
              ))
            )}
          </div>

          {/* Active editor */}
          <div className="p-3">
            {activeTab ? (
              <EditorPanel name={activeTab.title} category={activeTab.category} />
            ) : (
              <div className={`${theme.panel} ${theme.border} rounded-md p-8 text-center ${theme.subtext}`}>
                Tip: Try <span className="font-mono">ReactJS</span>, <span className="font-mono">Python</span>, or any language tab.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SkillsVSCode;
