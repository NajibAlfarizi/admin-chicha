"use client";
import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories", {
          cache: "no-store",
        });
        const data = await res.json();
        setCategories(data); // ✅ langsung set array
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}
