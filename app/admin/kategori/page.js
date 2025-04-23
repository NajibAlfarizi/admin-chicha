"use client";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../lib/api/categories";

import useAuthAdmin from "lib/hooks/useAuthAdmin";

import ConfirmDialog from "../../components/ConfirmDialog";
import Pagination from "../../components/Pagination";

const KategoriPage = () => {
  const { loading } = useAuthAdmin();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // 📦 Fetch data
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      toast.error("Gagal mengambil kategori");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🧰 Helper modal
  const openModal = (type, category = null) => {
    setModalType(type);
    setCategoryName(category ? category.name : "");
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName("");
    setSelectedCategory(null);
  };

  // ✅ Simpan kategori
  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Nama kategori tidak boleh kosong!");
      return;
    }

    try {
      if (modalType === "add") {
        await createCategory(categoryName, token);
        toast.success("Kategori berhasil ditambahkan!");
      } else {
        await updateCategory(selectedCategory._id, categoryName, token);
        toast.success("Kategori berhasil diperbarui!");
      }

      closeModal();
      fetchCategories();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ❌ Hapus kategori
  const handleDelete = async () => {
    try {
      await deleteCategory(selectedCategory._id, token);
      toast.success("Kategori berhasil dihapus!");
      fetchCategories();
    } catch (err) {
      toast.error("Gagal menghapus kategori");
    } finally {
      setIsConfirmOpen(false);
    }
  };

  const categoriesPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(categories.length / categoriesPerPage));
  const paginatedCategories = categories.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
  );

  if (loading) return <div className="p-4">Memuat...</div>;

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Kategori 📂</h2>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => openModal("add")}
        >
          <FiPlus /> Tambah Kategori
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3 text-left">Nama Kategori</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((category) => (
              <tr key={category._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{category.name}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button onClick={() => openModal("edit", category)}>
                    <FiEdit className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsConfirmOpen(true);
                    }}
                  >
                    <FiTrash className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={categories.length}
        itemsPerPage={categoriesPerPage}
        setPage={setCurrentPage}
      />

      {/* Modal Tambah / Edit */}
      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white p-5 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {modalType === "add" ? "Tambah Kategori" : "Edit Kategori"}
            </h2>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Kategori"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleSave}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Kategori"
        message="Yakin ingin menghapus?"
      />
    </div>
  );
};

export default KategoriPage;
