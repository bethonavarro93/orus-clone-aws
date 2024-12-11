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
    <div className="absolute right-0 mt-2 w-80 bg-[#1b2532] border border-gray-700 shadow-lg rounded-md z-50">
      <div className="p-4">
        <h3 className="text-sm font-medium mb-4">Soporte</h3>
        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#2a3f59] rounded"
          >
            <MessageSquare className="h-5 w-5 text-gray-400" />
            <div>
              <div className="text-sm">Centro de soporte</div>
              <div className="text-xs text-gray-400">Obtener ayuda con AWS</div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#2a3f59] rounded"
          >
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <div className="text-sm">Soporte técnico</div>
              <div className="text-xs text-gray-400">
                Abrir un caso de soporte
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#2a3f59] rounded"
          >
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <div className="text-sm">Documentación</div>
              <div className="text-xs text-gray-400">
                Guías y documentación de API
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#2a3f59] rounded"
          >
            <Book className="h-5 w-5 text-gray-400" />
            <div>
              <div className="text-sm">Knowledge Center</div>
              <div className="text-xs text-gray-400">Artículos y recursos</div>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-2 hover:bg-[#2a3f59] rounded"
          >
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <div className="text-sm">AWS re:Post</div>
              <div className="text-xs text-gray-400">
                Preguntas y respuestas
                <ExternalLink className="inline h-3 w-3 ml-1" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
