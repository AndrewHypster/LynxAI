import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Якщо користувач не авторизований
  if (!token) {
    // Список закритих маршрутів
    const protectedRoutes = [
      "/admin",
      "/dashboard",
      "/profile",
      "/settings",
      "/orders",
    ];

    // Перевіряємо, чи шлях співпадає з будь-яким із заборонених
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      const loginUrl = new URL("/api/auth/signin", req.url);
      // Після логіну можна повернутись на цю ж сторінку
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Вказуємо, щоб middleware спрацьовував для всіх сторінок,
// але можна обмежити для певної частини сайту
export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/orders/:path*",
  ],
};
