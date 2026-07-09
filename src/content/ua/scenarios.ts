import type {
  AuthorityMatrixCase,
  DecisionScenario,
  LocalLearningCase,
  PracticeScenario,
  SelfCheckCard,
  WorkflowClassifierCase,
} from "../schemas";

export const selfCheckCards = [
  {
    id: "plausible-vs-repo-truth",
    prompt:
      "Agent пояснює architecture через знайому framework convention, але ще не перевірив цей repo.",
    revealTitle: "Що має пам'ятати orchestrator?",
    reveal:
      "Це plausible continuation, а не project truth. Спершу оберіть authority layer, потім перевірте факти repo або docs перед дією agent.",
    relatedGates: ["source-of-truth", "ownership"],
  },
  {
    id: "session-vs-durable",
    prompt:
      "Після помилки agent каже, що наступного разу перевірить поведінку UI, але rule, test, doc або gate не змінюються.",
    revealTitle: "Це durable?",
    reveal:
      "Ні. Це session-local correction. Durable improvement потребує збереженого rule, skill, test, docs update, validation-перевірки, quality gate або stop condition.",
    relatedGates: ["durable-correction"],
  },
  {
    id: "validation-vs-acceptance",
    prompt: "Build проходить після зміни UI, але фактичний screen ніхто не перевірив.",
    revealTitle: "Чи можна закрити задачу?",
    reveal:
      "Ще ні. Passing validation є доказом, але видима поведінка потребує UI QA gate перед lifecycle close.",
    relatedGates: ["validation", "ui-qa", "lifecycle-close"],
  },
] satisfies SelfCheckCard[];

export const authorityMatrixCases = [
  {
    id: "memory-vs-docs",
    title: "Конфлікт docs і Memory",
    situation:
      "Memory каже, що project uses one API client, але repo docs та imports показують інший.",
    authorityLayer: "Repo facts і project docs",
    sourceOfTruth: "Поточні docs, imports і call sites у repository",
    choices: [
      {
        id: "ask-model",
        label: "Спитати модель, яке джерело ймовірно новіше",
        feedback: "Це додає ще одне припущення. Orchestrator потрібні докази source-of-truth.",
      },
      {
        id: "inspect-repo",
        label: "Перевірити docs та imports, потім заземлити відповідь у них",
        feedback: "Правильно. Розв'яжіть конфлікт через перевірку durable repo layer.",
        correct: true,
      },
      {
        id: "trust-memory",
        label: "Довіритися Memory, бо її збережено раніше",
        feedback: "Memory може бути корисним контекстом, але актуальні факти repo мають перевагу під час конфлікту.",
      },
    ],
    correctMove: "Використайте repo docs і актуальні imports як authority layer, потім продовжуйте лише після розв'язання конфлікту.",
    consequence: "Agent не будує рішення на застарілих або вигаданих project conventions.",
    relatedGates: ["source-of-truth", "validation"],
  },
  {
    id: "tool-docs",
    title: "Твердження про поведінку інструмента",
    situation:
      "Agent стверджує, що coding-agent product завжди asks approval перед редагуванням project instruction files.",
    authorityLayer: "Поточні official product docs",
    sourceOfTruth: "Поточні official docs для конкретного інструмента і version",
    choices: [
      {
        id: "generalize",
        label: "Трактувати це як універсальне coding-agent rule",
        feedback: "Поведінка продукту змінюється і відрізняється між інструментами. Не узагальнюйте.",
      },
      {
        id: "current-docs",
        label: "Перевірити актуальні official docs перед таким твердженням",
        feedback: "Правильно. Поведінка конкретного інструмента потребує актуальної official documentation.",
        correct: true,
      },
      {
        id: "skip",
        label: "Пропустити твердження і спиратися лише на локальну preference",
        feedback: "Можна уникнути продуктового твердження, але якщо ви його робите, потрібні актуальні docs.",
      },
    ],
    correctMove: "Або уникайте твердження про конкретний продукт, або перевірте його за актуальними official docs.",
    consequence: "Сайт не вводить learners в оману щодо поведінки vendor.",
    relatedGates: ["source-of-truth", "permission"],
  },
] satisfies AuthorityMatrixCase[];

export const workflowClassifierCases = [
  {
    id: "known-sequence",
    title: "Відома repo edit sequence",
    situation: "Невелика copy fix потребує огляду, редагування, lint і підсумку. Шлях відомий.",
    patternId: "prompt-chaining",
    choices: [
      {
        id: "agent",
        label: "Agent",
        feedback: "Повний agent loop дає більше autonomy, ніж потрібно цій задачі.",
      },
      {
        id: "prompt-chaining",
        label: "Prompt chaining",
        feedback: "Правильно. Короткої визначеної послідовності достатньо.",
        correct: true,
      },
      {
        id: "parallelization",
        label: "Parallelization",
        feedback: "Parallel workers додають накладні витрати для такого малого відомого шляху.",
      },
    ],
    correctMove: "Використайте prompt chaining із легкою validation gate.",
    consequence: "Задача лишається малою і уникає зайвих agentic накладних витрат.",
    relatedGates: ["validation"],
  },
  {
    id: "high-risk-route",
    title: "Зміна auth boundary",
    situation: "Agent хоче змінити auth/API boundary, хоча ownership досі нечіткий.",
    patternId: "routing",
    choices: [
      {
        id: "routing",
        label: "Routing",
        feedback: "Правильно. Спрямуйте це в high-risk lane перед будь-яким редагуванням.",
        correct: true,
      },
      {
        id: "evaluator",
        label: "Evaluator-optimizer",
        feedback: "Оцінювання важливе пізніше, але спершу треба класифікувати risk lane.",
      },
      {
        id: "prompt-chain",
        label: "Prompt chaining",
        feedback: "Простий chain може сховати крок класифікації ризику.",
      },
    ],
    correctMove: "Спрямуйте задачу в high-risk workflow із source-of-truth, ownership, permission і validation gates.",
    consequence: "Workflow зупиняє ризикові boundary changes до випадкового scope creep.",
    relatedGates: ["permission", "ownership", "source-of-truth", "validation"],
  },
] satisfies WorkflowClassifierCase[];

export const agenticLoopCases = [
  {
    id: "validation-loop",
    title: "Повторна failed validation",
    situation: "Agent спробував три малі fixes. Та сама validation command досі падає.",
    choices: [
      {
        id: "continue",
        label: "Зробити ще один patch",
        feedback: "Ще одне таке саме виправлення є сигналом stuck loop.",
      },
      {
        id: "zoom-out",
        label: "Stop і zoom out",
        feedback: "Правильно. Переоцініть припущення і перевірте джерело помилки.",
        correct: true,
      },
      {
        id: "close",
        label: "Закрити, бо є progress",
        feedback: "Lifecycle-close gate потребує доказів, а не зусиль.",
      },
    ],
    correctMove: "Stop loop, перевірте повторну помилку і вирішіть, чи план або authority layer хибні.",
    consequence: "Orchestrator запобігає symptom-fixing і зростанню diff.",
    relatedGates: ["validation", "lifecycle-close"],
  },
] satisfies DecisionScenario[];

export const localLearningCases = [
  {
    id: "missed-ui-qa",
    title: "Поведінку UI пропущено після успішного build",
    situation: "Agent виправив visual component, запустив build і пропустив broken mobile layout.",
    failureSignal: "Validation passed, але видима поведінка була неправильною.",
    durableTarget: "UI QA gate",
    choices: [
      {
        id: "longer-prompt",
        label: "Зробити наступний prompt довшим",
        feedback: "Може допомогти в цій session, але не перехопить майбутні пропуски.",
      },
      {
        id: "ui-gate",
        label: "Додати UI QA gate для layout-affecting задач",
        feedback: "Правильно. Durable target відповідає режиму помилки.",
        correct: true,
      },
      {
        id: "docs",
        label: "Оновити docs для component usage",
        feedback: "Docs можуть допомогти, якщо usage був нечітким, але пропущена поведінка потребує QA gate.",
      },
    ],
    correctMove: "Запропонуйте UI QA gate для задач, що змінюють видимий layout або interaction.",
    consequence: "Майбутні задачі з більшою ймовірністю перевірять screen before close.",
    relatedGates: ["ui-qa", "durable-correction"],
  },
  {
    id: "repeated-import-error",
    title: "Повторна import-помилка",
    situation: "Той самий wrong import path спричинив два failed builds у схожих задачах.",
    failureSignal: "Повторна technical mistake, спіймана build.",
    durableTarget: "Validation-перевірка або test",
    choices: [
      {
        id: "rule",
        label: "Додати broad rule, що забороняє нові imports",
        feedback: "Занадто широко. Це створює накладні витрати і блокує legitimate work.",
      },
      {
        id: "validation",
        label: "Додати або задокументувати targeted validation-перевірку",
        feedback: "Правильно. Помилка вимірювана і має перехоплюватися механічно.",
        correct: true,
      },
      {
        id: "memory",
        label: "Сказати agent, щоб запам'ятав це",
        feedback: "Це session-local, якщо correction не збережено в durable layer.",
      },
    ],
    correctMove: "Спрямуйте correction до targeted перевірки або test, а не до broad rule.",
    consequence: "Workflow ловить повторювані помилки без зайвих constraints.",
    relatedGates: ["validation", "durable-correction"],
  },
] satisfies LocalLearningCase[];

export const permissionRiskCases = [
  {
    id: "delete-file",
    title: "Видалення file",
    situation: "Agent хоче видалити файл, який вважає unused.",
    choices: [
      { id: "delete", label: "Погодити негайно", feedback: "Видалення може бути незворотним або зламати hidden references." },
      { id: "pause", label: "Пауза, пояснити ризик, перевірити references, ask approval", feedback: "Правильно. Це permission і ownership gate.", correct: true },
      { id: "rename", label: "Перейменувати без approval", feedback: "Перейменування теж змінює поведінку і потребує доказів." },
    ],
    correctMove: "Пауза, перевірити references, пояснити blast radius і ask approval перед видаленням.",
    consequence: "Workflow запобігає випадковій втраті даних або поведінки.",
    relatedGates: ["permission", "ownership", "validation"],
  },
  {
    id: "add-dependency",
    title: "Додавання dependency",
    situation: "Agent хоче встановити dependency, щоб розв'язати малу UI issue.",
    choices: [
      { id: "install", label: "Встановити, бо зручно", feedback: "Dependencies додають maintenance, security і bundle cost." },
      { id: "approval", label: "Ask approval і порівняти локальні alternatives", feedback: "Правильно. Dependency changes потребують permission і scope review.", correct: true },
      { id: "copy", label: "Скопіювати код із package вручну", feedback: "Це може створити licensing і maintenance problems." },
    ],
    correctMove: "Трактуйте додавання dependency як permission-gated і обгрунтуйте, чому локальний код недостатній.",
    consequence: "Project уникає casual scope і supply-chain growth.",
    relatedGates: ["permission", "validation"],
  },
  {
    id: "edit-agents",
    title: "Редагування AGENTS.md / CLAUDE.md",
    situation: "Agent хоче переписати project instruction files після однієї помилки.",
    choices: [
      { id: "rewrite", label: "Дозволити agent переписати файл", feedback: "Instruction layers є durable authority і потребують людського погодження." },
      { id: "propose", label: "Попросити малу proposed correction і погодити вручну", feedback: "Правильно. Durable instruction changes потребують approval.", correct: true },
      { id: "ignore", label: "Ігнорувати, бо помилка одна", feedback: "Можливо, але спершу класифікуйте, чи потрібна durable correction." },
    ],
    correctMove: "Вимагайте proposed durable correction і людське погодження перед редагуванням instruction files.",
    consequence: "Workflow уникає випадкового overconstraint і silent rule changes.",
    relatedGates: ["permission", "durable-correction"],
  },
  {
    id: "auth-boundary",
    title: "Зміна auth/API/payment boundary",
    situation: "Agent хоче змінити auth middleware, щоб unblock test.",
    choices: [
      { id: "quickfix", label: "Швидко patch boundary", feedback: "Critical boundaries потребують джерела, ownership, permission і validation gates." },
      { id: "escalate", label: "Stop, перевірити authority, ask approval, validate deeply", feedback: "Правильно. Це high-risk workflow territory.", correct: true },
      { id: "skip-tests", label: "Skip tests і rely on review", feedback: "Review допомагає, але validation обов'язкова для boundary changes." },
    ],
    correctMove: "Ескалюйте до high-risk lane і вимагайте approval перед зміною boundary.",
    consequence: "Workflow зменшує шанс security або payment regressions.",
    relatedGates: ["permission", "source-of-truth", "validation", "ownership"],
  },
  {
    id: "destructive-command",
    title: "Запуск destructive command",
    situation: "Agent пропонує command, що рекурсивно removes generated artifacts.",
    choices: [
      { id: "run", label: "Запустити, бо artifacts disposable", feedback: "Recursive destructive commands потребують path verification і approval." },
      { id: "verify", label: "Перевірити exact paths і ask approval", feedback: "Правильно. Permission gate зупиняє accidental destructive scope.", correct: true },
      { id: "manual", label: "Попросити agent вручну видалити similar files", feedback: "Manual deletion теж може бути destructive без explicit scope." },
    ],
    correctMove: "Перевірте resolved paths, поясніть ризик і ask approval перед destructive дією.",
    consequence: "Workflow уникає випадкового видалення поза intended workspace.",
    relatedGates: ["permission", "validation"],
  },
  {
    id: "continue-failed-validation",
    title: "Продовження після повторної failed validation",
    situation: "Та сама validation знову fails, а diff продовжує зростати.",
    choices: [
      { id: "continue", label: "Продовжити patching symptoms", feedback: "Це stuck-loop signal." },
      { id: "stop", label: "Stop і zoom out", feedback: "Правильно. Workflow має перервати повторну помилку.", correct: true },
      { id: "close", label: "Закрити з warning", feedback: "Lifecycle close потребує доказів, а не warning." },
    ],
    correctMove: "Stop loop, перевірте припущення і оберіть новий план або ask human.",
    consequence: "Workflow запобігає зростанню diff без доказів.",
    relatedGates: ["validation", "lifecycle-close"],
  },
  {
    id: "archive-before-close",
    title: "Архівування artifact перед lifecycle close",
    situation: "Agent хоче archive task artifacts до того, як acceptance стане чітким.",
    choices: [
      { id: "archive", label: "Archive immediately", feedback: "Artifacts можуть ще бути потрібні для review і доказів." },
      { id: "close-gate", label: "Спершу запустити lifecycle-close gate", feedback: "Правильно. Закриття лише після доказів і acceptance.", correct: true },
      { id: "delete", label: "Видалити artifacts для cleanup", feedback: "Це ризикованіше за archiving і теж потребує permission." },
    ],
    correctMove: "Тримайте artifacts, доки підтвердження закриття lifecycle не complete.",
    consequence: "Review trail лишається available, доки задачу не accepted.",
    relatedGates: ["lifecycle-close", "permission"],
  },
] satisfies DecisionScenario[];

export const practiceScenarios = [
  {
    id: "feature-local-to-shared",
    title: "Feature-local helpers -> shared",
    situation: "Agent хоче перенести helper з feature folder у shared utilities, бо він might be reusable.",
    choices: [
      { id: "move", label: "Перенести у shared зараз", feedback: "Це перетинає ownership до того, як докази repo це підтримують." },
      { id: "inspect", label: "Спершу перевірити usage patterns і ownership", feedback: "Правильно. Shared code потребує доказів ownership.", correct: true },
      { id: "duplicate", label: "Duplicate у shared і local", feedback: "Duplication без ownership clarity створює maintenance risk." },
    ],
    correctMove: "Зупиніть перенесення, доки актуальне repo usage і ownership conventions не justify shared placement.",
    consequence: "Helper лишається local, доки shared ownership не proven.",
    durableCorrectionCandidate: "Додати ownership gate note для local-to-shared movement.",
    relatedGates: ["ownership", "source-of-truth"],
  },
  {
    id: "docs-memory-conflict",
    title: "Docs vs Memory conflict",
    situation: "Memory каже, що один workflow standard, але актуальні docs кажуть інше.",
    choices: [
      { id: "memory", label: "Follow Memory", feedback: "Memory може бути stale." },
      { id: "docs", label: "Заземлити в актуальних docs і фактах repo", feedback: "Правильно. Актуальні durable project sources мають перевагу.", correct: true },
      { id: "ask-ai", label: "Ask AI, що новіше", feedback: "Це ще одне ungrounded твердження." },
    ],
    correctMove: "Оберіть актуальні project docs і докази repo як authority layer.",
    consequence: "Workflow уникає застарілого контексту.",
    durableCorrectionCandidate: "Задокументуйте, як розв'язувати конфлікти між Memory і docs.",
    relatedGates: ["source-of-truth"],
  },
  {
    id: "validation-passes-ui-wrong",
    title: "Validation passes, але UI wrong",
    situation: "Lint і build pass, але ручний review показує cramped mobile layout.",
    choices: [
      { id: "close", label: "Закрити, бо validation passed", feedback: "Успішний build ще не означає, що UI прийнятий." },
      { id: "uiqa", label: "Запустити UI QA і виправити видиму поведінку", feedback: "Правильно. Видима поведінка потребує власного gate.", correct: true },
      { id: "test", label: "Додати лише unit test", feedback: "Unit test може не ловити layout quality." },
    ],
    correctMove: "Використайте UI QA gate перед lifecycle close.",
    consequence: "Learner відділяє technical validation від visible quality.",
    durableCorrectionCandidate: "Додати UI QA до задач, що змінюють layout або interaction.",
    relatedGates: ["ui-qa", "lifecycle-close"],
  },
  {
    id: "symptom-fixing-growing-diff",
    title: "Symptom-fixing із growing diff",
    situation: "Agent продовжує застосовувати малі fixes. Diff grows, а початкова помилка лишається.",
    choices: [
      { id: "continue", label: "Дозволити продовжити", feedback: "Це stuck loop." },
      { id: "zoomout", label: "Stop і zoom out", feedback: "Правильно. Переоцініть план і припущення.", correct: true },
      { id: "merge", label: "Зберегти partial diff і рухатися далі", feedback: "Це створює unverified complexity." },
    ],
    correctMove: "Stop loop, перевірте джерело помилки і оберіть новий план.",
    consequence: "Diff перестає зростати без доказів.",
    durableCorrectionCandidate: "Додати stop condition після повторної failed validation.",
    relatedGates: ["validation", "lifecycle-close"],
  },
  {
    id: "edit-agents-file",
    title: "Редагування AGENTS.md / CLAUDE.md",
    situation: "Agent пропонує редагувати project instruction files після однієї помилки.",
    choices: [
      { id: "allow", label: "Дозволити direct edit", feedback: "Instruction files є durable workflow authority." },
      { id: "proposal", label: "Вимагати proposed correction і approval", feedback: "Правильно. Durable layers require approval.", correct: true },
      { id: "ban", label: "Ніколи не дозволяти зміни", feedback: "Деякі durable corrections valid, але require approval." },
    ],
    correctMove: "Попросіть minimal proposed durable correction і approve manually, якщо justified.",
    consequence: "Workflow improves без silent self-modification.",
    durableCorrectionCandidate: "Додати durable correction gate для instruction-file edits.",
    relatedGates: ["permission", "durable-correction"],
  },
  {
    id: "longer-prompt-no-durable",
    title: "Довший prompt без durable correction",
    situation: "Помилку виправлено через довший prompt, але durable layer не змінено.",
    choices: [
      { id: "done", label: "Вважати довший prompt достатнім", feedback: "Це допомагає лише поточній session." },
      { id: "classify", label: "Класифікувати, чи потрібен durable target", feedback: "Правильно. Вирішіть, чи виправдане майбутнє interception.", correct: true },
      { id: "rule", label: "Завжди створювати rule", feedback: "Не кожна повторна помилка belongs in a rule." },
    ],
    correctMove: "Вирішіть, чи це belongs in rule, skill, test, docs update, validation-перевірку, gate або stop condition.",
    consequence: "Learner відділяє session-local correction від durable improvement.",
    durableCorrectionCandidate: "Спрямуйте повторювані помилки до найменшого durable layer, який зможе перехопити їх у майбутньому.",
    relatedGates: ["durable-correction"],
  },
  {
    id: "adding-dependency",
    title: "Додавання dependency",
    situation: "Agent хоче додати dependency для convenience helper.",
    choices: [
      { id: "install", label: "Встановити її", feedback: "Dependency changes require approval і scope review." },
      { id: "gate", label: "Використати permission gate", feedback: "Правильно. Порівняйте локальні alternatives і ask approval.", correct: true },
      { id: "copy", label: "Скопіювати код із package", feedback: "Це може створити гірші maintenance і licensing issues." },
    ],
    correctMove: "Ask approval і обгрунтуйте, чому dependency потрібна.",
    consequence: "Workflow controls maintenance і supply-chain risk.",
    durableCorrectionCandidate: "Додати dependency-change permission gate.",
    relatedGates: ["permission", "validation"],
  },
  {
    id: "auth-api-payment",
    title: "Зміна auth/API/payment boundary",
    situation: "Agent хоче змінити payment callback path, бо задача не проходить validation.",
    choices: [
      { id: "patch", label: "Швидко patch", feedback: "Critical boundaries є high-risk." },
      { id: "highrisk", label: "Ескалювати до high-risk lane", feedback: "Правильно. Вимагайте authority, approval і deep validation.", correct: true },
      { id: "skip", label: "Skip validation, бо мале", feedback: "Малі boundary changes можуть мати high blast radius." },
    ],
    correctMove: "Stop і route task через source-of-truth, ownership, permission і validation gates.",
    consequence: "Workflow protects critical product boundaries.",
    durableCorrectionCandidate: "Додати high-risk lane rules для auth/API/payment changes.",
    relatedGates: ["permission", "source-of-truth", "ownership", "validation"],
  },
] satisfies PracticeScenario[];
