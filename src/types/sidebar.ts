// src/types/sidebar.ts
import { IconName } from "@/components/ui/Icon";

export interface MenuItem {
  type?: "item" | "subtitle" | "external";
  title: string;
  href?: string;
  icon?: IconName; // Ahora usa el tipo dinámico de iconos
  children?: MenuItem[];
  badge?: {
    text: string | number;
    color?: string;
  };
  dot?: boolean;
  external?: boolean;
}
