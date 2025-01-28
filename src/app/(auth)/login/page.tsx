"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

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
        setError("Invalid credentials");
        return;
      }

      router.push("/home");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
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
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F8F9FA]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Centra el logo */}
        <div className="flex items-center justify-center">
          <Image
            src="/logos/logo_orus_azul_fondo_transparente.png"
            alt="Logo ORUS"
            width={150}
            height={100}
            priority
          />
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Iniciar sesión en ORUS
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          o{" "}
          <Link
            href="https://aws.amazon.com/console/"
            className="font-medium text-[#004d9d] hover:text-[#033160]"
          >
            crea una nueva cuenta
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10 border border-[#D5DBDB]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 text-sm text-[#D13212] bg-[#FDF3F1] border border-[#FFA198] rounded-lg">
                <div className="flex">
                  <svg
                    className="h-5 w-5 text-[#D13212] mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Nombre de usuario o correo electrónico
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-4 py-2.5 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#E8F3FB] focus:border-[#004d9d] focus:outline-none sm:text-sm transition-colors"
                  placeholder="username@altipal.com.co"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Contraseña
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full px-4 py-2.5 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#E8F3FB] focus:border-[#004d9d] focus:outline-none sm:text-sm pr-12 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#004d9d] focus:ring-[#E8F3FB] border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Mantenme conectado
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-[#004d9d] hover:text-[#033160]"
                >
                  Olvide mi cuenta
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004d9d] hover:bg-[#7eb4ef] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004d9d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  O continuar con
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full inline-flex justify-center items-center gap-3 py-2.5 px-4 border border-[#D5DBDB] rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004d9d] transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>
                Iniciar con Google
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="text-xs text-gray-600">
          <Link href="#" className="hover:underline">
            Información
          </Link>
          {" • "}
          <Link href="#" className="hover:underline">
            Sitio web
          </Link>
          {" • "}
          <Link href="#" className="hover:underline">
            Mesa de ayuda
          </Link>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          ©{new Date().getFullYear()} , Altipal SAS. Todos los derechos
          reservados.
        </div>
      </div>
    </div>
  );
}
