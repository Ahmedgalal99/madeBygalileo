// Hand-drawn desk objects. Each one draws in its own local box (0,0 → w,h)
// so it can be placed in the big desk scene or rendered alone on mobile.

import type { ReactNode, SVGProps } from "react";

export const C = {
  ink: "#1F1A15",
  paper: "#FBF7EE",
  paper2: "#EFE6D4",
  screen: "#F6F1E6",
  tomato: "#D9482B",
  tomatoDark: "#A9351D",
  mustard: "#E9B949",
  sage: "#8FA68A",
  forest: "#2E4A3F",
  oak: "#CF9A63",
  oakDark: "#A8703F",
  sky: "#A9C3D3",
  pink: "#EFB7A6",
  steel: "#C9C6C0",
  char: "#2A2622",
  coffee: "#6B3F22",
};

export const ink = {
  stroke: C.ink,
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const thin = { ...ink, strokeWidth: 2 } as const;

const r1 = (n: number) => Math.round(n * 10) / 10;

/** A wobbly, slightly overshooting loop — the "circled in pen" highlight. */
export function scribble(cx: number, cy: number, rx: number, ry: number, seed = 1) {
  const pts: string[] = [];
  for (let a = -30; a <= 400; a += 8) {
    const t = (a * Math.PI) / 180;
    const k = 1 + 0.035 * Math.sin(3 * t + seed) + (a > 330 ? 0.06 : 0);
    pts.push(`${r1(cx + Math.cos(t) * rx * k)} ${r1(cy + Math.sin(t) * ry * k)}`);
  }
  return `M${pts.join(" L")}`;
}

export function Sticky({
  w,
  h,
  color,
  lines,
  size = 26,
  ...rest
}: { w: number; h: number; color: string; lines: string[]; size?: number } & SVGProps<SVGGElement>) {
  const lh = size * 1.05;
  const top = h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.3;
  return (
    <g {...rest}>
      <rect x={4} y={6} width={w} height={h} fill={C.ink} opacity={0.12} />
      <path d={`M0 0 H${w} V${h - 14} L${w - 14} ${h} H0 Z`} fill={color} {...thin} />
      <path d={`M${w} ${h - 14} L${w - 12} ${h - 12} L${w - 14} ${h}`} fill={C.ink} opacity={0.15} />
      {lines.map((l, i) => (
        <text
          key={i}
          x={w / 2}
          y={top + i * lh}
          textAnchor="middle"
          className="f-hand"
          fontSize={size}
          fill={C.ink}
        >
          {l}
        </text>
      ))}
    </g>
  );
}

/* ───────────────────────── Laptop ───────────────────────── */

export function Laptop() {
  const keys: ReactNode[] = [];
  const lx = (y: number) => 50 - ((y - 280) / 70) * 8;
  const rx = (y: number) => 410 + ((y - 280) / 70) * 8;
  for (let r = 0; r < 4; r++) {
    const y0 = 285 + r * 15;
    const y1 = y0 + 11;
    const n = r === 3 ? 7 : 12;
    for (let k = 0; k < n; k++) {
      const t0 = k / n + 0.006;
      const t1 = (k + 1) / n - 0.006;
      const p = (t: number, y: number) => `${r1(lx(y) + (rx(y) - lx(y)) * t)},${y}`;
      keys.push(
        <polygon
          key={`${r}-${k}`}
          points={`${p(t0, y0)} ${p(t1, y0)} ${p(t1, y1)} ${p(t0, y1)}`}
          fill={r === 3 && k === 3 ? "#4A4540" : "#5A5550"}
        />,
      );
    }
  }
  return (
    <g>
      {/* lid */}
      <rect x={20} y={0} width={420} height={262} rx={14} fill={C.char} {...ink} />
      <rect x={36} y={16} width={388} height={222} rx={4} fill={C.screen} />
      <rect x={36} y={16} width={388} height={22} fill={C.paper2} />
      <circle cx={50} cy={27} r={4} fill={C.tomato} />
      <circle cx={63} cy={27} r={4} fill={C.mustard} />
      <circle cx={76} cy={27} r={4} fill={C.sage} />
      <text x={230} y={31} textAnchor="middle" className="f-mono" fontSize={10} fill={C.ink} opacity={0.7}>
        ~/galileo/work
      </text>
      <rect x={36} y={38} width={84} height={200} fill="#ECE3D1" />
      {[56, 72, 88, 104, 120, 152, 168].map((y, i) => (
        <rect key={y} x={48 + (i % 3 === 2 ? 10 : 0)} y={y} width={i % 2 ? 44 : 56} height={6} rx={3} fill={C.ink} opacity={0.18} />
      ))}
      {[
        { x: 140, c: C.mustard, l: "TICKETS" },
        { x: 230, c: C.sage, l: "RAG" },
        { x: 320, c: C.pink, l: "JOO" },
      ].map((f) => (
        <g key={f.l} transform={`translate(${f.x} 60)`}>
          <path d="M0 8 V54 H76 V14 H34 L28 6 H2 Z" fill={f.c} {...thin} />
          <path d="M0 18 H76" {...thin} opacity={0.4} />
          <text x={38} y={74} textAnchor="middle" className="f-mono" fontSize={11} fontWeight={700} fill={C.ink}>
            {f.l}
          </text>
        </g>
      ))}
      {[
        [140, 168, 70, C.tomato],
        [216, 168, 120, C.ink],
        [140, 184, 40, C.ink],
        [186, 184, 90, C.sage],
        [156, 200, 110, C.ink],
        [140, 216, 54, C.mustard],
      ].map(([x, y, w, c], i) => (
        <rect key={i} x={x as number} y={y as number} width={w as number} height={6} rx={3} fill={c as string} opacity={c === C.ink ? 0.25 : 0.9} />
      ))}
      <rect className="blink" x={200} y={212} width={3} height={14} fill={C.ink} />
      {/* hinge + base */}
      <rect x={20} y={258} width={420} height={10} fill="#8C8A86" {...thin} />
      <path d="M20 268 H440 L460 410 Q460 418 452 418 H8 Q0 418 0 410 Z" fill={C.steel} {...ink} />
      <path d="M50 280 H410 L418 350 H42 Z" fill="#3A3632" />
      {keys}
      <path d="M170 362 H290 L294 404 H166 Z" fill="#BDB9B2" {...thin} />
      <path d="M8 412 H452" stroke="#fff" strokeOpacity={0.4} strokeWidth={2} />
      {/* sticky on the lid */}
      <Sticky w={92} h={78} color={C.mustard} lines={["Ship it."]} size={28} transform="translate(372 -26) rotate(9)" />
    </g>
  );
}

/* ───────────────────────── Notebook ───────────────────────── */

export function Notebook() {
  const rules = [];
  for (let y = 46; y < 236; y += 19) {
    rules.push(<path key={`l${y}`} d={`M16 ${y} H168`} stroke={C.sky} strokeWidth={1.5} />);
    rules.push(<path key={`r${y}`} d={`M194 ${y} H346`} stroke={C.sky} strokeWidth={1.5} />);
  }
  return (
    <g>
      <rect x={-10} y={-8} width={380} height={266} rx={10} fill={C.tomato} {...ink} />
      <path d="M0 4 Q90 -6 178 6 V250 Q90 240 0 250 Z" fill={C.paper} {...ink} />
      <path d="M182 6 Q270 -6 360 4 V250 Q270 240 182 250 Z" fill={C.paper} {...ink} />
      {rules}
      <path d="M36 14 V244" stroke={C.tomato} strokeWidth={1.5} opacity={0.6} />
      <rect x={168} y={6} width={26} height={244} fill={C.ink} opacity={0.06} />
      <path d="M180 6 V250" {...thin} />
      <text x={46} y={40} className="f-hand" fontSize={26} fill={C.tomato}>
        about me —
      </text>
      <path d="M46 46 Q90 41 140 46" stroke={C.tomato} strokeWidth={2} fill="none" strokeLinecap="round" />
      {["ahmed galal", "frontend eng.", "react / next.js", "5+ yrs, still curious"].map((t, i) => (
        <text key={t} x={46} y={80 + i * 38} className="f-hand" fontSize={23} fill={C.ink}>
          {t}
        </text>
      ))}
      {/* right page doodles */}
      <g transform="translate(220 34)" fill="none" {...thin}>
        <circle cx={22} cy={22} r={16} fill={C.mustard} />
        <path d="M14 42 H30 M16 48 H28" />
        <path d="M22 0 V-6 M44 22 H50 M0 22 H-6 M38 6 L42 2 M6 6 L2 2" />
      </g>
      <text x={286} y={60} className="f-hand" fontSize={22} fill={C.ink}>
        ideas
      </text>
      {[
        ["build", true],
        ["learn", true],
        ["improve", false],
      ].map(([t, done], i) => (
        <g key={t as string} transform={`translate(204 ${116 + i * 38})`}>
          <rect x={0} y={-14} width={16} height={16} fill="none" {...thin} />
          {done && <path d="M2 -6 L7 0 L18 -18" fill="none" stroke={C.tomato} strokeWidth={3} strokeLinecap="round" />}
          <text x={28} y={0} className="f-hand" fontSize={23} fill={C.ink}>
            {t as string}
          </text>
        </g>
      ))}
      {/* elastic + pen */}
      <path d="M352 -8 V258" stroke={C.char} strokeWidth={6} />
      <g transform="translate(250 214) rotate(-24)">
        <rect x={0} y={0} width={150} height={13} rx={6.5} fill={C.ink} />
        <rect x={104} y={-1} width={46} height={15} rx={7} fill={C.forest} {...thin} />
        <path d="M0 6.5 L-14 6.5" stroke={C.ink} strokeWidth={4} strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ───────────────────────── Books (standing) ───────────────────────── */

const BOOKS = [
  { x: 20, w: 38, h: 186, c: C.char, t: "'17" },
  { x: 58, w: 30, h: 208, c: C.sky, t: "'20" },
  { x: 88, w: 46, h: 174, c: C.mustard, t: "'21" },
  { x: 134, w: 34, h: 198, c: C.forest, t: "'23" },
  { x: 168, w: 40, h: 184, c: C.tomato, t: "NOW" },
];

export function Books() {
  const base = 230;
  return (
    <g>
      {BOOKS.map((b, i) => (
        <g key={i} className={i === 4 ? "book-pull" : undefined}>
          <rect x={b.x} y={base - b.h} width={b.w} height={b.h} rx={3} fill={b.c} {...ink} />
          <path d={`M${b.x + 4} ${base - b.h + 18} H${b.x + b.w - 4} M${b.x + 4} ${base - 22} H${b.x + b.w - 4}`} stroke={b.c === C.char ? C.mustard : C.ink} strokeWidth={2} opacity={0.7} />
          <text
            x={b.x + b.w / 2}
            y={base - 32}
            textAnchor="middle"
            className="f-mono"
            fontSize={11}
            fontWeight={700}
            fill={b.c === C.char || b.c === C.forest ? C.paper : C.ink}
          >
            {b.t}
          </text>
          <rect x={b.x + b.w / 2 - 5} y={base - b.h + 34} width={10} height={b.h * 0.42} rx={2} fill={C.paper} opacity={0.25} />
        </g>
      ))}
      <g transform={`rotate(16 214 ${base})`}>
        <rect x={214} y={base - 172} width={34} height={172} rx={3} fill={C.pink} {...ink} />
        <path d={`M218 ${base - 150} H244`} {...thin} />
      </g>
      <path d={`M278 ${base} V${base - 92} H290 V${base} Z`} fill={C.steel} {...ink} />
      <path d={`M262 ${base} H300`} {...ink} />
    </g>
  );
}

/* ───────────────────────── Project folder ───────────────────────── */

export function Folder() {
  return (
    <g>
      <path d="M0 18 H72 L86 2 H150 L160 18 H232 V164 H0 Z" fill="#C99D4F" {...ink} />
      <g className="papers">
        <g transform="rotate(-5 110 60)">
          <rect x={18} y={6} width={176} height={126} fill={C.paper} {...thin} />
          <rect x={30} y={18} width={74} height={46} fill={C.sky} {...thin} />
          {[22, 34, 46, 58].map((y) => (
            <rect key={y} x={114} y={y} width={y === 58 ? 40 : 64} height={5} rx={2.5} fill={C.ink} opacity={0.22} />
          ))}
        </g>
        <g transform="rotate(6 150 60)">
          <rect x={66} y={10} width={160} height={116} fill={C.screen} {...thin} />
          <rect x={78} y={22} width={136} height={14} fill={C.tomato} />
          {[46, 58, 70].map((y) => (
            <rect key={y} x={78} y={y} width={y === 70 ? 70 : 120} height={5} rx={2.5} fill={C.ink} opacity={0.22} />
          ))}
        </g>
      </g>
      <path d="M0 52 H232 V164 H0 Z" fill="#E3BF74" {...ink} />
      <path d="M0 52 H232" stroke="#fff" strokeOpacity={0.35} strokeWidth={3} transform="translate(0 4)" />
      <rect x={18} y={72} width={118} height={30} fill={C.paper} {...thin} />
      <text x={77} y={92} textAnchor="middle" className="f-mono" fontSize={13} fontWeight={800} letterSpacing={2} fill={C.ink}>
        PROJECTS
      </text>
      <path d="M150 136 C170 128 190 140 212 128" fill="none" stroke={C.ink} strokeWidth={2} strokeLinecap="round" opacity={0.6} />
    </g>
  );
}

/* ───────────────────────── Toolbox ───────────────────────── */

export function Toolbox() {
  return (
    <g>
      <path d="M14 58 H286 L270 14 H30 Z" fill={C.tomatoDark} {...ink} />
      <g className="tools-rise">
        <g transform="rotate(-18 92 60)">
          <rect x={86} y={-6} width={8} height={62} fill={C.steel} {...thin} />
          <rect x={80} y={-44} width={20} height={44} rx={8} fill={C.mustard} {...ink} />
        </g>
        <g transform="rotate(12 170 60)">
          <path d="M164 64 V8 a14 14 0 1 1 12 0 V64 Z" fill={C.steel} {...ink} />
          <circle cx={170} cy={-4} r={6} fill={C.char} />
        </g>
        <g transform="rotate(-6 236 60)">
          <rect x={224} y={-10} width={22} height={74} fill={C.mustard} {...ink} />
          {[0, 10, 20, 30, 40, 50].map((d) => (
            <path key={d} d={`M224 ${d} h${d % 20 ? 6 : 10}`} {...thin} />
          ))}
        </g>
      </g>
      <rect x={12} y={54} width={276} height={24} fill={C.char} />
      <path d="M112 56 Q150 26 188 56" fill="none" stroke={C.char} strokeWidth={9} strokeLinecap="round" />
      <rect x={0} y={70} width={300} height={140} rx={12} fill={C.tomato} {...ink} />
      <path d="M0 108 H300" {...thin} opacity={0.6} />
      <rect x={128} y={94} width={44} height={28} rx={4} fill={C.mustard} {...ink} />
      <circle cx={150} cy={108} r={4} fill={C.ink} />
      <text x={150} y={170} textAnchor="middle" className="f-mono" fontSize={15} fontWeight={800} letterSpacing={4} fill={C.paper}>
        TOOLS
      </text>
      <path d="M14 196 H286" stroke={C.ink} strokeWidth={2} opacity={0.25} />
    </g>
  );
}

/* ───────────────────────── Phone ───────────────────────── */

export function Phone() {
  return (
    <g>
      <rect x={0} y={0} width={130} height={250} rx={22} fill={C.char} {...ink} />
      <rect x={8} y={10} width={114} height={230} rx={15} fill={C.screen} />
      <rect x={48} y={16} width={34} height={8} rx={4} fill={C.char} />
      <text x={65} y={52} textAnchor="middle" className="f-display" fontSize={26} fontWeight={700} fill={C.ink}>
        9:41
      </text>
      <g transform="translate(16 70)">
        <rect width={98} height={74} rx={10} fill={C.paper} {...thin} />
        <circle cx={14} cy={15} r={5} fill={C.tomato} />
        <text x={24} y={19} className="f-mono" fontSize={8} fontWeight={700} fill={C.ink}>
          NEW MESSAGE
        </text>
        <text x={10} y={42} className="f-hand" fontSize={17} fill={C.ink}>
          Got something
        </text>
        <text x={10} y={62} className="f-hand" fontSize={17} fill={C.ink}>
          in mind?
        </text>
      </g>
      <rect x={42} y={224} width={46} height={5} rx={2.5} fill={C.ink} opacity={0.5} />
    </g>
  );
}

/* ───────────────────────── Headphones ───────────────────────── */

export function Headphones() {
  return (
    <g>
      <path d="M44 150 C30 20 220 20 206 150" fill="none" stroke={C.ink} strokeWidth={24} strokeLinecap="round" />
      <path d="M44 150 C30 20 220 20 206 150" fill="none" stroke={C.char} strokeWidth={18} strokeLinecap="round" />
      <path d="M58 118 C56 52 194 52 192 118" fill="none" stroke={C.mustard} strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" />
      {[44, 206].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy={162} rx={36} ry={44} fill={C.char} {...ink} />
          <ellipse cx={cx} cy={162} rx={25} ry={32} fill={C.sage} {...thin} />
          <ellipse cx={cx - 6} cy={150} rx={6} ry={10} fill={C.paper} opacity={0.35} />
        </g>
      ))}
      <path d="M210 206 C214 230 186 226 196 246 S230 250 222 272" fill="none" stroke={C.char} strokeWidth={3} strokeLinecap="round" />
      <g className="notes" fill={C.ink}>
        <g transform="translate(108 -6)">
          <ellipse cx={0} cy={18} rx={7} ry={5} />
          <path d="M6 17 V-6 L18 -2" fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        </g>
        <g transform="translate(150 -22)">
          <ellipse cx={0} cy={18} rx={6} ry={4.5} />
          <path d="M5 17 V-4" fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
}

/* ───────────────────────── Coffee ───────────────────────── */

export function Coffee() {
  return (
    <g>
      <g className="steam" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" opacity={0.45}>
        <path d="M70 26 C60 10 80 -2 70 -18" />
        <path d="M96 22 C86 6 106 -6 96 -24" />
      </g>
      <rect x={4} y={80} width={46} height={28} rx={14} fill={C.paper} {...ink} />
      <circle cx={84} cy={94} r={58} fill={C.paper} {...ink} />
      <circle cx={84} cy={94} r={46} fill={C.coffee} {...thin} />
      <circle cx={84} cy={94} r={34} fill="#9A6A42" opacity={0.55} />
      <path d="M84 112 C66 98 70 82 80 84 C84 85 84 90 84 90 C84 90 84 85 88 84 C98 82 102 98 84 112 Z" fill={C.paper} opacity={0.85} />
      <path d="M44 70 A52 52 0 0 1 72 46" fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
}

/* ───────────────────────── Small decor ───────────────────────── */

export function Plant() {
  return (
    <g>
      <g fill={C.sage} {...thin}>
        <path d="M45 80 C10 60 6 26 20 10 C40 30 48 52 45 80 Z" />
        <path d="M45 80 C80 62 86 30 72 8 C52 30 42 52 45 80 Z" />
        <path d="M45 82 C30 46 40 12 46 0 C58 20 58 52 45 82 Z" fill="#7C9677" />
      </g>
      <path d="M14 78 H76 L68 150 H22 Z" fill={C.pink} {...ink} />
      <path d="M10 78 H80 V92 H10 Z" fill={C.pink} {...ink} />
    </g>
  );
}

export function Telescope() {
  return (
    <g>
      <g {...ink} fill="none">
        <path d="M70 100 L36 186 M70 100 L104 186 M70 100 L72 190" />
      </g>
      <g transform="rotate(-32 70 96)">
        <rect x={-6} y={84} width={142} height={26} rx={6} fill={C.mustard} {...ink} />
        <rect x={130} y={80} width={24} height={34} rx={4} fill="#C8962E" {...ink} />
        <rect x={-22} y={90} width={18} height={14} rx={3} fill={C.char} {...ink} />
        <path d="M40 84 V110 M86 84 V110" {...thin} />
      </g>
      <circle cx={70} cy={98} r={7} fill={C.char} {...thin} />
    </g>
  );
}

export function Star({ size = 14, fill = C.mustard }: { size?: number; fill?: string }) {
  const s = size;
  return (
    <path
      d={`M0 ${-s} C${s * 0.15} ${-s * 0.15} ${s * 0.15} ${-s * 0.15} ${s} 0 C${s * 0.15} ${s * 0.15} ${s * 0.15} ${s * 0.15} 0 ${s} C${-s * 0.15} ${s * 0.15} ${-s * 0.15} ${s * 0.15} ${-s} 0 C${-s * 0.15} ${-s * 0.15} ${-s * 0.15} ${-s * 0.15} 0 ${-s} Z`}
      fill={fill}
      {...thin}
    />
  );
}

export function Paperclip() {
  return (
    <path
      d="M8 40 V10 a8 8 0 0 1 16 0 V46 a12 12 0 0 1 -24 0 V16"
      fill="none"
      stroke="#8C8A86"
      strokeWidth={3}
      strokeLinecap="round"
    />
  );
}

export function Pencil() {
  return (
    <g>
      <rect x={0} y={0} width={150} height={14} fill={C.mustard} {...thin} />
      <path d="M0 0 L-24 7 L0 14 Z" fill="#E8D2B0" {...thin} />
      <path d="M-24 7 L-16 4.7 V9.3 Z" fill={C.ink} />
      <rect x={150} y={-1} width={14} height={16} fill={C.steel} {...thin} />
      <rect x={164} y={-1} width={18} height={16} rx={4} fill={C.pink} {...thin} />
    </g>
  );
}
