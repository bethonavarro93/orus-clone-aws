// src/app/(dashboard)/home/components/BirthdaysCard.tsx
import { Icon } from "@/components/ui/Icon";
import Image from "next/image";

interface Birthday {
  name: string;
  date: string;
  image: string;
}

const birthdays: Birthday[] = [
  { name: 'Carlos Ruiz', date: 'Hoy', image: '/avatars/3.png' },
  { name: 'Ana López', date: 'Mañana', image: '/avatars/4.png' },
  { name: 'Miguel Ángel', date: '23 Oct', image: '/avatars/5.png' },
];

export function BirthdaysCard() {
  return (
    <div className="bg-[#232f3e] rounded-lg shadow p-4">
      <h2 className="text-white font-medium mb-4">Cumpleaños</h2>
      <div className="space-y-4">
        {birthdays.map((birthday, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Image
              src={birthday.image}
              alt={birthday.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-white text-sm">{birthday.name}</p>
              <p className="text-xs text-gray-400">{birthday.date}</p>
            </div>
            <button className="ml-auto text-[#0073bb] hover:text-[#ec7211]">
              <Icon name="gift" className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}