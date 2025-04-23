"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuthAdmin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.replace("/admin-login");
    } else {
      setLoading(false);
    }
  }, [router]);

  return { loading };
};

export default useAuthAdmin;
