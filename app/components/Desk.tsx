import type { ComponentType } from "react";
import type { Dict, Lang } from "../i18n";
import {
  Books,
  C,
  Coffee,
  Folder,
  Headphones,
  Laptop,
  Notebook,
  Paperclip,
  Pencil,
  Phone,
  Plant,
  Star,
  Sticky,
  Telescope,
  Toolbox,
  ink,
  scribble,
} from "./art";

type ObjectId = keyof Dict["desk"]["objects"];

type DeskObject = {
  id: ObjectId;
  /** Section anchor the object opens (absent = decoration). */
  to?: string;
  n: string;
  Art: ComponentType;
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  label: [number, number];
  pin?: [number, number];
  /** viewBox used when the object is drawn on its own (mobile). */
  solo: string;
};

const OBJECTS: DeskObject[] = [
  { id: "books", to: "experience", n: "04", Art: Books, x: 100, y: 60, w: 300, h: 230, rot: 0, label: [214, 34], pin: [92, 118], solo: "0 0 310 240" },
  { id: "folder", to: "projects", n: "02", Art: Folder, x: 112, y: 366, w: 232, h: 164, rot: -7, label: [232, 350], pin: [102, 392], solo: "-10 -10 252 186" },
  { id: "toolbox", to: "stack", n: "05", Art: Toolbox, x: 80, y: 560, w: 300, h: 210, rot: -3, label: [230, 524], pin: [70, 624], solo: "-10 -54 320 274" },
  { id: "laptop", to: "work", n: "01", Art: Laptop, x: 420, y: 230, w: 460, h: 418, rot: 0, label: [640, 206], pin: [404, 244], solo: "-10 -40 490 470" },
  { id: "notebook", to: "about", n: "03", Art: Notebook, x: 896, y: 436, w: 360, h: 250, rot: 5, label: [1062, 418], pin: [888, 440], solo: "-20 -20 400 290" },
  { id: "headphones", to: "interests", n: "07", Art: Headphones, x: 1112, y: 196, w: 250, h: 280, rot: -14, label: [1236, 176], pin: [1118, 232], solo: "-10 -40 270 320" },
  { id: "phone", to: "contact", n: "06", Art: Phone, x: 960, y: 598, w: 130, h: 250, rot: 82, label: [1025, 634], pin: [884, 694], solo: "-10 -10 150 270" },
  { id: "coffee", n: "—", Art: Coffee, x: 1240, y: 640, w: 150, h: 160, rot: 0, label: [1324, 612], solo: "0 -30 150 190" },
];

const LINKED = OBJECTS.filter((o) => o.to);
const BY_NUMBER = [...LINKED].sort((a, b) => a.n.localeCompare(b.n));

type Props = { lang: Lang; t: Dict };

function Tag({ o, t }: { o: DeskObject; t: Dict }) {
  const copy = t.desk.objects[o.id];
  const rtl = t.dir === "rtl";
  const w = Math.max(220, copy.title.length * (rtl ? 15 : 13) + 96);
  // The SVG stays left-to-right; Arabic tags anchor their text to the right edge instead.
  const edge = rtl ? w / 2 - 16 : -w / 2 + 16;
  const anchor = rtl ? "end" : "start";
  return (
    <g className={`tag tag-${o.id}`} transform={`translate(${o.label[0]} ${o.label[1]})`} aria-hidden>
      <g className="tag-in">
        <rect x={-w / 2 + 5} y={-75} width={w} height={64} fill={C.ink} />
        <rect x={-w / 2} y={-80} width={w} height={64} rx={3} fill={C.paper} {...ink} />
        <path d="M-10 -17.5 L0 -3 L10 -17.5" fill={C.paper} {...ink} />
        <rect x={-8.5} y={-20} width={17} height={4} fill={C.paper} />
        <text x={edge} y={-53} textAnchor={anchor} className="f-mono" fontSize={13} fontWeight={700} fill={C.tomato}>
          {o.n}
        </text>
        <text
          x={rtl ? edge - 30 : edge + 28}
          y={-53}
          textAnchor={anchor}
          className="f-mono"
          fontSize={rtl ? 18 : 16}
          fontWeight={800}
          letterSpacing={rtl ? 0 : 2}
          fill={C.ink}
        >
          {copy.title}
        </text>
        <text x={edge} y={-27} textAnchor={anchor} className="f-hand" fontSize={rtl ? 21 : 25} fill={C.ink}>
          {copy.caption}
          {o.to ? ` ${t.arrow}` : ""}
        </text>
      </g>
    </g>
  );
}

function Placed({ o, lang, t }: { o: DeskObject; lang: Lang; t: Dict }) {
  const copy = t.desk.objects[o.id];
  const body = (
    <g transform={`translate(${o.x} ${o.y}) rotate(${o.rot} ${o.w / 2} ${o.h / 2})`}>
      <path
        className="ring"
        d={scribble(o.w / 2, o.h / 2, o.w / 2 + 26, o.h / 2 + 22, o.x % 7)}
        pathLength={1}
        fill="none"
        stroke={C.tomato}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <g className="lift">
        <g filter="url(#wobble)">
          <o.Art />
        </g>
      </g>
    </g>
  );
  if (!o.to) {
    return (
      <g id={`o-${o.id}`} className={`obj obj-${o.id}`}>
        {body}
      </g>
    );
  }
  return (
    <a
      id={`o-${o.id}`}
      className={`obj obj-${o.id}`}
      href={`/${lang}#${o.to}`}
      aria-label={`${copy.object}: ${copy.title} — ${copy.caption}`}
    >
      {body}
    </a>
  );
}

function Grain() {
  const lines = [
    "M90 262 C400 250 760 278 1350 256",
    "M70 360 C300 372 620 344 980 366 S1300 352 1370 360",
    "M50 470 C380 455 700 490 1060 468 S1340 476 1390 470",
    "M40 590 C360 604 680 574 1000 596 S1330 588 1400 592",
    "M30 712 C330 700 760 728 1100 706 S1360 716 1410 712",
  ];
  return (
    <g clipPath="url(#desk-clip)" fill="none" stroke={C.oakDark} strokeWidth={2} strokeLinecap="round" opacity={0.45}>
      {lines.map((d) => (
        <path key={d} d={d} />
      ))}
      <ellipse cx={1190} cy={330} rx={26} ry={9} />
      <ellipse cx={1190} cy={330} rx={12} ry={4} />
      <ellipse cx={240} cy={530} rx={20} ry={7} />
    </g>
  );
}

function Pin({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={7} fill={C.tomato} {...ink} strokeWidth={2} />
      <circle cx={-2} cy={-2} r={2} fill="#fff" opacity={0.6} />
    </g>
  );
}

export function DeskScene({ lang, t }: Props) {
  return (
    <div className="scene">
      <svg viewBox="0 -60 1440 920" role="group" aria-label={t.desk.label} direction="ltr">
        <defs>
          <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={7} />
            <feDisplacementMap in="SourceGraphic" scale={2.6} />
          </filter>
          <clipPath id="desk-clip">
            <path d="M110 200 H1330 L1420 800 H20 Z" />
          </clipPath>
          <radialGradient id="lamp" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFF4D6" stopOpacity={0.55} />
            <stop offset="1" stopColor="#FFF4D6" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* wall */}
        <g transform="translate(1376 4)">
          <Star size={15} />
        </g>
        <g transform="translate(1418 -38)">
          <Star size={7} fill={C.paper} />
        </g>
        <text x={1358} y={-22} textAnchor="end" className="f-hand" fontSize={24} fill={C.ink} opacity={0.8}>
          {t.desk.wall}
        </text>
        <Sticky w={104} h={88} color={C.sky} lines={["React"]} size={30} transform="translate(486 18) rotate(-6)" />
        <Pin x={536} y={22} />
        <Sticky w={112} h={90} color={C.pink} lines={["Next.js"]} size={30} transform="translate(820 30) rotate(5)" />
        <Pin x={878} y={36} />
        <Sticky w={110} h={88} color="#D6E2C8" lines={["Node.js"]} size={29} transform="translate(650 2) rotate(-3)" />
        <Pin x={705} y={7} />

        {/* desk */}
        <path d="M30 834 H1410 V856 H30 Z" fill={C.ink} opacity={0.1} />
        <path d="M20 800 H1420 V834 H20 Z" fill={C.oakDark} {...ink} />
        <path d="M110 200 H1330 L1420 800 H20 Z" fill={C.oak} {...ink} />
        <Grain />
        <ellipse cx={660} cy={440} rx={600} ry={340} fill="url(#lamp)" />

        {/* back row, standing */}
        <g transform="translate(990 112)" filter="url(#wobble)">
          <Plant />
        </g>
        <g transform="translate(1172 22)" filter="url(#wobble)">
          <Telescope />
        </g>

        {/* mat + loose bits */}
        <g transform="rotate(-1.5 660 520)">
          <rect x={360} y={300} width={600} height={446} rx={20} fill={C.forest} {...ink} />
          <rect x={376} y={316} width={568} height={414} rx={12} fill="none" stroke={C.paper} strokeOpacity={0.35} strokeWidth={2} strokeDasharray="8 7" />
        </g>
        <circle cx={1004} cy={770} r={40} fill="none" stroke="#8E5C33" strokeWidth={5} opacity={0.35} strokeDasharray="190 20 40 12" />
        <g transform="translate(424 770) rotate(-70)">
          <Paperclip />
        </g>
        <g transform="translate(470 790) rotate(-100)">
          <Paperclip />
        </g>
        <g transform="translate(760 768) rotate(-8)">
          <Pencil />
        </g>
        <Sticky w={232} h={98} color="#D6E2C8" lines={["Build → Learn", "→ Improve"]} size={28} transform="translate(520 676) rotate(-4)" />

        {OBJECTS.map((o) => (
          <Placed key={o.id} o={o} lang={lang} t={t} />
        ))}

        {/* figure callouts */}
        <g className="pins" aria-hidden>
          {LINKED.map((o) => (
            <g key={o.id} transform={`translate(${o.pin![0]} ${o.pin![1]})`}>
              <circle r={16} fill={C.ink} />
              <text y={4.5} textAnchor="middle" className="f-mono" fontSize={12} fontWeight={700} fill={C.paper}>
                {o.n}
              </text>
            </g>
          ))}
        </g>

        {OBJECTS.map((o) => (
          <Tag key={o.id} o={o} t={t} />
        ))}
      </svg>
    </div>
  );
}

/** Mobile: the desk is re-laid as a vertical tray of objects, not a shrunk scene. */
export function DeskTray({ lang, t }: Props) {
  return (
    <div className="tray">
      {BY_NUMBER.map((o, i) => {
        const copy = t.desk.objects[o.id];
        return (
          <a key={o.id} href={`/${lang}#${o.to}`} className={`tray-item tray-${o.id}`} style={{ ["--tilt" as string]: `${i % 2 ? 2 : -2}deg` }}>
            <svg viewBox={o.solo} aria-hidden>
              <o.Art />
            </svg>
            <span className="tray-copy">
              <span className="tray-n">
                {o.n} · {copy.object}
              </span>
              <span className="tray-title">{copy.title}</span>
              <span className="tray-cap">
                {copy.caption} {t.arrow}
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

export function DeskLegend({ lang, t }: Props) {
  return (
    <ol className="legend">
      {BY_NUMBER.map((o) => {
        const copy = t.desk.objects[o.id];
        return (
          <li key={o.id}>
            <a href={`/${lang}#${o.to}`}>
              <span className="legend-n">{o.n}</span>
              {copy.object}
              <span className="legend-arrow">{t.arrow}</span>
              <span className="legend-to">{copy.title.toLowerCase()}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
