// src/middleware.ts
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { APP_CONFIG } from "@/config/constants";
import { isCompanyEmail, isPublicRoute } from "@/utils/auth";
import type { AppSession } from "@/types/auth";

type MiddlewareLogDetails = {
  pathname?: string;
  session?: boolean;
  user?: {
    email?: string;
    role?: string;
  };
  error?: unknown;
  [key: string]: unknown;
};

const logMiddlewareAction = (action: string, details: MiddlewareLogDetails) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Middleware] ${action}:`, details);
  }
};

export async function middleware(request: NextRequest) {
  try {
    const session = (await auth()) as AppSession;
    const { pathname } = request.nextUrl;

    logMiddlewareAction("Request", {
      pathname,
      session: !!session,
      user: session?.user,
    });

    // Manejo de usuarios autenticados
    if (session) {
      // Redirigir desde rutas públicas
      if (isPublicRoute(pathname)) {
        logMiddlewareAction("Redirect from public route", {
          from: pathname,
          to: APP_CONFIG.PROTECTED_PATHS.HOME,
        });
        return NextResponse.redirect(
          new URL(APP_CONFIG.PROTECTED_PATHS.HOME, request.url)
        );
      }

      const isCompanyUser = isCompanyEmail(session.user?.email);

      // Redirigir usuarios externos
      if (
        !isCompanyUser &&
        !pathname.startsWith(APP_CONFIG.PROTECTED_PATHS.HOME_EXTERNAL)
      ) {
        logMiddlewareAction("External User Redirect", {
          email: session.user?.email,
          from: pathname,
          to: APP_CONFIG.PROTECTED_PATHS.HOME_EXTERNAL,
        });
        return NextResponse.redirect(
          new URL(APP_CONFIG.PROTECTED_PATHS.HOME_EXTERNAL, request.url)
        );
      }

      // Redirigir usuarios internos
      if (
        isCompanyUser &&
        pathname.startsWith(APP_CONFIG.PROTECTED_PATHS.HOME_EXTERNAL)
      ) {
        logMiddlewareAction("Internal User Redirect", {
          email: session.user?.email,
          from: pathname,
          to: APP_CONFIG.PROTECTED_PATHS.HOME,
        });
        return NextResponse.redirect(
          new URL(APP_CONFIG.PROTECTED_PATHS.HOME, request.url)
        );
      }

      // Verificar permisos de admin
      if (
        pathname.startsWith(APP_CONFIG.PROTECTED_PATHS.ADMIN) &&
        session.user?.role !== "admin"
      ) {
        logMiddlewareAction("Unauthorized Admin Access", {
          user: session.user,
          pathname,
        });
        return NextResponse.redirect(new URL("/forbidden", request.url));
      }
    }
    // Manejo de usuarios no autenticados
    else if (!isPublicRoute(pathname)) {
      logMiddlewareAction("Unauthenticated Access", { pathname });
      const signInUrl = new URL("/login", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  } catch (error) {
    logMiddlewareAction("Error", { error });
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|_next/data|favicon.ico|logos).*)",
  ],
};
