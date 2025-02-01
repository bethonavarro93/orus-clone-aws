// src/middleware.ts
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { APP_CONFIG } from "@/config/constants";
import { isCompanyEmail, isPublicRoute } from "@/utils/auth";
import type { AppSession } from "@/types/auth";

// Definición de tipos para los detalles del log
// Esto nos permite tipar la información que vamos a registrar en los logs
type MiddlewareLogDetails = {
  pathname?: string; // Ruta actual
  session?: boolean; // Estado de la sesión
  user?: {
    // Información del usuario
    email?: string;
    role?: string;
  };
  error?: unknown; // Información de error
  [key: string]: unknown; // Permite propiedades adicionales
};

// Función para registrar logs en desarrollo
// Solo registra en modo desarrollo para evitar logs innecesarios en producción
const logMiddlewareAction = (action: string, details: MiddlewareLogDetails) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Middleware] ${action}:`, details);
  }
};

/**
 * Middleware principal de la aplicación
 * Maneja:
 * - Autenticación
 * - Redirecciones basadas en rol
 * - Protección de rutas
 * - Separación de usuarios internos/externos
 */
export async function middleware(request: NextRequest) {
  try {
    // Obtener la sesión actual y la ruta solicitada
    const session = (await auth()) as AppSession;
    const { pathname } = request.nextUrl;

    // Registrar la petición actual
    logMiddlewareAction("Request", {
      pathname,
      session: !!session,
      user: session?.user,
    });

    // Manejo de usuarios autenticados
    if (session) {
      // Redirigir usuarios autenticados fuera de páginas públicas
      // Ejemplo: Si un usuario ya está logueado, no debería ver la página de login
      if (isPublicRoute(pathname)) {
        logMiddlewareAction("Redirect from public route", {
          from: pathname,
          to: APP_CONFIG.PROTECTED_PATHS.HOME,
        });
        return NextResponse.redirect(
          new URL(APP_CONFIG.PROTECTED_PATHS.HOME, request.url)
        );
      }

      // Verificar si el usuario es interno (dominio de la empresa) o externo
      const isCompanyUser = isCompanyEmail(session.user?.email);

      // Redirigir usuarios externos al home específico para ellos
      // Si un usuario externo intenta acceder a rutas internas
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

      // Redirigir usuarios internos al home principal
      // Si un usuario interno intenta acceder al home externo
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

      // Verificación de permisos de administrador
      // Protege las rutas de admin para usuarios sin el rol adecuado
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
      // Redirigir a login si intentan acceder a rutas protegidas
      logMiddlewareAction("Unauthenticated Access", { pathname });
      const signInUrl = new URL("/login", request.url);
      // Guardar la URL original para redirigir después del login
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Si no hay redirecciones necesarias, continuar con la petición
    return NextResponse.next();
  } catch (error) {
    // Manejo de errores
    logMiddlewareAction("Error", { error });
    console.error("Middleware error:", error);
    // Redirigir a página de error en caso de fallos
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

/**
 * Configuración de rutas para el middleware
 * El matcher determina qué rutas serán procesadas por el middleware
 */
// src/middleware.ts
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logos/ (archivos de logos)
     */
    '/((?!api/auth|_next/static|_next/image|_next/data|favicon.ico|logos).*)',
  ]
};
