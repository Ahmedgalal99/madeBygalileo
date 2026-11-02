import type { Dict, Lang } from "../i18n";
import { Brand } from "./Brand";

/** `path` is the current route without the locale ("", "/projects", "/projects/<slug>"), used by the language switch. */
export function Nav({ lang, t, path = "" }: { lang: Lang; t: Dict; path?: string }) {
  const other: Lang = lang === "en" ? "ar" : "en";
  return (
    <header className="nav">
      <a href={`/${lang}`} className="nav-brand" aria-label="galileo — home">
        <Brand kind="logo" />
      </a>
      <nav aria-label="Sections">
        <ul>
          {t.nav.items.map(([id, label], i) => (
            <li key={id}>
              <a href={`/${lang}#${id}`}>
                <sup>{String(i + 1).padStart(2, "0")}</sup>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="nav-status">
        <span className="dot" /> {t.nav.status}
      </p>
      <a className="lang-switch" href={`/${other}${path}`} hrefLang={other} lang={other} aria-label={t.nav.switchAria}>
        {t.nav.switchLabel}
      </a>
    </header>
  );
}

export function Footer({ lang, t }: { lang: Lang; t: Dict }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <Brand kind="logo-white" className="foot-logo" label="galileo" />
        <div className="foot-row">
          <p>{t.footer.rights}</p>
          <p className="hand foot-note">{t.footer.note}</p>
          <a href={`/${lang}#desk`}>{t.footer.back}</a>
        </div>
      </div>
    </footer>
  );
}
