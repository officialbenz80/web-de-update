// actions/cookies.ts
"use server";

import { cookies } from "next/headers";

// export async function acceptCookies() {
//   const cookieStore = await cookies();

//   cookieStore.set("cookie_consent", "true", {
//     maxAge: 60 * 60 * 24 * 365,
//     path: "/",
//     secure: process.env.NODE_ENV === "production", // ✅ true on HTTPS
//     sameSite: "lax",
//     httpOnly: true, // good practice: no JS access needed for consent
//   });
// }


export async function acceptCookies() {
  const cookieStore = await cookies();

  cookieStore.set("cookie_consent", "true", {
    maxAge: 60 * 60 * 24 * 365, 
    path: "/",
    secure: true, 
    // sameSite: "lax", // "lax" is generally safe, but "none" requires Secure
    sameSite: "none",
    httpOnly: true,
  });
}
