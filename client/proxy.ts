import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware proxy nhỏ dùng để bảo vệ route phía client khi dùng Next.js.
 * - Kiểm tra cookie `access_token` để xác thực người dùng.
 * - Nếu truy cập route cần xác thực (ví dụ: /carts, /orders, /profile hoặc /seller/*)
 *   mà không có token sẽ redirect về trang `/login`.
 */
export function proxy(req: NextRequest) {
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
    NextResponse.redirect(new URL("/login", req.url));
  }
  NextResponse.next();
}
