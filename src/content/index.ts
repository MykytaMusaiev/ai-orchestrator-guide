import {
  agenticLoopCases as enAgenticLoopCases,
  authorityMatrixCases as enAuthorityMatrixCases,
  localLearningCases as enLocalLearningCases,
  permissionRiskCases as enPermissionRiskCases,
  practiceScenarios as enPracticeScenarios,
  selfCheckCards as enSelfCheckCards,
  workflowClassifierCases as enWorkflowClassifierCases,
} from "./en/scenarios";
import {
  availableChapters as enAvailableChapters,
  firstAvailableChapter as enFirstAvailableChapter,
  learningChapters as enLearningChapters,
  learningPath as enLearningPath,
} from "./en/sections";
import { gates as enGates } from "./en/gates";
import { references as enReferences } from "./en/references";
import { ui as enUi } from "./en/ui";
import { workflowPatterns as enWorkflowPatterns } from "./en/patterns";
import {
  agenticLoopCases as uaAgenticLoopCases,
  authorityMatrixCases as uaAuthorityMatrixCases,
  localLearningCases as uaLocalLearningCases,
  permissionRiskCases as uaPermissionRiskCases,
  practiceScenarios as uaPracticeScenarios,
  selfCheckCards as uaSelfCheckCards,
  workflowClassifierCases as uaWorkflowClassifierCases,
} from "./ua/scenarios";
import {
  availableChapters as uaAvailableChapters,
  firstAvailableChapter as uaFirstAvailableChapter,
  learningChapters as uaLearningChapters,
  learningPath as uaLearningPath,
} from "./ua/sections";
import { gates as uaGates } from "./ua/gates";
import { references as uaReferences } from "./ua/references";
import { ui as uaUi } from "./ua/ui";
import { workflowPatterns as uaWorkflowPatterns } from "./ua/patterns";
import type { Locale, LocalizedContent } from "./schemas";

export { defaultLocale, htmlLangByLocale, isLocale, localeLabels, supportedLocales } from "./locales";
export { relatedConceptTargets } from "./related-concepts";
export type * from "./schemas";

const localizedContent = {
  en: {
    locale: "en",
    ui: enUi,
    learningChapters: enLearningChapters,
    learningPath: enLearningPath,
    availableChapters: enAvailableChapters,
    firstAvailableChapter: enFirstAvailableChapter,
    selfCheckCards: enSelfCheckCards,
    authorityMatrixCases: enAuthorityMatrixCases,
    workflowClassifierCases: enWorkflowClassifierCases,
    agenticLoopCases: enAgenticLoopCases,
    localLearningCases: enLocalLearningCases,
    permissionRiskCases: enPermissionRiskCases,
    practiceScenarios: enPracticeScenarios,
    workflowPatterns: enWorkflowPatterns,
    gates: enGates,
    references: enReferences,
  },
  ua: {
    locale: "ua",
    ui: uaUi,
    learningChapters: uaLearningChapters,
    learningPath: uaLearningPath,
    availableChapters: uaAvailableChapters,
    firstAvailableChapter: uaFirstAvailableChapter,
    selfCheckCards: uaSelfCheckCards,
    authorityMatrixCases: uaAuthorityMatrixCases,
    workflowClassifierCases: uaWorkflowClassifierCases,
    agenticLoopCases: uaAgenticLoopCases,
    localLearningCases: uaLocalLearningCases,
    permissionRiskCases: uaPermissionRiskCases,
    practiceScenarios: uaPracticeScenarios,
    workflowPatterns: uaWorkflowPatterns,
    gates: uaGates,
    references: uaReferences,
  },
} satisfies Record<Locale, LocalizedContent>;

export function getLocalizedContent(locale: Locale) {
  return localizedContent[locale];
}
