import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dict, Lang } from "../i18n";
import { isDatabase, projects, shotSrc, type Project } from "../projects";
import { Gallery } from "./Gallery";
import { galleryLabels } from "./Projects";

const pad = (n: number) => String(n).padStart(2, "0");

/** Client → API → database, drawn from the project's own stack. */
function Architecture({ p, t }: { p: Project; t: Dict }) {
  const a = t.case.arch;
  const db = p.backend.filter(isDatabase);
  const api = p.backend.filter((s) => !isDatabase(s));
  const nodes = [
    { k: "client", label: a.client, items: p.frontend.slice(0, 2) },
    { k: "api", label: a.api, items: api.slice(0, 2) },
    ...(db.length ? [{ k: "data", label: a.data, items: db }] : []),
  ];
  const extra = api.slice(2);
  return (
    <div className="arch" dir="ltr">
      {nodes.map((n, i) => (
        <div key={n.k} className={`arch-node arch-${n.k}`}>
          {i > 0 && <span className="arch-link" aria-hidden />}
          <p className="arch-label">{n.label}</p>
          <p className="arch-items">{n.items.join(" · ")}</p>
        </div>
      ))}
      {extra.length > 0 && (
        <p className="arch-extra">
          {a.extra}: {extra.join(" · ")}
        </p>
      )}
    </div>
  );
}

function PagerLink({ p, dir, lang, t }: { p: Project; dir: "prev" | "next"; lang: Lang; t: Dict }) {
  return (
    <a className={`pager-card pager-${dir}`} href={`/${lang}/projects/${p.slug}`}>
      <span className="pager-thumb">
        <Image src={shotSrc(p, 0)} alt="" width={p.size[0]} height={p.size[1]} sizes="(max-width: 860px) 40vw, 260px" />
      </span>
      <span className="pager-text">
        <small>{dir === "prev" ? t.case.prev : t.case.next}</small>
        <strong>{p.name[lang]}</strong>
      </span>
    </a>
  );
}

export function CaseStudy({ p, lang, t }: { p: Project; lang: Lang; t: Dict }) {
  const c = t.case;
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const name = p.name[lang];

  return (
    <article className="case" style={{ "--accent": p.accent } as CSSProperties}>
      <header className="case-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href={`/${lang}#desk`}>{c.crumbs[0]}</a>
            <span aria-hidden>/</span>
            <a href={`/${lang}/projects`}>{c.crumbs[1]}</a>
            <span aria-hidden>/</span>
            <span aria-current="page">{name}</span>
          </nav>

          <div className="case-intro">
            <p className="case-kicker">
              <span className="plate-fig">
                {c.label}{" "}
                <bdi dir="ltr">
                  {pad(i + 1)} / {pad(projects.length)}
                </bdi>
              </span>
              <span>{t.archive.cats[p.category]}</span>
            </p>
            <h1 className="case-title">{name}</h1>
            <p className="case-kind hand">{p.kind[lang]}</p>
            <p className="case-summary">{p.summary[lang]}</p>
          </div>

          <dl className="case-facts">
            <div>
              <dt>{c.category}</dt>
              <dd>{t.archive.cats[p.category]}</dd>
            </div>
            <div>
              <dt>{c.platforms}</dt>
              <dd>{c.platformsValue}</dd>
            </div>
            <div>
              <dt>{c.frontend}</dt>
              <dd dir="ltr">{p.frontend.join(" · ")}</dd>
            </div>
            <div>
              <dt>{c.backend}</dt>
              <dd dir="ltr">{p.backend.join(" · ")}</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="case-gallery" aria-label={`${t.projects.gallery} ${name}`}>
        <div className="wrap">
          <div className="case-frame rv">
            <Gallery
              srcs={p.shots.map((_, k) => shotSrc(p, k))}
              width={p.size[0]}
              height={p.size[1]}
              name={name}
              labels={galleryLabels(t)}
              sizes="(max-width: 1320px) 94vw, 1240px"
              priority
              large
            />
          </div>
          <p className="case-note hand" aria-hidden>
            {c.note} ↴
          </p>
        </div>
      </section>

      <div className="case-body wrap">
        <aside className="case-side">
          <div className="case-card">
            <p className="case-card-label">{c.role}</p>
            <p>{c.roleValue}</p>
            <p className="case-card-label">{c.frontend}</p>
            <ul className="chips" dir="ltr">
              {p.frontend.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="case-card-label">{c.backend}</p>
            <ul className="chips" dir="ltr">
              {p.backend.map((s) => (
                <li key={s} className="chip-be">
                  {s}
                </li>
              ))}
            </ul>
            <p className="case-card-label">{c.scope}</p>
            <ul className="case-tags">
              {p.tags.map((tag) => (
                <li key={tag}>{t.tags[tag]}</li>
              ))}
            </ul>
            {p.url && (
              <a className="case-visit" href={p.url} target="_blank" rel="noreferrer">
                {c.visit}
              </a>
            )}
          </div>
        </aside>

        <div className="case-story">
          <section className="case-block rv">
            <h2>
              <span>01</span>
              {c.challenge}
            </h2>
            <p>{p.challenge[lang]}</p>
          </section>
          <section className="case-block rv">
            <h2>
              <span>02</span>
              {c.approach}
            </h2>
            <ol className="case-steps">
              {p.approach[lang].map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section className="case-block rv">
            <h2>
              <span>03</span>
              {c.under}
            </h2>
            <p>{p.backendNote[lang]}</p>
            <Architecture p={p} t={t} />
          </section>
          <section className="case-block case-result rv">
            <h2>
              <span>04</span>
              {c.outcome}
            </h2>
            <p>{p.outcome[lang]}</p>
          </section>
        </div>
      </div>

      <nav className="case-pager wrap" aria-label={c.all}>
        <PagerLink p={prev} dir="prev" lang={lang} t={t} />
        <a className="pager-all" href={`/${lang}/projects`}>
          <span aria-hidden>▦</span>
          {c.all}
        </a>
        <PagerLink p={next} dir="next" lang={lang} t={t} />
      </nav>
    </article>
  );
}
