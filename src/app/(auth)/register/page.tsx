"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  UserPlus,
  ArrowRight,
  Loader2,
  Mail,
  Lock,
  User,
  CreditCard,
  Phone,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  dni: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    dni: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // Validaciones
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&#@*])[A-Za-z\d$&#@*]{6,}$/;
    return passwordRegex.test(password);
  };

  const validateDNI = (dni: string) => {
    return /^\d{8}$/.test(dni);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{9,}$/;
    return phoneRegex.test(phone);
  };

  // Verificar requisitos específicos de la contraseña
  const passwordChecks = {
    minLength: (password: string) => password.length >= 6,
    hasUpperLower: (password: string) =>
      /(?=.*[a-z])(?=.*[A-Z])/.test(password),
    hasNumber: (password: string) => /\d/.test(password),
    hasSpecial: (password: string) => /[$&#@*]/.test(password),
  };

  // Validar formulario completo
  useEffect(() => {
    const isValid =
      formData.fullName.trim() !== "" &&
      validateEmail(formData.email) &&
      validateDNI(formData.dni) &&
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword &&
      validatePhone(formData.phone);

    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(formData.email)) {
      setError("Por favor, ingresa un correo electrónico válido");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("La contraseña no cumple con los requisitos mínimos");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!validateDNI(formData.dni)) {
      setError("El DNI debe tener 8 dígitos");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("Por favor, ingresa un número de teléfono válido");
      return;
    }

    setIsLoading(true);

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/login");
    } catch (err) {
      setError("Error al crear la cuenta. Por favor, intenta nuevamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
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
            <h1 className="text-4xl font-bold text-white mb-4">
              Únete a la Plataforma Líder en Gestión Empresarial
            </h1>
            <p className="text-blue-100 text-lg">
              Optimiza tus procesos y mejora la eficiencia de tu empresa con
              nuestras soluciones integrales.
            </p>
          </div>

          {/* Beneficios */}
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                title: "Gestión Centralizada",
                desc: "Todo en un solo lugar",
              },
              {
                title: "Reportes en Tiempo Real",
                desc: "Toma decisiones informadas",
              },
              {
                title: "Soporte Premium",
                desc: "Asistencia personalizada",
              },
              {
                title: "Actualizaciones Continuas",
                desc: "Mejoras constantes",
              },
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

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-blue-100 rounded-full">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Crear una cuenta
            </h2>
            <p className="text-gray-500 text-center">
              Completa tus datos para comenzar
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre Completo */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                Nombre Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full pl-10 px-3 py-2 border rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* DNI y Teléfono en grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="dni"
                  className="text-sm font-medium text-gray-700"
                >
                  Número de documento
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    value={formData.dni}
                    onChange={handleInputChange}
                    className="block w-full pl-10 px-3 py-2 border rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    maxLength={8}
                    placeholder="12345678"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full pl-10 px-3 py-2 border rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+51 999 999 999"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 px-3 py-2 border rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="nombre@empresa.com"
                  required
                />
              </div>
            </div>

            {/* Contraseñas en grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
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
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 px-3 py-2 border rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
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

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirmar
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 px-3 py-2 border rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Requisitos de contraseña */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Requisitos de la contraseña
              </h4>
              <div className="grid grid-cols-1 gap-2">
                <div
                  className={`flex items-center space-x-2 text-sm ${
                    passwordChecks.minLength(formData.password)
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {passwordChecks.minLength(formData.password) ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-gray-300" />
                  )}
                  <span>Mínimo 6 caracteres</span>
                </div>
                <div
                  className={`flex items-center space-x-2 text-sm ${
                    passwordChecks.hasUpperLower(formData.password)
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {passwordChecks.hasUpperLower(formData.password) ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-gray-300" />
                  )}
                  <span>Al menos una mayúscula y una minúscula</span>
                </div>
                <div
                  className={`flex items-center space-x-2 text-sm ${
                    passwordChecks.hasNumber(formData.password)
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {passwordChecks.hasNumber(formData.password) ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-gray-300" />
                  )}
                  <span>Al menos un número</span>
                </div>
                <div
                  className={`flex items-center space-x-2 text-sm ${
                    passwordChecks.hasSpecial(formData.password)
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {passwordChecks.hasSpecial(formData.password) ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border border-gray-300" />
                  )}
                  <span>Al menos un carácter especial ($&#@*)</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full flex items-center justify-center px-4 py-3 
                     bg-blue-600 text-white rounded-lg font-medium
                     disabled:bg-blue-300 disabled:cursor-not-allowed
                     transition-colors duration-200
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  Crear cuenta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
