"use client";

import { FC, useState, useEffect, useCallback, KeyboardEvent } from "react";
import Link from "next/link";
import {
  Search,
  UserCircle,
  Bell,
  HelpCircle,
  ChevronDown,
  Copy,
  LayoutGrid,
  X,
  Settings,
  Star,
  Plus,
  Shield,
  Moon,
  Sun,
  Menu,
  Rocket,
  FileText,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { NotificationsMenu } from "./NotificationsMenu";
import { SettingsMenu } from "./SettingsMenu";
import { SupportMenu } from "./SupportMenu";
import { RegionSelector } from "./RegionSelector";
import { MegaMenu } from "./MegaMenu";
import { mockSearchResults, mockNotifications } from "@/data/mockData";
import type { Tab, UserSettings } from "@/types/header";

interface SearchResult {
  id: string;
  type: "recent" | "favorite" | "result";
  category?: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

const searchCategories = [
  { id: "all", label: "Todo", icon: Search },
  { id: "recent", label: "Recientes", icon: Clock },
  { id: "services", label: "Servicios", icon: Rocket },
  { id: "docs", label: "Documentación", icon: FileText },
];

export const Header: FC = () => {
  // Estados
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    language: "es",
    theme: "system",
  });

  const { data: session } = useSession();

  // Detectar scroll para efectos visuales
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler para el shortcut de búsqueda
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        const searchInput = document.querySelector(
          ".search-input"
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown as any);
    return () => document.removeEventListener("keydown", handleKeyDown as any);
  }, []);

  // Funciones auxiliares y handlers
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setIsSearchOpen(value.length >= 2);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".user-menu")) setIsUserMenuOpen(false);
    if (!target.closest(".search-results") && !target.closest(".search-input"))
      setIsSearchOpen(false);
    if (!target.closest(".notifications-menu")) setIsNotificationsOpen(false);
    if (!target.closest(".settings-menu")) setIsSettingsOpen(false);
    if (!target.closest(".support-menu")) setIsSupportOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Manejadores de pestañas
  const addNewTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: "Nueva pestaña",
      path: "/home",
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200
      ${isScrolled ? "shadow-lg" : ""}
      bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-900 dark:to-gray-800`}
    >
      <div className="h-16 px-4">
        <div className="flex h-full items-center justify-between">
          {/* Sección Izquierda */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link
              href="/home"
              className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/logos/logo_orus_blanco_fondo_transparente.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Botón de Menú */}
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="group p-2 rounded-lg bg-white/10 hover:bg-white/20 
                transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <LayoutGrid className="h-5 w-5 text-white transition-transform duration-200 group-hover:rotate-90" />
            </button>

            {/* Barra de Búsqueda */}
            <div className="relative max-w-2xl flex-1">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Buscar en ORUS... [Alt+B]"
                  className="search-input w-full h-10 pl-10 pr-4 rounded-lg 
                    bg-white/10 border border-white/20 text-white placeholder-white/60 
                    focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 
                    transition-all duration-200 group-hover:bg-white/15"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-5 w-5 text-white/60 group-hover:text-white/80 transition-colors duration-200" />
                </div>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-5 w-5 text-white/60 hover:text-white transition-colors duration-200" />
                  </button>
                )}
              </div>

              {/* Panel de Resultados de Búsqueda */}
              {isSearchOpen && searchQuery && (
                <div className="absolute top-full left-0 mt-2 w-[800px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Header con contador de resultados */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        Resultados de búsqueda para "{searchQuery}"
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {mockSearchResults.length} resultados encontrados
                      </span>
                    </div>
                  </div>

                  {/* Categorías de búsqueda */}
                  <div className="flex items-center p-4 gap-3 border-b border-gray-200 dark:border-gray-700">
                    {searchCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSearchCategory(category.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium 
            transition-all duration-200 ${
              searchCategory === category.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50"
            }`}
                      >
                        <category.icon className="h-4 w-4" />
                        <span>{category.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-5">
                    {/* Sidebar con filtros */}
                    <div className="col-span-1 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <div className="p-4">
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          Filtros
                        </h4>
                        {/* Aquí puedes agregar tus filtros */}
                      </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="col-span-4">
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Sección de resultados recientes */}
                        <div className="p-4">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                            Búsquedas recientes
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {mockSearchResults.slice(0, 4).map((result) => (
                              <div
                                key={`recent-${result.id}`}
                                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-200 cursor-pointer"
                              >
                                <div
                                  className={`${result.color} p-3 rounded-lg group-hover:scale-105 transition-transform duration-200`}
                                >
                                  {result.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    {result.name}
                                  </h3>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Visitado recientemente
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Resultados de búsqueda */}
                        <div className="p-4">
                          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                            Resultados principales
                          </h4>
                          <div className="space-y-2">
                            {mockSearchResults
                              .filter(
                                (result) =>
                                  result.name
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()) ||
                                  result.description
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                              )
                              .map((result) => (
                                <div
                                  key={result.id}
                                  className="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700 transition-all duration-200 cursor-pointer"
                                >
                                  <div
                                    className={`${result.color} p-4 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200`}
                                  >
                                    {result.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                      {result.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                      {result.description}
                                    </p>
                                  </div>
                                  <Star className="h-5 w-5 text-gray-400 hover:text-yellow-400 transition-colors duration-200 opacity-0 group-hover:opacity-100" />
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                      Búsqueda avanzada
                    </button>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Presiona{" "}
                      <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">
                        Enter
                      </kbd>{" "}
                      para ver todos los resultados
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sección Derecha */}
          {session?.user && (
            <div className="flex items-center space-x-6">
              {/* Notificaciones */}
              <div className="relative notifications-menu">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="group p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <div className="relative">
                    <Bell className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                    {mockNotifications.some((n) => !n.read) && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </button>
                {isNotificationsOpen && (
                  <NotificationsMenu
                    onClose={() => setIsNotificationsOpen(false)}
                  />
                )}
              </div>

              {/* Configuración */}
              <div className="relative settings-menu">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  <Settings className="h-5 w-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
                {isSettingsOpen && (
                  <SettingsMenu onClose={() => setIsSettingsOpen(false)} />
                )}
              </div>

              {/* Selector de Región */}
              <RegionSelector />

              {/* Menú de Usuario */}
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-white/20">
                    <Image
                      src={session.user.image || "/avatars/default.png"}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-white/70">
                      {session.user.email}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-white/70" />
                </button>

                {/* Menú desplegable de usuario */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Cabecera del perfil */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
                          <Image
                            src={session.user.image || "/avatars/default.png"}
                            alt="Profile"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {session.user.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menú de opciones */}
                    <div className="py-2">
                      {[
                        {
                          href: "/account",
                          text: "Gestionar mi cuenta",
                          icon: UserCircle,
                        },
                        {
                          href: "/settings/system",
                          text: "Configuración del sistema",
                          icon: Settings,
                        },
                        {
                          href: "/account/security",
                          text: "Credenciales de seguridad",
                          icon: Shield,
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <item.icon className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
                          {item.text}
                        </Link>
                      ))}
                    </div>

                    {/* Botón de cerrar sesión */}
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Ayuda */}
              <div className="relative support-menu">
                <button
                  onClick={() => setIsSupportOpen(!isSupportOpen)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                >
                  <HelpCircle className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </button>
                {isSupportOpen && (
                  <SupportMenu onClose={() => setIsSupportOpen(false)} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Pestañas */}
      <div className="h-10 px-2 bg-white/10 dark:bg-black/10 border-t border-white/10">
        <div className="flex h-full items-center space-x-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center h-8 px-4 rounded-lg cursor-pointer 
                transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
            >
              <span className="text-sm">{tab.title}</span>
              <button
                onClick={(e) => closeTab(tab.id, e)}
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <X className="h-4 w-4 hover:text-red-400" />
              </button>
            </div>
          ))}
          <button
            onClick={addNewTab}
            className="flex items-center h-8 px-4 space-x-2 text-white/70 
              hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Nueva pestaña</span>
          </button>
        </div>
      </div>

      {/* Mega Menú */}
      {isMegaMenuOpen && (
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
