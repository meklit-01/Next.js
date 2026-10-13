import { NextResponse } from "next/server";

const protectedPrefixes = [
  "/checkout",
  "/orders",
  "/order-status",
  "/kitchen",
];

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (!protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const session = request.cookies.get("session")?.value;

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/order-status/:path*",
    "/kitchen/:path*",
  ],
};
