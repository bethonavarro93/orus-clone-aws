"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Handlers se mantienen igual
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales inválidas");
        return;
      }

      router.push("/home");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "Ocurrió un error inesperado"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/home" });
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Panel izquierdo decorativo */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative w-full h-full flex flex-col justify-between p-12">
          <div>
            <Image
              src="/logos/logo_letra_blanco.png"
              alt="Logo ORUS"
              width={250}
              height={40}
              className="mb-12"
              priority
            />
            <h1 className="text-4xl font-bold text-white mb-4">
              Bienvenido a nuestra super app de gestión empresarial ORUS
            </h1>
            <p className="text-blue-100 text-lg">
              Accede a todas las herramientas y aplicativos desde un solo lugar
            </p>
          </div>

          {/* Características destacadas */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                title: "Gestión Integral",
                desc: "Control total de tu negocio",
              },
              {
                title: "Reportes en tiempo real",
                desc: "Datos actualizados al instante",
              },
              {
                title: "Seguridad Avanzada",
                desc: "Protección de datos garantizada",
              },
              { title: "Soporte 24/7", desc: "Asistencia cuando la necesites" },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho con formulario */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo versión móvil */}
          <div className="lg:hidden flex justify-center mb-8">
            <Image
              src="/logos/logo_orus_azul_fondo_transparente.png"
              alt="Logo ORUS"
              width={120}
              height={40}
              priority
            />
          </div>

          {/* Contenedor del formulario */}
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-200">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Iniciar sesión
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo electrónico
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-4 py-3 pl-11 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm"
                    placeholder="nombre@empresa.com"
                  />
                  <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Campo de contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="block w-full px-4 py-3 pl-11 pr-11 text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors sm:text-sm"
                    placeholder="••••••••"
                  />
                  <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Opciones adicionales */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500/20 border-gray-300 rounded cursor-pointer transition-colors"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"
                  >
                    Recordarme
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botones de acción */}
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Image
                    src="/logos/google.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Continuar con Google
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <Link
                href="#"
                className="hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                Información
              </Link>
              <Link href="#" className="hover:text-gray-700 transition-colors">
                Centro de ayuda
              </Link>
              <Link href="#" className="hover:text-gray-700 transition-colors">
                Sitio web
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              © {new Date().getFullYear()} ORUS. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
