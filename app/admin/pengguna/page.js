"use client";
import { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UsersPage() {
  // Data Dummy
  const [users, setUsers] = useState([
    { id: 1, name: "Budi Santoso", email: "budi@email.com", role: "Pelanggan" },
    { id: 2, name: "Siti Aisyah", email: "siti@email.com", role: "Admin" },
    { id: 3, name: "Joko Widodo", email: "joko@email.com", role: "Pelanggan" },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fungsi Hapus Pengguna
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setConfirmDelete(null);
    toast.success("Pengguna berhasil dihapus!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      {/* Tabel Pengguna */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Nama</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 text-center flex justify-center gap-2">
                {/* Tombol Lihat Detail */}
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center hover:bg-blue-600"
                  onClick={() => setSelectedUser(user)}
                >
                  <FaEye className="mr-1" /> Detail
                </button>

                {/* Tombol Hapus */}
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600"
                  onClick={() => setConfirmDelete(user)}
                >
                  <FaTrash className="mr-1" /> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Detail Pengguna */}
      {selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow w-1/3">
            <h2 className="text-xl font-bold mb-2">Detail Pengguna</h2>
            <p><strong>Nama:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Konfirmasi Hapus */}
      {confirmDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow w-1/3">
            <p className="text-lg">Yakin ingin menghapus {confirmDelete.name}?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}
