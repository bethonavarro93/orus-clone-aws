import { FC } from "react";
import { AlertCircle, Calendar, Bell } from "lucide-react";

interface NotificationsMenuProps {
  onClose: () => void;
}

export const NotificationsMenu: FC<NotificationsMenuProps> = ({ onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-[600px] bg-white dark:bg-[#1b2532] border border-gray-200 dark:border-gray-700 shadow-lg rounded-md z-50 transition-colors duration-200">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          Notificaciones
        </h3>
        <a 
          href="#" 
          className="text-[#004d9d] dark:text-[#004d9d] text-sm hover:underline transition-colors duration-200"
        >
          Ver todas las notificaciones
        </a>
      </div>

      <div className="p-6 text-center">
        <h3 className="text-lg mb-2 text-gray-900 dark:text-white">
          Le damos la bienvenida al centro de notificaciones de ORUS
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Una ubicación central para sus notificaciones de ORUS. Las notificaciones se pueden enviar por correo
          electrónico, dispositivos móviles y canales de chat.
        </p>
        <button className="bg-[#004d9d] dark:bg-[#004d9d] text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-[#004d9d]/90 transition-colors duration-200">
          Comience a usar User Notifications
        </button>
      </div>

      {/* <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h3 className="text-sm font-medium mb-4 text-gray-900 dark:text-white">
            Eventos de estado
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-700 dark:text-gray-300">
                0 Problemas abiertos
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">
                0 Cambios programados
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Bell className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                0 Otras notificaciones
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};