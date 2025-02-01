// src/lib/auth.ts
import NextAuth from "next-auth";
import type {
  NextAuthConfig,
  Session,
  User as NextAuthUser,
  JWT,
} from "next-auth";
import type { AdapterSession } from "@auth/core/adapters";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

interface DatabaseUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

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
    password: "$1993Betho.",
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

// 3 minutos en segundos para pruebas
const SESSION_MAXAGE = 3 * 60;
const JWT_MAXAGE = SESSION_MAXAGE;

export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
        token.id = user.id || token.sub;
        token.role = user.role || "user";

        // Añadir tiempo de expiración al token
        const now = Math.floor(Date.now() / 1000);
        token.iat = now;
        token.exp = now + JWT_MAXAGE;
      }
      return token;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: (token.role as string) || "user",
        },
        expires: new Date(Date.now() + SESSION_MAXAGE * 1000).toISOString(),
      };
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAXAGE,
  },
  jwt: {
    maxAge: JWT_MAXAGE,
  },
  events: {
    signOut(_params: { session: AdapterSession | null }) {
      console.log("User signed out" + _params);
    },
    // Esta es una función personalizada, no un evento real de NextAuth
    async sessionExpired() {
      console.log("Session expired");
    },
  },
} as NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

export type { User, ExtendedSession };
