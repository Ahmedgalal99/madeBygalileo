// Facts from the CV, shared by both languages. Every user-facing string is { en, ar }.
// The project archive with mockups lives in projects.ts.

import type { Lang } from "./i18n";

export type Text = Record<Lang, string>;

export const profile = {
  email: "a.galal.dev99@gmail.com",
  linkedin: "https://www.linkedin.com/in/ahmedgalaldev",
  github: "https://github.com/Ahmedgalal99",
};

/* ───────────── Featured case studies (the laptop) ───────────── */

export type CaseStudy = {
  id: "tam" | "rasid" | "moc";
  name: Text;
  kind: Text;
  what: Text;
  role: Text;
  stack: string[];
  backend: string[];
  challenge: Text;
  outcome: Text;
  note: Text;
  url?: string;
  /** Slug of the matching full case study in projects.ts. */
  caseSlug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "tam",
    name: { en: "TAM", ar: "تام" },
    kind: { en: "event & ticketing · seat booking", ar: "منصة فعاليات وتذاكر · حجز مقاعد" },
    what: {
      en: "Jovial — an event & ticketing platform built at TAM. Browse events, pick tickets, choose your exact seat.",
      ar: "جوفيال — منصة فعاليات وتذاكر بُنيت في تام: تصفّح الفعاليات، اختر التذاكر، وحدّد مقعدك بالضبط.",
    },
    role: {
      en: "Built the booking experience end to end, including a drag-and-drop seat-map builder shipped as a reusable component library.",
      ar: "بنيت تجربة الحجز كاملة، بما فيها أداة سحب وإفلات لبناء خرائط المقاعد، كمكتبة مكوّنات قابلة لإعادة الاستخدام.",
    },
    stack: ["React", "Next.js", "TypeScript", "Redux Toolkit"],
    backend: ["Node.js", "Nest.js", "PostgreSQL"],
    challenge: {
      en: "A seat-map builder organisers can drag and drop — and a map buyers can trust when everyone wants the same row.",
      ar: "أداة يرسم بها المنظّمون خريطة القاعة بالسحب والإفلات — وخريطة يثق بها المشترون حين يريد الجميع نفس الصف.",
    },
    outcome: {
      en: "One reusable component library behind every booking screen in the product.",
      ar: "مكتبة مكوّنات واحدة خلف كل شاشات الحجز في المنتج.",
    },
    note: { en: "the seat map was the fun part", ar: "خريطة المقاعد كانت الجزء الممتع" },
  },
  {
    id: "rasid",
    name: { en: "RASID", ar: "راصد" },
    kind: { en: "payments platform · fintech", ar: "منصة مدفوعات · تقنية مالية" },
    what: {
      en: "A Central Bank–licensed payments company — a bilingual public site and the admin dashboard behind it.",
      ar: "شركة مدفوعات مرخّصة من البنك المركزي — موقع تعريفي ثنائي اللغة ولوحة التحكم التي تقف خلفه.",
    },
    role: {
      en: "Owned the dashboard front end: payment tracking, transaction monitoring, reporting, role-based views and exportable reports.",
      ar: "تولّيت الواجهة الأمامية للوحة التحكم: تتبّع المدفوعات، مراقبة العمليات، التقارير، صلاحيات حسب الدور وتقارير قابلة للتصدير.",
    },
    stack: ["React", "Next.js", "TypeScript"],
    backend: ["REST APIs", "Nest.js", "MongoDB"],
    challenge: {
      en: "Real-time financial data, role-based views and strict compliance — on screens that stay quick to scan.",
      ar: "بيانات مالية لحظية وصلاحيات متعددة والتزام صارم بالمعايير — على شاشات تبقى سهلة القراءة.",
    },
    outcome: {
      en: "A dashboard the operations team relies on, plus clean API contracts agreed with the Nest.js backend team.",
      ar: "لوحة تحكم يعتمد عليها فريق العمليات، وعقود API واضحة مع فريق Nest.js.",
    },
    note: { en: "every number had to add up", ar: "كل رقم يجب أن يكون صحيحاً" },
    url: "https://rasidpayments.com.sa",
  },
  {
    id: "moc",
    name: { en: "MoC", ar: "وزارة التجارة" },
    kind: { en: "content creators platform · government", ar: "منصة صُنّاع المحتوى · حكومي" },
    what: {
      en: "A Saudi Ministry of Commerce platform connecting content creators with the Ministry's awareness campaigns.",
      ar: "منصة لوزارة التجارة السعودية تربط صُنّاع المحتوى بحملات الوزارة التوعوية.",
    },
    role: {
      en: "Built the public-facing front end: creator registration and onboarding, campaign listings and submission forms.",
      ar: "بنيت الواجهة العامة: تسجيل صُنّاع المحتوى ورحلة الانضمام، قوائم الحملات ونماذج المشاركة.",
    },
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    backend: ["Nest.js", "PostgreSQL", "REST API"],
    challenge: {
      en: "Arabic-first and RTL, fully responsive, and aligned with government accessibility and brand standards.",
      ar: "واجهة عربية أولاً باتجاه RTL، متجاوبة بالكامل، ومتوافقة مع معايير الإتاحة والهوية الحكومية.",
    },
    outcome: {
      en: "Live at engage.moc.gov.sa — with Tarjim, the translation funding system, built on the same foundations.",
      ar: "تعمل الآن على engage.moc.gov.sa — ومعها «ترجم»، نظام تمويل الترجمة، على نفس الأساس.",
    },
    note: { en: "Arabic-first, by design", ar: "عربي أولاً، عن قصد" },
    url: "https://engage.moc.gov.sa",
    caseSlug: "content-creators",
  },
];

/* ───────────── Experience (the books) ───────────── */

export type Chapter = {
  years: Text;
  company: Text;
  spine: Text;
  role: Text;
  where: Text;
  summary: Text;
  color: string;
  h: number;
};

export const experience: Chapter[] = [
  {
    years: { en: "Aug 2023 — Now", ar: "أغسطس 2023 — الآن" },
    company: { en: "TAM", ar: "تام" },
    spine: { en: "TAM", ar: "تام" },
    role: { en: "Software Engineer", ar: "مهندس برمجيات" },
    where: { en: "KSA · Remote", ar: "السعودية · عن بُعد" },
    summary: {
      en: "Ministry of Commerce platforms, a seat-map builder, SSO and dashboards — plus production APIs in Node.js & Nest.js.",
      ar: "منصات وزارة التجارة، أداة بناء خرائط المقاعد، الدخول الموحّد ولوحات التحكم — وواجهات API إنتاجية بـ Node.js وNest.js.",
    },
    color: "var(--tomato)",
    h: 94,
  },
  {
    years: { en: "Feb 2023 — Jul 2023", ar: "فبراير 2023 — يوليو 2023" },
    company: { en: "Rasid Payments", ar: "راصد للمدفوعات" },
    spine: { en: "RASID", ar: "راصد" },
    role: { en: "Frontend Developer", ar: "مطوّر واجهات أمامية" },
    where: { en: "KSA · Remote", ar: "السعودية · عن بُعد" },
    summary: {
      en: "The bilingual corporate site and the full admin dashboard of a Central Bank–licensed fintech.",
      ar: "الموقع التعريفي ثنائي اللغة ولوحة التحكم الكاملة لشركة تقنية مالية مرخّصة من البنك المركزي.",
    },
    color: "var(--forest)",
    h: 82,
  },
  {
    years: { en: "2021 — Jan 2023", ar: "2021 — يناير 2023" },
    company: { en: "Kian Alraqmih", ar: "كيان الرقمية" },
    spine: { en: "KIAN", ar: "كيان" },
    role: { en: "Frontend Developer", ar: "مطوّر واجهات أمامية" },
    where: { en: "KSA · On-site", ar: "السعودية · حضوري" },
    summary: {
      en: "Aghnam's storefront, Petrofast's fuel-station dashboards and IMX's network management interfaces.",
      ar: "متجر أغنام، لوحات بتروفاست لإدارة محطات الوقود، وواجهات إدارة الشبكات لـ IMX.",
    },
    color: "var(--mustard)",
    h: 100,
  },
  {
    years: { en: "2020 — 2021", ar: "2020 — 2021" },
    company: { en: "Soft Steps", ar: "سوفت ستبس" },
    spine: { en: "SOFT STEPS", ar: "سوفت ستبس" },
    role: { en: "UI Developer", ar: "مطوّر واجهات" },
    where: { en: "Egypt · On-site", ar: "مصر · حضوري" },
    summary: {
      en: "Corporate and clinic websites — and Lighthouse scores raised from 70 to 95.",
      ar: "مواقع شركات وعيادات — ورفع تقييم Lighthouse من 70 إلى 95.",
    },
    color: "var(--sky)",
    h: 88,
  },
  {
    years: { en: "2017 — 2022", ar: "2017 — 2022" },
    company: { en: "Mansoura University", ar: "جامعة المنصورة" },
    spine: { en: "MANSOURA", ar: "المنصورة" },
    role: { en: "B.Sc. Statistics & Computer Science", ar: "بكالوريوس الإحصاء وعلوم الحاسب" },
    where: { en: "Faculty of Science", ar: "كلية العلوم" },
    summary: { en: "Where the statistics met the code.", ar: "حيث التقى الإحصاء بالبرمجة." },
    color: "var(--ink)",
    h: 90,
  },
];
