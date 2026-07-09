import type { Gate, GateId } from "../schemas";

export const gates = [
  {
    id: "validation",
    title: "Validation gate",
    purpose: "Доводить, що технічна зміна працює на потрібному рівні.",
    useWhen: "Build, тести, перевірки типів, статичні перевірки або цільові команди можуть перевірити задачу.",
    watchOut: "Успішна validation не дорівнює правильній видимій поведінці чи правильному продуктовому напряму.",
  },
  {
    id: "source-of-truth",
    title: "Source-of-truth gate",
    purpose: "Змушує orchestrator обрати правильний authority layer перед продовженням.",
    useWhen: "Agent робить твердження про поведінку repo, поведінку інструмента, продуктову мету або актуальні docs.",
    watchOut: "Не вирішуйте конфлікти проханням до моделі вгадати, яке джерело правдиве.",
  },
  {
    id: "ownership",
    title: "Ownership gate",
    purpose: "Захищає локальні/shared межі й домовленості про ownership у проєкті.",
    useWhen: "Зміна переносить допоміжний код, змінює shared code, редагує правила або перетинає межі модулів.",
    watchOut: "Загальної framework-практики недостатньо як доказу для цього repo.",
  },
  {
    id: "permission",
    title: "Permission gate",
    purpose: "Зупиняє ризикові, незворотні, security-sensitive або scope-expanding дії.",
    useWhen: "Agent хоче видалити файл, встановити dependency, переписати правила, запустити destructive commands або змінити critical boundaries.",
    watchOut: "Tool permissions є механізмами продукту, але вони не замінюють orchestrator judgment.",
  },
  {
    id: "ui-qa",
    title: "UI QA gate",
    purpose: "Перевіряє видиму поведінку, яку build і тести можуть пропустити.",
    useWhen: "Задача змінює макет, взаємодію, щільність тексту, візуальну ієрархію або поведінку браузера.",
    watchOut: "Green build все одно може пропустити зламаний або незручний UI.",
  },
  {
    id: "lifecycle-close",
    title: "Lifecycle-close gate",
    purpose: "Не дає закрити задачу без доказів і acceptance.",
    useWhen: "Agent каже, що задача завершена, хоче архівувати артефакти або пропускає фінальну verification.",
    watchOut: "Не плутайте завершення implementation із прийнятою задачею.",
  },
  {
    id: "durable-correction",
    title: "Durable correction gate",
    purpose: "Спрямовує повторювані помилки до правильного durable layer з orchestrator approval.",
    useWhen: "Помилка ймовірно повториться в майбутніх запусках.",
    watchOut: "Не кожне виправлення належить у правило, skill, тест, docs update або gate.",
  },
] satisfies Gate[];

export function getGateTitle(id: GateId) {
  return gates.find((gate) => gate.id === id)?.title ?? id;
}
