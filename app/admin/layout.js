import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../../app/globals.css"; // Import Tailwind CSS

export const metadata = {
  title: "Admin Dashboard - ChiCha Mobile",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten utama */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Konten Dashboard */}
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
