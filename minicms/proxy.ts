import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((request) => {
  if (request.auth) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/login", request.nextUrl.origin);
  const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  signInUrl.searchParams.set("callbackUrl", callbackUrl);

  return NextResponse.redirect(signInUrl);
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
