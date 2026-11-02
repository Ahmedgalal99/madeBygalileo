import { ar } from "./ar";
import { en } from "./en";

export const locales = ["en", "ar"] as const;
export type Lang = (typeof locales)[number];
export type { Dict } from "./en";

export const hasLocale = (l: string): l is Lang => (locales as readonly string[]).includes(l);

const dicts = { en, ar };
export const getDict = (l: Lang) => dicts[l];
