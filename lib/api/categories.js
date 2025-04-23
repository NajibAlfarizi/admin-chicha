const BASE_URL = "http://localhost:5000/api";

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Gagal mengambil data kategori");
  return await res.json();
}

export async function createCategory(name, token) {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Gagal menambahkan kategori");
  return await res.json();
}

export async function updateCategory(id, name, token) {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Gagal mengupdate kategori");
  return await res.json();
}

export async function deleteCategory(id, token) {
  const res = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Gagal menghapus kategori");
  return await res.json();
}
