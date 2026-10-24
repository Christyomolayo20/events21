import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Canonical domain redirect: ensure www.events21.ng redirects to https://events21.ng
  if (host.startsWith("www.events21.ng")) {
    const url = request.nextUrl.clone();
    url.host = "events21.ng";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, images, and favicon
     */
    "/((?!_next/static|_next/image|images|favicon.ico).*)",
  ],
};
