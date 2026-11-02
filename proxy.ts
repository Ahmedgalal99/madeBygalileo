import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "ar"];

// Sends locale-less URLs ("/", "/projects") to /en or /ar based on the browser's first language.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const first = (request.headers.get("accept-language") ?? "").split(",")[0].trim().toLowerCase();
  const locale = first.startsWith("ar") ? "ar" : "en";
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
