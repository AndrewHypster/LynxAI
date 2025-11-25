import { users, ADMIN_EMAILS } from "@/db"; // Припускаємо, що ADMIN_EMAILS доступний
import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DefaultJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

// --- ⚠️ РОЗШИРЕННЯ ТИПІВ (В ідеалі має бути у next-auth.d.ts) ---
declare module "next-auth" {
  interface User {
    role?: "admin" | "user";
  }
  interface Session extends DefaultSession {
    user: {
      role?: "admin" | "user";
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: "admin" | "user";
  }
}
// -----------------------------------------------------------------

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const currentUser = users.find(
          (user) => user.email === credentials.email
        );

        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...withoutPassword } = currentUser;

          // ⭐️ 1. ВИЗНАЧЕННЯ І ДОДАВАННЯ РОЛІ ДЛЯ CREDENTIALS ⭐️
          const role = ADMIN_EMAILS.includes(currentUser.email)
            ? "admin"
            : "user";
          console.log("✅ Authorize SUCCESS. Returning user object.",withoutPassword,
          role);
          return {
            ...withoutPassword,
            role: role, // Додаємо роль до об'єкта, що повертається
          } as User;
        }
        console.log("❌ Authorize FAILED. Returning null.");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },

  // ⭐️ 2. ДОДАВАННЯ КОЛБЕКІВ ⭐️
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        let role: "admin" | "user";

        if ((user as User).role) {
          // Використовуємо роль, встановлену у Credentials Provider
          role = (user as User).role!;
        } else {
          // Обчислюємо роль для Google Provider (де 'user.email' доступний)
          role = ADMIN_EMAILS.includes(user.email as string) ? "admin" : "user";
        }
        console.log(user, token, 15353);

        token.role = role; // Додаємо роль до токена
      }
      return token;
    },

    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as "admin" | "user"; // Передаємо роль у сесію
      }
      console.log("session, token");

      return session;
    },

    async signIn({ user }) {
      const role = ADMIN_EMAILS.includes(user.email as string)
        ? "admin"
        : "user";
      if (role === "admin") {
        return "/dashboard"; // Приклад перенаправлення адміністратора
      }
      return "/profile"; // Перенаправлення звичайного користувача
    },
  },
};
