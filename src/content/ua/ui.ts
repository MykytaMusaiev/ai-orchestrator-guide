import type { UiDictionary } from "../schemas";

export const ui = {
  metadata: {
    defaultTitle: "AI Orchestrator Guide",
    titleTemplate: "%s | AI Orchestrator Guide",
    description:
      "Практичний навчальний сайт для developer-orchestrators: AI workflow orchestration, source of truth, quality gates і судження в agentic loop.",
    siteName: "AI Orchestrator Guide",
  },
  layout: {
    brandTitle: "Orchestrator Learning",
    brandSubtitle: "Практика workflow judgment",
    chapterNavigation: "Навігація розділами",
    mobileQuickNavigation: "Швидка мобільна навігація",
    overview: "Огляд",
    languageLabel: "Мова",
    switchLanguage: "Змінити мову",
    closeChapterPicker: "Закрити вибір розділу",
    closeChapters: "Закрити розділи",
  },
  navigation: {
    chapters: "Розділи",
    continue: "Продовжити",
    practice: "Практика",
    refs: "Джерела",
    previous: "Назад",
    next: "Далі",
    current: "Поточний",
    planned: "Заплановано",
    chapterMap: "Мапа розділів",
    practiceScenarios: "Практичні сценарії",
  },
  home: {
    mobileContext: "Огляд",
    eyebrow: "Практичний навчальний продукт",
    title: "AI workflow orchestration для developer judgment",
    summary:
      "Навчіться обирати authority layer, workflow-рівень, глибину аудиту, quality gates і наступну дію orchestrator для AI coding задач.",
    progressLabel: "Прогрес поточного розділу",
    chapterPath: (count) => `${count} розділів у шляху`,
    startPrompt: "Почніть з першого доступного розділу",
    howToEyebrow: "Як користуватися",
    howToTitle: "Почніть сфокусовано, потім розширюйте контекст",
    howToBody:
      "Огляд тримає навчальний шлях компактним. Відкрийте розділ, прочитайте пояснення, зробіть контрольне рішення і спробуйте легкий практичний інструмент для цієї навички.",
    startLearning: "Почати навчання",
    practice: "Практика",
    references: "Джерела",
    mapEyebrow: "MVP шлях",
    mapTitle: "Мапа розділів",
    mapBody:
      "Кожен пункт відкриває розділ із навчальним текстом, контрольним рішенням і практикою для однієї навички orchestrator.",
  },
  chapter: {
    mobileContext: (order) => `Розділ ${order}`,
    progressLabel: "Прогрес поточного розділу",
    progressText: (order, total) => `Розділ ${order} / ${total}`,
    practiceTargetEyebrow: "Ціль практики",
    practiceTargetTitle: "Що тренує цей розділ",
    patternSetEyebrow: "Набір patterns",
    patternSetTitle: "Шість workflow patterns",
    gateSetEyebrow: "Набір gates",
    gateSetTitle: "Сім quality gates",
    useWhen: "Коли використовувати",
    avoidWhen: "Коли не використовувати",
    risk: "Ризик",
    example: "Приклад",
    watchOut: "На що звернути увагу",
    sourceNotesEyebrow: "Нотатки джерел",
    sourceNotesTitle: "Опорні дослідницькі anchors для цього фрагмента",
    sourceNotesBody:
      "Це легкі anchors для майбутньої validation, підкріпленої джерелами. Вони прив'язані до зовнішніх фактичних тверджень, а не до продуктових рішень.",
    adjacentLabel: "Сусідні розділи",
  },
  practice: {
    mobileContext: "Практика",
    eyebrow: "Практичні сценарії",
    title: "Практичні сценарії",
    summary:
      "Використайте 8 MVP сценаріїв, щоб тренувати змішане судження orchestrator: authority, workflow-рівень, глибину аудиту, gates і durable correction.",
    progressLabel: "Статус маршруту",
    scenarioCount: "8 сценаріїв",
    capstone: "Підсумкова практика",
    howToEyebrow: "Як користуватися",
    howToTitle: "Оберіть дію перед відгуком",
    howToBody:
      "Кожен сценарій просить конкретний крок orchestrator. Оберіть дію, прочитайте наслідок, потім порівняйте з кандидатом на durable correction.",
  },
  references: {
    mobileContext: "Джерела",
    eyebrow: "Джерела / advanced reading",
    title: "Джерела та advanced reading",
    summary:
      "Дослідницькі anchors для майбутньої validation, підкріпленої джерелами, щодо зовнішніх тверджень про agents, workflows, інструменти, HITL, evals і permissions.",
    progressLabel: "Статус маршруту",
    backlog: "Research backlog",
    validateLater: "Перевірити поточні твердження пізніше",
    sourcePolicyEyebrow: "Політика джерел",
    sourcePolicyTitle: "Використовуйте джерела для зовнішніх тверджень",
    sourcePolicyBody:
      "Продуктові рішення походять із calibration artifact. Зовнішні фактичні твердження потребують anchors, підкріплених джерелами, а конкретна поведінка vendor потребує актуальних офіційних docs під час дослідницького проходу.",
    groups: [
      {
        category: "core",
        eyebrow: "Ключові джерела",
        title: "Workflow і agent concepts",
        description:
          "Використовуйте ці anchors для подальшої validation workflow patterns, agent loops, HITL і evals.",
      },
      {
        category: "vendor-docs",
        eyebrow: "Vendor docs",
        title: "Поточна поведінка продуктів",
        description:
          "Перевіряйте актуальні official docs перед конкретними твердженнями про sandboxing, approvals, permissions або поведінку інструмента.",
      },
      {
        category: "advanced",
        eyebrow: "Advanced reading",
        title: "Концепти наступного рівня",
        description:
          "Тримайте це як optional reading. Воно не має ставати MVP blueprint.",
      },
    ],
  },
  learning: {
    decisionCheckpoint: "Контрольне рішення",
    checkpointTitle: "Зробіть authority-рішення",
    hideExpectedMove: "Сховати очікуваний крок",
    revealExpectedMove: "Показати очікуваний крок",
    durableHabit: "Стійка звичка:",
    relatedConcepts: "Пов'язані concepts",
    sourceAnchors: "Опорні джерела",
    sourceListLabel: "Опорні джерела для цього розділу",
  },
  interactives: {
    eyebrow: "Interactive",
    scenariosLabel: "сценарії",
    choiceInstruction: "Оберіть крок orchestrator для цього сценарію.",
    correctMove: "Правильний крок:",
    consequence: "Наслідок:",
    relatedGates: "Пов'язані gates",
    chooseHint: "Оберіть крок, щоб побачити відгук.",
    selfCheckTitle: "Self-check / reveal cards",
    selfCheckIntro:
      "Використайте ці швидкі перевірки, щоб розрізняти правдоподібні відповіді, докази і durable workflow improvement.",
    authorityMatrixTitle: "Source-of-Truth Authority Matrix",
    authorityMatrixIntro:
      "Спершу оберіть authority layer, а вже потім вирішуйте, чи може agent продовжувати.",
    authorityLayer: "Authority layer",
    sourceOfTruth: "Source of truth",
    workflowClassifierTitle: "Workflow Classifier",
    workflowClassifierIntro:
      "Класифікуйте workflow pattern і помітьте ризик orchestrator до початку роботи.",
    targetPattern: "Цільовий pattern",
    risk: "Ризик",
    agenticLoopTitle: "Agentic Loop Simulator",
    agenticLoopIntro:
      "Тренуйте рішення: loop має продовжити, зупинитися, zoom out або ask human.",
    localLearningTitle: "Local Learning Loop Wizard",
    localLearningIntro:
      "Класифікуйте сигнал помилки і спрямуйте correction до найменшого durable layer, який перехопить схожу помилку пізніше.",
    failureSignal: "Сигнал помилки",
    durableTarget: "Durable target",
    permissionRiskTitle: "Permission / Risk Gate Stress-Test",
    permissionRiskIntro:
      "Зробіть паузу, поясніть ризик, визначте gate, а потім вирішіть: ask approval, validate, stop або zoom out.",
    practiceScenariosTitle: "Практичні сценарії",
    practiceScenariosIntro:
      "Змішані сценарії поєднують ownership, source of truth, UI QA, zoom-out, durable correction, permission gates і high-risk boundaries.",
    durableCorrectionCandidate: "Кандидат на durable correction",
  },
} satisfies UiDictionary;
