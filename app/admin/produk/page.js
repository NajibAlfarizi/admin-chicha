"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import Pagination from "../../components/Pagination";
import ConfirmDialog from "../../components/ConfirmDialog";
import { getProducts, deleteProduct } from "../../../lib/api/products";
import { toast, ToastContainer } from "react-toastify";

const ProdukPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productsPerPage = 5;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  // Ambil produk berdasarkan halaman aktif
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const products = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Fetch data produk dari backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setAllProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const openDialog = (id) => {
    setSelectedProductId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProductId(null);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteProduct(selectedProductId, token);
  
      setAllProducts((prev) =>
        prev.filter((product) => product._id !== selectedProductId)
      );
  
      toast.success("Produk berhasil dihapus!"); // ⬅️ Pindah ke sini
      console.log("Toast dipanggil ✅");  
      setTimeout(() => {
        closeDialog();
      }, 100);
    } catch (err) {
      toast.error("Gagal menghapus produk: " + err.message);
    }
  };
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <ToastContainer />
      {/* Header */}
      <div className="p-2 rounded-lg flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          Daftar Produk📦
        </h2>
        <Link href="/admin/produk/tambah">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all">
            <FiPlus className="text-lg" /> Tambah Produk
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="p-3 text-left">Gambar</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Stok</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id?.toString()}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-3">
                  <img
                    src={`http://localhost:5000/${product.gambar}`}
                    alt={product.nama}
                    className="w-12 h-12 object-cover rounded-md border"
                  />
                </td>
                <td className="p-3 text-black font-medium">
                  {product.nama}
                </td>
                <td className="p-2">Rp{product.harga.toLocaleString('id-ID', {
                  minimumFractionDigits: 0,
                })}</td>
                <td className="p-2">{product.stok}</td>
                <td className="p-2">{product.kategori?.name}</td>
                <td className="p-3 flex justify-center gap-3">
                  <Link href={`/admin/produk/edit/${product._id}`}>
                    <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-all">
                      <FiEdit className="text-lg" />
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:bg-red-100 p-2 rounded-md transition-all"
                    onClick={() => openDialog(product._id)}
                  >
                    <FiTrash className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleDelete}
        message={"Apakah anda yakin ingin menghapus produk ini?"}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={allProducts.length}
        itemsPerPage={productsPerPage}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default ProdukPage;