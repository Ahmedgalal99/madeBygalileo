import { readFileSync } from "node:fs";
import { join } from "node:path";

// The brand files in /public/assets/logo set their lettering as SVG <text> (Instrument Serif,
// JetBrains Mono). Inlined, that text uses the fonts the page already loads; as an <img> it would
// fall back to whatever serif the visitor has. Each entry crops the file's generous padding.
const FILES = {
  logo: { file: "galileo-logo.svg", viewBox: "140 180 1310 395" },
  "logo-white": { file: "galileo-logo-white.svg", viewBox: "140 180 1310 395" },
  mark: { file: "galileo-mark.svg", viewBox: "90 170 870 680" },
  seal: { file: "galileo-seal.svg", viewBox: "30 30 964 964" },
} as const;

const cache = new Map<string, string>();

function load(kind: keyof typeof FILES) {
  if (!cache.has(kind)) {
    const { file, viewBox } = FILES[kind];
    const svg = readFileSync(join(process.cwd(), "public/assets/logo", file), "utf8")
      .replace(/<\?xml[^>]*>/, "")
      .replace(/<svg([^>]*?)\swidth="[^"]*"\sheight="[^"]*"\sviewBox="[^"]*"/, `<svg$1 viewBox="${viewBox}"`)
      .replace("<svg", '<svg aria-hidden="true" focusable="false"');
    cache.set(kind, svg);
  }
  return cache.get(kind)!;
}

export function Brand({ kind, className = "", label }: { kind: keyof typeof FILES; className?: string; label?: string }) {
  return (
    <span
      className={`brand brand-${kind} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: load(kind) }}
    />
  );
}
