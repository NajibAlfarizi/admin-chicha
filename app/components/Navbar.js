"use client";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // Ambil path dari URL saat ini
  const pathname = usePathname();

  // Tentukan judul berdasarkan halaman
  const getTitle = () => {
    if (pathname === "/admin/dashboard") return "Dashboard🚀";
    if (pathname === "/admin/produk") return "Manajemen Produk📦";
    if (pathname === "/admin/produk/tambah") return "Tambah Produk📦";
    if (pathname.includes("/admin/produk/edit")) return "Edit Produk📦";
    if (pathname === "/admin/kategori") return "Manajemen Kategori📂";
    if (pathname === "/admin/pesanan") return "Manajemen Pesanan";
    if (pathname === "/admin/voucher") return "Manajemen Voucher";
    if (pathname === "/admin/keluhan") return "Manajemen Keluhan";
    if (pathname === "/admin/pengguna") return "Manajemen Pengguna";
    return "Admin Panel"; // Default jika tidak ada yang cocok
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200">
      {/* Judul halaman */}
      <h2 className="text-xl font-bold text-gray-800 tracking-wide">
        {getTitle()}
      </h2>

      <div className="flex items-center gap-6">
        {/* Notifikasi */}
        <button className="relative group">
          <BellIcon className="w-7 h-7 text-gray-600 group-hover:text-yellow-500 transition duration-300" />
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full absolute -top-2 -right-2 animate-pulse">
            3
          </span>
        </button>

        {/* Profil Admin */}
        <div className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition duration-300">
          <UserCircleIcon className="w-6 h-6 text-gray-700" />
          <span className="text-gray-800 font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
