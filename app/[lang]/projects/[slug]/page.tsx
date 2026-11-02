import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "../../../components/CaseStudy";
import { Footer, Nav } from "../../../components/Chrome";
import { Contact } from "../../../components/Contact";
import { getDict, hasLocale } from "../../../i18n";
import { getProject, projects, shotSrc } from "../../../projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!hasLocale(lang) || !p) return {};
  const t = getDict(lang);
  return {
    title: `${p.name[lang]} — ${t.case.label} · GALILEO`,
    description: p.summary[lang],
    alternates: { languages: { en: `/en/projects/${slug}`, ar: `/ar/projects/${slug}` } },
    openGraph: { images: [{ url: shotSrc(p, 0), width: p.size[0], height: p.size[1] }] },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!hasLocale(lang) || !p) notFound();
  const t = getDict(lang);
  return (
    <>
      <Nav lang={lang} t={t} path={`/projects/${slug}`} />
      <main>
        <CaseStudy p={p} lang={lang} t={t} />
        <Contact t={t} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
