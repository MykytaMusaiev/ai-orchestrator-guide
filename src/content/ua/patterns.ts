import type { WorkflowPattern, WorkflowPatternId } from "../schemas";

export const workflowPatterns = [
  {
    id: "prompt-chaining",
    title: "Prompt chaining",
    means: "Розбийте роботу на впорядковані кроки: результат одного кроку стає вхідними даними для наступного.",
    useWhen: "Задача має відому послідовність, наприклад огляд -> редагування -> validation -> підсумок.",
    avoidWhen: "Задача потребує відкритого дослідження інструментів або незалежних паралельних думок.",
    orchestratorRisk: "Раннє неправильне припущення забруднює наступні кроки.",
    requiredGate: "source-of-truth",
    codingExample: "Попросіть короткий підсумок патерну в repo, потім мале редагування, заземлене в перевірених файлах.",
  },
  {
    id: "routing",
    title: "Routing",
    means: "Класифікуйте задачу і відправте її у правильну workflow-смугу.",
    useWhen: "Різні типи задач потребують різних authority layers, контрольних меж або глибини аудиту.",
    avoidWhen: "Задача вже вузька, а маршрут очевидний.",
    orchestratorRisk: "Низькоризикова смуга може бути обрана для високоризикової зміни межі.",
    requiredGate: "permission",
    codingExample: "Спрямуйте зміни тексту до легкої validation, а auth-зміни - до високоризикового перегляду й погодження.",
  },
  {
    id: "parallelization",
    title: "Parallelization",
    means: "Запустіть незалежні перевірки або пропозиції паралельно, потім порівняйте результати.",
    useWhen: "Незалежні шляхи перегляду можуть зменшити сліпі зони.",
    avoidWhen: "Підзадачі мають спільні змінювані файли або спершу потребують одного source of truth.",
    orchestratorRisk: "Конфліктні результати можуть створити плутанину під час merge або хибну впевненість.",
    requiredGate: "lifecycle-close",
    codingExample: "Один прохід перевіряє поведінку UI, інший тести, потім orchestrator узгоджує докази.",
  },
  {
    id: "orchestrator-worker",
    title: "Orchestrator-worker",
    means: "Центральний orchestrator розбиває роботу на обмежені worker-задачі й інтегрує їхні результати.",
    useWhen: "Робота більша, але її можна поділити на чіткі scopes.",
    avoidWhen: "Задача настільки мала, що делегування додає накладні витрати.",
    orchestratorRisk: "Workers можуть оптимізувати локальний результат і пропустити системні constraints.",
    requiredGate: "ownership",
    codingExample: "Окремі workers для docs, редагування компонентів і validation, потім перегляд об'єднаного diff.",
  },
  {
    id: "evaluator-optimizer",
    title: "Evaluator-optimizer",
    means: "Згенеруйте результат, оцініть його, покращте і зупиніться, коли gate задоволений.",
    useWhen: "Якість можна перевірити за чіткою рубрикою або умовою прийняття.",
    avoidWhen: "Evaluator не має надійного сигналу або постійно зміщує критерії.",
    orchestratorRisk: "Loop може полірувати симптоми замість виправлення справжньої проблеми.",
    requiredGate: "validation",
    codingExample: "Повторюйте ітерацію над failing test, доки він проходить, потім зупиніться і підсумуйте докази.",
  },
  {
    id: "agent",
    title: "Agent",
    means: "Loop з інструментами спостерігає, планує, діє, перевіряє і вирішує, чи продовжувати.",
    useWhen: "Шлях не повністю відомий, і обмежене дослідження корисне.",
    avoidWhen: "Дія є ризиковою, незворотною або спершу потребує людського погодження.",
    orchestratorRisk: "Loop може продовжити після слабких доказів або повторної помилки.",
    requiredGate: "permission",
    codingExample: "Дайте agent перевірити файли й запустити перевірки, але зупиніть його перед dependency або auth-boundary змінами.",
  },
] satisfies WorkflowPattern[];

export function getPattern(id: WorkflowPatternId) {
  return workflowPatterns.find((pattern) => pattern.id === id);
}
