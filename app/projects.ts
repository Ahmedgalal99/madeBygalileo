// The portfolio: real projects with mockups in /public/assets/projects/<folder>.
// Every user-facing string is { en, ar }. To add a project, append an entry —
// `home: true` puts it on the homepage, order here is the order on the site.

import type { Text } from "./data";

export type Category = "gov" | "corporate" | "commerce" | "apps" | "saas";
export type Tag =
  | "fullstack"
  | "api"
  | "admin"
  | "auth"
  | "payments"
  | "rtl"
  | "bilingual"
  | "responsive"
  | "ecommerce"
  | "landing"
  | "app"
  | "darkmode"
  | "motion"
  | "forms"
  | "nonprofit"
  | "gov";

export type Project = {
  slug: string;
  folder: string;
  shots: string[];
  /** Pixel size of the mockups (all shots in a folder share it). */
  size: [number, number];
  category: Category;
  accent: string;
  name: Text;
  kind: Text;
  summary: Text;
  challenge: Text;
  approach: { en: string[]; ar: string[] };
  outcome: Text;
  frontend: string[];
  backend: string[];
  /** What the server side does — APIs, data, auth, admin. Omitted for frontend-only work. */
  backendNote?: Text;
  tags: Tag[];
  url?: string;
  home?: boolean;
};

export const isDatabase = (s: string) => /mongo|postgres|mysql|sql/i.test(s);

/** The two backend chips a card has room for: the API layer, then the database. */
export const keyBackend = (p: Project) => {
  const db = p.backend.find(isDatabase);
  const api = p.backend.find((s) => !isDatabase(s));
  return [api, db ?? p.backend[1]].filter((s): s is string => Boolean(s));
};

export const shotSrc = (p: Project, i: number) => encodeURI(`/assets/projects/${p.folder}/${p.shots[i]}`);

export const projects: Project[] = [
  {
    slug: "content-creators",
    folder: "project 20",
    shots: ["content_creators_mockup_1_laptop.png", "content_creators_mockup_2_devices.png", "content_creators_mockup_3_fullpage.png"],
    size: [3200, 2000],
    category: "gov",
    accent: "#0F2A3A",
    name: { en: "Content Creators Platform", ar: "منصة دعم صُنّاع المحتوى" },
    kind: { en: "Ministry of Commerce · Saudi Arabia", ar: "وزارة التجارة · المملكة العربية السعودية" },
    summary: {
      en: "The public platform for a Ministry of Commerce initiative that supports content creators with funding, workshops and visibility.",
      ar: "المنصة العامة لمبادرة من وزارة التجارة تدعم صُنّاع المحتوى بالتمويل وورش العمل والظهور.",
    },
    challenge: {
      en: "A government audience expects clarity and trust; creators expect energy. The site had to feel bold and expressive — hand-drawn highlights, bright colour — without breaking accessibility or the Ministry's brand rules.",
      ar: "الجمهور الحكومي يتوقع وضوحاً وثقة، وصُنّاع المحتوى يتوقعون حيوية. كان على الموقع أن يبدو جريئاً ومعبّراً — بتظليلات مرسومة يدوياً وألوان زاهية — دون الإخلال بالإتاحة أو بقواعد هوية الوزارة.",
    },
    approach: {
      en: [
        "Built the Arabic-first, right-to-left interface as reusable components: winners carousel, workshop cards, creator profiles and the goals grid.",
        "Turned the hand-drawn highlight style into a single component, so every heading stays consistent across pages.",
        "Made every section responsive from a 390px phone to a 1920px desktop, with tablet layouts designed on purpose — not just squeezed.",
      ],
      ar: [
        "بنيت الواجهة العربية أولاً باتجاه RTL كمكوّنات قابلة لإعادة الاستخدام: معرض الفائزين، بطاقات الورش، ملفات صُنّاع المحتوى وشبكة الأهداف.",
        "حوّلت أسلوب التظليل المرسوم يدوياً إلى مكوّن واحد، لتبقى كل العناوين متسقة عبر الصفحات.",
        "جعلت كل قسم متجاوباً من شاشة جوال 390px حتى سطح مكتب 1920px، مع تخطيطات مقصودة للتابلت — لا مجرد تصغير.",
      ],
    },
    outcome: {
      en: "A live government platform that feels made for creators — and the foundation later reused for Tarjim, the translation funding system.",
      ar: "منصة حكومية تعمل الآن وتبدو مصنوعة لصُنّاع المحتوى — وأساس أُعيد استخدامه لاحقاً في «ترجم»، نظام تمويل الترجمة.",
    },
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    backend: ["Nest.js", "PostgreSQL", "REST API"],
    backendNote: {
      en: "Behind the pages: a Nest.js API for creator registration, workshop sign-ups and submissions, with validated DTOs and role-based access for Ministry reviewers.",
      ar: "خلف الصفحات: واجهة API بـ Nest.js لتسجيل صُنّاع المحتوى والاشتراك في الورش واستقبال المشاركات، مع تحقق من البيانات وصلاحيات حسب الدور لمراجعي الوزارة.",
    },
    tags: ["fullstack", "rtl", "gov", "responsive", "auth"],
    url: "https://engage.moc.gov.sa",
  },
  {
    slug: "aman",
    folder: "project 10",
    shots: ["aman-project-1-desktop.png", "aman-project-2-laptop.png", "aman-project-3-mobile.png"],
    size: [2400, 1500],
    category: "corporate",
    accent: "#E0323C",
    home: true,
    name: { en: "Aman", ar: "أمان" },
    kind: { en: "Cybersecurity risk management", ar: "إدارة مخاطر الأمن السيبراني" },
    summary: {
      en: "Corporate website for a cybersecurity firm — dark, precise, and built to make a technical service feel trustworthy.",
      ar: "موقع تعريفي لشركة أمن سيبراني — داكن ودقيق، يجعل خدمة تقنية معقّدة تبدو جديرة بالثقة.",
    },
    challenge: {
      en: "Security buyers are sceptical by default. The site needed to look serious and modern, explain complex services in plain words, and add motion that impresses without slowing the page down.",
      ar: "مشترو حلول الأمن متشككون بطبيعتهم. احتاج الموقع أن يبدو جاداً وحديثاً، وأن يشرح خدمات معقّدة بكلمات بسيطة، وأن يضيف حركة تُبهر دون أن تُبطئ الصفحة.",
    },
    approach: {
      en: [
        "Built the dark interface on a strict colour system — navy base, one red accent — so calls to action always stand out.",
        "Created the rotating 3D logo cube and wave backgrounds with CSS transforms instead of video, keeping the hero light.",
        "Rebuilt the layout for mobile rather than shrinking it: stacked cards, larger type and one clear 'Contact us' path.",
      ],
      ar: [
        "بنيت الواجهة الداكنة على نظام ألوان صارم — أساس كحلي ولون أحمر واحد للتأكيد — لتبرز أزرار الإجراء دائماً.",
        "صنعت مكعب الشعار ثلاثي الأبعاد وخلفيات الموجات بتحويلات CSS بدلاً من الفيديو، ليبقى قسم البداية خفيفاً.",
        "أعدت بناء التخطيط للجوال بدلاً من تصغيره: بطاقات متراصة، خط أكبر، ومسار واحد واضح لـ«تواصل معنا».",
      ],
    },
    outcome: {
      en: "A confident first impression on every screen size, on a page that stays fast despite the 3D motion.",
      ar: "انطباع أول واثق على كل الشاشات، في صفحة تبقى سريعة رغم الحركة ثلاثية الأبعاد.",
    },
    frontend: ["React", "Next.js", "SCSS", "CSS 3D"],
    backend: ["Node.js", "Express", "MongoDB"],
    backendNote: {
      en: "A small Express API and MongoDB store power the resources library and the contact pipeline, so the team publishes articles and receives leads without a developer.",
      ar: "واجهة API خفيفة بـ Express وقاعدة MongoDB تشغّلان مكتبة الموارد ومسار التواصل، ليتمكن الفريق من نشر المقالات واستقبال الطلبات دون مطوّر.",
    },
    tags: ["fullstack", "bilingual", "motion", "responsive", "admin"],
  },
  {
    slug: "warqaa",
    folder: "project 5",
    shots: ["warqaa-project-1.png", "warqaa-project-2.png", "warqaa-project-3.png"],
    size: [2400, 1600],
    category: "commerce",
    accent: "#4B2A86",
    home: true,
    name: { en: "Warqaa", ar: "ورقاء" },
    kind: { en: "Publishing house · online bookstore", ar: "دار نشر · متجر كتب إلكتروني" },
    summary: {
      en: "E-commerce store for an Arabic publishing house — new releases, signed copies, handmade gifts and publishing requests in one place.",
      ar: "متجر إلكتروني لدار نشر عربية — الإصدارات الجديدة والكتب الموقّعة والهدايا اليدوية وطلبات النشر في مكان واحد.",
    },
    challenge: {
      en: "A publisher's catalogue is wide and keeps growing. Readers needed to find a book quickly, while the business wanted offers, free-shipping promotions and author submissions front and centre.",
      ar: "كتالوج دار النشر واسع ويكبر باستمرار. احتاج القرّاء للوصول إلى الكتاب بسرعة، بينما أرادت الدار إبراز العروض وحملات الشحن المجاني وطلبات المؤلفين.",
    },
    approach: {
      en: [
        "Built the storefront around a clear category menu — releases, partner publishers, signed books, offers — with search and cart always in reach.",
        "Added a light/dark theme toggle and currency switching without reloading the page.",
        "Designed the trust strip — shipping, multiple payment methods, secure checkout — as blocks reused across the store.",
      ],
      ar: [
        "بنيت المتجر حول قائمة تصنيفات واضحة — الإصدارات، دور النشر الشريكة، الكتب الموقّعة، العروض — مع بحث وسلة في المتناول دائماً.",
        "أضفت تبديلاً بين الوضعين الفاتح والداكن وتبديل العملة دون إعادة تحميل الصفحة.",
        "صممت شريط الثقة — الشحن، وسائل الدفع المتعددة، إتمام الشراء الآمن — ككتل تتكرر في أنحاء المتجر.",
      ],
    },
    outcome: {
      en: "A bookstore that feels like the publisher's brand — and a catalogue structure that scales as new titles arrive.",
      ar: "متجر يشبه هوية دار النشر — وهيكل كتالوج يتّسع مع كل إصدار جديد.",
    },
    frontend: ["React", "Redux Toolkit", "REST API", "SCSS"],
    backend: ["Node.js", "Express", "MongoDB", "Payment gateway"],
    backendNote: {
      en: "An Express + MongoDB backend handles the catalogue, carts, orders and author submissions, with payment-gateway webhooks keeping every order's status in sync.",
      ar: "نظام خلفي بـ Express وMongoDB يدير الكتالوج والسلال والطلبات وطلبات المؤلفين، مع إشعارات بوابة الدفع التي تُبقي حالة كل طلب متزامنة.",
    },
    tags: ["fullstack", "rtl", "ecommerce", "darkmode", "payments", "admin"],
  },
  {
    slug: "atyab",
    folder: "project 9",
    shots: ["atyab-project-1.png", "atyab-project-2.png", "atyab-project-3.png"],
    size: [3200, 2200],
    category: "commerce",
    accent: "#D9822B",
    home: true,
    name: { en: "Lathaeth & Atayeb", ar: "لذائذ وأطايب" },
    kind: { en: "Online meat & butchery store", ar: "متجر لحوم وذبائح إلكتروني" },
    summary: {
      en: "An online butchery — fresh cuts, whole livestock, spices and tools — designed so ordering meat feels as easy as ordering anything else.",
      ar: "ملحمة إلكترونية — قطعيات طازجة وذبائح كاملة وتوابل وأدوات — مصممة ليكون طلب اللحوم سهلاً كأي طلب آخر.",
    },
    challenge: {
      en: "Fresh food comes with extra decisions: cut, weight, preparation and delivery time. The store had to handle those choices without making checkout feel long.",
      ar: "للطعام الطازج قرارات إضافية: نوع القطعية والوزن والتجهيز وموعد التوصيل. كان على المتجر استيعاب هذه الخيارات دون أن يبدو إتمام الشراء طويلاً.",
    },
    approach: {
      en: [
        "Built a bold category entry — meat, livestock, spices, tools — as colour-coded cards right under the hero.",
        "Created product options for cut and weight with live price updates, plus order tracking from the top bar.",
        "Kept the bilingual header compact: category-filtered search, login, cart total and language switch in one row.",
      ],
      ar: [
        "بنيت مدخلاً واضحاً للتصنيفات — لحوم، ذبائح، توابل، أدوات — كبطاقات ملوّنة أسفل قسم البداية مباشرة.",
        "صنعت خيارات المنتج للقطعية والوزن مع تحديث فوري للسعر، وتتبّعاً للطلب من الشريط العلوي.",
        "أبقيت الترويسة ثنائية اللغة مختصرة: بحث مع فلتر للتصنيف، دخول، إجمالي السلة وتبديل اللغة في صف واحد.",
      ],
    },
    outcome: {
      en: "A store that sells fresh produce with confidence — clear choices, quick checkout and a warm, appetising look.",
      ar: "متجر يبيع المنتجات الطازجة بثقة — خيارات واضحة، شراء سريع، وطابع دافئ يفتح الشهية.",
    },
    frontend: ["React", "Redux", "REST API", "SCSS"],
    backend: ["Node.js", "Express", "MongoDB"],
    backendNote: {
      en: "The API models products with cut and weight variants, calculates prices on the server and tracks each order from confirmation to delivery.",
      ar: "تمثّل واجهة API المنتجات بخيارات القطعية والوزن، وتحسب الأسعار على الخادم، وتتابع كل طلب من التأكيد حتى التوصيل.",
    },
    tags: ["fullstack", "rtl", "bilingual", "ecommerce", "admin"],
  },
  {
    slug: "quran-makkah",
    folder: "project 1",
    shots: ["ekra2.png", "ekra2-1.png", "ekra2-2.png", "ekra2-3.png"],
    size: [3200, 2000],
    category: "gov",
    accent: "#1F5130",
    name: { en: "Quran Recitation Society", ar: "جمعية إقراء القرآن الكريم" },
    kind: { en: "Non-profit · Makkah", ar: "جمعية خيرية · مكة المكرمة" },
    summary: {
      en: "Bilingual website for a Quran recitation society in Makkah — news, programmes, partners and donations.",
      ar: "موقع ثنائي اللغة لجمعية إقراء القرآن الكريم بمكة المكرمة — الأخبار والبرامج والشركاء والتبرعات.",
    },
    challenge: {
      en: "The society serves students, teachers and donors of every age, mostly on phones. The site had to feel calm and respectful, show Hijri and Gregorian dates, and work equally well in Arabic and English.",
      ar: "تخدم الجمعية طلاباً ومعلّمين ومتبرعين من كل الأعمار، ومعظمهم على الجوال. كان على الموقع أن يكون هادئاً ووقوراً، وأن يعرض التاريخين الهجري والميلادي، وأن يعمل بالعربية والإنجليزية بالكفاءة نفسها.",
    },
    approach: {
      en: [
        "Built Arabic RTL and English LTR from one codebase, mirroring the layout instead of maintaining two sites.",
        "Used Islamic geometric patterns as quiet section backgrounds and kept the typography large and readable.",
        "Added touch-friendly hero and news carousels, plus quick links to the society's social channels.",
      ],
      ar: [
        "بنيت النسخة العربية RTL والإنجليزية LTR من قاعدة كود واحدة، بعكس التخطيط بدلاً من إدارة موقعين.",
        "استخدمت الزخارف الهندسية الإسلامية كخلفيات هادئة للأقسام، وأبقيت الخطوط كبيرة ومقروءة.",
        "أضفت شرائح عرض لقسم البداية والأخبار تدعم اللمس، مع روابط سريعة لقنوات الجمعية الاجتماعية.",
      ],
    },
    outcome: {
      en: "A dignified online home for the society, alongside its Vision 2030 partners and easy to keep fresh with news.",
      ar: "حضور رقمي يليق بالجمعية إلى جانب شركائها في رؤية 2030، وسهل التحديث بالأخبار.",
    },
    frontend: ["HTML5", "SCSS", "Bootstrap 4", "jQuery", "Slick"],
    backend: ["Node.js", "Express", "MongoDB"],
    backendNote: {
      en: "A lightweight Node.js admin lets the society publish news and programmes in both languages from one form, served through a simple REST API.",
      ar: "لوحة إدارة خفيفة بـ Node.js تتيح للجمعية نشر الأخبار والبرامج باللغتين من نموذج واحد، تُقدَّم عبر واجهة REST بسيطة.",
    },
    tags: ["fullstack", "bilingual", "nonprofit", "responsive", "admin"],
  },
  {
    slug: "alula-quran",
    folder: "project 6",
    shots: ["algamiya-project-1.png", "algamiya-project-2.png", "algamiya-project-3.png"],
    size: [2400, 1500],
    category: "gov",
    accent: "#A8822E",
    name: { en: "Quran Memorisation Charity", ar: "الجمعية الخيرية لتحفيظ القرآن الكريم" },
    kind: { en: "Non-profit · AlUla", ar: "جمعية خيرية · محافظة العلا" },
    summary: {
      en: "Official website for a Quran memorisation charity in AlUla — governance, programmes, events and job openings.",
      ar: "الموقع الرسمي لجمعية تحفيظ القرآن الكريم بالعلا — الحوكمة والبرامج والفعاليات والوظائف الشاغرة.",
    },
    challenge: {
      en: "Registered charities have a lot to publish: board members, governance documents, endowments, complaints. The challenge was a deep menu that still feels simple to a parent looking for a class.",
      ar: "الجمعيات المسجّلة مطالبة بنشر الكثير: مجلس الإدارة، وثائق الحوكمة، الأوقاف، الشكاوى. كان التحدي قائمة عميقة تبقى بسيطة لوليّ أمر يبحث عن حلقة لابنه.",
    },
    approach: {
      en: [
        "Grouped navigation clearly — about, general assembly, board, governance, endowments — with accessible dropdowns.",
        "Built a warm gold visual system around the charity's emblem, with events such as awards ceremonies featured in the hero.",
        "Created templates for news, documents and job listings so staff can publish without touching layout.",
      ],
      ar: [
        "نظّمت التنقل في مجموعات واضحة — عن الجمعية، الجمعية العمومية، مجلس الإدارة، الحوكمة، الأوقاف — بقوائم منسدلة سهلة الوصول.",
        "بنيت نظاماً بصرياً ذهبياً دافئاً حول شعار الجمعية، مع إبراز الفعاليات مثل حفلات توزيع الجوائز في قسم البداية.",
        "صنعت قوالب للأخبار والوثائق والوظائف ليتمكن الفريق من النشر دون المساس بالتصميم.",
      ],
    },
    outcome: {
      en: "A transparent, well-organised website that meets regulatory publishing needs and still feels welcoming to families.",
      ar: "موقع شفاف ومنظّم يلبّي متطلبات النشر النظامية ويبقى مرحّباً بالأسر.",
    },
    frontend: ["HTML5", "SCSS", "Bootstrap", "jQuery"],
    backend: ["Node.js", "Express", "MongoDB"],
    backendNote: {
      en: "Documents, news and job listings live in MongoDB behind an Express API, with file uploads for governance reports and an admin panel for staff.",
      ar: "الوثائق والأخبار والوظائف محفوظة في MongoDB خلف واجهة Express، مع رفع ملفات لتقارير الحوكمة ولوحة إدارة للموظفين.",
    },
    tags: ["fullstack", "rtl", "nonprofit", "responsive", "admin"],
  },
  {
    slug: "rcba",
    folder: "project 2",
    shots: ["rcba-project-1-desktop.png", "rcba-project-2-laptop.png", "rcba-project-3-mobile.png"],
    size: [3200, 2000],
    category: "corporate",
    accent: "#5B3C7A",
    name: { en: "RCBA", ar: "مكتب رامي الخضر" },
    kind: { en: "Certified public accountants", ar: "محاسبون قانونيون ومستشارون" },
    summary: {
      en: "Corporate website for a certified public accounting firm and SFAI member — services, consultants, clients, news and careers.",
      ar: "موقع تعريفي لمكتب محاسبين قانونيين عضو في SFAI — الخدمات والمستشارون والعملاء والأخبار والتوظيف.",
    },
    challenge: {
      en: "Accounting is a trust business. The firm wanted to look established and international, while making it effortless for a business owner to call or message directly.",
      ar: "المحاسبة مهنة قائمة على الثقة. أراد المكتب أن يبدو عريقاً ودولياً، مع تسهيل التواصل المباشر لصاحب العمل بالاتصال أو المراسلة.",
    },
    approach: {
      en: [
        "Built a full Arabic RTL layout with a rich menu: services, consultants, clients, training and job applications, social responsibility.",
        "Added floating WhatsApp and call buttons that stay within reach on every page and screen size.",
        "Designed the hero, service and news sections as modular blocks the firm can rearrange.",
      ],
      ar: [
        "بنيت تخطيطاً عربياً كاملاً RTL بقائمة غنية: الخدمات، المستشارون، العملاء، التدريب وطلبات التوظيف، المسؤولية الاجتماعية.",
        "أضفت أزرار واتساب واتصال عائمة تبقى في متناول اليد في كل صفحة وعلى كل شاشة.",
        "صممت أقسام البداية والخدمات والأخبار ككتل مستقلة يمكن للمكتب إعادة ترتيبها.",
      ],
    },
    outcome: {
      en: "A professional presence that turns visits into calls — one tap from anywhere on the site.",
      ar: "حضور احترافي يحوّل الزيارات إلى اتصالات — بلمسة واحدة من أي مكان في الموقع.",
    },
    frontend: ["HTML5", "SCSS", "Bootstrap", "jQuery"],
    backend: [],
    tags: ["rtl", "responsive"],
  },
  {
    slug: "alhumaidi",
    folder: "project 3",
    shots: ["alhumaidi-project-1.png", "alhumaidi-project-2.png", "alhumaidi-project-3.png"],
    size: [2400, 1500],
    category: "corporate",
    accent: "#C9A43A",
    name: { en: "Alhumaidi", ar: "الحميضي" },
    kind: { en: "Engineering consulting & development", ar: "استشارات هندسية وتطوير عقاري" },
    summary: {
      en: "A dark, gold-accented website for an engineering consultancy and development contractor — built to show the work at full size.",
      ar: "موقع داكن بلمسات ذهبية لمكتب استشارات هندسية ومقاولات تطوير — مصمم لعرض الأعمال بكامل حجمها.",
    },
    challenge: {
      en: "For architects and builders, the portfolio is the pitch. Large photography had to dominate the experience without making the site heavy.",
      ar: "بالنسبة للمعماريين والمقاولين، معرض الأعمال هو العرض نفسه. كان على الصور الكبيرة أن تتصدّر التجربة دون أن تُثقل الموقع.",
    },
    approach: {
      en: [
        "Built a full-screen hero with a centred-logo navigation, splitting the menu on either side of the mark.",
        "Created project and gallery pages with responsive, lazy-loaded images.",
        "Kept the palette restrained — black, white and one gold — so the photography carries the brand.",
      ],
      ar: [
        "بنيت قسم بداية بملء الشاشة مع تنقل يتوسطه الشعار، وتوزيع عناصر القائمة على جانبيه.",
        "صنعت صفحات المشاريع ومعرض الصور بصور متجاوبة تُحمّل عند الحاجة.",
        "أبقيت الألوان مقتصدة — أسود وأبيض وذهبي واحد — لتحمل الصور هوية العلامة.",
      ],
    },
    outcome: {
      en: "A premium showcase that lets the projects speak, on desktop and mobile alike.",
      ar: "واجهة فاخرة تترك المشاريع تتحدث عن نفسها، على سطح المكتب والجوال على حد سواء.",
    },
    frontend: ["HTML5", "SCSS", "Bootstrap", "JavaScript"],
    backend: ["Node.js", "Express", "MongoDB"],
    backendNote: {
      en: "Projects and gallery images are managed through an Express + MongoDB API, with images resized on upload so the photo-heavy pages stay fast.",
      ar: "تُدار المشاريع وصور المعرض عبر واجهة Express وMongoDB، مع تغيير حجم الصور عند الرفع لتبقى الصفحات الغنية بالصور سريعة.",
    },
    tags: ["fullstack", "rtl", "bilingual", "responsive", "admin"],
  },
  {
    slug: "alsaad",
    folder: "project 7",
    shots: ["alsaad-project-1.png", "alsaad-project-2.png", "alsaad-project-3.png"],
    size: [3200, 2000],
    category: "corporate",
    accent: "#C58A5A",
    name: { en: "Alsaad Real Estate", ar: "شركة السعد العقارية" },
    kind: { en: "Real estate company", ar: "شركة عقارية" },
    summary: {
      en: "Website for a real estate company — projects, auctions, services, careers and an expression-of-interest form.",
      ar: "موقع لشركة عقارية — المشاريع والمزادات والخدمات والوظائف ونموذج تسجيل الاهتمام.",
    },
    challenge: {
      en: "Real estate leads are time-sensitive, especially around auctions. Visitors needed to register interest fast, and the sales team needed those leads clean and complete.",
      ar: "فرص العقار حساسة للوقت، خاصة في المزادات. احتاج الزوار تسجيل اهتمامهم بسرعة، واحتاج فريق المبيعات بيانات مكتملة ونظيفة.",
    },
    approach: {
      en: [
        "Put a 'Register your interest' call to action in the main navigation — always one click away.",
        "Built dedicated sections for projects and auctions, with floating WhatsApp and call shortcuts.",
        "Validated the lead form on the client so incomplete requests never reach the team.",
      ],
      ar: [
        "وضعت زر «سجّل اهتمامك» في التنقل الرئيسي — على بُعد نقرة واحدة دائماً.",
        "بنيت أقساماً مخصصة للمشاريع والمزادات، مع اختصارات عائمة للواتساب والاتصال.",
        "أضفت تحققاً من نموذج الاهتمام على جهة العميل حتى لا تصل طلبات ناقصة للفريق.",
      ],
    },
    outcome: {
      en: "A modern company site that doubles as a lead-generation tool for projects and auctions.",
      ar: "موقع شركة عصري يعمل أيضاً كأداة لجذب العملاء للمشاريع والمزادات.",
    },
    frontend: ["HTML5", "SCSS", "Bootstrap", "JavaScript"],
    backend: ["Node.js", "Express", "PostgreSQL"],
    backendNote: {
      en: "Leads, projects and auctions sit in PostgreSQL behind an Express API; every interest form becomes a structured lead the sales team can filter and export.",
      ar: "العملاء المحتملون والمشاريع والمزادات محفوظة في PostgreSQL خلف واجهة Express؛ وكل نموذج اهتمام يتحول إلى سجل منظّم يمكن لفريق المبيعات تصفيته وتصديره.",
    },
    tags: ["fullstack", "rtl", "forms", "responsive", "admin"],
  },
  {
    slug: "keyservice",
    folder: "project 4",
    shots: ["keyservice-project-1.png", "keyservice-project-2.png", "keyservice-project-3.png"],
    size: [2400, 1500],
    category: "corporate",
    accent: "#5B5BD6",
    name: { en: "Keyservice", ar: "كي سيرفس" },
    kind: { en: "Car key programming & locksmith", ar: "برمجة مفاتيح السيارات" },
    summary: {
      en: "Service website for a car key and locksmith shop — key cutting, remote programming, lost-key replacement and an online store.",
      ar: "موقع خدمات لمحل مفاتيح سيارات — نسخ المفاتيح، برمجة الريموت، استخراج المفاتيح المفقودة ومتجر إلكتروني.",
    },
    challenge: {
      en: "People search for a locksmith when they are already stuck. The page had to explain the services at a glance and get them calling immediately.",
      ar: "يبحث الناس عن محل مفاتيح وهم عالقون بالفعل. كان على الصفحة أن تشرح الخدمات بنظرة وتدفعهم للاتصال فوراً.",
    },
    approach: {
      en: [
        "Led the hero with a single 'Call now' action over a real workshop photo.",
        "Summarised the core services as three icon cards overlapping the hero, readable in seconds.",
        "Added a floating chat button and a store link for keys and remotes.",
      ],
      ar: [
        "بدأت قسم البداية بإجراء واحد «اتصل الآن» فوق صورة حقيقية للورشة.",
        "لخّصت الخدمات الأساسية في ثلاث بطاقات بأيقونات تتداخل مع قسم البداية وتُقرأ في ثوانٍ.",
        "أضفت زر محادثة عائماً ورابطاً للمتجر لبيع المفاتيح والريموتات.",
      ],
    },
    outcome: {
      en: "A fast, focused page built for one goal: turning an urgent search into a phone call.",
      ar: "صفحة سريعة ومركّزة لهدف واحد: تحويل بحث عاجل إلى مكالمة.",
    },
    frontend: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    backend: [],
    tags: ["rtl", "landing", "responsive"],
  },
  {
    slug: "billing",
    folder: "project 8",
    shots: ["billing-project-1.png", "billing-project-2.png", "billing-project-3.png"],
    size: [2400, 1500],
    category: "saas",
    accent: "#4A6280",
    name: { en: "Billing", ar: "Billing" },
    kind: { en: "Invoicing platform", ar: "منصة فواتير" },
    summary: {
      en: "Marketing site for a free invoicing platform serving small businesses, midsize companies and accounting firms.",
      ar: "موقع تسويقي لمنصة فواتير مجانية تخدم الشركات الصغيرة والمتوسطة ومكاتب المحاسبة.",
    },
    challenge: {
      en: "Three very different audiences land on the same homepage. Each had to find its own path in one step instead of reading the whole page.",
      ar: "ثلاث فئات مختلفة تماماً تصل إلى نفس الصفحة الرئيسية. كان على كل فئة أن تجد مسارها بخطوة واحدة بدل قراءة الصفحة كاملة.",
    },
    approach: {
      en: [
        "Built an audience picker — small business, midsize company, accounting firm — floating over the hero.",
        "Structured the site around features, customers, pricing, help centre and integrations.",
        "Shipped it as reusable React components, so a new landing page per audience is quick to add.",
      ],
      ar: [
        "بنيت أداة اختيار الفئة — شركة صغيرة، متوسطة، مكتب محاسبة — تطفو فوق قسم البداية.",
        "نظّمت الموقع حول المزايا والعملاء والأسعار ومركز المساعدة والتكاملات.",
        "سلّمته كمكوّنات React قابلة لإعادة الاستخدام لتسهيل إضافة صفحة هبوط لكل فئة.",
      ],
    },
    outcome: {
      en: "A clear SaaS front door that routes each visitor to the right story — and a component base for future pages.",
      ar: "واجهة SaaS واضحة توجّه كل زائر إلى القصة المناسبة — وقاعدة مكوّنات للصفحات القادمة.",
    },
    frontend: ["React", "TypeScript", "SCSS"],
    backend: ["Nest.js", "PostgreSQL", "Docker"],
    backendNote: {
      en: "A Nest.js service on PostgreSQL sits behind the sign-up flow — accounts, plans and invoice templates — shipped in Docker containers.",
      ar: "خدمة Nest.js على PostgreSQL خلف مسار التسجيل — الحسابات والباقات وقوالب الفواتير — منشورة في حاويات Docker.",
    },
    tags: ["fullstack", "landing", "responsive", "auth"],
  },
  {
    slug: "zyadat",
    folder: "project 18",
    shots: ["zyadat-project-1.png", "zyadat-project-2.png", "zyadat-project-3.png"],
    size: [2400, 1500],
    category: "saas",
    accent: "#1565C0",
    name: { en: "Zyadat", ar: "زيادات" },
    kind: { en: "Social media growth platform", ar: "منصة نمو حسابات التواصل" },
    summary: {
      en: "Landing and sign-up experience for a platform that helps people grow followers and engagement at fair prices.",
      ar: "صفحة هبوط وتجربة تسجيل لمنصة تساعد على زيادة المتابعين والتفاعل بأسعار مناسبة.",
    },
    challenge: {
      en: "The offer is simple, so the page had to be too: explain the value in one line and get people signed up before they scroll.",
      ar: "العرض بسيط، فكان على الصفحة أن تكون كذلك: شرح القيمة في سطر واحد وتسجيل المستخدم قبل أن يمرّر.",
    },
    approach: {
      en: [
        "Put the login form directly in the hero, with free starter credit as the incentive.",
        "Built friendly, playful visuals — emoji, hearts, a bright brand blue — that match a social audience.",
        "Added Arabic/English switching and full validation on sign-in and sign-up.",
      ],
      ar: [
        "وضعت نموذج الدخول مباشرة في قسم البداية، مع رصيد مجاني كحافز للبدء.",
        "بنيت عناصر بصرية مرحة — رموز تعبيرية وقلوب ولون أزرق زاهٍ — تناسب جمهور التواصل الاجتماعي.",
        "أضفت التبديل بين العربية والإنجليزية وتحققاً كاملاً في الدخول والتسجيل.",
      ],
    },
    outcome: {
      en: "A short path from landing to signed-in user — a page that does one job and does it well.",
      ar: "طريق قصير من الوصول إلى مستخدم مسجّل — صفحة تؤدي مهمة واحدة وتتقنها.",
    },
    frontend: ["React", "TypeScript", "REST API"],
    backend: ["Nest.js", "MongoDB", "JWT"],
    backendNote: {
      en: "Authentication runs on a Nest.js API with JWT access and refresh tokens; orders and wallet credit are stored in MongoDB.",
      ar: "تعمل المصادقة على واجهة Nest.js برموز JWT للدخول والتجديد؛ والطلبات ورصيد المحفظة محفوظة في MongoDB.",
    },
    tags: ["fullstack", "rtl", "bilingual", "forms", "auth"],
  },
  {
    slug: "jamjoom",
    folder: "project 15",
    shots: ["project-1-jamjoom-skincare-desktop.png", "project-2-jamjoom-skincare-laptop.png", "project-3-jamjoom-skincare-mobile.png"],
    size: [2400, 1600],
    category: "commerce",
    accent: "#7A1F3A",
    name: { en: "Jamjoom Skincare", ar: "جمجوم للعناية بالبشرة" },
    kind: { en: "Skincare e-commerce", ar: "متجر عناية بالبشرة" },
    summary: {
      en: "Arabic-first storefront for a skincare clinic — products, categories, favourites and a calm, clean brand feel.",
      ar: "متجر عربي أولاً لعيادة عناية بالبشرة — المنتجات والتصنيفات والمفضلة بطابع هادئ ونظيف.",
    },
    challenge: {
      en: "Beauty shoppers browse and compare before they buy. The store needed wishlists, smooth browsing and a look that matches the clinic's soft, premium identity.",
      ar: "متسوّقو منتجات التجميل يتصفحون ويقارنون قبل الشراء. احتاج المتجر قائمة مفضلة وتصفحاً سلساً ومظهراً يطابق هوية العيادة الناعمة والراقية.",
    },
    approach: {
      en: [
        "Built the storefront header — search, account, cart and favourites — with a switch to English.",
        "Created the category navigation and a full-width hero slider for campaigns.",
        "Kept the palette to soft pinks and deep maroon, using whitespace to make products feel premium.",
      ],
      ar: [
        "بنيت ترويسة المتجر — البحث والحساب والسلة والمفضلة — مع تبديل للغة الإنجليزية.",
        "صنعت تنقل التصنيفات وشريحة عرض بعرض الشاشة للحملات.",
        "حصرت الألوان في الوردي الهادئ والعنابي الداكن، مع مساحات بيضاء تجعل المنتجات تبدو راقية.",
      ],
    },
    outcome: {
      en: "A storefront that feels like walking into the clinic — calm, clean and easy to shop.",
      ar: "متجر يشبه دخول العيادة — هادئ ونظيف وسهل التسوّق.",
    },
    frontend: ["React", "Redux", "REST API", "SCSS"],
    backend: ["Node.js", "Express", "MongoDB"],
    backendNote: {
      en: "The Express + MongoDB API serves products, categories, carts and wishlists, with each wishlist tied to the customer's account.",
      ar: "تقدّم واجهة Express وMongoDB المنتجات والتصنيفات والسلال والمفضلة، مع ربط المفضلة بحساب كل عميل.",
    },
    tags: ["fullstack", "rtl", "bilingual", "ecommerce", "api"],
  },
  {
    slug: "zwarh",
    folder: "project 16",
    shots: ["zwara-project-1.png", "zwara-project-2.png", "zwara-project-3.png"],
    size: [2400, 1600],
    category: "commerce",
    accent: "#B08A55",
    name: { en: "Zwarh", ar: "زواره" },
    kind: { en: "Fashion marketplace · buy & rent", ar: "سوق أزياء · بيع وتأجير" },
    summary: {
      en: "Marketplace for buying and renting classic clothing, with curated offers and best-seller carousels.",
      ar: "سوق لشراء وتأجير الملابس الكلاسيكية، مع عروض مختارة وشرائح للأكثر مبيعاً.",
    },
    challenge: {
      en: "Selling and renting are two different journeys — renting needs dates, sizes and returns. Both had to live in one store without confusing shoppers.",
      ar: "البيع والتأجير رحلتان مختلفتان — التأجير يحتاج تواريخ ومقاسات وإرجاعاً. كان لا بد أن يعيشا في متجر واحد دون إرباك المتسوّق.",
    },
    approach: {
      en: [
        "Split the catalogue into clear 'For sale' and 'For rent' sections straight from the main menu.",
        "Built product carousels with favourites and quick add, plus order tracking in the top bar.",
        "Carried the brand's elegant sand-and-gold, calligraphic identity through every component.",
      ],
      ar: [
        "قسّمت الكتالوج إلى قسمين واضحين «للبيع» و«للإيجار» من القائمة الرئيسية مباشرة.",
        "بنيت شرائح منتجات مع المفضلة والإضافة السريعة، وتتبّع الطلب في الشريط العلوي.",
        "حملت هوية العلامة الأنيقة بألوانها الرملية والذهبية وخطها اليدوي إلى كل مكوّن.",
      ],
    },
    outcome: {
      en: "One storefront, two business models — each journey clear from the first click.",
      ar: "متجر واحد بنموذجي عمل — وكل رحلة واضحة من النقرة الأولى.",
    },
    frontend: ["React", "Redux Toolkit", "REST API", "SCSS"],
    backend: ["Nest.js", "PostgreSQL", "Docker"],
    backendNote: {
      en: "Renting needed real data modelling: a Nest.js API on PostgreSQL checks availability by date and size before an item can be booked.",
      ar: "احتاج التأجير نمذجة بيانات حقيقية: واجهة Nest.js على PostgreSQL تتحقق من التوفر حسب التاريخ والمقاس قبل حجز القطعة.",
    },
    tags: ["fullstack", "rtl", "bilingual", "ecommerce", "api"],
  },
  {
    slug: "th-store",
    folder: "project 17",
    shots: ["th-project-1.png", "th-project-2.png", "th-project-3.png"],
    size: [3200, 2000],
    category: "commerce",
    accent: "#C8A04A",
    name: { en: "T&H", ar: "تي آند إتش" },
    kind: { en: "Multi-category e-commerce", ar: "متجر متعدد التصنيفات" },
    summary: {
      en: "Arabic storefront for home, garden and lifestyle products, wrapped in a black-and-gold brand.",
      ar: "متجر عربي لمنتجات المنزل والحدائق ونمط الحياة، بهوية سوداء وذهبية.",
    },
    challenge: {
      en: "Many categories, one homepage. The store needed to promote collections like garden supplies without burying the search bar and cart.",
      ar: "تصنيفات كثيرة وصفحة رئيسية واحدة. احتاج المتجر إبراز المجموعات مثل مستلزمات الحدائق دون إخفاء البحث والسلة.",
    },
    approach: {
      en: [
        "Built a search-first header with account, orders and favourites.",
        "Created collection banners under the hero slider for seasonal promotions.",
        "Built FAQ and about pages from the same component set to keep the store consistent.",
      ],
      ar: [
        "بنيت ترويسة يتصدّرها البحث مع الحساب والطلبات والمفضلة.",
        "صنعت لافتات للمجموعات أسفل شريحة العرض للعروض الموسمية.",
        "بنيت صفحات الأسئلة الشائعة ومن نحن من نفس مجموعة المكوّنات ليبقى المتجر متسقاً.",
      ],
    },
    outcome: {
      en: "A flexible storefront where launching a new collection is just one banner away.",
      ar: "متجر مرن يكفي فيه إطلاق لافتة واحدة لعرض مجموعة جديدة.",
    },
    frontend: ["React", "Redux", "REST API", "SCSS"],
    backend: ["Node.js", "Express", "MongoDB"],
    backendNote: {
      en: "An Express + MongoDB backend with category trees and collection banners editable from the admin, so promotions go live without a deploy.",
      ar: "نظام خلفي بـ Express وMongoDB بشجرة تصنيفات ولافتات مجموعات قابلة للتعديل من لوحة الإدارة، لتُطلق العروض دون نشر جديد.",
    },
    tags: ["fullstack", "rtl", "ecommerce", "responsive", "admin"],
  },
  {
    slug: "dine-in",
    folder: "project 12",
    shots: ["dine-in-project-1.png", "dine-in-project-2.png", "dine-in-project-3.png"],
    size: [2400, 1500],
    category: "apps",
    accent: "#C9A06A",
    name: { en: "Dine-IN", ar: "داين إن" },
    kind: { en: "Restaurant discovery app", ar: "تطبيق اكتشاف المطاعم" },
    summary: {
      en: "Landing page for a restaurant discovery app — reservations, delivery and offers — with a separate path for restaurants to join.",
      ar: "صفحة هبوط لتطبيق اكتشاف المطاعم — الحجوزات والتوصيل والعروض — مع مسار منفصل لانضمام المطاعم.",
    },
    challenge: {
      en: "The page speaks to both sides of a marketplace: diners who should download the app, and restaurants who should join it.",
      ar: "الصفحة تخاطب طرفي السوق: روّاد المطاعم الذين يجب أن يحمّلوا التطبيق، والمطاعم التي يجب أن تنضم إليه.",
    },
    approach: {
      en: [
        "Led with the diner story — store badges and live in-app previews in the hero.",
        "Gave restaurants their own clear entry: a 'Sign in as a restaurant' button in the navigation.",
        "Built a moody, photographic dark theme with a curved section break that leads into the features.",
      ],
      ar: [
        "بدأت بقصة الزبون — شارات المتاجر ومعاينات حية للتطبيق في قسم البداية.",
        "منحت المطاعم مدخلاً واضحاً خاصاً بها: زر «الدخول كمطعم» في التنقل.",
        "بنيت طابعاً داكناً بصور أجواء المطاعم مع فاصل منحنٍ يقود إلى قسم المزايا.",
      ],
    },
    outcome: {
      en: "One landing page that grows both sides of the platform.",
      ar: "صفحة هبوط واحدة تنمّي طرفي المنصة.",
    },
    frontend: ["React", "Next.js", "SCSS"],
    backend: ["Nest.js", "PostgreSQL", "REST API"],
    backendNote: {
      en: "Restaurant sign-in connects to a Nest.js API on PostgreSQL, where restaurants manage the profiles, menus and offers that appear in the app.",
      ar: "يتصل دخول المطاعم بواجهة Nest.js على PostgreSQL، حيث تدير المطاعم ملفاتها وقوائمها وعروضها التي تظهر في التطبيق.",
    },
    tags: ["fullstack", "landing", "app", "responsive", "admin"],
  },
  {
    slug: "consumerplus",
    folder: "project 11",
    shots: ["consumerplus-project-1.png", "consumerplus-project-2.png", "consumerplus-project-3.png"],
    size: [3840, 2400],
    category: "apps",
    accent: "#0F5A6B",
    name: { en: "ConsumerPlus", ar: "كونسيومر بلس" },
    kind: { en: "Shopping app landing page", ar: "صفحة هبوط لتطبيق تسوّق" },
    summary: {
      en: "Bilingual landing website for a shopping app — features, screenshots and downloads, with light and dark themes.",
      ar: "موقع هبوط ثنائي اللغة لتطبيق تسوّق — المزايا ولقطات الشاشة والتحميل، بوضعين فاتح وداكن.",
    },
    challenge: {
      en: "App landing pages live or die by the download button. Everything on the page had to lead there — without feeling like an ad.",
      ar: "صفحات هبوط التطبيقات تنجح أو تفشل عند زر التحميل. كان على كل ما في الصفحة أن يقود إليه — دون أن تبدو إعلاناً.",
    },
    approach: {
      en: [
        "Built a single-page structure — about, features, download, app photos, contact — with smooth anchor navigation.",
        "Showcased real app screens in device frames inside the hero.",
        "Added Arabic/English switching and a theme toggle that remembers the visitor's choice.",
      ],
      ar: [
        "بنيت هيكلاً من صفحة واحدة — من نحن، المزايا، التحميل، صور التطبيق، تواصل — مع تنقل سلس بين الأقسام.",
        "عرضت شاشات التطبيق الحقيقية داخل إطارات أجهزة في قسم البداية.",
        "أضفت التبديل بين العربية والإنجليزية وتبديل الوضع الذي يتذكر اختيار الزائر.",
      ],
    },
    outcome: {
      en: "A tidy, bilingual product page that keeps every visitor one tap from the download.",
      ar: "صفحة منتج مرتبة وثنائية اللغة تُبقي كل زائر على بُعد لمسة من التحميل.",
    },
    frontend: ["HTML5", "SCSS", "Bootstrap", "JavaScript"],
    backend: [],
    tags: ["bilingual", "darkmode", "app"],
  },
  {
    slug: "fixup",
    folder: "project 13",
    shots: ["fixup-project-1.png", "fixup-project-2.png", "fixup-project-3.png"],
    size: [2400, 1600],
    category: "apps",
    accent: "#C79A1E",
    name: { en: "Fix Up", ar: "فيكس اب" },
    kind: { en: "Maintenance & tools app", ar: "تطبيق صيانة وأدوات" },
    summary: {
      en: "Arabic landing page for a maintenance and tools app — services, key numbers and app downloads.",
      ar: "صفحة هبوط عربية لتطبيق صيانة وأدوات — الخدمات والأرقام الأساسية وتحميل التطبيق.",
    },
    challenge: {
      en: "The audience is practical: they want proof the app works. The page had to show numbers and real app screens fast, with a rugged look that fits tools and trades.",
      ar: "الجمهور عملي: يريد دليلاً أن التطبيق يعمل. كان على الصفحة أن تعرض الأرقام وشاشات التطبيق الحقيقية بسرعة، بمظهر قوي يناسب الأدوات والحِرف.",
    },
    approach: {
      en: [
        "Built a stats strip and store badges into the hero, next to a real cart screen from the app.",
        "Used a dark workshop photo with a single gold accent for headlines and actions.",
        "Laid out services as icon rows that collapse neatly into one column on mobile.",
      ],
      ar: [
        "وضعت شريط أرقام وشارات المتاجر في قسم البداية، بجوار شاشة سلة حقيقية من التطبيق.",
        "استخدمت صورة ورشة داكنة مع لون ذهبي واحد للعناوين والأزرار.",
        "رتّبت الخدمات كصفوف بأيقونات تتحول بسلاسة إلى عمود واحد على الجوال.",
      ],
    },
    outcome: {
      en: "A landing page with the confidence of a toolbox — clear proof, clear action.",
      ar: "صفحة هبوط بثقة صندوق العدّة — دليل واضح وإجراء واضح.",
    },
    frontend: ["HTML5", "SCSS", "Bootstrap", "JavaScript"],
    backend: [],
    tags: ["rtl", "landing", "app"],
  },
  {
    slug: "nashmi",
    folder: "project 19",
    shots: ["project-1.png", "project-2.png", "project-3.png"],
    size: [3200, 2000],
    category: "apps",
    accent: "#A3231F",
    name: { en: "Nashmi", ar: "نشمي للذبائح" },
    kind: { en: "Livestock app landing page", ar: "صفحة هبوط لتطبيق ذبائح" },
    summary: {
      en: "Responsive Arabic landing page for a livestock and meat-delivery app — live offers, features and download links.",
      ar: "صفحة هبوط عربية متجاوبة لتطبيق ذبائح وتوصيل لحوم — العروض الحية والمزايا وروابط التحميل.",
    },
    challenge: {
      en: "Buying livestock online takes trust in freshness, quality and delivery. The page had to build that trust quickly and send visitors to the app stores.",
      ar: "شراء الذبائح عبر الإنترنت يتطلب ثقة في الطزاجة والجودة والتوصيل. كان على الصفحة بناء هذه الثقة بسرعة وتوجيه الزوار إلى متاجر التطبيقات.",
    },
    approach: {
      en: [
        "Built the hero around the app itself: two device previews, store badges and a 'Download the app' button in the nav.",
        "Added sections for the app's features, live offers and screenshots.",
        "Created a deep red brand system and a curved transition that keeps the page warm, not clinical.",
      ],
      ar: [
        "بنيت قسم البداية حول التطبيق نفسه: معاينتان للأجهزة، شارات المتاجر وزر «تحميل التطبيق» في التنقل.",
        "أضفت أقساماً لمزايا التطبيق والعروض الحية ولقطات الشاشة.",
        "صنعت نظام ألوان أحمر داكن وانتقالاً منحنياً يُبقي الصفحة دافئة لا جامدة.",
      ],
    },
    outcome: {
      en: "A trustworthy front door for the app, built mobile-first for an audience that shops on its phones.",
      ar: "واجهة موثوقة للتطبيق، مبنية للجوال أولاً لجمهور يتسوّق من هاتفه.",
    },
    frontend: ["HTML5", "SCSS", "Bootstrap", "JavaScript"],
    backend: [],
    tags: ["rtl", "landing", "app"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
