"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select"; // Library untuk multiple select
import ConfirmDialog from "app/components/ConfirmDialog";

export default function ManajemenVoucher() {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      code: "DISKON50",
      discount: 50,
      description: "Diskon 50% untuk semua produk",
      appliesTo: "Semua Pelanggan",
    },
    {
      id: 2,
      code: "KHUSUS123",
      discount: 20,
      description: "Diskon 20% hanya untuk pelanggan tertentu",
      appliesTo: ["Pelanggan A", "Pelanggan B"],
    },
  ]);

  // Dummy data pelanggan
  const customers = [
    { value: "Pelanggan A", label: "Pelanggan A" },
    { value: "Pelanggan B", label: "Pelanggan B" },
    { value: "Pelanggan C", label: "Pelanggan C" },
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState({
    id: null,
    code: "",
    discount: "",
    description: "",
    appliesTo: "Semua Pelanggan",
  });

  // 🔔 Untuk Konfirmasi Hapus
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] = useState(null);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentVoucher({
      id: null,
      code: "",
      discount: "",
      description: "",
      appliesTo: "Semua Pelanggan",
    });
    setModalOpen(true);
  };

  const openEditModal = (voucher) => {
    setIsEditing(true);
    setCurrentVoucher(voucher);
    setModalOpen(true);
  };

  const saveVoucher = () => {
    if (!currentVoucher.code || !currentVoucher.discount || !currentVoucher.description) {
      toast.error("Harap isi semua field!");
      return;
    }

    if (isEditing) {
      setVouchers((prev) =>
        prev.map((v) => (v.id === currentVoucher.id ? currentVoucher : v))
      );
      toast.success("Voucher berhasil diperbarui!");
    } else {
      setVouchers((prev) => [
        ...prev,
        { ...currentVoucher, id: prev.length + 1 },
      ]);
      toast.success("Voucher berhasil ditambahkan!");
    }

    setModalOpen(false);
  };

  // 👇 Buka dialog konfirmasi saat klik tombol hapus
  const confirmDeleteVoucher = (voucher) => {
    setVoucherToDelete(voucher);
    setConfirmOpen(true);
  };

  // 👇 Eksekusi setelah user klik "Ya" di dialog konfirmasi
  const handleConfirmDelete = () => {
    if (voucherToDelete) {
      setVouchers((prev) => prev.filter((v) => v.id !== voucherToDelete.id));
      toast.success("Voucher berhasil dihapus!");
    }
    setConfirmOpen(false);
    setVoucherToDelete(null);
  };

  return (
    <div className="p-8">
      {/* Notifikasi */}
      <ToastContainer />

      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow p-4 rounded-lg">
        <h1 className="text-2xl font-bold">🎟️ Manajemen Voucher</h1>
        <button
          onClick={openAddModal}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          ➕ Tambah Voucher
        </button>
      </div>

      {/* Tabel Voucher */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Kode Voucher</th>
              <th className="p-3">Diskon (%)</th>
              <th className="p-3">Deskripsi</th>
              <th className="p-3">Berlaku Untuk</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{voucher.code}</td>
                <td className="p-3">{voucher.discount}%</td>
                <td className="p-3">{voucher.description}</td>
                <td className="p-3">
                  {Array.isArray(voucher.appliesTo)
                    ? voucher.appliesTo.join(", ")
                    : voucher.appliesTo}
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(voucher)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => confirmDeleteVoucher(voucher)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit Voucher */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-90 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "✏️ Edit Voucher" : "➕ Tambah Voucher"}
            </h2>

            {/* Input Kode Voucher */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Kode Voucher</label>
              <input
                type="text"
                value={currentVoucher.code}
                onChange={(e) =>
                  setCurrentVoucher({ ...currentVoucher, code: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Input Diskon */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Diskon (%)</label>
              <input
                type="number"
                value={currentVoucher.discount}
                onChange={(e) =>
                  setCurrentVoucher({
                    ...currentVoucher,
                    discount: e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Input Deskripsi */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Deskripsi</label>
              <textarea
                value={currentVoucher.description}
                onChange={(e) =>
                  setCurrentVoucher({
                    ...currentVoucher,
                    description: e.target.value,
                  })
                }
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Pilihan Berlaku Untuk */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Berlaku Untuk</label>
              <Select
                isMulti
                options={customers}
                value={
                  Array.isArray(currentVoucher.appliesTo)
                    ? customers.filter((c) =>
                        currentVoucher.appliesTo.includes(c.value)
                      )
                    : []
                }
                onChange={(selectedOptions) =>
                  setCurrentVoucher({
                    ...currentVoucher,
                    appliesTo: selectedOptions.map((option) => option.value),
                  })
                }
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Tombol Simpan & Tutup */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                ❌ Batal
              </button>
              <button
                onClick={saveVoucher}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                ✅ Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔔 Konfirmasi Dialog Hapus */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Hapus Voucher"
        message={`Apakah Anda yakin ingin menghapus voucher "${voucherToDelete?.code}"?`}
        onConfirm={handleConfirmDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
}
