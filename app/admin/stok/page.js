// app/admin/stok/page.js
'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const dummyData = [
  {
    _id: '1',
    produk: 'iPhone 14 Pro',
    tipe: 'masuk',
    jumlah: 10,
    keterangan: 'Stok baru',
    tanggal: '2025-04-10'
  },
  {
    _id: '2',
    produk: 'Samsung Galaxy S24',
    tipe: 'keluar',
    jumlah: 2,
    keterangan: 'Dikirim ke customer',
    tanggal: '2025-04-09'
  }
]

export default function Page() {
  const [data, setData] = useState(dummyData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterTipe, setFilterTipe] = useState('semua')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stok Transaksi')
    XLSX.writeFile(workbook, 'stok_transaksi.xlsx')
    toast.success('Data berhasil diekspor!')
  }

  const handleAddTransaksi = (item) => {
    setData([item, ...data])
    toast.success('Transaksi berhasil ditambahkan!')
    setIsModalOpen(false)
  }

  // 🔍 Filtered data
  const filteredData = data.filter(item => {
    const matchTipe = filterTipe === 'semua' || item.tipe === filterTipe
    const itemDate = new Date(item.tanggal)
    const matchStart = !startDate || itemDate >= startDate
    const matchEnd = !endDate || itemDate <= endDate
    return matchTipe && matchStart && matchEnd
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manajemen Barang Masuk & Keluar</h1>
        <div className="space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Tambah Transaksi
          </button>
          <button
            onClick={handleExportExcel}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ekspor ke Excel
          </button>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium">Tipe Transaksi</label>
          <select
            className="border px-3 py-2 rounded"
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
          >
            <option value="semua">Semua</option>
            <option value="masuk">Masuk</option>
            <option value="keluar">Keluar</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Dari Tanggal</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border px-3 py-2 rounded"
            placeholderText="Pilih tanggal"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Sampai Tanggal</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border px-3 py-2 rounded"
            placeholderText="Pilih tanggal"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Produk</th>
              <th className="px-4 py-2">Tipe</th>
              <th className="px-4 py-2">Jumlah</th>
              <th className="px-4 py-2">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.tanggal}</td>
                  <td className="px-4 py-2">{item.produk}</td>
                  <td className="px-4 py-2 capitalize">{item.tipe}</td>
                  <td className="px-4 py-2">{item.jumlah}</td>
                  <td className="px-4 py-2">{item.keterangan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">Tidak ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && <ModalTransaksi onSubmit={handleAddTransaksi} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

function ModalTransaksi({ onClose, onSubmit }) {
  const [produk, setProduk] = useState('')
  const [tipe, setTipe] = useState('masuk')
  const [jumlah, setJumlah] = useState(1)
  const [keterangan, setKeterangan] = useState('')

  const handleSubmit = () => {
    if (!produk || jumlah <= 0) {
      toast.error('Pastikan semua field terisi dengan benar')
      return
    }

    const newItem = {
      _id: Date.now().toString(),
      produk,
      tipe,
      jumlah,
      keterangan,
      tanggal: new Date().toISOString().split('T')[0]
    }

    onSubmit(newItem)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Tambah Transaksi</h2>

        <div className="mb-3">
          <label className="block text-sm mb-1">Nama Produk</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={produk}
            onChange={(e) => setProduk(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Tipe Transaksi</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={tipe}
            onChange={(e) => setTipe(e.target.value)}
          >
            <option value="masuk">Masuk</option>
            <option value="keluar">Keluar</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Jumlah</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={jumlah}
            onChange={(e) => setJumlah(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Keterangan</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}
