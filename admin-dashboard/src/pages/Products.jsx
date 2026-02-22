import { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
} from "../api/axios";
import { Plus, Pencil, Trash2 } from "lucide-react";

const emptyProduct = {
  name: "",
  brand: "",
  description: "",
  price: "",
  image: "",
  category: "",
  stock: ""
};

export function Products() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProduct);

  const fetchProducts = () => {
    setLoading(true);
    getProducts()
      .then(setList)
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load products")
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyProduct);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      brand: p.brand || "",
      description: p.description || "",
      price: p.price?.toString() ?? "",
      image: p.image || "",
      category: p.category || "",
      stock: p.stock?.toString() ?? ""
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyProduct);
  };

  /* =============================
     IMAGE UPLOAD HANDLER
  ==============================*/
  const handleImageUpload = async (file) => {
    if (!file) return;

    try {
      setUploading(true);
      const data = await uploadProductImage(file);
      setForm((prev) => ({ ...prev, image: data.imageUrl || "" }));
    } catch (err) {
      console.error("Image upload error:", err.response?.data || err);
      const msg =
        err.response?.data?.message || err.message || "Image upload failed";
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  /* =============================
     SUBMIT PRODUCT
  ==============================*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      description: form.description.trim(),
      price: Number(form.price) || 0,
      image: form.image.trim(),
      category: form.category.trim(),
      stock: Number(form.stock) || 0
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      closeModal();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Request failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200 bg-white">
                {list.map((p) => (
                  <tr key={p._id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image && (
                          <img
                            src={p.image}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        )}
                        <span>{p.name}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">₹{p.price}</td>

                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openEdit(p)}>
                        <Pencil />
                      </button>
                      <button onClick={() => handleDelete(p._id)}>
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full border p-2"
              />

              <input
                placeholder="Brand"
                value={form.brand}
                onChange={(e) =>
                  setForm((f) => ({ ...f, brand: e.target.value }))
                }
                className="w-full border p-2"
              />

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                className="w-full border p-2"
              />

              <input
                type="number"
                placeholder="Stock Available"
                value={form.stock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stock: e.target.value }))
                }
                className="w-full border p-2"
                min={0}
              />

              <div className="space-y-3">
                <input
                  placeholder="Image URL"
                  value={form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                  className="w-full border p-2"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="w-full"
                />

                {uploading && (
                  <p className="text-sm text-gray-500">Uploading image...</p>
                )}

                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="h-32 rounded object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editingId ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
