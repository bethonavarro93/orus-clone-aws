// src/app/(dashboard)/home/components/ProfileCard.tsx
"use client";

import { Icon } from "@/components/ui/Icon";
import Image from "next/image";
import { useSession } from "next-auth/react";

export function ProfileCard() {
  const { data: session } = useSession();
  const defaultUser = {
    name: "Usuario",
    role: "Invitado",
    team: "Sin equipo",
    image: "/avatars/default.png"
  };

  return (
    <div className="bg-[#232f3e] rounded-lg shadow p-4">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <Image
            src={session?.user?.image || defaultUser.image}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full border-4 border-[#2a3f59]"
          />
          <div className="absolute bottom-0 right-0 bg-green-500 h-4 w-4 rounded-full border-2 border-[#232f3e]" />
        </div>
        <h2 className="mt-4 text-white font-medium">
          {session?.user?.name || defaultUser.name}
        </h2>
        <p className="text-gray-400 text-sm">{defaultUser.role}</p>
        <p className="text-[#ec7211] text-sm mt-1">{defaultUser.team}</p>
        
        <div className="grid grid-cols-3 gap-4 w-full mt-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <p className="text-white font-medium">128</p>
            <p className="text-xs text-gray-400">Conexiones</p>
          </div>
          <div className="text-center">
            <p className="text-white font-medium">12</p>
            <p className="text-xs text-gray-400">Proyectos</p>
          </div>
          <div className="text-center">
            <p className="text-white font-medium">4.8</p>
            <p className="text-xs text-gray-400">Rating</p>
          </div>
        </div>

        <button className="mt-4 w-full py-2 bg-[#2a3f59] text-white rounded-lg hover:bg-[#35495e] transition-colors">
          Ver perfil
        </button>
      </div>
    </div>
  );
}