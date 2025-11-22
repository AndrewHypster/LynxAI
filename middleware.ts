import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // 1. Отримання токена
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // ----------------------------------------------------
  // ⭐️ ЧАСТИНА 1: Перевірка Неавторизованих Користувачів ⭐️
  // ----------------------------------------------------

  const protectedRoutes = ["/dashboard", "/profile", "/settings", "/orders"];

  if (!token) {
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      // Перенаправлення на сторінку входу /sign-in (як у вашій конфігурації)
      const loginUrl = new URL("/sign-in", req.url); // ⬅️ ВИКОРИСТОВУЙТЕ /sign-in
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // --------------------------------------------------
  // ⭐️ ЧАСТИНА 2: Перевірка Ролі для /dashboard ⭐️
  // --------------------------------------------------

  // Якщо токен існує, перевіряємо, чи маршрут — це /dashboard
  if (token && pathname.startsWith("/dashboard")) {
    const userRole = token.role; // Властивість 'role' має бути в токені завдяки колбекам

    if (userRole !== "admin") {
      // Якщо користувач авторизований, але не адміністратор,
      // перенаправляємо його на його особистий розділ, наприклад, /profile.
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  if (token && pathname.startsWith("/profile")) {
    const userRole = token.role; // Властивість 'role' має бути в токені завдяки колбекам

    if (userRole === "admin") {
      // Якщо користувач авторизований, але не адміністратор,
      // перенаправляємо його на його особистий розділ, наприклад, /profile.
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Якщо всі перевірки пройдені, дозволяємо доступ
  return NextResponse.next();
}

// Вказуємо, які маршрути потрібно перехоплювати для перевірки
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/orders/:path*",
  ],
};
