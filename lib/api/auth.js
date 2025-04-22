const BASE_URL = "http://localhost:5000/api";

export async function loginAdmin({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login gagal");
  }

  return data; // return data yang berisi token, email, dll
}
