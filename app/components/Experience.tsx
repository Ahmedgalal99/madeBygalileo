import type { CSSProperties } from "react";
import { experience } from "../data";
import type { Dict, Lang } from "../i18n";
import { Books } from "./art";
import { SectionHead } from "./SectionHead";

const DARK = new Set(["var(--forest)", "var(--ink)", "var(--tomato)"]);

export function Experience({ lang, t }: { lang: Lang; t: Dict }) {
  const e = t.experience;
  return (
    <section id="experience" className="sec sec-exp">
      <div className="wrap">
        <SectionHead
          fig="04"
          object={e.object}
          Art={Books}
          viewBox="0 0 310 240"
          title={e.title}
          em={e.em}
          note={e.note}
          back={t.plateBack}
          backHref={`/${lang}#desk`}
        />
        <div className="exp">
          <div className="shelf rv">
            <p className="shelf-note hand">{e.pull}</p>
            <div className="shelf-books">
              {experience.map((c, i) => (
                <a
                  key={c.company.en}
                  href={`#ch-${i}`}
                  className="book"
                  aria-label={`${c.company[lang]} — ${c.years[lang]}`}
                  style={
                    {
                      "--c": c.color,
                      "--t": DARK.has(c.color) ? "var(--paper-hi)" : "var(--ink)",
                      "--h": `${c.h}%`,
                    } as CSSProperties
                  }
                >
                  <span className="book-title">{c.spine[lang]}</span>
                  <span className="book-year">{c.years.en.match(/\d{4}/)?.[0]}</span>
                </a>
              ))}
              <span className="bookend" aria-hidden />
            </div>
            <div className="shelf-plank" aria-hidden />
          </div>
          <ol className="tl">
            {experience.map((c, i) => (
              <li key={c.company.en} id={`ch-${i}`} className="rv">
                <p className="tl-years">{c.years[lang]}</p>
                <div>
                  <h3 className="tl-role">{c.role[lang]}</h3>
                  <p className="tl-co">
                    {c.company[lang]} <span>· {c.where[lang]}</span>
                  </p>
                  <p className="tl-sum">{c.summary[lang]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
