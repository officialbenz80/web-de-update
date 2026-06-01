"use server";

import { cookies } from "next/headers";

export async function acceptCookies() {
  // Always await cookies() in Next.js 15+
  const cookieStore = await cookies();

  cookieStore.set("cookie_consent", "true", {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
    // Set to true in production for HTTPS only
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
