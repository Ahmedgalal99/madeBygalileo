import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Nav } from "../../components/Chrome";
import { Contact } from "../../components/Contact";
import { Archive } from "../../components/Projects";
import { getDict, hasLocale } from "../../i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: getDict(lang).meta.archiveTitle,
    alternates: { languages: { en: "/en/projects", ar: "/ar/projects" } },
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <Nav lang={lang} t={t} path="/projects" />
      <main>
        <Archive lang={lang} t={t} />
        <Contact t={t} />
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
