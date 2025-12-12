import { users, ADMIN_EMAILS } from "@/db"; // Припускаємо, що ADMIN_EMAILS доступний
import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DefaultJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

// --- ⚠️ РОЗШИРЕННЯ ТИПІВ (В ідеалі має бути у next-auth.d.ts) ---
declare module "next-auth" {
  interface User {
    id: string;
    role?: "admin" | "user";
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: "admin" | "user";
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
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
          // ⭐️ 1. ВИЗНАЧЕННЯ І ДОДАВАННЯ РОЛІ ДЛЯ CREDENTIALS ⭐️
          const role = ADMIN_EMAILS.includes(currentUser.email)
            ? "admin"
            : "user";
          console.log(
            "✅ Authorize SUCCESS. Returning user object.",
            currentUser,
            role
          );

          return {
            id: String(currentUser.id),
            name: currentUser.name,
            email: currentUser.email,
            role: ADMIN_EMAILS.includes(currentUser.email) ? "admin" : "user",
          };
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
        token.id = user.id || ""; // якщо є id
        token.name = user.name;
        token.email = user.email;

        // ⭐️ визначаємо роль для Google
        token.role =
          user.role ||
          (user.email && ADMIN_EMAILS.includes(user.email) ? "admin" : "user");
      }
      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};
