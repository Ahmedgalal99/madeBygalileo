import { notFound } from "next/navigation";
import { About } from "../components/About";
import { Footer, Nav } from "../components/Chrome";
import { Contact } from "../components/Contact";
import { DeskLegend, DeskScene, DeskTray } from "../components/Desk";
import { Experience } from "../components/Experience";
import { Projects } from "../components/Projects";
import { Stack } from "../components/Stack";
import { Work } from "../components/Work";
import { getDict, hasLocale } from "../i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const h = t.hero;

  return (
    <>
      <Nav lang={lang} t={t} />
      <main>
        {/* The desk is the hero: it sits in the first screen, the headline beside it. */}
        <section id="desk" className="hero" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-kicker">
                <span>{h.kicker}</span>
                <span>{h.place}</span>
              </p>
              <h1 id="hero-title" className="hero-title">
                <span>{h.l1}</span>
                <span>
                  {h.l2} <em>{h.em}</em>
                </span>
              </h1>
              <p className="hero-role">{h.role}</p>
              <p className="hero-sub">{h.sub}</p>
              <dl className="hero-stack">
                <div>
                  <dt>{h.front}</dt>
                  <dd dir="ltr">React · Next.js · TypeScript</dd>
                </div>
                <div>
                  <dt>{h.back}</dt>
                  <dd dir="ltr">Node.js · Nest.js · MongoDB · PostgreSQL</dd>
                </div>
              </dl>
              <p className="hero-hint hand" aria-hidden>
                {h.hint}
                <svg viewBox="0 0 80 50">
                  <path d="M4 10 C30 2 56 10 70 36 M56 32 L71 38 L74 22" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
            </div>
            <DeskScene lang={lang} t={t} />
          </div>
          <DeskTray lang={lang} t={t} />
          <div className="wrap desk-foot">
            <p className="hand desk-tip">{h.tip}</p>
            <DeskLegend lang={lang} t={t} />
          </div>
        </section>

        <Work lang={lang} t={t} />
        <Projects lang={lang} t={t} />
        <About lang={lang} t={t} />
        <Experience lang={lang} t={t} />
        <Stack lang={lang} t={t} />
        <Contact t={t} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
