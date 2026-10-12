import { getFact } from "../../lib/canonical-facts";

export const SRD_LIMIT = parseInt(getFact("srd_income_limit").replace(/[^\d]/g, ""), 10);
export const SRD_MIN_AGE = parseInt(getFact("srd_age_range_min"), 10);
export const SRD_MAX_AGE = parseInt(getFact("srd_age_range_max"), 10);
export const OLDER_PERSONS_MIN_AGE = parseInt(getFact("older_persons_min_age"), 10);

export const eligibilityFaqs = [
  {
    q: "What counts as income for the SRD R370 grant?",
    a: `SASSA counts every deposit into bank accounts linked to your ID, including salaries, family transfers, stokvel payouts, e-wallet deposits and refunds. If your total monthly deposits reach R${SRD_LIMIT} or more, the system flags you for "income source detected".`,
  },
  {
    q: `I am over ${SRD_MAX_AGE}. Which grant should I check instead?`,
    a: `The SRD R370 grant is only available to applicants aged ${SRD_MIN_AGE} to ${SRD_MAX_AGE}. From age ${OLDER_PERSONS_MIN_AGE}, apply for the Old Age Pension instead, which pays more and is a permanent grant. The Disability Grant and War Veterans Grant also have their own age rules.`,
  },
  {
    q: "Why does SASSA check my bank account every month?",
    a: `The SRD is a means-tested grant, so SASSA runs automated bank verification each month to confirm you still earn under R${SRD_LIMIT} and are not receiving UIF or NSFAS. This is why you must re-qualify every month rather than once.`,
  },
];
