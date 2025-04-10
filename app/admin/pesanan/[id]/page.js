"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetailPesanan({ params }) {
  const router = useRouter();
  const { id: orderId } = useParams();

  // State untuk menyimpan data pesanan
  const [order, setOrder] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState(""); 

  // Simulasi fetch data dari backend
  useEffect(() => {
    const fetchOrder = async () => {
      const dummyData = {
        id: orderId,
        customer: "Budi Santoso",
        date: "2025-03-10",
        address: "Jl. Sudirman No. 10, Jakarta",
        total: 1500000,
        paymentMethod: "Transfer Bank",
        shipping: "JNE - REG",
        trackingNumber: "",
        status: "Pending",
        notes: "Tolong bungkus dengan bubble wrap.",
        items: [
          {
            id: 1,
            name: "iPhone 13",
            price: 10000000,
            quantity: 1,
            image: "https://via.placeholder.com/80",
          },
          {
            id: 2,
            name: "Charger Apple 20W",
            price: 500000,
            quantity: 1,
            image: "https://via.placeholder.com/80",
          },
        ],
      };
      setOrder(dummyData);
      setTrackingNumber(dummyData.trackingNumber);
    };

    fetchOrder();
  }, [orderId]);

  // Fungsi Update Status
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setOrder((prev) => ({ ...prev, status: newStatus }));

    // Jika status jadi "Dikirim", reset No. Resi agar bisa diisi
    if (newStatus === "Dikirim") {
      setTrackingNumber("");
    }

    // Notifikasi sukses
    toast.success(`Status pesanan diperbarui menjadi: ${newStatus}`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Fungsi Simpan No. Resi
  const saveTrackingNumber = () => {
    setOrder((prev) => ({ ...prev, trackingNumber }));

    // Notifikasi sukses
    toast.success(`No. Resi telah diperbarui: ${trackingNumber}`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <ToastContainer /> {/* Ini penting untuk menampilkan notifikasi */}

      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow p-4 rounded-lg">
        <h1 className="text-2xl font-bold">Detail Pesanan #{order.id}</h1>
        <button
          onClick={() => router.push("/admin/pesanan")}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          ⬅️ Kembali
        </button>
      </div>

      {/* Detail Pesanan */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">🛒 Informasi Pesanan</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p>
              <strong>Nama Pelanggan:</strong> {order.customer}
            </p>
            <p>
              <strong>Tanggal Pesanan:</strong> {order.date}
            </p>
            <p>
              <strong>Alamat Pengiriman:</strong> {order.address}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Total Harga:</strong> Rp {order.total.toLocaleString()}
            </p>
            <p>
              <strong>Metode Pembayaran:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Jasa Pengiriman:</strong> {order.shipping}
            </p>
            <p>
              <strong>No. Resi:</strong>{" "}
              {order.trackingNumber ? order.trackingNumber : "-"}
            </p>
            <p>
              <strong>Status:</strong>
              <select
                value={order.status}
                onChange={handleStatusChange}
                className="border p-2 rounded bg-gray-100"
              >
                <option value="Pending">Pending</option>
                <option value="Diproses">Diproses</option>
                <option value="Dikirim">Dikirim</option>
                <option value="Selesai">Selesai</option>
              </select>
            </p>

            {/* Inputan No. Resi (Muncul hanya jika status "Dikirim") */}
            {order.status === "Dikirim" && (
              <div className="mt-2">
                <label className="block text-sm font-medium">Nomor Resi:</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Masukkan No. Resi"
                />
                <button
                  onClick={saveTrackingNumber}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  ✅ Simpan No. Resi
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p>
            <strong>Catatan Pembeli:</strong> {order.notes}
          </p>
        </div>
      </div>

      {/* Daftar Produk dalam Pesanan */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">📦 Produk yang Dipesan</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Gambar</th>
              <th className="p-3">Produk</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded"
                  />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">Rp {item.price.toLocaleString()}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
