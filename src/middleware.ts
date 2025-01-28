// src/middleware.ts
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Lista de rutas públicas
  const publicRoutes = ["/login", "/register", "/forgot-password"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Si está autenticado y trata de acceder a rutas públicas
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Si no está autenticado y trata de acceder a rutas protegidas
  if (!session && !isPublicRoute) {
    const signInUrl = new URL("/login", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Verificar permisos de admin
  if (pathname.startsWith("/admin") && session?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  // Siempre devolver NextResponse.next() en lugar de null
  return NextResponse.next();
}

// Configurar las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logos/).*)",
  ],
};
