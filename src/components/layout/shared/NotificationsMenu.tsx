import { FC } from "react";
import { AlertCircle, Calendar, Bell } from "lucide-react";

interface NotificationsMenuProps {
  onClose: () => void;
}

export const NotificationsMenu: FC<NotificationsMenuProps> = ({ onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-[600px] bg-[#1b2532] border border-gray-700 shadow-lg rounded-md z-50">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Notificaciones</h2>
        <a href="#" className="text-[#0073bb] text-sm">
          Ver todas las notificaciones
        </a>
      </div>

      <div className="p-6 text-center">
        <h3 className="text-lg mb-2">
          Le damos la bienvenida a AWS User Notifications
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Una ubicación central para sus notificaciones de AWS en la Consola de
          administración de AWS. Las notificaciones se pueden enviar por correo
          electrónico, dispositivos móviles y canales de chat.
        </p>
        <button className="bg-[#0073bb] text-white px-4 py-2 rounded hover:bg-[#0073bb]/90">
          Comience a usar User Notifications
        </button>
      </div>

      <div className="border-t border-gray-700">
        <div className="p-4">
          <h3 className="text-sm font-medium mb-4">Eventos de estado</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <span>0 Problemas abiertos</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>0 Cambios programados</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Bell className="h-4 w-4 text-gray-400" />
              <span>0 Otras notificaciones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
