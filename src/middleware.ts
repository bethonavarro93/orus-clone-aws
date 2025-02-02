// src/middleware.ts
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { APP_CONFIG } from "@/config/constants";
import { isCompanyEmail, isPublicRoute } from "@/utils/auth";
import type { Session } from "next-auth";

// Extendemos el tipo Session para nuestro caso específico
interface ExtendedSession extends Session {
  user: {
    id: string;
    dni: string;
    email: string;
    nombre_completo: string;
    cargo?: string; // Usaremos esto en lugar de role
    // ... otros campos que necesites
  } & Session["user"];
}

type MiddlewareLogDetails = {
  pathname?: string;
  session?: boolean;
  user?: {
    email?: string;
    cargo?: string; // Cambiamos role por cargo
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
    const session = (await auth()) as ExtendedSession;
    const { pathname } = request.nextUrl;

    logMiddlewareAction("Request", {
      pathname,
      session: !!session,
      user: {
        email: session?.user?.email,
        cargo: session?.user?.cargo,
      },
    });

    // Manejo de usuarios autenticados
    if (session?.user) {
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

      const isCompanyUser = isCompanyEmail(session.user.email);

      // Redirigir usuarios externos
      if (
        !isCompanyUser &&
        !pathname.startsWith(APP_CONFIG.PROTECTED_PATHS.HOME_EXTERNAL)
      ) {
        logMiddlewareAction("External User Redirect", {
          email: session.user.email,
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
          email: session.user.email,
          from: pathname,
          to: APP_CONFIG.PROTECTED_PATHS.HOME,
        });
        return NextResponse.redirect(
          new URL(APP_CONFIG.PROTECTED_PATHS.HOME, request.url)
        );
      }

      // Verificar permisos de admin (usando cargo en lugar de role)
      if (
        pathname.startsWith(APP_CONFIG.PROTECTED_PATHS.ADMIN) &&
        session.user.cargo?.toLowerCase() !== "admin"
      ) {
        logMiddlewareAction("Unauthorized Admin Access", {
          user: {
            email: session.user.email,
            cargo: session.user.cargo,
          },
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
