// src/components/layout/shared/MegaMenu.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { usePathname } from 'next/navigation';
import { Icon } from "@/components/ui/Icon";
import type { MenuItem, MegaMenuProps } from "@/types/megaMenu";
import { quickAccessSection, mainMenuSections } from "@/data/menuData";



export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [selectedSection, setSelectedSection] = useState<string>("recent");
  const [activeItems, setActiveItems] = useState<MenuItem[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  useEffect(() => {
    updateActiveItems(selectedSection);
  }, [selectedSection]);

  const updateActiveItems = (sectionId: string) => {
    if (sectionId === "recent" || sectionId === "favorites") {
      const items = mainMenuSections.flatMap((section) =>
        section.items.filter((item) =>
          sectionId === "favorites" ? item.isFavorite : true
        )
      );
      setActiveItems(items);
      setBreadcrumbs([
        sectionId === "recent" ? "Visitados recientemente" : "Favoritos",
      ]);
      return;
    }

    for (const section of mainMenuSections) {
      for (const item of section.items) {
        if (item.id === sectionId && item.children) {
          setActiveItems(item.children);
          setBreadcrumbs([section.title, item.title]);
          return;
        }
      }
    }

    const mainSection = mainMenuSections.find(
      (section) => section.id === sectionId
    );
    if (mainSection) {
      setActiveItems(mainSection.items);
      setBreadcrumbs([mainSection.title]);
    }
  };

  if (!isOpen) return null;


  const isPathActive = (itemHref: string) => {
    if (!itemHref) return false;
    // Comprueba si la ruta actual comienza con el href del ítem
    // Esto marcará como activo el ítem padre cuando estemos en una subruta
    return pathname.startsWith(itemHref);
  };


  const renderMenuItem = (item: MenuItem) => {
    // const isActive = pathname === item.href;

    const isActive = isPathActive(item.href || '');

    const activeClass = isActive ? 'bg-[#2a3f59] text-white' : 'text-gray-300';
    const iconClass = isActive ? 'text-white' : 'text-gray-400 group-hover:text-white';
    
    // Si tiene submenu
    if (item.hasSubmenu) {
      return (
        <button
          key={item.id}
          onClick={() => setSelectedSection(item.id)}
          className={`w-full text-left flex items-center justify-between px-4 py-2 hover:bg-[#2a3f59] hover:text-white group ${activeClass}`}
        >
          <div className="flex items-center space-x-3">
            {item.icon && (
              <Icon
                name={item.icon}
                className={`h-5 w-5 ${iconClass}`}
              />
            )}
            <span>{item.title}</span>
          </div>
          <Icon
            name="chevronRight"
            className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}
          />
        </button>
      );
    }
  
    // Si no tiene submenu
    return (
      <Link
        key={item.id}
        href={item.href || '#'}
        className={`block w-full text-left flex items-center justify-between px-4 py-2 hover:bg-[#2a3f59] hover:text-white group ${activeClass}`}
      >
        <div className="flex items-center space-x-3">
          {item.icon && (
            <Icon
              name={item.icon}
              className={`h-5 w-5 ${iconClass}`}
            />
          )}
          <span>{item.title}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="flex relative">
        {/* Left Navigation */}
        <div className="w-[280px] h-screen bg-[#0f1b2d] overflow-y-auto">
          <div className="py-4">
            {/* Quick Access Section */}
            <div className="mb-4">
              <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                {quickAccessSection.title}
              </div>
              {quickAccessSection.items.map(renderMenuItem)}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-2" />

            {/* Main Sections */}
            {mainMenuSections.map((section) => (
              <div key={section.id} className="mb-4">
                <div className="px-4 py-2 text-xs font-semibold text-gray-400">
                  {section.title}
                </div>
                {section.items.map(renderMenuItem)}
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-[700px] h-screen bg-[#232f3e] overflow-y-auto">
          <div className="border-b border-gray-700">
            <div className="flex justify-between items-center p-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">
                  {breadcrumbs.join(" > ")}
                </div>
                <h2 className="text-xl text-white">
                  {breadcrumbs[breadcrumbs.length - 1]}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2 hover:bg-[#2a3f59] rounded-sm"
              >
                <Icon name="x" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4">
              {activeItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href || "#"}
                  className="block p-3 hover:bg-[#2a3f59] rounded-sm transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {item.icon && (
                        <div className="w-8 h-8 rounded bg-[#2a3f59] flex items-center justify-center">
                          <Icon
                            name={item.icon}
                            className="h-5 w-5 text-white"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-medium">
                            {item.title}
                          </h3>
                          {item.isFavorite && (
                            <Icon
                              name="star"
                              className="h-4 w-4 text-[#ec7211]"
                            />
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-gray-400 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {item.hasSubmenu && (
                      <Icon
                        name="chevronRight"
                        className="h-5 w-5 text-gray-400"
                      />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
