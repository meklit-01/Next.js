import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session");

  if (!session) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "next",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/orders"],
};