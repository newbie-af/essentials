let quizTitle = "";
let questions = [];
let index = 0;
let correct = 0;
let checked = false;
let missedQuestions = []; // Keeps track of missed questions

const modal = document.getElementById("quizModal");

// Allow the quiz to accept a custom array of questions (for Mock Exams or Review)
function startQuiz(title, customQuestions = null) {
  quizTitle = title;

  if (customQuestions) {
    questions = customQuestions;
  } else {
    questions = drawQuestions(title);
  }

  index = 0;
  correct = 0;
  missedQuestions = []; // Reset missed questions on new quiz

  document.getElementById("quizTitle").textContent = title;
  document.getElementById("quizActive").style.display = "block";
  document.getElementById("quizFinish").style.display = "none";
  modal.classList.add("open");

  showQuestion();
  setTimeout(() => document.getElementById("answerInput").focus(), 50);
}

function showQuestion() {
  checked = false;

  const q = questions[index];

  document.getElementById("questionLabel").textContent =
    `QUESTION ${index + 1} OF ${questions.length}`;

  document.getElementById("questionText").textContent = q.q;
  document.getElementById("quizBar").style.width =
    (index / questions.length * 100) + "%";

  document.getElementById("answerInput").value = "";
  document.getElementById("answerInput").disabled = false;
  document.getElementById("checkAnswer").disabled = false;

  document.getElementById("feedback").className = "feedback";
  document.getElementById("feedback").innerHTML = "";

  document.getElementById("nextQuestion").disabled = true;
  document.getElementById("nextQuestion").textContent =
    index === questions.length - 1 ? "See results" : "Next question";

  document.getElementById("score").textContent = correct + " correct so far";

  // Focus the input for keyboard-only flow
  setTimeout(() => document.getElementById("answerInput").focus(), 50);
}

function normalize(v) {
  return String(v)
    .toLowerCase()
    .replace(/[₱,%\s]/g, "")
    .replace(/−/g, "-")
    .replace(/,/g, "");
}

function isCorrect(user, expected) {
  const u = normalize(user);
  const a = normalize(expected);

  if (u === a) return true;

  const un = Number(u);
  const an = Number(a);

  return u !== "" &&
    Number.isFinite(un) &&
    Number.isFinite(an) &&
    Math.abs(un - an) < 1e-8;
}

function check() {
  if (checked) return;

  const user = document.getElementById("answerInput").value.trim();

  if (!user) {
    document.getElementById("answerInput").focus();
    return;
  }

  checked = true;

  const q = questions[index];
  const ok = isCorrect(user, q.a);

  if (ok) {
    correct++;
  } else {
    // If they got it wrong, save it to the missedQuestions array (prevent duplicates)
    if (!missedQuestions.some(m => m.q === q.q)) {
      missedQuestions.push(q);
    }
  }

  const f = document.getElementById("feedback");

  f.className = "feedback show " + (ok ? "correct" : "incorrect");

  f.innerHTML = `
    <strong>${ok ? "Correct." : "Not quite."}</strong>
    <span class="explanation">
      ${esc(q.e)}<br>
      <b>Correct answer: ${esc(q.a)}</b>
    </span>
  `;

  document.getElementById("answerInput").disabled = true;
  document.getElementById("checkAnswer").disabled = true;
  document.getElementById("nextQuestion").disabled = false;
  document.getElementById("score").textContent = correct + " correct so far";
  document.getElementById("nextQuestion").focus();
}

function next() {
  if (!checked) return;

  if (index < questions.length - 1) {
    index++;
    showQuestion();
    document.getElementById("answerInput").focus();
  } else {
    document.getElementById("quizActive").style.display = "none";
    document.getElementById("quizFinish").style.display = "block";
    document.getElementById("quizBar").style.width = "100%";

    const n = questions.length;
    const pct = Math.round((correct / n) * 100);

    document.getElementById("finalScore").textContent = `${correct} / ${n} — ${pct}%`;

    // Show different messages based on score and missed questions
    const finishMsg = document.getElementById("finishMessage");
    const reviewBtn = document.getElementById("reviewMissedBtn");

    if (correct === n) {
      finishMsg.textContent = "Perfect score. A fresh set of questions is ready when you retry.";
      reviewBtn.style.display = "none";
    } else if (missedQuestions.length > 0) {
      finishMsg.textContent = "Review the missed questions below to master them.";
      reviewBtn.style.display = "inline-block";
    }

    // Focus the retry button so Enter can restart the quiz
    setTimeout(() => document.getElementById("retryQuiz").focus(), 50);
  }
}

// EVENT LISTENERS

document.getElementById("checkAnswer").addEventListener("click", check);
document.getElementById("nextQuestion").addEventListener("click", next);

// Global Enter key handler for full keyboard flow:
//   - Enter on an unanswered question: checks the answer (if input has text)
//   - Enter after checking: advances to next question
//   - Enter on results screen: retries the quiz
document.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  if (!modal.classList.contains("open")) return;

  // Ignore if user is typing in some other field (safety)
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === "SELECT" || tag === "TEXTAREA") return;

  // If the results screen is visible, Enter = Try again
  const finishVisible = document.getElementById("quizFinish").style.display === "block";
  if (finishVisible) {
    e.preventDefault();
    document.getElementById("retryQuiz").click();
    return;
  }

  // On an active question:
  e.preventDefault();
  if (!checked) {
    // Only check if there's text in the input
    const val = document.getElementById("answerInput").value.trim();
    if (val) check();
  } else {
    next();
  }
});

// Close button (the ×) is the primary intentional exit
document.getElementById("closeQuiz").addEventListener("click", () => {
  modal.classList.remove("open");
});

// NOTE: Clicking the backdrop no longer closes the quiz.
// This prevents accidental exits and lost progress.

// Escape still closes the quiz (intentional keyboard exit)
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    modal.classList.remove("open");
  }
});

document.getElementById("retryQuiz").addEventListener("click", () => {
  startQuiz(quizTitle);
});

// Event listener for the Review Missed Questions button
document.getElementById("reviewMissedBtn").addEventListener("click", () => {
  startQuiz("Review Missed Questions", missedQuestions);
});

// Event listener for the Mock Exam button
document.getElementById("mockExamBtn").addEventListener("click", startMockExam);

document.getElementById("search").addEventListener("input", filter);
document.getElementById("statusFilter").addEventListener("change", filter);

document.getElementById("expandAll").addEventListener("click", () => {
  const parts = [...document.querySelectorAll(".part")];
  const expand = parts.some(p => p.classList.contains("collapsed"));

  parts.forEach(p => {
    p.classList.toggle("collapsed", !expand);
    p.querySelector(".part-head").setAttribute("aria-expanded", String(expand));
  });

  document.getElementById("expandAll").textContent =
    expand ? "Collapse all" : "Expand all";
});

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("Reset all topic progress? This cannot be undone.")) {
    saved = {};
    for (const k in remaining) delete remaining[k];
    persist();
    render();
  }
});

// THIS IS THE LINE THAT BOOTS THE ENTIRE APP
render();
