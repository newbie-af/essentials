const QUESTIONS_PER_QUIZ = 10;
const remaining = {};

const total = sections.reduce((n, s) => n + s.lessons.length, 0);
const slug = (s, i) => "part-" + (i + 1);

const roadmap = document.getElementById("roadmap");
const nav = document.getElementById("nav");

function esc(v) {
  return String(v).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawQuestions(title) {
  const bank = practice[title];
  if (!bank || !bank.length) return [];
  let pool = remaining[title];
  if (!pool || pool.length < QUESTIONS_PER_QUIZ) pool = shuffle(bank);
  const picked = pool.slice(0, QUESTIONS_PER_QUIZ);
  remaining[title] = pool.slice(QUESTIONS_PER_QUIZ);
  return picked;
}

function render() {
  roadmap.innerHTML = "";
  nav.innerHTML = "";

  sections.forEach((s, si) => {
    const id = slug(s, si);
    const done = s.lessons.filter((l, li) => saved[id + "-" + li]).length;

    const a = document.createElement("a");
    a.href = "#" + id;
    a.innerHTML = `<span>${si + 1}. ${esc(s.title)}</span><small>${done}/${s.lessons.length}</small>`;
    nav.append(a);

    const sec = document.createElement("section");
    sec.className = "part";
    sec.id = id;

    sec.innerHTML = `
      <div class="part-head" role="button" tabindex="0" aria-expanded="true">
        <span class="part-number">${String(si + 1).padStart(2, "0")}</span>
        <div class="part-heading">
          <h2>${esc(s.title)}</h2>
          <p>${esc(s.sub || "")}</p>
        </div>
        <span class="part-progress">${done}/${s.lessons.length} complete</span>
        <span class="chevron">⌄</span>
      </div>
      <div class="part-body"></div>
    `;

    const body = sec.querySelector(".part-body");

    s.lessons.forEach((l, li) => {
      const key = id + "-" + li;
      const checked = !!saved[key];
      const flags = (l[3] || "").split(" ");
      const lesson = document.createElement("article");

      lesson.className = "lesson" + (checked ? " done" : "");
      lesson.dataset.search = (l[0] + " " + l[1].join(" ") + " " + l[2].join(" ")).toLowerCase();

      const hasPractice = !!practice[l[0]];

      lesson.innerHTML = `
        <div class="lesson-top">
          <input class="check" type="checkbox" aria-label="Mark ${esc(l[0])} complete" ${checked ? "checked" : ""}>
          <div class="lesson-main">
            <div class="lesson-title">${esc(l[0])}</div>
            <div class="tags">
              ${l[1].map(t => `<span class="tag">${esc(t)}</span>`).join("")}
              ${flags.includes("sat") ? '<span class="tag sat">SAT skill</span>' : ""}
              ${flags.includes("cse") ? '<span class="tag cse">CSE focus</span>' : ""}
            </div>
          </div>
          <div class="lesson-actions">
            ${hasPractice ? `<button class="mini practice" type="button">Practice · ${Math.min(QUESTIONS_PER_QUIZ, practice[l[0]].length)} Qs</button>` : ""}
            <button class="mini resources" type="button" aria-expanded="false">Resources +</button>
          </div>
        </div>
        <div class="terms">
          ${l[2].map(t => `<button class="term" type="button" data-term="${esc(t)}">${esc(t)} ↗</button>`).join("")}
        </div>
      `;

      const cb = lesson.querySelector(".check");

      cb.addEventListener("change", () => {
        if (cb.checked) saved[key] = true;
        else delete saved[key];

        persist();
        lesson.classList.toggle("done", cb.checked);
        update();
      });

      const rb = lesson.querySelector(".resources");

      rb.addEventListener("click", () => {
        lesson.classList.toggle("expanded");

        const open = lesson.classList.contains("expanded");
        rb.textContent = open ? "Resources −" : "Resources +";
        rb.setAttribute("aria-expanded", String(open));
      });

      lesson.querySelectorAll(".term").forEach(b => {
        b.addEventListener("click", () => {
          window.open(
            "https://www.youtube.com/results?search_query=" + encodeURIComponent(b.dataset.term),
            "_blank",
            "noopener,noreferrer"
          );
        });
      });

      const pb = lesson.querySelector(".practice");

      if (pb) {
        pb.addEventListener("click", () => startQuiz(l[0]));
      }

      body.append(lesson);
    });

    const head = sec.querySelector(".part-head");

    const toggle = () => {
      sec.classList.toggle("collapsed");
      head.setAttribute("aria-expanded", String(!sec.classList.contains("collapsed")));
    };

    head.addEventListener("click", toggle);

    head.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    roadmap.append(sec);
  });

  document.getElementById("expandAll").textContent = "Expand all";
  update();
  filter();
}

function persist() {
  try {
    localStorage.setItem(STORE, JSON.stringify(saved));
  } catch (e) {}
}

function update() {
  const done = Object.values(saved).filter(Boolean).length;
  const pct = Math.round(done / total * 100);

  document.getElementById("percent").textContent = pct + "%";
  document.getElementById("count").textContent = done + " of " + total + " topics completed";
  document.getElementById("remaining").textContent = (total - done) + " remaining";
  document.getElementById("bar").style.width = pct + "%";

  sections.forEach((s, si) => {
    const sec = document.getElementById(slug(s, si));
    if (!sec) return;

    const n = s.lessons.filter((l, li) => saved[slug(s, si) + "-" + li]).length;

    sec.querySelector(".part-progress").textContent = n + "/" + s.lessons.length + " complete";
    nav.children[si].querySelector("small").textContent = n + "/" + s.lessons.length;
  });
}

function filter() {
  const q = document.getElementById("search").value.toLowerCase().trim();
  const status = document.getElementById("statusFilter").value;
  let count = 0;

  sections.forEach((s, si) => {
    const sec = document.getElementById(slug(s, si));
    let n = 0;

    sec.querySelectorAll(".lesson").forEach((el, li) => {
      const isDone = !!saved[slug(s, si) + "-" + li];

      const show = el.dataset.search.includes(q) &&
        (
          status === "all" ||
          (status === "done" && isDone) ||
          (status === "todo" && !isDone)
        );

      el.style.display = show ? "" : "none";

      if (show) {
        n++;
        count++;
      }
    });

    sec.style.display = n ? "" : "none";
    nav.children[si].style.display = n ? "" : "none";
  });

  document.getElementById("empty").style.display = count ? "none" : "block";
}

// ---------------------------------------------------------------------------
// Mock Exam Functionality
// ---------------------------------------------------------------------------

function startMockExam() {
  const cseCategories = [
    "CSE 1. Basic Operations & Number Sequence",
    "CSE 2. Numerical Word Problems",
    "CSE 3. Data Sufficiency (Professional Level)",
    "VERB 1. Vocabulary & Word Meanings",
    "VERB 2. Grammar & Correct Usage",
    "ANALYT 1. Word Analogy",
    "ANALYT 2. Logic & Assumptions",
    "GEN INFO 1. Philippine Constitution",
    "GEN INFO 2. Code of Ethics (RA 6713)"
  ];

  let mockQuestions = [];

  cseCategories.forEach(topic => {
    if (practice[topic] && practice[topic].length > 0) {
      const shuffled = shuffle(practice[topic]);
      // Grab up to 3 questions from each topic
      mockQuestions.push(...shuffled.slice(0, 3));
    }
  });

  // Shuffle the final combined set
  mockQuestions = shuffle(mockQuestions);

  // Trigger the quiz with our custom array
  startQuiz("CSE Mock Exam (Mixed)", mockQuestions);
}