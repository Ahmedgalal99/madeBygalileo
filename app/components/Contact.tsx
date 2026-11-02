import { profile } from "../data";
import type { Dict } from "../i18n";

export function Contact({ t }: { t: Dict }) {
  const c = t.contact;
  const links = [
    { label: c.labels.email, value: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: c.labels.linkedin, value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: profile.linkedin, external: true },
    { label: c.labels.github, value: profile.github.replace(/^https?:\/\//, ""), href: profile.github, external: true },
  ];
  return (
    <section id="contact" className="sec sec-contact">
      <div className="wrap contact">
        <div className="contact-copy rv">
          <p className="contact-fig">
            <span className="plate-fig">Fig. 06</span> {c.object}
          </p>
          <h2 className="contact-q">{c.q}</h2>
          <p className="contact-a">{c.a}</p>
          <ul className="contact-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target={l.external ? "_blank" : undefined} rel="noreferrer">
                  <span className="cl-label">{l.label}</span>
                  <span className="cl-value" dir="ltr">
                    {l.value}
                  </span>
                  <span className="cl-arrow" aria-hidden>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="phone rv" aria-hidden>
          <div className="phone-screen">
            <p className="phone-status" dir="ltr">
              <span>9:41</span>
              <span>●●● ▮</span>
            </p>
            <div className="phone-who">
              <span className="phone-avatar">AG</span>
              <p>
                {c.who}
                <span>{c.replies}</span>
              </p>
            </div>
            <div className="bubbles">
              {c.bubbles.map((b) => (
                <p key={b} className="bubble in">
                  {b}
                </p>
              ))}
              <p className="bubble out">{c.out}</p>
              <p className="typing">
                <i />
                <i />
                <i />
              </p>
            </div>
          </div>
        </div>
        <p className="contact-hint hand">{c.hint}</p>
      </div>
    </section>
  );
}
