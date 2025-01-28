// src/components/layout/shared/Header.tsx (Part 1)
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

export const Header: FC = () => {
  // Estados
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    language: "es",
    theme: "dark",
  });

  const { data: session } = useSession();

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

  // src/components/layout/shared/Header.tsx (Part 2 - continuación)

  // Funciones auxiliares y handlers
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.length >= 2) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

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

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target.closest(".user-menu")) {
      setIsUserMenuOpen(false);
    }
    if (
      !target.closest(".search-results") &&
      !target.closest(".search-input")
    ) {
      setIsSearchOpen(false);
    }
    if (!target.closest(".notifications-menu")) {
      setIsNotificationsOpen(false);
    }
    if (!target.closest(".settings-menu")) {
      setIsSettingsOpen(false);
    }
    if (!target.closest(".support-menu")) {
      setIsSupportOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // JSX del componente
  return (
    <header className="bg-[#004d9d] text-white border-b border-gray-700 fixed top-0 left-0 w-full z-50 dark:bg-[#0f1b2d]">
      <div className="flex h-[45px] items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center space-x-1">
          <Link href="/home" className="flex-shrink-0 mr-3">
            <Image
              src="/logos/logo_letra_blanco.png"
              alt="AWS Logo"
              width={90}
              height={30}
            />
          </Link>

          {/* Menu Button */}
          <button
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            className="p-1.5 rounded transition-colors duration-150"
          >
            <LayoutGrid className="h-7 w-7 text-[#fff] hover:text-[#ffc26b]" />
          </button>

          {/* Search Bar with clear button */}
          <div className="relative w-[420px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar [Alt+B]"
              className="search-input w-full rounded bg-[#eef0f0] text-sm h-[30px] pl-9 pr-8 text-[#000] placeholder:text-gray-400 border-0 focus:ring-1 focus:ring-[#004d9d]"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#000]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {/* Search Results */}
            {isSearchOpen && searchQuery.length >= 2 && (
              <div className="search-results absolute top-[40px] left-[0px] w-[600px] bg-[#fff] border border-gray-700 shadow-lg rounded-md z-50">
                <div className="p-2">
                  <div className="flex justify-between items-center mb-2 px-2">
                    <span className="text-xs text-gray-500">Resultado de busqueda</span>
                    <span className="text-xs text-[#004d9d]">
                      Ver los {mockSearchResults.length} resultados
                    </span>
                  </div>
                  <div className="space-y-1">
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
                          className="flex items-center px-2 py-2 hover:bg-[#e1e2e4] rounded cursor-pointer"
                        >
                          <div
                            className={`w-8 h-8 ${result.color} rounded mr-2 flex items-center justify-center text-xs font-bold text-[#000]`}
                          >
                            {result.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-[#000]">{result.name}</div>
                            <div className="text-xs text-gray-500">
                              {result.description}
                            </div>
                          </div>
                          <Star className="h-4 w-4 text-gray-500 hover:text-[#f02929]" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
        {session?.user && (
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative notifications-menu mt-2">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="hover:text-[#ffc26b] relative"
              >
                <Bell className="h-5 w-5" />
                {mockNotifications.some((n) => !n.read) && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#f02929] rounded-full" />
                )}
              </button>
              {isNotificationsOpen && (
                <NotificationsMenu
                  onClose={() => setIsNotificationsOpen(false)}
                />
              )}
            </div>

            {/* Settings */}
            <div className="relative settings-menu mt-2">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="hover:text-[#ffc26b]"
              >
                <Settings className="h-5 w-5" />
              </button>
              {isSettingsOpen && (
                <SettingsMenu onClose={() => setIsSettingsOpen(false)} />
              )}
            </div>

            {/* CEDI Selector */}
            <RegionSelector />

            {/* User Menu */}
            <div className="relative user-menu">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 text-sm hover:text-[#ffc26b]"
              >
                <UserCircle className="h-5 w-5" />
                <span>{session.user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-4 w-72 dark:bg-[#1b2532] bg-[#fff] border border-gray-700 shadow-lg rounded-lg z-50">
                  <div className="p-4 border-b border-gray-700">
                    {/*Foto de perfil nombre y correo del usuario y el id account*/}

                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={session.user.image || "/avatars/1.png"}
                          width={48}
                          height={48}
                          alt="Foto de perfil"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#000] dark:text-[#fff]">
                          {session.user.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {session.user.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    {[
                      {
                        href: "/account",
                        text: "Gestionar mi cuenta",
                        icon: UserCircle,
                      },
                      {
                        // SOLO PARA SU (Configuración total del sistema)
                        href: "/settings/system",
                        text: "Configuración del sistema",
                        icon: Settings,
                      },
                      {
                        // Configuración de seguridad de la cuenta
                        href: "/account/security",
                        text: "Credenciales de seguridad",
                        icon: Shield,
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#e1e2e4] hover:text-[#000] dark:text-[#fff] dark:hover:bg-[#2a3f59] dark:hover:text-[#fff] transition-colors duration-150"
                      >
                        <div className="flex items-center">
                          {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                          {item.text}
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 p-2">
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="w-full text-center bg-[#f02929] text-white px-4 py-2 rounded-sm text-sm hover:bg-[#f02929]/90"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Help */}
            <div className="relative support-menu mt-2">
              <button
                onClick={() => setIsSupportOpen(!isSupportOpen)}
                className="hover:text-[#ffc26b]"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
              {isSupportOpen && (
                <SupportMenu onClose={() => setIsSupportOpen(false)} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="flex h-[32px] items-center px-2 bg-[#bddefd] dark:bg-[#232f3e]">
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-1 text-sm rounded-lg cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#004d9d] text-white dark:bg-[#1b2532] dark:text-[#fff] hover:bg-[#004d9d] hover:text-white"
                  : "text-gray-600 hover:text-gray-100 hover:bg-[#004d9d]/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-[#1b2532]/50"
              }`}
            >
              <span>{tab.title}</span>
              <button
                onClick={(e) => closeTab(tab.id, e)}
                className="ml-2 hover:text-[#ffc26b]"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            onClick={addNewTab}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-[#000] hover:text-[#fff] hover:bg-[#004d9d] rounded-lg dark:text-[#fff] dark:hover:text-white dark:hover:bg-[#1b2532]"
          >
            <Plus className="h-4 w-4" />
            <span>Nueva pestaña</span>
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      {isMegaMenuOpen && (
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      )}
    </header>
  );
};
