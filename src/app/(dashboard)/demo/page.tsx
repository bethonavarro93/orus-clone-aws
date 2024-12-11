// src/app/(dashboard)/demo/page.tsx
import { Sidebar } from "@/components/ui/Sidebar";
import type { MenuItem } from "@/types/sidebar";

const demoMenuItems: MenuItem[] = [
  // Elemento básico con icono
  {
    title: "Inicio",
    href: "/demo",
    icon: "home",
  },

  // Subtítulo de sección
  {
    type: "subtitle",
    title: "ANÁLISIS & REPORTES",
  },

  // Elemento con badge
  {
    title: "Dashboard",
    href: "/demo/dashboard",
    icon: "layoutDashboard",
    badge: {
      text: "Nuevo",
      color: "bg-green-500",
    },
  },

  // Elemento con submenu y badge
  {
    title: "Reportes",
    href: "/demo/reports",
    icon: "barChart3",
    badge: {
      text: 3,
      color: "bg-[#ec7211]",
    },
    children: [
      {
        title: "Ventas Diarias",
        href: "/demo/reports/daily",
        icon: "barChart3",
        badge: {
          text: "Live",
          color: "bg-red-500",
        },
      },
      // Submenu con items usando dots
      {
        title: "Análisis",
        href: "/demo/reports/analysis",
        icon: "fileText",
        children: [
          {
            title: "Por Producto",
            href: "/demo/reports/analysis/product",
            dot: true,
          },
          {
            title: "Por Región",
            href: "/demo/reports/analysis/region",
            dot: true,
          },
          {
            title: "Por Cliente",
            href: "/demo/reports/analysis/customer",
            dot: true,
          },
        ],
      },
    ],
  },

  // Nueva sección
  {
    type: "subtitle",
    title: "GESTIÓN DE DATOS",
  },

  // Menú complejo con múltiples niveles
  {
    title: "Base de datos",
    href: "/demo/database",
    icon: "database",
    children: [
      {
        title: "Tablas",
        href: "/demo/database/tables",
        icon: "database",
        children: [
          {
            title: "Estructura",
            href: "/demo/database/tables/structure",
            icon: "gitBranch",
          },
          {
            title: "Consultas",
            href: "/demo/database/tables/queries",
            icon: "terminal",
            badge: {
              text: "Beta",
              color: "bg-purple-500",
            },
          },
          // Submenú de tercer nivel
          {
            title: "Optimización",
            href: "/demo/database/tables/optimization",
            icon: "settings",
            children: [
              {
                title: "Índices",
                href: "/demo/database/tables/optimization/indexes",
                dot: true,
              },
              {
                title: "Caché",
                href: "/demo/database/tables/optimization/cache",
                dot: true,
                badge: {
                  text: "New",
                  color: "bg-blue-500",
                },
              },
            ],
          },
        ],
      },
      {
        title: "Backups",
        href: "/demo/database/backups",
        icon: "hardDrive",
        badge: {
          text: "2",
          color: "bg-yellow-500",
        },
      },
    ],
  },

  // Nueva sección administrativa
  {
    type: "subtitle",
    title: "ADMINISTRACIÓN",
  },

  // Menú con submenu simple
  {
    title: "Usuarios",
    href: "/demo/users",
    icon: "users",
    badge: {
      text: "99+",
      color: "bg-red-500",
    },
    children: [
      {
        title: "Listado",
        href: "/demo/users/list",
        icon: "users",
      },
      {
        title: "Roles",
        href: "/demo/users/roles",
        icon: "shield",
      },
      {
        title: "Permisos",
        href: "/demo/users/permissions",
        icon: "key",
      },
    ],
  },

  // Elemento simple con icono
  {
    title: "Configuración",
    href: "/demo/settings",
    icon: "settings",
  },

  // Sección de ayuda
  {
    type: "subtitle",
    title: "AYUDA & SOPORTE",
  },

  // Enlaces externos
  {
    title: "Documentación",
    type: "external",
    href: "https://docs.example.com",
    icon: "bookOpen",
    external: true,
    badge: {
      text: "v2.0",
      color: "bg-blue-500",
    },
  },
  {
    title: "Soporte",
    type: "external",
    href: "https://support.example.com",
    icon: "externalLink",
    external: true,
    badge: {
      text: "24/7",
      color: "bg-green-500",
    },
  },
];

export default function DemoPage() {
  return (
    <div className="flex h-[calc(100vh-72px)]">
      <Sidebar menuItems={demoMenuItems} />
      <div className="flex-1 p-6 bg-[#1b2532]">
        <div className="bg-[#232f3e] rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-white mb-4">Demo Page</h1>
          <p className="text-gray-300">
            Esta página demuestra todas las variantes posibles del menú lateral:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
            <li>Menús simples con iconos</li>
            <li>Menús con badges</li>
            <li>Submenús multinivel</li>
            <li>Enlaces externos</li>
            <li>Secciones con subtítulos</li>
            <li>Items con indicadores de punto</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
