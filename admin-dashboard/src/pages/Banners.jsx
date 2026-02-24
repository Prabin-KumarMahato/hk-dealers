import { useState, useEffect } from "react";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  uploadProductImage, // Reusing the same image upload endpoint
} from "../api/axios";
import { Plus, Pencil, Trash2 } from "lucide-react";

const emptyBanner = {
  title: "",
  subtitle: "",
  image: "",
  linkURL: "/products",
  isActive: true,
  order: 0,
};

export function Banners() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyBanner);

  const fetchBanners = () => {
    setLoading(true);
    getBanners()
      .then(setList)
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load banners"),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyBanner);
    setModalOpen(true);
  };

  const openEdit = (b) => {
    setEditingId(b._id);
    setForm({
      title: b.title,
      subtitle: b.subtitle || "",
      image: b.image || "",
      linkURL: b.linkURL || "",
      isActive: b.isActive,
      order: b.order || 0,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyBanner);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      image: form.image.trim(),
      linkURL: form.linkURL.trim(),
      isActive: form.isActive,
      order: Number(form.order) || 0,
    };

    try {
      if (editingId) {
        await updateBanner(editingId, payload);
      } else {
        await createBanner(payload);
      }
      closeModal();
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.message || "Request failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    try {
      await deleteBanner(id);
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Banners Manager
        </h1>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          Add Banner
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
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Banner
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {list.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No banners found. Add a banner to display it on the home
                      page slider.
                    </td>
                  </tr>
                ) : (
                  list.map((b) => (
                    <tr key={b._id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {b.image ? (
                            <img
                              src={b.image}
                              alt=""
                              className="h-10 w-20 rounded object-cover"
                            />
                          ) : (
                            <div className="h-10 w-20 rounded bg-gray-200" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {b.title}
                            </div>
                            {b.subtitle && (
                              <div className="text-xs text-gray-500">
                                {b.subtitle}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${b.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {b.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">{b.order}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => openEdit(b)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Pencil className="h-5 w-5 inline" />
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              aria-label="Close"
            >
              <span className="text-3xl leading-none">&times;</span>
            </button>
            <h2 className="text-lg font-semibold pr-8">
              {editingId ? "Edit Banner" : "Add Banner"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                placeholder="Main Title (e.g. Luxury Timepieces)"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                placeholder="Subtitle (Optional)"
                value={form.subtitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subtitle: e.target.value }))
                }
                className="w-full border p-2 rounded"
              />

              <input
                placeholder="Link URL (e.g. /products)"
                value={form.linkURL}
                onChange={(e) =>
                  setForm((f) => ({ ...f, linkURL: e.target.value }))
                }
                className="w-full border p-2 rounded"
              />

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, isActive: e.target.checked }))
                    }
                  />
                  <span>Active</span>
                </label>

                <div className="flex items-center gap-2 ml-auto">
                  <label>Order:</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, order: e.target.value }))
                    }
                    className="w-20 border p-1 rounded"
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <input
                  placeholder="Image URL"
                  value={form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                  className="w-full border p-2 rounded"
                  required
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  className="w-full text-sm"
                />

                {uploading && (
                  <p className="text-sm text-gray-500">Uploading image...</p>
                )}

                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="h-32 w-full rounded object-cover"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {editingId ? "Update Banner" : "Create Banner"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
