"use client";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import ConfirmDialog from "../../components/ConfirmDialog";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function PesananPage() {
  const [tab, setTab] = useState("produk");
  const [pesananProduk, setPesananProduk] = useState([]);
  const [pesananPerbaikan, setPesananPerbaikan] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    // Fetch data dari API atau gunakan data dummy dulu
    setPesananProduk([
      {
        id: 1,
        nama: "Budi Santoso",
        total: "Rp 1.500.000",
        status: "Diproses",
      },
      { id: 2, nama: "Ani Wijaya", total: "Rp 2.200.000", status: "Dikirim" },
      { id: 3, nama: "Sari Rahma", total: "Rp 750.000", status: "Selesai" },
      {
        id: 4,
        nama: "Budi Santoso",
        total: "Rp 1.500.000",
        status: "Diproses",
      },
      { id: 5, nama: "Ani Wijaya", total: "Rp 2.200.000", status: "Dikirim" },
      { id: 6, nama: "Sari Rahma", total: "Rp 750.000", status: "Selesai" },
      {
        id: 7,
        nama: "Budi Santoso",
        total: "Rp 1.500.000",
        status: "Diproses",
      },
      { id: 8, nama: "Ani Wijaya", total: "Rp 2.200.000", status: "Dikirim" },
    ]);

    setPesananPerbaikan([
      {
        id: 1,
        nama: "Doni Pratama",
        biaya: "Rp 350.000",
        status: "Sedang Dikerjakan",
      },
      { id: 2, nama: "Siti Aisyah", biaya: "Rp 500.000", status: "Selesai" },
    ]);
  }, []);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setPage(1);
  };

  const openDialog = (id) => {
    setSelectedOrderId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrderId(null);
  };

  const handleDelete = () => {
    toast.success("Pesanan berhasil dihapus!");
    if (tab === "produk") {
      setPesananProduk(
        pesananProduk.filter((item) => item.id !== selectedOrderId)
      );
    } else {
      setPesananPerbaikan(
        pesananPerbaikan.filter((item) => item.id !== selectedOrderId)
      );
    }
    closeDialog();
  };

  const openStatusDialog = (id) => {
    setSelectedOrderId(id);
    setIsStatusDialogOpen(true);
  };

  const closeStatusDialog = () => {
    setIsStatusDialogOpen(false);
    setSelectedOrderId(null);
    setNewStatus("");
  };

  const handleStatusChange = () => {
    if (tab === "produk") {
      setPesananProduk(
        pesananProduk.map((item) =>
          item.id === selectedOrderId ? { ...item, status: newStatus } : item
        )
      );
    } else {
      setPesananPerbaikan(
        pesananPerbaikan.map((item) =>
          item.id === selectedOrderId ? { ...item, status: newStatus } : item
        )
      );
    }
    toast.success("Status pesanan berhasil diubah!");
    closeStatusDialog();
  };

  // Pagination logic
  const displayedData =
    tab === "produk"
      ? pesananProduk.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      : pesananPerbaikan.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Manajemen Pesanan</h1>

      {/* Tab Menu */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => handleTabChange("produk")}
          className={`px-4 py-2 rounded-lg ${
            tab === "produk" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          Pesanan Produk
        </button>
        <button
          onClick={() => handleTabChange("perbaikan")}
          className={`px-4 py-2 rounded-lg ${
            tab === "perbaikan" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
        >
          Pesanan Perbaikan
        </button>
      </div>

      {/* Tabel Pesanan */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          {tab === "produk" ? "Pesanan Produk" : "Pesanan Perbaikan"}
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Nama Pelanggan</th>
              <th className="p-3 text-left">
                {tab === "produk" ? "Total Harga" : "Biaya"}
              </th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((order, index) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{(page - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">{order.nama}</td>
                <td className="p-3">
                  {tab === "produk" ? order.total : order.biaya}
                </td>
                <td className="p-3">{order.status}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 text-sm rounded-md transition"
                    onClick={() => openStatusDialog(order.id)}
                  >
                    Ubah Status
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded-md transition"
                    onClick={() => openDialog(order.id)}
                  >
                    Hapus
                  </button>
                  <Link
                    href={
                      tab === "produk"
                        ? `/admin/pesanan/${order.id}`
                        : `/perbaikan/${order.id}`
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md transition"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalItems={
            tab === "produk" ? pesananProduk.length : pesananPerbaikan.length
          }
          itemsPerPage={itemsPerPage}
          setPage={setPage}
        />
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleDelete}
        message={"Apakah Anda yakin ingin menghapus pesanan ini?"}
      />

      {isStatusDialogOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Ubah Status Pesanan</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">Pilih Status</option>
              <option value="Diproses">Diproses</option>
              <option value="Dikirim">Dikirim</option>
              <option value="Selesai">Selesai</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={closeStatusDialog}
              >
                Batal
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleStatusChange}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
