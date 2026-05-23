// // proxy.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { match } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// const locales = ["de", "en"];
// const defaultLocale = "de";

// function getLocale(request: NextRequest) {
//   const headers = {
//     "accept-language": request.headers.get("accept-language") || "",
//   };
//   const languages = new Negotiator({ headers }).languages();
//   return match(languages, locales, defaultLocale);
// }

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Check if there is any supported locale in the pathname
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
//   );

//   if (pathnameHasLocale) return;

//   // Redirect if there is no locale
//   const locale = getLocale(request);
//   request.nextUrl.pathname = `/${locale}${pathname}`;
//   return NextResponse.redirect(request.nextUrl);
// }

// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     "/((?!_next).*)",
//   ],
// };

// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["de", "en"];

// 1. Remove the negotiator and intl-localematcher logic
function getLocale(request: NextRequest) {
  // 2. Strictly return 'de' to ignore the browser's language preferences
  return "de";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If they explicitly navigate to /en/..., let them through
  if (pathnameHasLocale) return;

  // Redirect all non-locale paths (like /login) to the strict default (/de/login)
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
