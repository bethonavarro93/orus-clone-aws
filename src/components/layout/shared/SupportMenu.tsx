import { FC } from "react";
import {
  MessageSquare,
  Phone,
  FileText,
  Book,
  Users,
  ExternalLink,
} from "lucide-react";

interface SupportMenuProps {
  onClose: () => void;
}

export const SupportMenu: FC<SupportMenuProps> = ({ onClose }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#1b2532] border border-gray-200 dark:border-gray-700 shadow-lg rounded-md z-50">
      <div className="p-4">
        <h3 className="text-sm font-bold mb-4 text-gray-900 dark:text-white">Soporte</h3>
        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#e1e2e4] dark:hover:bg-[#2a3f59] rounded transition-colors duration-200"
          >
            <MessageSquare className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <div className="text-sm text-gray-900 dark:text-white">Centro de soporte</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Chat en vivo y tickets
              </div>
            </div>
          </a>
          
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#e1e2e4] dark:hover:bg-[#2a3f59] rounded transition-colors duration-200"
          >
            <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <div className="text-sm text-gray-900 dark:text-white">Soporte técnico</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Línea de soporte técnico
              </div>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#e1e2e4] dark:hover:bg-[#2a3f59] rounded transition-colors duration-200"
          >
            <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <div className="text-sm text-gray-900 dark:text-white">Documentación</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Guías y documentación
              </div>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#e1e2e4] dark:hover:bg-[#2a3f59] rounded transition-colors duration-200"
          >
            <Book className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <div className="text-sm text-gray-900 dark:text-white">
                Base de conocimiento
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Artículos y recursos</div>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#e1e2e4] dark:hover:bg-[#2a3f59] rounded transition-colors duration-200"
          >
            <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <div className="text-sm text-gray-900 dark:text-white">
                Crear un caso en Salesforce
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                Crear un caso en Salesforce
                <ExternalLink className="inline h-3 w-3 ml-1" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};