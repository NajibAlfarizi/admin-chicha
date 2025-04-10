"use client";

import { useState } from "react";
import { FaStar, FaTrash, FaReply, FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyReviews = [
  {
    id: 1,
    name: "Budi",
    product: "Samsung A52",
    review: "Produk bagus tapi pengiriman agak lambat.",
    rating: 4,
    status: "Belum Dibaca",
    replied: false,
  },
  {
    id: 2,
    name: "Sari",
    product: "Xiaomi Redmi Note 10",
    review: "Saya menerima produk yang rusak.",
    rating: 2,
    status: "Sudah Dibaca",
    replied: true,
  },
];

export default function KeluhanPage() {
  const [reviews, setReviews] = useState(dummyReviews);
  const [selectedFilter, setSelectedFilter] = useState("Semua");
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyData, setReplyData] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus ulasan ini?")) {
      setReviews(reviews.filter((review) => review.id !== id));
      toast.success("Ulasan berhasil dihapus!");
    }
  };

  const handleReply = (review) => {
    setReplyData(review);
    setShowReplyModal(true);
  };

  const applyFilter = () => {
    switch (selectedFilter) {
      case "Belum Dibaca":
        return reviews.filter((r) => r.status === "Belum Dibaca");
      case "Sudah Dibaca":
        return reviews.filter((r) => r.status === "Sudah Dibaca");
      case "Dibalas":
        return reviews.filter((r) => r.replied);
      case "Belum Dibalas":
        return reviews.filter((r) => !r.replied);
      default:
        return reviews;
    }
  };

  return (
    <div className="p-6">
      {/* Filter Button */}
      <div className="relative flex justify-end">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
        >
          <FaFilter className="text-gray-600" />
        </button>

        {showFilter && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
            {["Semua", "Belum Dibaca", "Sudah Dibaca", "Dibalas", "Belum Dibalas"].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setSelectedFilter(filter);
                  setShowFilter(false);
                }}
                className={`block w-full text-left px-4 py-2 ${
                  selectedFilter === filter ? "bg-gray-100 font-bold" : ""
                } hover:bg-gray-200`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white mt-4 rounded-lg shadow p-4">
  <table className="w-full">
    <thead>
      <tr className="border-b font-semibold">
        <th className="text-left p-2">Nama</th>
        <th className="text-left p-2">Produk</th>
        <th className="text-left p-2">Ulasan</th>
        <th className="text-left p-2">Rating</th>
        <th className="text-left p-2">Status</th>
        <th className="text-center p-2">Aksi</th>
      </tr>
    </thead>
    <tbody>
      {applyFilter().map((review) => (
        <tr key={review.id} className="border-t">
          <td className="p-2">{review.name}</td>
          <td className="p-2">{review.product}</td>
          <td className="p-2">{review.review}</td>
          <td className="p-2 flex items-center">
            {review.rating} <FaStar className="text-yellow-500 ml-1" />
          </td>
          <td className="p-2">
            <span
              className={`inline-block px-2 py-1 text-white text-sm font-semibold rounded whitespace-nowrap ${
                review.status === "Belum Dibaca"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {review.status}
            </span>
          </td>
          <td className="p-2 text-center flex justify-center gap-2">
            <button
              onClick={() => handleReply(review)}
              className="bg-blue-500 text-white px-2 py-2 rounded flex items-center hover:bg-blue-600 transition"
            >
              <FaReply className="mr-1" /> Balas
            </button>
            <button
              onClick={() => handleDelete(review.id)}
              className="bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600 transition"
            >
              <FaTrash className="mr-1" /> Hapus
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Modal Balas Ulasan */}
      {showReplyModal && replyData && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold">Balas Ulasan</h3>
            <p className="text-sm text-gray-600 mt-2">Ulasan dari {replyData.name}:</p>
            <p className="border p-2 rounded bg-gray-100 mt-2">{replyData.review}</p>
            <textarea
              placeholder="Tulis balasan..."
              className="w-full border p-2 rounded mt-2"
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowReplyModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  toast.success("Balasan terkirim!");
                  setShowReplyModal(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
