import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token");
  const needAuthenticationRoutes: Array<string> = [
    "/carts",
    "/orders",
    "/profile",
  ];

  const isProtected =
    pathname.startsWith("/seller") ||
    needAuthenticationRoutes.includes("/" + pathname.split("/")[0]);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
