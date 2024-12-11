import { FC } from "react";

interface SettingsMenuProps {
  onClose: () => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-[#1b2532] border border-gray-700 shadow-lg rounded-md z-50">
      <div className="p-4">
        <h3 className="text-sm font-medium mb-4">
          Configuración actual del usuario
        </h3>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="text-sm text-gray-300 block mb-2">Idioma</label>
          <select className="w-full bg-[#232f3e] text-white border border-gray-700 rounded px-3 py-2 text-sm">
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Theme Selector */}
        <div>
          <label className="text-sm text-gray-300 block mb-2">Tema</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="light"
                className="text-[#0073bb]"
              />
              <span className="text-sm">Claro</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="dark"
                className="text-[#0073bb]"
                defaultChecked
              />
              <span className="text-sm">Oscuro</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="theme"
                value="system"
                className="text-[#0073bb]"
              />
              <span className="text-sm">Predeterminado por el sistema</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
