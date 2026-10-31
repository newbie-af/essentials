const sections = [
  {
    title: "The Language of Numbers",
    sub: "Build reliable number sense",
    badge: "FOUNDATION",
    lessons: [
      ["1. Integers and the Number Line", ["positive/negative", "absolute value", "sign rules"], ["integers on a number line for beginners", "absolute value explained simple", "adding and subtracting negative numbers", "multiplying and dividing negative numbers rules"]],
      ["2. Order of Operations (PEMDAS)", ["parentheses", "exponents", "left-to-right"], ["order of operations PEMDAS beginner", "PEMDAS with nested parentheses", "order of operations common mistakes"]],
      ["3. Factors, Multiples, and Divisibility", ["divisibility rules", "prime factorization", "GCF & LCM"], ["divisibility rules 2 3 4 5 6 9 10", "prime factorization factor tree", "GCF and LCM explained easy"]]
    ]
  },
  {
    title: "Fractions",
    sub: "Work confidently with parts and quantities",
    lessons: [
      ["4. Fraction Fundamentals", ["proper/improper/mixed", "equivalent fractions", "simplifying"], ["what is a fraction for beginners", "proper improper mixed numbers", "equivalent fractions explained", "simplify fractions using GCF"]],
      ["5. Addition and Subtraction of Fractions", ["like denominators", "LCD method", "mixed numbers"], ["adding fractions like denominators", "adding fractions unlike denominators LCD", "subtracting fractions with borrowing mixed numbers"]],
      ["6. Multiplication and Division of Fractions", ["cross-cancel", "reciprocals", "keep-change-flip"], ["multiplying fractions step by step", "cross cancel simplify before multiplying fractions", "dividing fractions keep change flip", "multiplying and dividing mixed numbers"]]
    ]
  },
  {
    title: "Decimals and Percentages",
    sub: "Connect fractions, decimals, and real-world percentages",
    lessons: [
      ["7. Decimal Place Value and Operations", ["place value", "align decimal points", "rounding"], ["decimal place value explained", "adding and subtracting decimals align decimal points", "multiplying decimals step by step", "dividing decimals move decimal point", "rounding decimals simple"]],
      ["8. Fractions ↔ Decimals ↔ Percentages", ["terminating vs repeating", "×100 and ÷100"], ["convert fraction to decimal", "terminating and repeating decimals", "convert decimal to percent and percent to decimal", "convert fraction to percent"]],
      ["9. Percentage Applications", ["percent of a number", "increase/decrease"], ["finding percentage of a number", "what percent of a number is another", "percentage increase and decrease", "percentage word problems discounts tax tips"]]
    ]
  },
  {
    title: "Ratios and Proportions",
    sub: "Compare quantities and model relationships",
    lessons: [
      ["10. Ratios and Proportions", ["simplifying ratios", "cross-multiply", "direct/inverse"], ["introduction to ratios for beginners", "simplifying ratios", "solving proportions cross multiplication", "direct and inverse proportion explained"]]
    ]
  },
  {
    title: "Algebra",
    sub: "Translate relationships into expressions and equations",
    lessons: [
      ["11. Algebraic Expressions", ["variables/constants", "like terms", "substitution"], ["introduction to algebra variables and expressions", "combining like terms", "evaluating algebraic expressions substitution", "translating words into algebraic expressions"]],
      ["12. Solving Linear Equations (One Variable)", ["one-step", "two-step", "multi-step", "variables both sides"], ["one step equations addition subtraction", "one step equations multiplication division", "two step equations", "solving multi step equations", "equations with variables on both sides"]],
      ["13. Exponents and Roots", ["exponent rules", "negative exponents", "radicals"], ["exponent rules product quotient power", "negative exponents explained", "square roots perfect squares", "simplifying square roots"]],
      ["14. Linear Equations in Two Variables (Graphing)", ["slope-intercept", "graphing lines", "systems"], ["slope intercept form explained", "graphing linear equations", "finding equation of a line from graph", "systems of equations substitution elimination"]]
    ]
  },
  {
    title: "Geometry and Trigonometry",
    sub: "Understand shapes, measurement, and right triangles",
    lessons: [
      ["15. Lines, Angles, and Triangles", ["angle relationships", "triangle sum", "similar/congruent", "Pythagorean"], ["angle relationships vertical supplementary complementary", "triangle angle sum theorem", "similar and congruent triangles", "pythagorean theorem explained"]],
      ["15B. Right-Triangle Trigonometry and Circles", ["SOH-CAH-TOA", "special right triangles", "circle equations"], ["SOH CAH TOA right triangle trigonometry", "special right triangles 30 60 90 45 45 90", "circle area circumference arc length sector area", "equation of a circle SAT"]],
      ["16. Area, Perimeter, and Volume", ["area/perimeter", "volume", "scale factors"], ["area and perimeter rectangles triangles circles", "volume rectangular prism cylinder", "scale factors area volume"]]
    ]
  },
  {
    title: "Data Analysis and Statistics",
    sub: "Read, summarize, and reason with data",
    lessons: [
      ["17. Data Organization and Interpretation (Tables and Graphs)", ["tables", "bar/line/pie", "scatterplots"], ["reading bar graphs line graphs pie charts", "interpreting data tables", "SAT scatterplots line of best fit", "two variable data SAT"]],
      ["18. Measures of Center and Spread", ["mean/median/mode", "range", "standard deviation"], ["mean median mode range explained", "how to find mean median mode", "standard deviation simple explanation"]],
      ["19. Probability and Counting", ["favorable/total", "tree diagrams", "counting"], ["basic probability for beginners", "tree diagrams probability", "probability word problems"]]
    ]
  },
  {
    title: "Advanced Algebra",
    sub: "Extend algebra toward more complex relationships",
    badge: "EXTENSION",
    lessons: [
      ["20. Polynomials and Factoring", ["add/subtract/multiply", "GCF factoring", "difference of squares", "trinomials"], ["adding subtracting multiplying polynomials", "factoring GCF difference of squares", "factoring trinomials a equals 1"]],
      ["21. Quadratic Equations", ["factoring", "quadratic formula", "parabolas"], ["solving quadratic equations by factoring", "quadratic formula explained", "graphing parabolas vertex roots"]],
      ["22. Functions and Nonlinear Relationships", ["function notation", "exponential growth/decay", "linear vs nonlinear"], ["function notation explained", "exponential growth and decay", "linear vs nonlinear functions"]]
    ]
  },
  {
    title: "CSE Numerical Ability",
    sub: "Official scope: Basic operations, number sequences, and word problems",
    lessons: [
      ["CSE 1. Basic Operations & Number Sequence", ["sequence patterns", "arithmetic rules"], ["civil service exam number sequence tricks", "civil service exam basic math operations review", "number series reasoning tips"], "cse"],
      ["CSE 2. Numerical Word Problems", ["age problems", "work/rate problems", "distance/rate problems", "mixture problems"], ["civil service exam age word problems", "civil service exam work rate problems", "civil service exam distance rate time", "civil service exam mixture problems"], "cse"],
      ["CSE 3. Data Sufficiency (Professional Level)", ["statement evaluation", "sufficiency logic"], ["civil service exam data sufficiency math", "data sufficiency strategy civil service professional"], "cse"]
    ]
  },
  {
    title: "CSE Verbal Ability",
    sub: "Grammar, vocabulary, and reading comprehension",
    lessons: [
      ["VERB 1. Vocabulary & Word Meanings", ["synonyms", "antonyms", "context clues"], ["civil service exam vocabulary words", "civil service exam synonyms and antonyms"], "cse"],
      ["VERB 2. Grammar & Correct Usage", ["subject-verb agreement", "prepositions", "pronouns"], ["civil service exam grammar rules", "civil service exam correct usage reviewer"], "cse"]
    ]
  },
  {
    title: "CSE Analytical Ability",
    sub: "Logic, word association, and data interpretation",
    lessons: [
      ["ANALYT 1. Word Analogy", ["relationships", "logic pairs"], ["civil service exam word analogy tips", "civil service exam analogy reviewer"], "cse"],
      ["ANALYT 2. Logic & Assumptions", ["syllogisms", "deductive reasoning"], ["civil service exam logic reasoning", "civil service exam assumptions reviewer"], "cse"]
    ]
  },
  {
    title: "CSE General Information",
    sub: "Constitution, ethics, and current events",
    lessons: [
      ["GEN INFO 1. Philippine Constitution", ["article 1-18", "bill of rights"], ["1987 philippine constitution reviewer", "civil service exam constitution questions"], "cse"],
      ["GEN INFO 2. Code of Ethics (RA 6713)", ["norms of conduct", "duties of public officials"], ["RA 6713 civil service reviewer", "code of ethical standards public officials"], "cse"]
    ]
  },
  {
    title: "SAT Math Domains (Advanced)",
    sub: "Deep-dive algebra, advanced math, and problem solving",
    badge: "OPTIONAL",
    lessons: [
      ["SAT 1. Algebra & Advanced Math", ["linear systems", "quadratics", "exponential functions"], ["SAT math linear equations practice", "SAT math quadratic functions practice", "SAT advanced math domain review"], "sat"],
      ["SAT 2. Problem-Solving & Data Analysis", ["ratios/rates", "percentages", "statistics", "probability"], ["SAT math data analysis practice", "SAT math problem solving rates ratios", "SAT statistics probability review"], "sat"],
      ["SAT 3. Geometry & Trigonometry", ["lines/angles", "area/volume", "right triangles", "circles"], ["SAT math geometry trigonometry practice", "SAT right triangle trigonometry problems", "SAT circle equation problems"], "sat"]
    ]
  },
  {
    title: "SAT Reading & Writing",
    sub: "Official scope: Craft, Information, Conventions, Expression",
    badge: "OPTIONAL",
    lessons: [
      ["SAT RW 1. Craft & Structure", ["words in context", "text structure", "cross-text connections"], ["SAT reading craft and structure practice", "SAT words in context tips", "SAT cross text connections"], "sat"],
      ["SAT RW 2. Information & Ideas", ["main idea", "command of evidence", "data interpretation"], ["SAT reading information and ideas", "SAT command of evidence practice", "SAT data interpretation reading"], "sat"],
      ["SAT RW 3. Standard English Conventions", ["sentence boundaries", "punctuation", "grammar rules"], ["SAT grammar punctuation rules", "SAT sentence boundaries practice"], "sat"],
      ["SAT RW 4. Expression of Ideas", ["transitions", "rhetorical synthesis"], ["SAT transitions practice", "SAT rhetorical synthesis tips"], "sat"]
    ]
  }
];

const STORE = "foundational-math-site-progress-v1";

let saved = {};
try {
  saved = JSON.parse(localStorage.getItem(STORE) || "{}") || {};
} catch (e) {}

const practice = {};