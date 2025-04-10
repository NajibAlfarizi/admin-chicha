"use client";
import { useState } from "react";
import Link from "next/link";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import Pagination from "../../components/Pagination";
import ConfirmDialog from "../../components/ConfirmDialog";

const ProdukPage = () => {
  const allProducts = [
    {
      id: 1,
      name: "iPhone 13",
      price: "Rp 12.000.000",
      stock: 15,
      category: "Smartphone",
      image:
        "https://th.bing.com/th/id/OIF.YZYGu7EE6Vs3s6yVMu6KIw?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      name: "Samsung S22",
      price: "Rp 10.000.000",
      stock: 10,
      category: "Smartphone",
      image:
        "https://th.bing.com/th/id/OIF.YZYGu7EE6Vs3s6yVMu6KIw?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      name: "Xiaomi 12",
      price: "Rp 8.000.000",
      stock: 20,
      category: "Smartphone",
      image:
        "https://th.bing.com/th/id/OIF.YZYGu7EE6Vs3s6yVMu6KIw?rs=1&pid=ImgDetMain",
    },
    {
      id: 4,
      name: "Oppo Reno 8",
      price: "Rp 7.500.000",
      stock: 12,
      category: "Smartphone",
      image:
        "https://th.bing.com/th/id/OIF.YZYGu7EE6Vs3s6yVMu6KIw?rs=1&pid=ImgDetMain",
    },
    {
      id: 5,
      name: "Vivo V23",
      price: "Rp 7.000.000",
      stock: 8,
      category: "Smartphone",
      image:
        "https://th.bing.com/th/id/OIF.YZYGu7EE6Vs3s6yVMu6KIw?rs=1&pid=ImgDetMain",
    },
    {
      id: 6,
      name: "Realme GT 2",
      price: "Rp 6.500.000",
      stock: 14,
      category: "Smartphone",
      image:
        "https://th.bing.com/th/id/OIF.YZYGu7EE6Vs3s6yVMu6KIw?rs=1&pid=ImgDetMain",
    },
    {
      id: 7,
      name: "iPhone 12",
      price: "Rp 10.000.000",
      stock: 18,
      category: "Smartphone",
      image:
        "https://th.bing.com/th/id/OIF.YZYGu7EE6Vs3s6yVMu6KIw?rs=1&pid=ImgDetMain",
    },
    {
      id: 8,
      name: "Samsung A52",
      price: "Rp 6.000.000",
      stock: 25,
      category: "Smartphone",
      image:
        "https://th.bing.com/th/id/OIF.YZYGu7EE6Vs3s6yVMu6KIw?rs=1&pid=ImgDetMain",
    },
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  // Ambil produk berdasarkan halaman aktif
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const products = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const openDialog = (id) => {
    setSelectedProductId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProductId(null);
  };

  const handleDelete = () => {
    setProducts(products.filter((product) => product.id !== selectedProductId));
    closeDialog();
  };

  return (
    <div className="p-4">
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
                key={product.id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md border"
                  />
                </td>
                <td className="p-3 text-gray-800 font-medium">
                  {product.name}
                </td>
                <td className="p-3 text-gray-600">{product.price}</td>
                <td className="p-3 text-gray-600">{product.stock}</td>
                <td className="p-3 text-gray-600">{product.category}</td>
                <td className="p-3 flex justify-center gap-3">
                  <Link href={`/admin/produk/edit/${product.id}`}>
                    <button className="text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-all">
                      <FiEdit className="text-lg" />
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:bg-red-100 p-2 rounded-md transition-all"
                    onClick={() => openDialog(product.id)}
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
