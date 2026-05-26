export type FaqItem = { q: string; a: string };

export const brikFaq: FaqItem[] = [
  {
    q: "Can I just delete the alarm?",
    a: "You cannot dismiss without finishing the mission. The watchdog re-fires for five minutes. The notification panel and Lock Screen do not have an exit button.",
  },
  {
    q: "What if I cannot do pushups?",
    a: "Pick another mission. Math, sky photo, and make-your-bed do not need physical activity.",
  },
  {
    q: "Does it cheat on me with notifications and ads?",
    a: "No backend. No analytics SDK. No social feed. Nothing leaves your phone.",
  },
  {
    q: "Why such a hard paywall?",
    a: "Brik is a contract. A free tier with the contract removed is not the same product. The weekly is there if you want to try a week before committing to a year.",
  },
  {
    q: "What devices?",
    a: "iPhone only. iOS 26 and up (AlarmKit). No iPad, Watch, or Mac companion. English only at launch.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Cancel in Settings before the trial ends and you will not be charged.",
  },
];

export const eunhoFaq: FaqItem[] = [
  {
    q: "Can I track more than one habit?",
    a: "No. That is the point. Finish a habit, move it to history, pick the next one.",
  },
  {
    q: "Do I need an account?",
    a: "No. No sign-in. No analytics. Nothing leaves the phone.",
  },
  {
    q: "Does it sync to the Apple Watch?",
    a: "Yes. The Watch shows a glance. The check-in stays on the phone, where the hold has weight.",
  },
  {
    q: "What if I miss a day?",
    a: "Free lets you mark yesterday. Pro lets you mark any past day.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Cancel in Settings, anytime. Free tier keeps the hold.",
  },
];

export const uninstallFaq: FaqItem[] = [
  {
    q: "CAN I UNBLOCK IF I REALLY NEED TO?",
    a: "Only by uninstalling Uninstall. That is the contract.",
  },
  {
    q: "IS THIS A PARENTAL CONTROL APP?",
    a: "No. Self-application only. Adults controlling their own phone use.",
  },
  {
    q: "WHAT DEVICES?",
    a: "iPhone only. iOS 18+. No iPad. No Mac. No Watch. No Android.",
  },
  {
    q: "IS MY DATA PRIVATE?",
    a: "The app cannot see which apps you open. Blocking runs through Apple's FamilyControls and ManagedSettings frameworks. On-device only. No analytics SDK. Ever.",
  },
  {
    q: "WHAT IF THE BLOCK FIRES WHEN I HAVE AN EMERGENCY?",
    a: "Call apps are not blockable through FamilyControls. Phone, Messages, and emergency services stay available.",
  },
  {
    q: "CAN I CANCEL?",
    a: "Yes. Cancel in Settings. No questions.",
  },
];
