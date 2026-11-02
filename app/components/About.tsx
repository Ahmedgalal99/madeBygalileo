import type { Dict, Lang } from "../i18n";
import { C, Headphones, Notebook } from "./art";
import { Brand } from "./Brand";
import { SectionHead } from "./SectionHead";

export function About({ lang, t }: { lang: Lang; t: Dict }) {
  const a = t.about;
  return (
    <section id="about" className="sec sec-about">
      <div className="wrap">
        <SectionHead
          fig="03"
          object={a.object}
          Art={Notebook}
          viewBox="-20 -20 400 290"
          title={a.title}
          em={a.em}
          note={a.note}
          back={t.plateBack}
          backHref={`/${lang}#desk`}
        />
        <div className="nb rv">
          <div className="nb-page nb-left">
            <p className="nb-folio">{a.folioWho}</p>
            <h3 className="nb-name">{a.name}</h3>
            <p className="nb-role hand">
              {t.hero.role}
              <svg viewBox="0 0 220 16" preserveAspectRatio="none" aria-hidden>
                <path d="M4 10 C60 2 140 14 216 5" fill="none" stroke={C.tomato} strokeWidth={3} strokeLinecap="round" />
              </svg>
            </p>
            <ul className="nb-facts">
              {a.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="nb-aside hand">{a.aside}</p>
            <p className="nb-langs">{a.langs}</p>
          </div>
          <div className="nb-rings" aria-hidden>
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="nb-page nb-right">
            <p className="nb-folio">{a.folioCares}</p>
            <ul className="nb-cares">
              {a.cares.map(([x, y]) => (
                <li key={x}>
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M3 13 L9 19 L22 3" fill="none" stroke={C.tomato} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <strong>{x}</strong>
                  <span className="hand"> — {y}</span>
                </li>
              ))}
            </ul>
            <aside id="interests" className="nb-sticky" aria-label={a.offTitle}>
              <svg viewBox="-10 -40 270 320" aria-hidden>
                <Headphones />
              </svg>
              <p className="nb-sticky-title">{a.offTitle}</p>
              <ul>
                {a.off.map((x) => (
                  <li key={x} className="hand">
                    {x}
                  </li>
                ))}
              </ul>
            </aside>
            <Brand kind="seal" className="stamp" />
          </div>
        </div>
      </div>
    </section>
  );
}
