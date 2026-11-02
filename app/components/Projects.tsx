import type { CSSProperties } from "react";
import type { Dict, Lang } from "../i18n";
import { keyBackend, projects, shotSrc, type Category, type Project } from "../projects";
import { Folder } from "./art";
import { Gallery } from "./Gallery";
import { SectionHead } from "./SectionHead";

type Props = { lang: Lang; t: Dict };

export const galleryLabels = (t: Dict) => ({
  prev: t.projects.prev,
  next: t.projects.next,
  slide: t.projects.slide,
  of: t.projects.of,
  gallery: t.projects.gallery,
});

export function ProjectCard({ p, lang, t, priority }: { p: Project; lang: Lang; t: Dict; priority?: boolean }) {
  const name = p.name[lang];
  const href = `/${lang}/projects/${p.slug}`;
  const n = projects.indexOf(p) + 1;
  return (
    <article className="pcard" data-cat={p.category} style={{ "--accent": p.accent } as CSSProperties}>
      <div className="pcard-frame">
        <Gallery
          srcs={p.shots.map((_, i) => shotSrc(p, i))}
          width={p.size[0]}
          height={p.size[1]}
          name={name}
          labels={galleryLabels(t)}
          sizes="(max-width: 860px) 92vw, (max-width: 1180px) 46vw, 410px"
          aspect="16 / 10"
          priority={priority}
        />
      </div>
      <div className="pcard-meta">
        <p className="pcard-co">
          <span>{String(n).padStart(2, "0")}</span> · {t.archive.cats[p.category]}
        </p>
        <h3 className="pcard-name">
          <a href={href}>{name}</a>
        </h3>
        <p className="pcard-kind hand">{p.kind[lang]}</p>
        <p className="pcard-sum">{p.summary[lang]}</p>
        <div className="pcard-foot">
          <ul className="chips" dir="ltr">
            {p.frontend.slice(0, 2).map((s) => (
              <li key={s}>{s}</li>
            ))}
            {keyBackend(p).map((s) => (
              <li key={s} className="chip-be">
                {s}
              </li>
            ))}
          </ul>
          <a href={href} className="pcard-link" aria-label={`${t.projects.read}: ${name}`}>
            {t.projects.read} {t.arrow}
          </a>
        </div>
      </div>
    </article>
  );
}

/** Homepage: three projects from the folder, then the way into the full archive. */
export function Projects({ lang, t }: Props) {
  const picks = projects.filter((p) => p.home).slice(0, 3);
  return (
    <section id="projects" className="sec sec-projects">
      <div className="wrap">
        <SectionHead
          fig="02"
          object={t.projects.object}
          Art={Folder}
          viewBox="-10 -10 252 186"
          title={t.projects.title}
          em={t.projects.em}
          note={t.projects.note}
          back={t.plateBack}
          backHref={`/${lang}#desk`}
        />
        <div className="pgrid">
          {picks.map((p) => (
            <ProjectCard key={p.slug} p={p} lang={lang} t={t} />
          ))}
        </div>
        <a className="archive-cta" href={`/${lang}/projects`}>
          <span className="archive-cta-tab">{projects.length}</span>
          <span className="archive-cta-text">
            {t.projects.open}
            <small>
              {projects.length} {t.projects.count}
            </small>
          </span>
          <span className="archive-cta-arrow" aria-hidden>
            {t.arrow}
          </span>
        </a>
      </div>
    </section>
  );
}

const CATS: Category[] = ["gov", "corporate", "commerce", "apps", "saas"];

/** /projects: every project, with pure-CSS filter chips (radio inputs + :has). */
export function Archive({ lang, t }: Props) {
  return (
    <section className="sec sec-projects sec-archive">
      <div className="wrap">
        <SectionHead
          as="h1"
          fig="02"
          object={t.archive.object}
          Art={Folder}
          viewBox="-10 -10 252 186"
          title={t.archive.title}
          em={t.archive.em}
          note={t.archive.note}
          back={t.archive.back}
          backHref={`/${lang}#desk`}
        />
        <div className="archive">
          <fieldset className="filters">
            <legend>{t.archive.filter}</legend>
            {(["all", ...CATS] as const).map((c) => {
              const count = c === "all" ? projects.length : projects.filter((p) => p.category === c).length;
              return (
                <label key={c} className={`chip-f chip-${c}`}>
                  <input type="radio" name="cat" value={c} defaultChecked={c === "all"} />
                  {c === "all" ? t.archive.all : t.archive.cats[c]}
                  <sup>{count}</sup>
                </label>
              );
            })}
          </fieldset>
          <div className="pgrid">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} p={p} lang={lang} t={t} priority={i < 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
