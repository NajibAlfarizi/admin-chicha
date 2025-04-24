const BASE_URL = "http://localhost:5000/api";

export async function getProducts() {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error("Gagal mengambil data produk");
    return await res.json();
}

export async function getProductById(id) {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Gagal mengambil data produk");
    return await res.json();
}

export async function createProduct(data, token) {
    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal menambahkan produk");
    return await res.json();
}

export async function updateProduct(id, data, token) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal mengupdate produk");
    return await res.json();
}

export async function deleteProduct(id, token) {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error("Gagal menghapus produk");
    return await res.json();
}