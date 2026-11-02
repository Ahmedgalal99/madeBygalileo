import type { ComponentType } from "react";

/** The "figure plate" that opens every section and ties it back to an object on the desk. */
export function SectionHead({
  fig,
  object,
  Art,
  viewBox,
  title,
  em,
  note,
  back,
  backHref,
  as: Heading = "h2",
}: {
  fig: string;
  object: string;
  Art: ComponentType;
  viewBox: string;
  title: string;
  em: string;
  note: string;
  back: string;
  backHref: string;
  as?: "h1" | "h2";
}) {
  return (
    <header className="plate rv">
      <div className="plate-meta">
        <svg className="plate-art" viewBox={viewBox} aria-hidden>
          <Art />
        </svg>
        <p>
          <span className="plate-fig">Fig. {fig}</span>
          <span className="plate-obj">{object}</span>
        </p>
      </div>
      <Heading className="plate-title">
        {title}
        <em>{em}</em>
      </Heading>
      <p className="plate-note hand">{note}</p>
      <a className="plate-back" href={backHref}>
        {back}
      </a>
    </header>
  );
}
