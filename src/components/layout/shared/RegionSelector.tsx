// src/components/layout/shared/RegionSelector.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Lock, Building } from "lucide-react";

interface CEDI {
  city: string;
  code: string;
  disabled?: boolean;
}

interface CountryGroup {
  country: string;
  cedis: CEDI[];
}

const cediLocations: CountryGroup[] = [
  {
    country: "Colombia",
    cedis: [
      { city: "Bogotá", code: "BOG-01" },
      { city: "Medellín", code: "MED-01" },
      { city: "Cali", code: "CAL-01" },
      { city: "Barranquilla", code: "BAQ-01" },
      { city: "Bucaramanga", code: "BUC-01", disabled: true },
      { city: "Cartagena", code: "CTG-01" },
    ],
  },
  {
    country: "Panamá",
    cedis: [
      { city: "Ciudad de Panamá", code: "PTY-01" },
      { city: "Colón", code: "COL-01" },
      { city: "David", code: "DAV-01", disabled: true },
    ],
  },
];

export const RegionSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCedi, setSelectedCedi] = useState(cediLocations[0].cedis[0]);

  // Click fuera para cerrar el menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target?.closest(".region-selector")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative region-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm hover:text-[#ec7211]"
      >
        <Building className="h-4 w-4" />
        <span>
          {selectedCedi.city} ({selectedCedi.code})
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#232f3e] border border-gray-700 shadow-lg rounded-md z-50">
          {cediLocations.map((countryGroup) => (
            <div
              key={countryGroup.country}
              className="border-b border-gray-700 last:border-b-0"
            >
              <div className="px-4 py-2 text-sm font-semibold text-gray-400">
                {countryGroup.country}
              </div>
              <div className="pb-2">
                {countryGroup.cedis.map((cedi) => (
                  <button
                    key={cedi.code}
                    onClick={() => {
                      if (!cedi.disabled) {
                        setSelectedCedi(cedi);
                        setIsOpen(false);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm ${
                      cedi.disabled
                        ? "text-gray-500 cursor-not-allowed"
                        : selectedCedi.code === cedi.code
                        ? "bg-[#2a3f59] text-white"
                        : "text-gray-300 hover:bg-[#2a3f59] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center">
                      {cedi.disabled && <Lock className="h-3 w-3 mr-2" />}
                      <span>{cedi.city}</span>
                    </div>
                    <span className="text-xs text-gray-500">{cedi.code}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="p-2 border-t border-gray-700">
            <button
              className="w-full text-left px-2 py-1 text-sm text-[#0073bb] hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Administrar CEDIs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};