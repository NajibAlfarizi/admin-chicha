"use client";

import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import useAuthAdmin from "lib/hooks/useAuthAdmin";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
} from "chart.js";

import {
  CubeIcon,
  ClipboardIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

const stats = [
  { name: "Total Produk", value: 120, icon: CubeIcon },
  { name: "Total Pesanan", value: 340, icon: ClipboardIcon },
  { name: "Total User", value: 75, icon: UsersIcon },
  { name: "Total Perbaikan", value: 45, icon: WrenchScrewdriverIcon },
];

const transactions = [
  { id: "#TRX001", name: "John Doe", amount: "Rp 250.000", status: "Sukses" },
  { id: "#TRX002", name: "Jane Smith", amount: "Rp 500.000", status: "Pending" },
  { id: "#TRX003", name: "Michael Lee", amount: "Rp 750.000", status: "Gagal" },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Michael Lee", email: "michael@example.com" },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const dataPendapatan = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
  datasets: [
    {
      label: "Pendapatan (Rp)",
      data: [5000000, 7000000, 8500000, 9000000, 12000000, 14000000],
      backgroundColor: "rgba(75, 192, 192, 0.7)",
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 1,
    },
  ],
};

const dataPesananPerbaikan = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
  datasets: [
    {
      label: "Pesanan",
      data: [50, 65, 80, 85, 95, 120],
      backgroundColor: "rgba(255, 99, 132, 0.7)",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 1,
    },
    {
      label: "Perbaikan",
      data: [20, 30, 40, 50, 60, 75],
      backgroundColor: "rgba(54, 162, 235, 0.7)",
      borderColor: "rgb(54, 162, 235)",
      borderWidth: 1,
    },
  ],
};

const dataStatusPesanan = {
  labels: ["Selesai", "Dikirim", "Pending", "Dibatalkan"],
  datasets: [
    {
      data: [150, 100, 60, 30], // Contoh data jumlah pesanan
      backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"],
      hoverBackgroundColor: ["#45A049", "#1E88E5", "#FFB300", "#E53935"],
    },
  ],
};

// Opsi Tampilan Grafik
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0,0,0,0.7)",
      titleFont: { size: 14 },
      bodyFont: { size: 12 },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Bulan",
        font: { size: 14 },
        color: "#333",
      },
      grid: { display: false },
    },
    y: {
      title: {
        display: true,
        text: "Jumlah",
        font: { size: 14 },
        color: "#333",
      },
      grid: { color: "rgba(200, 200, 200, 0.3)" },
    },
  },
};



export default function Dashboard() {
  const { isLoading } = useAuthAdmin()
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border border-gray-200"
          >
            <stat.icon className="w-12 h-12 text-blue-500" />
            <div>
              <h4 className="text-lg font-medium text-gray-600">{stat.name}</h4>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grafik & Ringkasan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Pendapatan */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            💰 Grafik Pendapatan Bulanan
          </h4>
          <div className="h-64">
            <Bar data={dataPendapatan} options={options} />
          </div>
        </div>

        {/* Grafik Pesanan & Perbaikan */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            📦 Grafik Pesanan & Perbaikan Bulanan
          </h4>
          <div className="h-64">
            <Bar data={dataPesananPerbaikan} options={options} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ringkasan Keuangan */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <span>📊</span> Ringkasan Keuangan & Pesanan
          </h4>

          <div className="grid grid-cols-2 gap-4 text-gray-700">
            {/* Pesanan Hari Ini */}
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md text-sm">
              <span className="text-blue-600">📅</span>
              <p>
                <strong>Pesanan:</strong>{" "}
                <span className="text-blue-500 font-semibold">15</span>
              </p>
            </div>

            {/* Perbaikan Hari Ini */}
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md text-sm">
              <span className="text-green-600">🛠️</span>
              <p>
                <strong>Perbaikan:</strong>{" "}
                <span className="text-green-500 font-semibold">7</span>
              </p>
            </div>

            {/* Pemasukan Hari Ini */}
            <div className="col-span-2 flex items-center gap-2 bg-gray-100 p-3 rounded-md text-sm">
              <span className="text-yellow-600">💰</span>
              <p>
                <strong>Pemasukan:</strong>{" "}
                <span className="text-purple-500 font-semibold">
                  Rp 2.500.000
                </span>
              </p>
            </div>

            {/* Garis pemisah */}
            <div className="col-span-2">
              <hr className="border-gray-300 my-2" />
            </div>

            {/* Penjualan Bulan Ini */}
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md text-sm">
              <span className="text-indigo-600">📦</span>
              <p>
                <strong>Penjualan Bulan Ini:</strong>{" "}
                <span className="text-blue-500 font-semibold">120 Produk</span>
              </p>
            </div>

            {/* Perbaikan Bulan Ini */}
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md text-sm">
              <span className="text-teal-600">🔧</span>
              <p>
                <strong>Perbaikan Bulan Ini:</strong>{" "}
                <span className="text-green-500 font-semibold">
                  35 Perbaikan
                </span>
              </p>
            </div>

            {/* Total Pemasukan */}
            <div className="col-span-2 flex items-center gap-2 bg-gray-200 p-4 rounded-md border border-gray-300 text-sm">
              <span className="text-green-700">💵</span>
              <p className="font-bold text-gray-800">
                Total Pemasukan:{" "}
                <span className="text-purple-600">Rp 50.000.000</span>
              </p>
            </div>
          </div>
        </div>

        {/* Grafik Status Pesanan */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center justify-center">
          <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <span>📊</span> Status Pesanan
          </h4>
          <div className="h-64 w-full flex justify-center items-center">
            <Pie data={dataStatusPesanan} />
          </div>
        </div>
      </div>

      {/* Transaksi & User Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            🛒 Transaksi Terbaru
          </h4>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 text-left text-gray-700">Nama</th>
                <th className="py-2 text-gray-700">Status</th>
                <th className="py-2 text-right text-gray-700">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id} className="border-b">
                  <td className="py-2 text-gray-800">{trx.name}</td>
                  <td className="py-2">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        trx.status === "Sukses"
                          ? "bg-green-100 text-green-600"
                          : trx.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {trx.status}
                    </span>
                  </td>
                  <td className="py-2 text-right text-black font-semibold">
                    {trx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            👥 User Terbaru
          </h4>
          <ul className="divide-y divide-gray-200">
            {users.map((user) => (
              <li key={user.id} className="py-3">
                <p className="text-gray-800 font-medium">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
