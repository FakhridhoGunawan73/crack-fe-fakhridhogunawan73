import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  console.log("PROXY ROOT JALAN:", request.nextUrl.pathname);

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/profile/:path*"],
};