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
  Layout,
  BarChart,
  Shield,
  HeadphonesIcon,
  UserCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
      {/* Panel lateral */}
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
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <UserCheck className="w-8 h-8 text-blue-300" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Bienvenido a nuestra super app de gestión empresarial ORUS
                  </h1>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Accede a todas las herramientas y aplicativos desde un solo
                    lugar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Características destacadas */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: Layout,
                title: "Gestión Integral",
                desc: "Control total de tu negocio",
              },
              {
                icon: BarChart,
                title: "Reportes en tiempo real",
                desc: "Datos actualizados al instante",
              },
              {
                icon: Shield,
                title: "Seguridad Avanzada",
                desc: "Protección de datos garantizada",
              },
              {
                icon: HeadphonesIcon,
                title: "Soporte 24/7",
                desc: "Asistencia cuando la necesites",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="w-6 h-6 text-blue-300 mb-3" />
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {/* Logo versión móvil */}
          <div className="lg:hidden flex justify-center">
            <Image
              src="/logos/logo_orus_azul_fondo_transparente.png"
              alt="Logo ORUS"
              width={120}
              height={40}
              priority
            />
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="space-y-8">
              {/* Ilustración animada */}
              <div className="w-full flex justify-center">
                <div className="relative w-40 h-40">
                  {/* Círculo base */}
                  <div className="absolute inset-0 bg-blue-50 rounded-full" />
                  {/* Círculo animado */}
                  <div className="absolute inset-3 bg-blue-100 rounded-full animate-pulse" />
                  {/* Icono central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-lg">
                      <UserCheck className="w-10 h-10 text-blue-500" />
                    </div>
                  </div>
                  {/* Elementos decorativos */}
                  <div className="absolute top-0 right-0">
                    <Mail className="w-6 h-6 text-blue-400 animate-bounce" />
                  </div>
                  <div className="absolute bottom-0 left-0">
                    <Lock className="w-6 h-6 text-blue-400 animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Encabezado */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  Iniciar sesión
                </h2>
                <p className="text-gray-600">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full pl-10 px-3 py-3 text-gray-900 placeholder-gray-400 
                               bg-gray-50 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                               transition-all duration-200 sm:text-sm"
                      placeholder="nombre@empresa.com"
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block w-full pl-10 pr-10 px-3 py-3 text-gray-900 
                               placeholder-gray-400 bg-gray-50 border border-gray-300 
                               rounded-lg focus:ring-2 focus:ring-blue-500 
                               focus:border-blue-500 transition-all duration-200 sm:text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                               border-gray-300 rounded transition-colors"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Recordarme
                    </label>
                  </div>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 
                             transition-colors hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Botones de acción */}
                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group flex items-center justify-center px-6 py-4 
                             bg-gradient-to-r from-blue-600 to-blue-700
                             text-white rounded-lg font-medium text-lg
                             transition-all duration-200
                             hover:from-blue-700 hover:to-blue-800 
                             focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-blue-500
                             transform hover:-translate-y-0.5
                             disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Iniciando sesión...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span>Iniciar sesión</span>
                        <ArrowRight
                          className="ml-2 h-5 w-5 transition-transform 
                                           duration-200 group-hover:translate-x-1"
                        />
                      </div>
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        O continúa con
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 
                             bg-white text-gray-700 text-sm font-medium rounded-lg 
                             border border-gray-300 hover:bg-gray-50 
                             transition-all duration-200
                             focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-blue-500
                             transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
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
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <Link
                href="#"
                className="hover:text-gray-700 transition-colors flex items-center gap-1 hover:underline"
              >
                Información
              </Link>
              <Link
                href="#"
                className="hover:text-gray-700 transition-colors hover:underline"
              >
                Centro de ayuda
              </Link>
              <Link
                href="#"
                className="hover:text-gray-700 transition-colors hover:underline"
              >
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
