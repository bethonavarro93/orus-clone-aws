// src/data/menuData.ts
import { MenuSection } from "@/types/megaMenu";

export const quickAccessSection: MenuSection = {
  id: "quick-access",
  title: "ACCESOS RÁPIDOS",
  items: [
    {
      id: "recent",
      title: "Visitados recientemente",
      href: "/recent",
      icon: "clock",
      hasSubmenu: true,
    },
    {
      id: "favorites",
      title: "Favoritos",
      href: "/favorites",
      icon: "bookmark",
      hasSubmenu: true,
    },
  ],
};

export const mainMenuSections: MenuSection[] = [
  {
    id: "cloud-management",
    title: "GESTIÓN EN LA NUBE",
    items: [
      {
        id: "billing",
        title: "Administración de facturación y costos",
        href: "/billing",
        icon: "barChart3",
        description:
          "Vea y pague facturas, analice y controle sus gastos y optimice sus costos",
        isFavorite: true,
      },
      {
        id: "iam",
        title: "IAM",
        href: "/iam",
        icon: "shield",
        description: "Administrar el acceso a los recursos de AWS",
        isFavorite: true,
        hasSubmenu: true,
        children: [
          {
            id: "users",
            title: "Usuarios",
            href: "/iam/users",
            parentId: "iam",
          },
          {
            id: "roles",
            title: "Roles",
            href: "/iam/roles",
            parentId: "iam",
          },
          {
            id: "policies",
            title: "Políticas",
            href: "/iam/policies",
            parentId: "iam",
          },
        ],
      },
    ],
  },
  {
    id: "compute",
    title: "CÓMPUTO",
    items: [
      {
        id: "ec2",
        title: "EC2",
        href: "/ec2",
        icon: "server",
        description: "Servidores virtuales en la nube",
        hasSubmenu: true,
        children: [
          {
            id: "instances",
            title: "Instancias",
            href: "/ec2/instances",
            parentId: "ec2",
          },
          {
            id: "volumes",
            title: "Volúmenes",
            href: "/ec2/volumes",
            parentId: "ec2",
          },
        ],
      },
      {
        id: "lambda",
        title: "Lambda",
        href: "/lambda",
        icon: "zap",
        description: "Execute código sin tener que pensar en los servidores",
        isFavorite: true,
      },
    ],
  },
  {
    id: "databases",
    title: "BASES DE DATOS",
    items: [
      {
        id: "dynamodb",
        title: "DynamoDB",
        href: "/dynamodb",
        icon: "database",
        description: "Base de datos NoSQL administrada",
        isFavorite: true,
      },
      {
        id: "rds",
        title: "RDS",
        href: "/rds",
        icon: "database",
        description: "Servicio de bases de datos relacionales administrado",
        isFavorite: true,
        hasSubmenu: true,
        children: [
          {
            id: "instances",
            title: "Instancias",
            href: "/rds/instances",
            parentId: "rds",
          },
          {
            id: "backups",
            title: "Backups",
            href: "/rds/backups",
            parentId: "rds",
          },
        ],
      },
    ],
  },
  // ... resto de las secciones
];
