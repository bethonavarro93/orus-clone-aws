// src/lib/auth.ts
import NextAuth from "next-auth";
import type { NextAuthConfig, Session, User as NextAuthUser } from "next-auth";
// import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

interface DatabaseUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// Extender el tipo User de NextAuth
interface User extends NextAuthUser {
  id: string;
  role: string;
}

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
  };
}

const users: DatabaseUser[] = [
  {
    id: "1",
    name: "Alberto Navarro Pérez",
    email: "alberto.navarro@altipal.com.co",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = users.find((u) => u.email === credentials.email);

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === "signIn" && user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
} as NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// Exportar tipos para uso en otros archivos
export type { User, ExtendedSession };