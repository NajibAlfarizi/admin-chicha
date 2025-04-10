"use client";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

// Dummy data kategori (bisa diganti dari API)
const categories = [
  { id: 1, name: "Smartphone" },
  { id: 2, name: "Aksesoris" },
  { id: 3, name: "Laptop" },
  { id: 4, name: "Tablet" },
  { id: 5, name: "Smartwatch" },
];

export default function CategoryDropdown({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      <div className="relative">
        {/* Tombol Dropdown */}
        <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none">
          <span className="block truncate">
            {selectedCategory?.name || "Pilih Kategori"}
          </span>
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
          </span>
        </Listbox.Button>

        {/* Opsi Dropdown */}
        <Listbox.Options className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none">
          {categories.map((category) => (
            <Listbox.Option
              key={category.id}
              value={category}
              className={({ active }) =>
                `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                  active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                }`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {category.name}
                  </span>
                  {selected && (
                    <span className="absolute inset-y-0 left-3 flex items-center text-blue-600">
                      <CheckIcon className="w-5 h-5" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
