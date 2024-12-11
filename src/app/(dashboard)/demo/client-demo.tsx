// src/app/(dashboard)/home/client-home.tsx
"use client";

import { clsx } from "clsx";
import { useState } from "react";

export default function ClientSideHome({ session }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-full">
        <header className="bg-[#232f3e] text-white flex items-center p-4">
          <button
            onClick={toggleMenu}
            className="p-2 rounded focus:outline-none focus:ring focus:ring-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="ml-4 text-lg font-bold">Dashboard</h1>
        </header>
        <div className="flex h-full">
          <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold">Welcome {session.user?.name}</h1>
            <p>Role: {session.user?.role}</p>
          </main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, toggleMenu }) {
  return (
    <aside
      className={clsx(
        "bg-[#232f3e] text-white transition-all duration-300 h-full",
        {
          hidden: !isOpen,
          "w-64": isOpen,
        }
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <h2 className="text-lg font-semibold">
          Administración de facturación y costos
        </h2>
        <button
          onClick={toggleMenu}
          className="p-2 rounded focus:outline-none focus:ring focus:ring-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li className="p-2 hover:bg-gray-700">Inicio</li>
          <li className="p-2 hover:bg-gray-700">Introducción</li>
          <li className="p-2 hover:bg-gray-700">Facturación y pagos</li>
          <li className="p-2 hover:bg-gray-700">Cost Explorer</li>
          <li className="p-2 hover:bg-gray-700">
            Presupuestos y planificación
          </li>
        </ul>
      </nav>
    </aside>
  );
}
