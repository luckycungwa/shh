import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "..", "public", "data", "guides.json");

const csgImage = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop&auto=format";

const appealGuide = {
  "id": "appeal-guide",
  "title": "How to Appeal a Declined SASSA SRD Application",
  "description": "A step-by-step guide to the official SASSA SRD appeal: check the declined month, lodge within 90 days using your ID, phone and PIN, and track the tribunal outcome.",
  "category": "Appeals & Reconsideration",
  "difficulty": "intermediate",
  "estimatedTime": "15 minutes",
  "image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=400&fit=crop&auto=format",
  "imageAlt": "Paper document with a stamp reading 'Appeal'",
  "steps": [
    {
      "title": "Check the declined month and the decision date",
      "content": "Open the SRD status portal and find the exact month that was declined. Write down the decline reason and the date of the decision. The 90-day appeal window runs from that decision date, not from the day you first notice the status. Each month has its own decision, so an appeal for one month does not cover another.",
      "tips": [
        "Check the month, not a single overall application status.",
        "Do not wait for a new month before appealing an older declined month."
      ]
    },
    {
      "title": "Understand what the tribunal can reassess",
      "content": "An SRD appeal is decided by the Independent Tribunal for Social Assistance Appeals. The tribunal reassesses SASSA's decision on the information that was available when you applied. You cannot add new evidence at the appeal stage, and there is no document upload in the SRD appeal form. This is different from a fresh application, where you can update your details for a future month.",
      "tips": [
        "Do not pay anyone to \"prepare evidence\" for an SRD appeal.",
        "If your information was wrong, correct it on the SRD portal for future months."
      ]
    },
    {
      "title": "Lodge the appeal on the official portal",
      "content": "Go to https://srd.sassa.gov.za/appeals/appeal. Enter your 13-digit ID number and the 10-digit phone number used for your SRD application, then tap send pin. Enter the 6-digit PIN sent to that phone. The portal shows the months with declined outcomes; open the month you want to appeal.",
      "tips": [
        "The ID and phone number must match SASSA's records.",
        "Old guides may list srd-appeals.dsd.gov.za; that address does not work. Use srd.sassa.gov.za."
      ]
    },
    {
      "title": "Choose the reason that fits your case",
      "content": "Select the appeal reason from the list the portal shows. Examples include identity verification fixed, no alternative income source, not registered for UIF, and not registered for NSFAS. The reason must describe your actual case; the tribunal decides on the record SASSA already has.",
      "tips": [
        "Read the decline reason first so you choose the matching appeal reason.",
        "If no listed reason fits, do not invent one; follow up with SASSA before submitting."
      ]
    },
    {
      "title": "Submit and keep proof",
      "content": "Tap apply to record the appeal against that month. Take a screenshot of the confirmation. The appeal is linked to your ID number and the month, so you check that month's outcome later on the same portal rather than looking for a separate reference number.",
      "tips": [
        "Do not submit a second appeal for the same month; the portal rejects duplicates for that period.",
        "Keep the phone number active because the PIN and decision are sent to it."
      ]
    },
    {
      "title": "Track the tribunal outcome",
      "content": "The Independent Tribunal must finalise the appeal within 90 days of receiving it. Check the same month on https://srd.sassa.gov.za/appeals/appeal with a new PIN. The decision is also communicated electronically. An approved appeal sets aside the decline; a declined appeal confirms it for that month.",
      "tips": [
        "Check once a week rather than every day.",
        "If more than 90 days pass with no outcome, follow up through official SASSA channels."
      ]
    },
    {
      "title": "Know what happens after the decision",
      "content": "If the appeal succeeds, SASSA must implement the tribunal's decision, but the appeal decision does not create a fixed payment date. Check your SRD status and the payment schedule. If the appeal is declined, you can submit a new SRD application for a later month if you still qualify. A refused appeal for one month does not ban you from applying again.",
      "tips": [
        "A new application is assessed on the information you provide for that month.",
        "Do not pay anyone who claims they can reopen a closed appeal."
      ]
    }
  ],
  "faqs": [
    {
      "q": "How long do I have to appeal a declined SASSA SRD grant?",
      "a": "You have 90 days from the date of the decision to lodge an appeal on the official portal. The SRD appeal rules say an appeal lodged after that period will not be considered."
    },
    {
      "q": "Do I need a reconsideration before I can appeal?",
      "a": "No. There is no separate reconsideration step that must be completed before an SRD appeal. You can lodge the appeal directly on the official portal within 90 days. A review of your information for future months is not a substitute for the appeal."
    },
    {
      "q": "What is the difference between a reconsideration and an appeal?",
      "a": "A reconsideration is a review of your information, often after you correct details. An appeal is a formal challenge to a declined month, decided by the Independent Tribunal. The appeal is lodged on the official portal and is subject to the 90-day window."
    },
    {
      "q": "Can I add new bank statements or affidavits to my appeal?",
      "a": "No. The SRD appeal rules say you may not submit evidence or information that was not provided to SASSA at the time of the application. The tribunal reassesses the decision on the information SASSA already had."
    },
    {
      "q": "Will I get back pay if my appeal succeeds?",
      "a": "An approved appeal means the tribunal set aside the declined decision. SASSA must then implement the outcome. The appeal decision does not guarantee a payment date, so check your SRD status and the SASSA payment schedule."
    },
    {
      "q": "I missed the 90-day appeal deadline. What can I do?",
      "a": "The SRD rules do not provide a late-appeal route. You cannot reopen that month by appeal. Submit a new SRD application for a later month if you still qualify, and do not pay anyone who promises to reopen a closed appeal."
    },
    {
      "q": "The appeal portal will not accept my phone number. What should I do?",
      "a": "Check that the ID number and phone number exactly match your SRD application. If your phone number changed, update it on the SRD portal first. Try another browser, and contact the SASSA helpline on 0800 60 10 11 if it still fails."
    }
  ],
  "tags": [
    "SASSA appeal",
    "SRD appeal",
    "ITSAA",
    "declined SRD",
    "90-day appeal"
  ],
  "lastUpdated": "2026-10-23",
  "author": "Lucky Cungwa",
  "sources": [
    {
      "title": "Official SASSA Website",
      "url": "https://www.sassa.gov.za"
    },
    {
      "title": "SASSA SRD Grant Portal",
      "url": "https://srd.sassa.gov.za"
    },
    {
      "title": "SRD Appeals Portal (Independent Tribunal)",
      "url": "https://srd.sassa.gov.za/appeals/appeal"
    },
    {
      "title": "Department of Social Development",
      "url": "https://www.dsd.gov.za"
    }
  ],
  "relatedLinks": [
    {
      "title": "Check Your SRD Status",
      "url": "/status-check",
      "isExternal": false
    },
    {
      "title": "Check an Appeal Status",
      "url": "/appeals/appeal-status-check",
      "isExternal": false
    },
    {
      "title": "SRD Appeal Deadline",
      "url": "/appeals/appeal-deadline",
      "isExternal": false
    },
    {
      "title": "Income Source Detected: Appeal Guide",
      "url": "/guides/income-source-detected-appeal",
      "isExternal": false
    },
    {
      "title": "Official SRD Appeals Portal",
      "url": "https://srd.sassa.gov.za/appeals/appeal",
      "isExternal": true
    }
  ],
  "nextSteps": [
    {
      "title": "Check my appeal deadline",
      "url": "/tools/appeal-deadline",
      "description": "Work out the 90-day SRD appeal window"
    },
    {
      "title": "Appeal hub",
      "url": "/appeals",
      "description": "Quick guides for each appeal step"
    },
    {
      "title": "Income source detected decline",
      "url": "/guides/income-source-detected-appeal",
      "description": "What the flag means and how to appeal"
    },
    {
      "title": "Reapplication vs appeal",
      "url": "/guides/srd-reapplication",
      "description": "When a new application is the right route"
    },
    {
      "title": "Check appeal status",
      "url": "/appeals/appeal-status-check",
      "description": "Use your ID, phone and PIN"
    }
  ]
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
        "If SASSA declines your application, you will receive the reason in the SMS. Many declines are for a simple data error or a means test result that can be disputed. Follow the appeal route and deadline stated in the decision letter; do not assume a separate reconsideration step is required. For an SRD decline, the appeal is lodged on the official SRD appeals portal within 90 days. If the reason was that your income is over the threshold, wait until your income drops and re-apply with updated proof.",
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
