import React, { useEffect, useState, useRef } from "react";
import API from "../../api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    stock: "",
  });
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreviewImage(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (form.price <= 0) newErrors.price = "Price must be positive";
    if (form.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (!form.image && !editId) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setError(null);

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      if (editId) {
        await API.put(`/products/${editId}`, formData);
      } else {
        await API.post("/products", formData);
      }
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        stock: "",
      });
      setEditId(null);
      setPreviewImage(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: null,
      stock: product.stock,
    });
    setEditId(product._id);
    setPreviewImage(product.image);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* Add/Edit Product Form */}
      <form
        onSubmit={handleAddOrUpdateProduct}
        className="bg-white shadow rounded p-4 mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Product" : "Add Product"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Product Name"
            required
            className="border p-2 rounded"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleFormChange}
            placeholder="Category"
            required
            className="border p-2 rounded"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleFormChange}
            placeholder="Price"
            required
            className="border p-2 rounded"
          />
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleFormChange}
            placeholder="Stock Quantity"
            required
            className="border p-2 rounded"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFormChange}
            ref={fileInputRef}
            className="hidden"
          />
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Choose Image
            </button>
            <span className="text-gray-600">
              {form.image ? form.image.name : "No file chosen"}
            </span>
          </div>

          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg shadow"
              />
            </div>
          )}

          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Description"
            required
            className="border p-2 rounded md:col-span-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">${p.price}</td>
                <td className="py-2 px-4">{p.stock}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
