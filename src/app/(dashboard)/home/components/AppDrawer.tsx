// src/app/(dashboard)/home/components/AppDrawer.tsx
import { Icon } from "@/components/ui/Icon";

const apps = [
  { icon: 'mail', name: 'Email', color: 'bg-blue-600' },
  { icon: 'calendar', name: 'Calendario', color: 'bg-purple-600' },
  { icon: 'fileText', name: 'Docs', color: 'bg-green-600' },
  { icon: 'messageSquare', name: 'Chat', color: 'bg-pink-600' },
  { icon: 'briefcase', name: 'CRM', color: 'bg-yellow-600' },
  { icon: 'barChart2', name: 'Analytics', color: 'bg-red-600' },
  { icon: 'folder', name: 'Drive', color: 'bg-indigo-600' },
  { icon: 'users', name: 'Teams', color: 'bg-teal-600' },
  { icon: 'settings', name: 'Admin', color: 'bg-gray-600' },
];

export function AppDrawer() {
  return (
    <div className="bg-[#232f3e] rounded-lg shadow p-4">
      <h2 className="text-white font-medium mb-4">Cajón de Aplicaciones</h2>
      <div className="grid grid-cols-3 gap-4">
        {apps.map((app, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-[#2a3f59] transition-colors"
          >
            <div className={`${app.color} p-3 rounded-lg mb-2`}>
              <Icon name={app.icon} className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-gray-400">{app.name}</span>
          </button>
        ))}
      </div>
      <button className="mt-4 w-full py-2 text-[#0073bb] hover:text-[#ec7211] text-sm transition-colors">
        Ver todas las aplicaciones
      </button>
    </div>
  );
}