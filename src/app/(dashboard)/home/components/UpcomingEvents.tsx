// src/app/(dashboard)/home/components/UpcomingEvents.tsx
import { Icon } from "@/components/ui/Icon";

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  type: 'meeting' | 'training' | 'deadline' | 'event';
  description: string;
  participants?: number;
}

const events: UpcomingEvent[] = [
  {
    id: "1",
    title: "Reunión Trimestral Q4",
    date: "28 Oct, 2024 - 10:00 AM",
    type: "meeting",
    description: "Revisión de objetivos y planificación estratégica",
    participants: 45,
  },
  {
    id: "2",
    title: "Capacitación: AWS Cloud",
    date: "15 Nov, 2024 - 2:00 PM",
    type: "training",
    description: "Sesión de formación sobre servicios cloud",
    participants: 20,
  },
];

const eventTypeIcons = {
  meeting: 'users',
  training: 'bookOpen',
  deadline: 'clock',
  event: 'calendar',
} as const;

const eventTypeColors = {
  meeting: 'bg-blue-600',
  training: 'bg-green-600',
  deadline: 'bg-red-600',
  event: 'bg-purple-600',
} as const;

export function UpcomingEvents() {
  return (
    <div className="bg-[#232f3e] rounded-lg shadow p-4">
      <h2 className="text-white font-medium mb-4">Próximos Eventos</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 bg-[#2a3f59] rounded-lg hover:bg-[#35495e] transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className={`${eventTypeColors[event.type]} p-2 rounded-lg`}>
                <Icon
                  name={eventTypeIcons[event.type]}
                  className="h-5 w-5 text-white"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{event.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{event.date}</p>
                <p className="text-sm text-gray-300 mt-2">
                  {event.description}
                </p>
                {event.participants && (
                  <div className="flex items-center space-x-1 mt-2 text-gray-400">
                    <Icon name="users" className="h-4 w-4" />
                    <span className="text-xs">{event.participants} participantes</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full py-2 text-[#0073bb] hover:text-[#ec7211] text-sm transition-colors">
        Ver todos los eventos
      </button>
    </div>
  );
}