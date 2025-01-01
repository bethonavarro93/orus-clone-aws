// src/app/(dashboard)/home/components/QuickAccess.tsx
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";

interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

const quickAccessItems: QuickAccessItem[] = [
  {
    id: "1",
    title: "Recursos Humanos",
    description: "Gestión de personal, solicitudes y beneficios",
    icon: "users",
    href: "/hr",
  },
  {
    id: "2",
    title: "Base de Conocimiento",
    description: "Documentación, guías y procedimientos",
    icon: "bookOpen",
    href: "/knowledge",
  },
  {
    id: "3",
    title: "Service Desk",
    description: "Soporte técnico y tickets",
    icon: "helpCircle",
    href: "/helpdesk",
  },
  {
    id: "4",
    title: "Directorio",
    description: "Contactos de empleados y departamentos",
    icon: "contact",
    href: "/directory",
  },
];

export function QuickAccess() {
  return (
    <div className="bg-[#232f3e] rounded-lg shadow p-4">
      <h2 className="text-white font-medium mb-4">Accesos Rápidos</h2>
      <div className="grid gap-4">
        {quickAccessItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="block p-4 bg-[#2a3f59] rounded-lg hover:bg-[#35495e] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Icon name={item.icon} className="h-6 w-6 text-[#ec7211]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}