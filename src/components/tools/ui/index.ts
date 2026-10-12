/**
 * Shared building blocks for tool pages.
 *
 * Kept deliberately small: each component here exists because more than one tool
 * needs it. Do not add an abstraction for a one-off control.
 *
 * `NextStepCard` is not re-exported here — import it from
 * `src/components/affiliate/NextStepCard`, which is the single implementation.
 */
export { default as ToolShell } from "./ToolShell";
export { default as QuestionStep } from "./QuestionStep";
export { default as YesNoChips } from "./YesNoChips";
export { default as MoneyInput } from "./MoneyInput";
export { default as ResultPanel, ResultNote } from "./ResultPanel";
export { default as RuleDisclosure } from "./RuleDisclosure";
export { default as PrintButton } from "./PrintButton";
