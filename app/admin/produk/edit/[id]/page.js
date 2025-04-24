"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryDropdown from "../../../../components/CategoryDropdown";

export default function EditProduk() {
  const router = useRouter();
  const { id } = useParams(); // Ambil ID dari URL
  const [nama, setNama] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState("");

  // Ambil data produk berdasarkan ID
  useEffect(() => {
    console.log("ID dari params:", id);

    if (!id) return toast.error("ID produk tidak ditemukan!");
    // router.push(`/admin/produk`);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : "";
    if (!token) {
      toast.error("Token tidak ditemukan!");
      router.push("/admin/login");
      return;
    }

    const fetchProduk = async () => {
      try {
        const res = await fetch(`/api/produk/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data produk");

        const data = await res.json();
        setNama(data.nama);
        setSelectedCategory(data.kategori);
        setHarga(data.harga);
        setStok(data.stok);
        setDeskripsi(data.deskripsi);
        setPreview(data.gambar);
      } catch (error) {
        toast.error("Gagal mengambil data produk");
      }
    };

    fetchProduk();
  }, [id]);

  // Handle Upload Gambar
  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama || !selectedCategory || !harga || !stok || !deskripsi) {
      toast.error("Mohon lengkapi semua data produk!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("kategori", selectedCategory);
    formData.append("harga", harga);
    formData.append("stok", stok);
    formData.append("deskripsi", deskripsi);
    if (gambar) formData.append("gambar", gambar); // Jika ada gambar baru, upload

    try {
      const res = await fetch(`/api/produk/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal mengupdate produk");

      toast.success(`Produk "${nama}" berhasil diperbarui!`, {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/admin/produk"); // Redirect ke halaman daftar produk
      }, 2000);
    } catch (error) {
      toast.error("Gagal menyimpan perubahan!");
    }
  };

  return (
    <div className="min-h-full bg-gray-100 text-gray-900 p-4">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Kolom 1: Input Produk */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Nama Produk
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                placeholder="Masukkan nama produk"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            {/* Dropdown Kategori */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Kategori
              </label>
              <CategoryDropdown
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Harga
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  placeholder="Rp 0"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Stok
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  placeholder="Jumlah stok"
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">
                Deskripsi
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                rows="5"
                placeholder="Deskripsi produk..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Kolom 2: Upload Gambar */}
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            <label className="block text-gray-700 font-medium mb-2">
              Gambar Produk
            </label>
            <input
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white cursor-pointer"
              accept="image/*"
              onChange={handleGambarChange}
            />
            <div className="mt-4 flex justify-center">
              {preview ? (
                <img
                  className="w-48 h-48 object-cover border border-gray-400 rounded-lg"
                  src={preview}
                  alt="Preview Produk"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
                  No Image
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Tombol Aksi */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => router.push("/admin/produk")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg mr-2 cursor-pointer hover:bg-gray-600"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
