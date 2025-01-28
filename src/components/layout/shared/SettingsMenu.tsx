// src/components/layout/shared/SettingsMenu.tsx
'use client'

import { FC } from "react";
import { useTheme } from "@/hooks/useTheme";

interface SettingsMenuProps {
  onClose: () => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ onClose }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1b2532] border border-gray-200 dark:border-gray-700 shadow-lg rounded-md z-50">
      <div className="p-4">
        <h3 className="text-sm font-medium mb-4 text-gray-900 dark:text-white">
          Configuración actual del usuario
        </h3>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-2">Idioma</label>
          <select className="w-full bg-white dark:bg-[#232f3e] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded px-3 py-2 text-sm">
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Theme Selector */}
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-2">Tema</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={() => setTheme('light')}
                className="text-[#0073bb]"
              />
              <span className="text-sm text-gray-900 dark:text-white">Claro</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={() => setTheme('dark')}
                className="text-[#0073bb]"
              />
              <span className="text-sm text-gray-900 dark:text-white">Oscuro</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="system"
                checked={theme === 'system'}
                onChange={() => setTheme('system')}
                className="text-[#0073bb]"
              />
              <span className="text-sm text-gray-900 dark:text-white">Predeterminado por el sistema</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};