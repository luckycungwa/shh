import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "..", "public", "data", "guides.json");

const appealImage = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop&auto=format";
const csgImage = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop&auto=format";

const appealGuide = {
  id: "appeal-guide",
  title: "How to Appeal a Declined SASSA SRD Application (Step-by-Step)",
  description:
    "Your SASSA SRD R370 application was declined — that is not the end of the road. Every declined applicant can dispute the decision, first with a SASSA reconsideration and then with an appeal to the Independent Tribunal for Social Assistance Appeals (ITSAA). This step-by-step 2026 guide shows you exactly how to find your decline reason, gather the right evidence, submit your appeal online or by WhatsApp, track it, and what to do if the appeal also fails.",
  category: "Appeals",
  difficulty: "intermediate",
  estimatedTime: "20 minutes",
  image: appealImage,
  imageAlt: "Paper document with a stamp reading 'Appeal'",
  steps: [
    {
      title: "Find Out Exactly Why Your SRD Was Declined",
      content:
        "Every decline has a reason, and a strong appeal is built around that reason. Log in at the official SRD portal at srd.sassa.gov.za with your ID number and cellphone number, or use our SRD status checker, and read the exact status next to your application. The most common 2026 decline reasons are: UIF registered, NSFAS registered, income source detected, identity verification failed, bank details pending, means test failed, and age outside range. Before you do anything else, read the page for your specific decline reason on our site so you understand what SASSA's automated system actually flagged.",
      tips: [
        "Write down your exact decline reason and the date it appeared on the portal — you will need both when you appeal.",
        "Do not wait. The reconsideration window is 30 days and starts from the day the decision appears.",
      ],
    },
    {
      title: "Understand the Two-Step Appeals Process",
      content:
        "There are two separate levels of dispute, and you must do them in order. Step one is a reconsideration: you ask SASSA to look at your application again within 30 days of the decline, free of charge, at srd.sassa.gov.za. Step two is an appeal to the Independent Tribunal for Social Assistance Appeals (ITSAA): you have 90 days from the date of the reconsideration outcome to take the case further at srd-appeals.dsd.gov.za. If you try to appeal straight to the Tribunal without a reconsideration first, your case will usually be sent back and you will lose time.",
      tips: [
        "You do not need a lawyer for either step — both are designed for applicants to complete on their own.",
        "Keep every reference number you receive: the SRD application number, the reconsideration number, and the ITSAA case number.",
      ],
    },
    {
      title: "Gather Evidence That Matches Your Decline Reason",
      content:
        "Your appeal is only as strong as your proof. If SASSA flagged you as UIF or NSFAS registered, get an official letter or statement from that fund showing you are not registered or are not receiving payments. If you received income source detected, prepare bank statements showing the money was a family transfer, stokvel payout, or a once-off gift and not a salary. If identity verification failed, make sure your ID number, cellphone number and banking details are exactly right before you submit. Where you cannot get a document, a sworn affidavit can carry the explanation.",
      tips: [
        "Photograph or scan your documents clearly and save them as PDF or JPG before you start the online form.",
        "Never hide real income — SASSA cross-checks your bank accounts, UIF and NSFAS records every month.",
      ],
    },
    {
      title: "Submit Your Reconsideration Online",
      content:
        "Go to srd.sassa.gov.za and log in with your ID number and cellphone number. Under your declined application you will see the option to apply for reconsideration. Answer the questions honestly, upload your supporting documents, and confirm the submission. You will receive an SMS with a reference number. Most reconsideration outcomes are sent within 30 days. If SASSA upholds the decline, the same portal will show that you now have the option to appeal to the Independent Tribunal.",
      tips: [
        "Take a screenshot of each step so you have proof if something goes wrong and you need to contact SASSA.",
        "Use a stable internet connection — the SRD portal times out if you leave the page idle.",
      ],
    },
    {
      title: "Appeal to the Independent Tribunal (ITSAA)",
      content:
        "If your reconsideration is refused, go to srd-appeals.dsd.gov.za to lodge a formal appeal with the Independent Tribunal for Social Assistance Appeals. Register with your ID number and mobile number, select the SRD R370 grant and the exact decline reason, explain in your own words why the decision is wrong, and attach the same evidence you used in the reconsideration. The Tribunal aims to decide within 90 days, and the outcome is sent by SMS. If the portal will not accept your phone number, you can email the Tribunal instead.",
      tips: [
        "Keep your explanation short, specific and truthful — clear facts beat long emotional letters.",
        "Make sure the bank details on your application are correct so back pay can be paid without delay.",
      ],
    },
    {
      title: "Track Your Appeal and Know the Timeline",
      content:
        "Once you have submitted, you can follow progress on the ITSAA portal using your case number. If a decision goes in your favour, SASSA pays the back pay for the months your grant was wrongly stopped, into the bank account or payment method on your application. If your appeal runs past 90 days without a decision, contact the Tribunal directly. For a full breakdown of what happens at every stage, from day 0 to the decision, see our guide to SASSA appeal timelines.",
      tips: [
        "Check your SMS inbox and your SRD portal status every week while the appeal is open.",
        "The decision SMS sometimes takes a day or two longer than the portal update — trust the portal.",
      ],
    },
    {
      title: "What to Do If Your Appeal Is Declined",
      content:
        "A refused appeal does not ban you from the grant. Because the SRD R370 application window reopens each month, you can apply again in a later application period as long as you still qualify: your income must be below {{srd_income_limit}} per month and you must be between the ages of {{srd_age_range_min}} and {{srd_age_range_max}}. If the decline reason was income-related, sort out the issue that changed your circumstances before re-applying. If you believe the system is still wrong, contact the SASSA SRD call centre and ask for a manual check of your file, with your ID number at hand.",
      tips: [
        "A re-application is a brand-new application, not an extension — answer every question again and keep your proof.",
        "Keep all reference numbers and SMS messages until the new application is approved.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long do I have to appeal a declined SASSA SRD grant?",
      a: "You have 30 days from the decline to submit a SASSA reconsideration at srd.sassa.gov.za. If that is refused, you then have 90 days from the reconsideration outcome to appeal to the Independent Tribunal for Social Assistance Appeals (ITSAA).",
    },
    {
      q: "What is the difference between a reconsideration and an ITSAA appeal?",
      a: "A reconsideration is the first step, where SASSA re-examines your application itself within 30 days. An ITSAA appeal is the second step, heard by the independent Tribunal at srd-appeals.dsd.gov.za, and you can only lodge it after a reconsideration has been refused.",
    },
    {
      q: "Can I appeal more than once?",
      a: "For the same decline you get one reconsideration and one appeal. However, you can submit a brand-new SRD application in a later monthly application window if you still meet the income and age rules.",
    },
    {
      q: "Will I get back pay if my appeal succeeds?",
      a: "Yes. If a reconsideration or Tribunal appeal is decided in your favour, SASSA pays the grant you missed from the date the payments stopped, into your bank account or your chosen payment method.",
    },
  ],
  tags: ["SASSA appeal 2026", "SRD reconsideration", "ITSAA appeal", "declined SRD R370"],
  lastUpdated: "2026-08-04",
  author: "Lucky Cungwa",
  sources: [
    { title: "Official SASSA Website", url: "https://www.sassa.gov.za" },
    { title: "SASSA SRD Grant Portal", url: "https://srd.sassa.gov.za" },
    { title: "SRD Appeals Portal (Independent Tribunal)", url: "https://srd-appeals.dsd.gov.za" },
    { title: "Department of Social Development", url: "https://www.dsd.gov.za" },
  ],
  relatedLinks: [
    { title: "Check Your SRD Status", url: "/status-check", isExternal: false },
    { title: "Income Source Detected: Deep-Dive Appeal Guide", url: "/guides/income-source-detected-appeal", isExternal: false },
    { title: "How Long Does a SASSA Appeal Take?", url: "/guides/appeal-timeline", isExternal: false },
    { title: "Common SASSA Problems", url: "/common-problems", isExternal: false },
    { title: "Lodge an Appeal on the ITSAA Portal", url: "https://srd-appeals.dsd.gov.za", isExternal: true },
  ],
};

const csgGuide = {
  id: "apply-child-support-grant",
  title: "How to Apply for the SASSA Child Support Grant in 2026",
  description:
    "Step-by-step guide to applying for the SASSA Child Support Grant in 2026: eligibility rules and the income means test, the documents you need, how to apply online, in person or by post, what happens after you apply, the payment amount and dates, common mistakes that cause delays, and what to do if your application is declined.",
  category: "Applications",
  difficulty: "beginner",
  estimatedTime: "30 minutes",
  image: csgImage,
  imageAlt: "Family hands gathered together representing support for children",
  steps: [
    {
      title: "Check You Meet the 2026 Eligibility Rules",
      content:
        "Before you apply, check that you qualify. The child must be under 18 and must live with you as the primary caregiver — the person responsible for the child's daily needs. You and the child must be South African citizens, permanent residents, or refugees. Finally, you must pass the means test: if you are single, your monthly income must be {{child_support_income_threshold_single}} or less, and if you are married, your combined household income must be {{child_support_income_threshold_married}} or less. The grant is paid at {{child_support_grant_amount}} per child per month.",
      tips: [
        "The means test looks at your gross monthly income before tax, so count your full pay.",
        "Working parents can still qualify — the child support threshold is much higher than the SRD limit.",
      ],
    },
    {
      title: "Gather Your Documents Before You Apply",
      content:
        "Having the right documents ready saves you a second visit. You need your 13-digit South African ID (green ID book or smart ID card), the child's birth certificate (an unabridged copy is preferred), the child's ID number, proof of residence, and proof of income — payslips, bank statements, or an affidavit if you have no income. If you are not the child's parent, you also need an affidavit from the biological parent explaining the situation. See our full document checklist for the complete list.",
      tips: [
        "An unabridged birth certificate avoids delays when the child's parents are not married.",
        "Make copies of everything and keep the originals — SASSA returns your documents after the application.",
      ],
    },
    {
      title: "Choose Where to Apply: Online, In Person, or by Post",
      content:
        "You have three options. Online is the fastest: register at the official SASSA services portal at services.sassa.gov.za and complete the application in one sitting. In person at your nearest SASSA office is the most popular option because a SASSA officer checks your documents on the spot. If you cannot travel, you can post your completed application form and certified copies to your provincial SASSA office. Whichever you choose, start with the eligibility rules and documents above so your application is complete the first time.",
      tips: [
        "Find your nearest SASSA office and its opening hours on our SASSA offices page before you travel.",
        "If you apply online, you may still be asked to visit an office to verify your ID and documents.",
      ],
    },
    {
      title: "Submit Your Application Step by Step",
      content:
        "At a SASSA office, take a queue ticket, complete the application form with help from the officer, and hand over your documents — it is recommended to bring the child with you. Online, log in to services.sassa.gov.za, select the Child Support Grant, fill in your details and the child's details, and upload your documents. In both cases you will be asked about your income, your living situation, and the child's living arrangements. Answer everything truthfully — SASSA checks the information against national records.",
      tips: [
        "A court order, social worker report, or affidavit helps if you need to prove you are the primary caregiver.",
        "Give SASSA a cellphone number you will keep for at least three months — approval is sent by SMS.",
      ],
    },
    {
      title: "Understand What Happens After You Apply",
      content:
        "You will receive a receipt with a reference number — keep it safe, it is your proof of application. SASSA processes applications within 30 to 90 days and will send an SMS when a decision is made. If approved, payments start and are made each month from around the 6th, at {{child_support_grant_amount}} per child. You will need a bank account, a SASSA payment card, or a cash collection point to receive the money. Your grant continues until the child turns 18 or your circumstances change.",
      tips: [
        "Set up your bank details correctly — see our guide to changing your banking details if you need to update them.",
        "If you care for more than one child, you receive the grant amount for each qualifying child.",
      ],
    },
    {
      title: "Avoid These Common Application Mistakes",
      content:
        "Most declined or delayed child support applications come down to the same mistakes: a misspelled ID number or surname that does not match the child's birth certificate, income declared that accidentally exceeds the threshold, a missing affidavit for a non-parent caregiver, incorrect bank details, or no proof of residence. Double-check every number and letter before you submit, and if your details change after applying, tell SASSA immediately. A small error at the application stage can hold up a grant for months.",
      tips: [
        "Re-read the form once, slowly, before handing it over — especially the ID numbers and dates of birth.",
        "If you move house or change jobs, update SASSA right away to protect your grant.",
      ],
    },
    {
      title: "What to Do If Your Application Is Declined",
      content:
        "If SASSA declines your application, you will receive the reason in the SMS. Many declines are for a simple data error or a means test result that can be disputed. You have 30 days to ask SASSA to reconsider the decision, and then 90 days to appeal to the Independent Tribunal for Social Assistance Appeals if needed — the same process we explain in our guide to appealing a declined SASSA application. If the reason was that your income is over the threshold, wait until your income drops and re-apply with updated proof.",
      tips: [
        "Check your decline reason on our status pages so you fix the real issue before re-applying.",
        "Do not submit a duplicate application while an existing one is still being processed — it can confuse the system.",
      ],
    },
  ],
  faqs: [
    {
      q: "How much is the SASSA Child Support Grant in 2026?",
      a: "The Child Support Grant is {{child_support_grant_amount}} per child per month in 2026. You receive that amount for each child who qualifies, so a caregiver with two qualifying children receives double.",
    },
    {
      q: "How long does a Child Support Grant application take?",
      a: "SASSA says applications are normally processed within 30 to 90 days. You will get an SMS with the outcome, and if approved, the first payment follows shortly after.",
    },
    {
      q: "Can a grandparent or a working parent apply?",
      a: "Yes. Any primary caregiver can apply, including grandparents and other relatives — with an affidavit if you are not the parent. Working parents can also qualify as long as their monthly income is below the threshold of {{child_support_income_threshold_single}} if single, or {{child_support_income_threshold_married}} combined if married.",
    },
    {
      q: "Can I apply for the Child Support Grant online?",
      a: "Yes, you can start and complete your application online at services.sassa.gov.za. You may still need to visit a SASSA office once to verify your ID and original documents.",
    },
  ],
  tags: ["SASSA child support grant 2026", "CSG application", "grant eligibility"],
  lastUpdated: "2026-08-04",
  author: "Lucky Cungwa",
  sources: [
    { title: "Official SASSA Website", url: "https://www.sassa.gov.za" },
    { title: "SASSA Services Portal (Online Applications)", url: "https://services.sassa.gov.za" },
    { title: "Children's Act 2005", url: "https://www.gov.za/documents/childrens-act" },
    { title: "Department of Social Development", url: "https://www.dsd.gov.za" },
  ],
  relatedLinks: [
    { title: "Child Support Grant Overview & Amounts", url: "/grants/child-support-grant", isExternal: false },
    { title: "SASSA Grant Documents Checklist", url: "/guides/document-checklist", isExternal: false },
    { title: "How to Apply for SASSA Grants (All Types)", url: "/guides/apply-sassa-grants", isExternal: false },
    { title: "Check If You Qualify", url: "/eligibility-check", isExternal: false },
    { title: "Payment Dates 2026", url: "/payment-calendar", isExternal: false },
  ],
};

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const replacements = { "appeal-guide": appealGuide, "apply-child-support-grant": csgGuide };

let updated = 0;
for (let i = 0; i < data.length; i++) {
  if (replacements[data[i].id]) {
    data[i] = replacements[data[i].id];
    updated++;
  }
}

if (updated !== Object.keys(replacements).length) {
  console.error(`expected to replace ${Object.keys(replacements).length} guides, replaced ${updated}`);
  process.exit(1);
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`rewrote ${updated} guides -> ${dataPath}`);
