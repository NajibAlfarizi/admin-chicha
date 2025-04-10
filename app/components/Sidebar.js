"use client";
import Link from "next/link";
import {
  HomeIcon,
  CubeIcon,
  FolderIcon,
  ClipboardIcon,
  TicketIcon,
  ChatBubbleBottomCenterTextIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import { usePathname } from "next/navigation"; // Untuk menandai menu aktif

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  { name: "Transaksi", href: "/admin/stok", icon: ClipboardIcon },
  { name: "Produk", href: "/admin/produk", icon: CubeIcon },
  { name: "Kategori", href: "/admin/kategori", icon: FolderIcon },
  { name: "Pesanan", href: "/admin/pesanan", icon: ClipboardIcon },
  { name: "Voucher", href: "/admin/voucher", icon: TicketIcon },
  {
    name: "Keluhan",
    href: "/admin/keluhan",
    icon: ChatBubbleBottomCenterTextIcon,
  },
  { name: "Pengguna", href: "/admin/pengguna", icon: UsersIcon },
];

export default function Sidebar() {
  const pathname = usePathname(); // Dapatkan path halaman saat ini

  return (
    <aside className="w-64 bg-[#1E293B] text-white h-screen p-5 fixed font-inter shadow-lg">
      <h2 className="text-2xl font-bold text-[#FACC15] mb-6 tracking-wide">
        📊 Admin Panel
      </h2>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          // Cek apakah path saat ini sesuai dengan menu (termasuk sub-halaman)
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center py-3 px-4 rounded-lg transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#FACC15] text-gray-900 shadow-md"
                    : "hover:bg-gray-700"
                }
              `}
            >
              <item.icon
                className={`w-6 h-6 mr-3 ${
                  isActive ? "text-gray-900" : "text-gray-300"
                }`}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
