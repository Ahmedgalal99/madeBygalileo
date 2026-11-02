import type { ReactNode } from "react";
import type { Text } from "../data";
import type { Dict, Lang } from "../i18n";
import { C, Toolbox, ink } from "./art";
import { SectionHead } from "./SectionHead";

const thin = { ...ink, strokeWidth: 2 } as const;

// Each technology is a real tool — with a small nod to its brand colour.
type Group = "front" | "back" | "ops";
const GROUPS: Group[] = ["front", "back", "ops"];

const TOOLS: { name: string; group: Group; tool: Text; line: Text; art: ReactNode }[] = [
  {
    name: "React",
    group: "front",
    tool: { en: "compass", ar: "الفرجار" },
    line: { en: "draws the same circle twice — components", ar: "يرسم نفس الدائرة مرتين — مكوّنات" },
    art: (
      <g>
        <polygon points="56,44 64,44 32,188 25,185" fill={C.steel} {...thin} />
        <polygon points="56,44 64,44 92,166 85,168" fill={C.steel} {...thin} />
        <polygon points="85,168 92,166 99,192 92,194" fill={C.mustard} {...thin} />
        <path d="M92 194 L96 204 L99 192" fill={C.ink} />
        <rect x={54} y={8} width={12} height={20} rx={4} fill={C.char} {...thin} />
        <circle cx={60} cy={40} r={15} fill={C.sky} {...ink} />
        {[0, 60, 120].map((r) => (
          <ellipse key={r} cx={60} cy={40} rx={10} ry={3.6} fill="none" stroke={C.ink} strokeWidth={1.6} transform={`rotate(${r} 60 40)`} />
        ))}
        <circle cx={60} cy={40} r={2.2} fill={C.ink} />
      </g>
    ),
  },
  {
    name: "Next.js",
    group: "front",
    tool: { en: "set square", ar: "المثلث القائم" },
    line: { en: "structure, routing, right angles", ar: "هيكلة، توجيه، زوايا قائمة" },
    art: (
      <g>
        <path d="M22 16 V200 H106 Z M36 76 V184 H76 Z" fillRule="evenodd" fill="#F3EEE2" {...ink} />
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M22 ${30 + i * 12} h${i % 2 ? 6 : 11}`} {...thin} />
        ))}
        <text x={86} y={194} textAnchor="middle" className="f-mono" fontSize={9} fontWeight={800} fill={C.ink}>
          90°
        </text>
      </g>
    ),
  },
  {
    name: "TypeScript",
    group: "front",
    tool: { en: "spirit level", ar: "ميزان الماء" },
    line: { en: "keeps everything straight", ar: "يُبقي كل شيء مستقيماً" },
    art: (
      <g>
        <rect x={44} y={10} width={32} height={196} rx={6} fill="#3B6EA5" {...ink} />
        <circle cx={60} cy={26} r={5} fill={C.paper2} {...thin} />
        <rect x={49} y={90} width={22} height={40} rx={11} fill="#D8E7A9" {...thin} />
        <circle cx={60} cy={104} r={5} fill={C.paper} />
        <path d="M49 100 H71 M49 120 H71" {...thin} />
        <text x={60} y={190} textAnchor="middle" className="f-mono" fontSize={11} fontWeight={800} fill={C.paper}>
          TS
        </text>
      </g>
    ),
  },
  {
    name: "JavaScript",
    group: "front",
    tool: { en: "hammer", ar: "المطرقة" },
    line: { en: "the everyday tool — fixes most things", ar: "أداة كل يوم — تصلح معظم الأشياء" },
    art: (
      <g>
        <rect x={52} y={64} width={16} height={142} rx={7} fill={C.mustard} {...ink} />
        <path d="M52 170 H68 M52 180 H68 M52 190 H68" {...thin} opacity={0.6} />
        <path d="M16 30 H82 C96 30 106 40 108 56 C98 50 90 50 84 52 V70 H16 Z" fill={C.char} {...ink} />
        <rect x={10} y={34} width={10} height={32} rx={2} fill={C.char} {...thin} />
      </g>
    ),
  },
  {
    name: "Node.js",
    group: "back",
    tool: { en: "wrench", ar: "مفتاح الربط" },
    line: { en: "tightens up the backend", ar: "يشدّ الأنظمة الخلفية جيداً" },
    art: (
      <g>
        <path d="M42 74 V50 C28 42 28 18 44 8 L50 30 H70 L76 8 C92 18 92 42 78 50 V74 Z" fill={C.steel} {...ink} />
        <rect x={50} y={72} width={20} height={106} fill={C.steel} {...ink} />
        <rect x={50} y={98} width={20} height={56} fill="#5C8A4E" {...thin} />
        <circle cx={60} cy={190} r={18} fill={C.steel} {...ink} />
        <circle cx={60} cy={190} r={8} fill={C.paper2} {...thin} />
      </g>
    ),
  },
  {
    name: "Nest.js",
    group: "back",
    tool: { en: "screwdriver", ar: "المفك" },
    line: { en: "precise, structured, modular", ar: "دقيق، منظّم، ومقسّم لوحدات" },
    art: (
      <g>
        <rect x={42} y={14} width={36} height={88} rx={15} fill="#C8324A" {...ink} />
        <path d="M52 30 V88 M60 28 V90 M68 30 V88" stroke={C.ink} strokeWidth={2} opacity={0.45} strokeLinecap="round" />
        <rect x={50} y={100} width={20} height={12} fill={C.steel} {...thin} />
        <rect x={56} y={112} width={8} height={78} fill={C.steel} {...thin} />
        <path d="M56 190 H64 L62 206 H58 Z" fill={C.char} {...thin} />
      </g>
    ),
  },
  {
    name: "Express",
    group: "back",
    tool: { en: "pliers", ar: "الكمّاشة" },
    line: { en: "lean routes, firm grip", ar: "مسارات خفيفة وقبضة محكمة" },
    art: (
      <g>
        <path d="M54 98 C44 70 46 40 55 12 H62 C57 40 57 70 62 98 Z" fill={C.steel} {...thin} />
        <path d="M66 98 C76 70 74 40 65 12 H58 C63 40 63 70 58 98 Z" fill={C.steel} {...thin} />
        <polygon points="54,102 63,107 46,204 31,200" fill={C.char} {...thin} />
        <polygon points="66,102 57,107 74,204 89,200" fill={C.char} {...thin} />
        <polygon points="50,140 58,143 46,202 33,199" fill={C.mustard} {...thin} />
        <polygon points="70,140 62,143 74,202 87,199" fill={C.mustard} {...thin} />
        <circle cx={60} cy={100} r={10} fill={C.char} {...thin} />
        <circle cx={60} cy={100} r={3.5} fill={C.steel} />
      </g>
    ),
  },
  {
    name: "Auth · JWT · SSO",
    group: "back",
    tool: { en: "padlock", ar: "القفل" },
    line: { en: "the right doors open — and only those", ar: "تُفتح الأبواب الصحيحة — وفقط هي" },
    art: (
      <g>
        <path d="M38 104 V70 a22 22 0 0 1 44 0 V104" fill="none" stroke={C.ink} strokeWidth={15} />
        <path d="M38 104 V70 a22 22 0 0 1 44 0 V104" fill="none" stroke={C.steel} strokeWidth={9} />
        <rect x={22} y={98} width={76} height={92} rx={12} fill={C.mustard} {...ink} />
        <circle cx={60} cy={136} r={9} fill={C.ink} />
        <rect x={56.5} y={140} width={7} height={22} rx={3} fill={C.ink} />
        <path d="M30 112 H90" stroke={C.ink} strokeWidth={2} opacity={0.25} />
      </g>
    ),
  },
  {
    name: "MongoDB · PostgreSQL",
    group: "ops",
    tool: { en: "storage drawers", ar: "أدراج التخزين" },
    line: { en: "where everything gets stored", ar: "حيث يُحفظ كل شيء" },
    art: (
      <g>
        <rect x={14} y={30} width={92} height={170} rx={6} fill={C.steel} {...ink} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={22} y={40 + i * 39} width={76} height={32} rx={3} fill={i % 2 ? "#336791" : "#4E9A4A"} {...thin} />
            <rect x={46} y={50 + i * 39} width={28} height={12} rx={2} fill={C.paper} {...thin} />
          </g>
        ))}
      </g>
    ),
  },
  {
    name: "Tailwind CSS",
    group: "front",
    tool: { en: "tape measure", ar: "شريط القياس" },
    line: { en: "consistent spacing, measured twice", ar: "مسافات ومقاسات ثابتة، تُقاس مرتين" },
    art: (
      <g>
        <rect x={80} y={84} width={18} height={112} fill={C.mustard} {...thin} />
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M80 ${100 + i * 10} h${i % 2 ? 5 : 9}`} {...thin} />
        ))}
        <rect x={74} y={194} width={30} height={7} rx={2} fill={C.steel} {...thin} />
        <rect x={18} y={22} width={84} height={84} rx={20} fill="#3FA9C9" {...ink} />
        <circle cx={60} cy={64} r={22} fill={C.paper2} {...ink} />
        <circle cx={60} cy={64} r={7} fill={C.char} />
        <rect x={86} y={46} width={14} height={30} rx={4} fill={C.char} />
      </g>
    ),
  },
  {
    name: "Redux Toolkit",
    group: "front",
    tool: { en: "clamp", ar: "المِلزمة" },
    line: { en: "holds state firmly in place", ar: "تُمسك الحالة في مكانها" },
    art: (
      <g>
        <path d="M30 30 H84 V62 H62 V150 H84 V182 H30 Z" fill="#7B5CB8" {...ink} />
        <rect x={84} y={92} width={10} height={100} fill={C.steel} {...thin} />
        <rect x={70} y={186} width={38} height={10} rx={3} fill={C.char} {...thin} />
        <rect x={76} y={150} width={26} height={10} rx={2} fill={C.steel} {...thin} />
        <rect x={30} y={96} width={16} height={20} fill={C.paper} opacity={0.4} />
      </g>
    ),
  },
  {
    name: "Docker",
    group: "ops",
    tool: { en: "parts bin", ar: "صندوق القطع" },
    line: { en: "everything packed — ships anywhere", ar: "كل شيء مُعبّأ — يعمل في أي مكان" },
    art: (
      <g>
        <g fill={C.steel} {...thin}>
          <path d="M34 66 L38 36 H46 L48 66" />
          <circle cx={42} cy={34} r={7} />
          <path d="M70 66 L78 42 L86 46 L80 68" />
          <circle cx={82} cy={42} r={6} />
          <path d="M58 66 V48 H64 V66" />
        </g>
        <rect x={12} y={60} width={96} height={16} rx={4} fill="#2F7FC1" {...ink} />
        <path d="M16 74 H104 L98 200 H22 Z" fill="#2F7FC1" {...ink} />
        <rect x={34} y={120} width={52} height={28} rx={3} fill={C.paper} {...thin} />
        <text x={60} y={139} textAnchor="middle" className="f-mono" fontSize={10} fontWeight={800} fill={C.ink}>
          BOLTS
        </text>
      </g>
    ),
  },
  {
    name: "Git",
    group: "ops",
    tool: { en: "pencil + eraser", ar: "القلم والممحاة" },
    line: { en: "write, erase, branch, rewrite", ar: "اكتب، امسح، تفرّع، أعد الكتابة" },
    art: (
      <g>
        <rect x={34} y={8} width={22} height={22} rx={6} fill={C.pink} {...ink} />
        <rect x={34} y={30} width={22} height={12} fill={C.steel} {...thin} />
        <rect x={34} y={42} width={22} height={130} fill="#E5683A" {...ink} />
        <path d="M41 42 V172 M49 42 V172" stroke={C.ink} strokeWidth={1.5} opacity={0.35} />
        <path d="M34 172 H56 L45 200 Z" fill="#E8D2B0" {...thin} />
        <path d="M41 191 L45 200 L49 191 Z" fill={C.ink} />
        <g fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round">
          <path d="M90 60 V160 M90 84 C90 104 108 104 108 124" />
        </g>
        {[
          [90, 60],
          [90, 160],
          [108, 128],
        ].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r={6} fill={C.paper} {...thin} />
        ))}
      </g>
    ),
  },
  {
    name: "Claude Code",
    group: "ops",
    tool: { en: "magnifying glass", ar: "العدسة المكبّرة" },
    line: { en: "a sharp first-pass review — human sign-off", ar: "مراجعة أولى دقيقة — وتوقيع بشري أخير" },
    art: (
      <g>
        <rect x={52} y={104} width={18} height={100} rx={8} fill="#D97757" {...ink} transform="rotate(-14 61 104)" />
        <circle cx={58} cy={64} r={44} fill={C.steel} {...ink} />
        <circle cx={58} cy={64} r={34} fill="#DCEBF0" {...thin} />
        <path d="M38 52 A24 24 0 0 1 56 38" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" />
        <path d="M44 70 L54 80 L74 56" fill="none" stroke={C.tomato} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
  },
];

export function Stack({ lang, t }: { lang: Lang; t: Dict }) {
  const s = t.stack;
  return (
    <section id="stack" className="sec sec-stack">
      <div className="wrap">
        <SectionHead
          fig="05"
          object={s.object}
          Art={Toolbox}
          viewBox="-10 -54 320 274"
          title={s.title}
          em={s.em}
          note={s.note}
          back={t.plateBack}
          backHref={`/${lang}#desk`}
        />
        <div className="tb rv">
          <div className="tb-lid" aria-hidden>
            <span className="tb-handle" />
            <span className="tb-stencil">{s.stencil}</span>
          </div>
          <div className="tb-body">
            {GROUPS.map((g) => (
              <section key={g} className={`tb-group tb-${g}`}>
                <h3 className="tb-label">{s.groups[g]}</h3>
                <ul className="tb-tray">
                  {TOOLS.filter((tool) => tool.group === g).map((tool) => (
                    <li key={tool.name} className="tool">
                      <svg viewBox="0 0 120 212" aria-hidden>
                        {tool.art}
                      </svg>
                      <div className="tool-tag">
                        <p className="tool-name" dir="ltr">
                          {tool.name}
                        </p>
                        <p className="tool-kind">
                          {s.the}
                          {tool.tool[lang]}
                        </p>
                        <p className="tool-line hand">{tool.line[lang]}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <span className="tb-latch tb-latch-l" aria-hidden />
            <span className="tb-latch tb-latch-r" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
