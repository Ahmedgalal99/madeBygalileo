import type { ReactNode } from "react";
import { caseStudies, type CaseStudy } from "../data";
import type { Dict, Lang } from "../i18n";
import { C, Laptop, ink } from "./art";
import { SectionHead } from "./SectionHead";

const thin = { ...ink, strokeWidth: 2 } as const;

function TicketsScene() {
  const seats: ReactNode[] = [];
  const rows = "ABCDEF";
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 10; c++) {
      const x = 70 + c * 38 + (c >= 5 ? 24 : 0);
      const y = 128 + r * 40;
      const mine = r === 2 && c === 6;
      const taken = !mine && ((r * 3 + c * 7) % 5 === 0 || (r === 0 && c > 2 && c < 7) || (r === 4 && c < 2));
      seats.push(
        <g key={`${r}${c}`}>
          <rect x={x} y={y} width={28} height={24} rx={7} fill={mine ? C.tomato : taken ? C.ink : C.paper} {...thin} />
          <path d={`M${x + 5} ${y + 29} H${x + 23}`} {...thin} opacity={0.5} />
        </g>,
      );
    }
    seats.push(
      <text key={`l${r}`} x={44} y={146 + r * 40} className="f-mono" fontSize={12} fontWeight={700} fill={C.ink} opacity={0.6}>
        {rows[r]}
      </text>,
    );
  }
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Illustration of the ticketing seat map with one seat selected">
      <rect width={640} height={400} fill={C.screen} />
      <rect width={640} height={44} fill={C.paper2} />
      <text x={22} y={30} className="f-display" fontSize={22} fontWeight={800} fill={C.ink}>
        JOVIAL
      </text>
      <text x={124} y={28} className="f-mono" fontSize={11} fill={C.ink} opacity={0.7}>
        Hall B · Thu 14:00
      </text>
      <rect x={514} y={12} width={108} height={22} rx={11} fill="none" stroke={C.tomato} strokeWidth={2} />
      <text x={568} y={27} textAnchor="middle" className="f-mono" fontSize={10} fontWeight={700} fill={C.tomato}>
        3 SEATS LEFT
      </text>
      <path d="M100 92 Q272 66 444 92" fill="none" {...ink} />
      <text x={272} y={108} textAnchor="middle" className="f-mono" fontSize={10} letterSpacing={4} fill={C.ink} opacity={0.6}>
        STAGE
      </text>
      {seats}
      <path d="M352 220 C420 230 450 200 484 196" fill="none" stroke={C.ink} strokeWidth={2} strokeDasharray="4 6" strokeLinecap="round" />
      <path d="M340 216 L340 246 L348 239 L354 252 L359 250 L353 237 L363 236 Z" fill={C.paper} {...thin} />
      <g transform="translate(486 160)">
        <rect x={4} y={4} width={136} height={70} rx={6} fill={C.ink} opacity={0.2} />
        <rect width={136} height={70} rx={6} fill={C.ink} />
        <text x={14} y={26} className="f-mono" fontSize={13} fontWeight={700} fill={C.paper}>
          C7 · Booked ✓
        </text>
        <text x={14} y={54} className="f-hand" fontSize={20} fill={C.mustard}>
          done in 3 taps
        </text>
      </g>
      {[
        [70, C.paper, "Free"],
        [160, C.ink, "Taken"],
        [258, C.tomato, "Yours"],
      ].map(([x, f, l]) => (
        <g key={l as string} transform={`translate(${x} 372)`}>
          <rect width={18} height={16} rx={5} fill={f as string} {...thin} />
          <text x={26} y={13} className="f-mono" fontSize={11} fill={C.ink}>
            {l as string}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** RAG — documents become vectors, a question pulls the closest chunks, the answer cites them. */
function RagScene() {
  const dots = [
    [70, 300], [96, 326], [122, 296], [148, 334], [84, 352], [134, 362], [176, 306], [168, 350], [110, 276],
  ];
  const hits = [2, 6];
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Illustration of a RAG assistant answering a question with cited sources">
      <rect width={640} height={400} fill={C.screen} />

      {/* the documents */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${44 + i * 14} ${40 + i * 12}) rotate(${-6 + i * 4})`}>
          <path d="M0 0 H104 L124 20 V150 H0 Z" fill={i === 2 ? C.paper : C.paper2} {...thin} />
          <path d="M104 0 V20 H124" fill="none" {...thin} />
          {i === 2 &&
            [34, 50, 66, 82, 98, 114].map((y, k) => (
              <rect key={y} x={14} y={y} width={k % 3 === 2 ? 60 : 96} height={6} rx={3} fill={k === 2 ? C.mustard : C.ink} opacity={k === 2 ? 1 : 0.3} />
            ))}
          {i === 2 && (
            <text x={14} y={22} className="f-mono" fontSize={10} fontWeight={700} fill={C.ink}>
              policy.pdf
            </text>
          )}
        </g>
      ))}

      {/* the vector store */}
      <path d="M118 222 V262" stroke={C.ink} strokeWidth={2} strokeDasharray="4 6" strokeLinecap="round" />
      <rect x={44} y={262} width={160} height={116} rx={12} fill="none" {...thin} />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={hits.includes(i) ? 8 : 6} fill={hits.includes(i) ? C.tomato : C.sky} {...thin} />
      ))}
      <text x={124} y={396} textAnchor="middle" className="f-mono" fontSize={10} letterSpacing={2} fill={C.ink} opacity={0.6}>
        VECTORS
      </text>
      <path d="M184 306 C230 300 240 250 262 236" fill="none" stroke={C.tomato} strokeWidth={2.5} strokeDasharray="5 7" strokeLinecap="round" />

      {/* the chat */}
      <rect x={262} y={28} width={352} height={344} rx={14} fill={C.paper} {...ink} />
      <rect x={262} y={28} width={352} height={40} rx={14} fill={C.paper2} />
      <path d="M262 68 H614" {...thin} />
      <text x={282} y={54} className="f-display" fontSize={18} fontWeight={800} fill={C.ink}>
        Ask the docs
      </text>
      <circle cx={588} cy={48} r={7} fill={C.sage} {...thin} />

      <rect x={392} y={88} width={204} height={44} rx={12} fill={C.ink} />
      <text x={408} y={115} className="f-mono" fontSize={12} fill={C.paper}>
        How many leave days?
      </text>

      <rect x={280} y={152} width={268} height={122} rx={12} fill={C.screen} {...thin} />
      {[176, 196, 216].map((y, k) => (
        <rect key={y} x={296} y={y} width={k === 2 ? 150 : 232} height={8} rx={4} fill={C.ink} opacity={0.55} />
      ))}
      {["[1] p.4", "[2] p.12"].map((c, k) => (
        <g key={c} transform={`translate(${296 + k * 86} 238)`}>
          <rect width={76} height={22} rx={11} fill={C.mustard} {...thin} />
          <text x={38} y={15} textAnchor="middle" className="f-mono" fontSize={10} fontWeight={700} fill={C.ink}>
            {c}
          </text>
        </g>
      ))}

      <rect x={280} y={318} width={262} height={36} rx={18} fill="none" {...thin} />
      <rect x={296} y={333} width={90} height={6} rx={3} fill={C.ink} opacity={0.25} />
      <circle cx={576} cy={336} r={18} fill={C.tomato} {...thin} />
      <path d="M569 336 H582 M577 330 L583 336 L577 342" fill="none" stroke={C.paper} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

      <text x={444} y={300} className="f-hand" fontSize={20} fill={C.ink}>
        ↑ every claim, sourced
      </text>
    </svg>
  );
}

/** Ministry of Commerce — an Arabic-first, right-to-left page drawn as such. */
function MocScene() {
  const steps = ["الحساب", "الملف", "المحتوى", "الإرسال"];
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Illustration of the Arabic-first Ministry of Commerce content creators platform">
      <rect width={640} height={400} fill={C.screen} />
      <rect width={640} height={8} fill={C.forest} />
      <rect y={8} width={640} height={46} fill={C.paper} />
      <path d="M0 54 H640" {...thin} />
      <text x={616} y={38} textAnchor="end" className="f-hand" fontSize={22} fontWeight={700} fill={C.ink}>
        منصة صُنّاع المحتوى
      </text>
      <circle cx={404} cy={31} r={12} fill={C.sage} {...thin} />
      <rect x={24} y={20} width={64} height={22} rx={11} fill="none" {...thin} />
      <text x={56} y={35} textAnchor="middle" className="f-mono" fontSize={10} fontWeight={700} fill={C.ink}>
        ع | EN
      </text>

      <rect x={24} y={70} width={592} height={104} rx={10} fill={C.forest} {...thin} />
      <text x={596} y={112} textAnchor="end" className="f-hand" fontSize={30} fontWeight={700} fill={C.paper}>
        شارك في حملات الوزارة
      </text>
      <rect x={430} y={126} width={166} height={7} rx={3.5} fill={C.paper} opacity={0.5} />
      <rect x={480} y={140} width={116} height={7} rx={3.5} fill={C.paper} opacity={0.5} />
      <rect x={44} y={118} width={118} height={36} rx={18} fill={C.mustard} {...thin} />
      <text x={103} y={142} textAnchor="middle" className="f-hand" fontSize={19} fontWeight={700} fill={C.ink}>
        سجّل الآن ←
      </text>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={210 + i * 26} cy={100 + (i % 2) * 22} r={9 - i * 2} fill="none" stroke={C.sage} strokeWidth={2} />
      ))}

      {/* stepper, right to left */}
      <path d="M560 206 H80" {...thin} />
      <path d="M560 206 H260" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      {steps.map((s, i) => {
        const x = 560 - i * 160;
        const done = i < 2;
        const now = i === 2;
        return (
          <g key={s}>
            <circle cx={x} cy={206} r={15} fill={done ? C.ink : now ? C.tomato : C.paper} {...thin} />
            {done && (
              <path d={`M${x - 6} 206 L${x - 1} 211 L${x + 7} 200`} fill="none" stroke={C.paper} strokeWidth={3} strokeLinecap="round" />
            )}
            <text x={x} y={240} textAnchor="middle" className="f-hand" fontSize={17} fill={C.ink}>
              {s}
            </text>
          </g>
        );
      })}

      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${436 - i * 206} 262)`}>
          <rect width={180} height={112} rx={8} fill={C.paper} {...thin} />
          <rect x={8} y={8} width={164} height={50} rx={5} fill={[C.mustard, C.sky, C.pink][i]} />
          <rect x={52} y={70} width={112} height={7} rx={3.5} fill={C.ink} opacity={0.6} />
          <rect x={84} y={84} width={80} height={6} rx={3} fill={C.ink} opacity={0.25} />
          <rect x={16} y={88} width={40} height={14} rx={7} fill="none" stroke={C.ink} strokeWidth={1.5} />
        </g>
      ))}
      <g transform="translate(108 64) rotate(-8)">
        <rect x={-34} y={-14} width={68} height={28} rx={3} fill={C.mustard} {...thin} />
        <text y={6} textAnchor="middle" className="f-mono" fontSize={13} fontWeight={800} fill={C.ink}>
          RTL ✓
        </text>
      </g>
    </svg>
  );
}

const SCENES: Record<CaseStudy["id"], () => ReactNode> = {
  tickets: TicketsScene,
  rag: RagScene,
  moc: MocScene,
};

function ProjectScene({ p, i, lang, t }: { p: CaseStudy; i: number; lang: Lang; t: Dict }) {
  const Scene = SCENES[p.id];
  const L = t.work.labels;
  return (
    <article className={`proj proj-${p.id}${i % 2 ? " flip" : ""}`} aria-labelledby={`p-${p.id}`}>
      <div className="proj-visual rv">
        <div className="lf">
          <div className="lf-screen">
            <Scene />
          </div>
          <div className="lf-base" />
        </div>
        <p className="proj-note hand">
          <svg viewBox="0 0 60 40" aria-hidden>
            <path
              d="M4 34 C16 10 34 6 52 10 M44 3 L53 10 L45 18"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </svg>
          {p.note[lang]}
        </p>
      </div>
      <div className="proj-info rv">
        <p className="proj-index">
          <bdi dir="ltr">
            <span>{String(i + 1).padStart(2, "0")}</span> / {String(caseStudies.length).padStart(2, "0")}
          </bdi>
        </p>
        <h3 id={`p-${p.id}`} className="proj-name">
          {p.name[lang]}
        </h3>
        <p className="proj-kind hand">{p.kind[lang]}</p>
        <dl className="proj-dl">
          <div>
            <dt>{L.what}</dt>
            <dd>{p.what[lang]}</dd>
          </div>
          <div>
            <dt>{L.role}</dt>
            <dd>{p.role[lang]}</dd>
          </div>
          <div>
            <dt>{L.stack}</dt>
            <dd>
              <ul className="chips" dir="ltr">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>{L.backend}</dt>
            <dd>
              <ul className="chips" dir="ltr">
                {p.backend.map((s) => (
                  <li key={s} className="chip-be">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="proj-challenge">
            <dt>{L.challenge}</dt>
            <dd>{p.challenge[lang]}</dd>
          </div>
          <div className="proj-outcome">
            <dt>{L.outcome}</dt>
            <dd>{p.outcome[lang]}</dd>
          </div>
        </dl>
        <p className="proj-links">
          {p.caseSlug && (
            <a className="proj-link" href={`/${lang}/projects/${p.caseSlug}`}>
              {t.work.caseLink} {t.arrow}
            </a>
          )}
          {p.url && (
            <a className="proj-link" href={p.url} target="_blank" rel="noreferrer">
              {t.work.visit}
            </a>
          )}
        </p>
      </div>
    </article>
  );
}

export function Work({ lang, t }: { lang: Lang; t: Dict }) {
  return (
    <section id="work" className="sec sec-work">
      <div className="wrap">
        <SectionHead
          fig="01"
          object={t.work.object}
          Art={Laptop}
          viewBox="-10 -40 490 470"
          title={t.work.title}
          em={t.work.em}
          note={t.work.note}
          back={t.plateBack}
          backHref={`/${lang}#desk`}
        />
        {caseStudies.map((p, i) => (
          <ProjectScene key={p.id} p={p} i={i} lang={lang} t={t} />
        ))}
      </div>
    </section>
  );
}
