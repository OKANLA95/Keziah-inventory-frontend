import React, { useState } from 'react';
import styles from './ProductsPage.module.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Tomatoes',
      price: 10,
      stock: 30,
      category: 'Vegetable',
      size: 'Small',
      image: '',
    },
    {
      id: 2,
      name: 'Rice',
      price: 25,
      stock: 15,
      category: 'Grain',
      size: 'Medium',
      image: '',
    },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    size: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddOrUpdateProduct = () => {
    if (!formData.name || !formData.price) return;

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    if (editingId) {
      // Update existing product
      setProducts((prev) =>
        prev.map((prod) => (prod.id === editingId ? { ...prod, ...newProduct } : prod))
      );
    } else {
      // Add new product
      newProduct.id = Date.now();
      setProducts((prev) => [...prev, newProduct]);
    }

    // Reset form
    setFormData({
      name: '',
      price: '',
      stock: '',
      category: '',
      size: '',
      image: '',
    });
    setEditingId(null);
    setFormVisible(false);
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    if (editingId === id) {
      setFormVisible(false);
      setEditingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Products</h1>
      <button
        className={styles.addBtn}
        onClick={() => {
          setFormVisible(!formVisible);
          setFormData({
            name: '',
            price: '',
            stock: '',
            category: '',
            size: '',
            image: '',
          });
          setEditingId(null);
        }}
      >
        {formVisible ? 'Cancel' : '+ Add New Product'}
      </button>

      {formVisible && (
        <div className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleInputChange}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              style={{ width: '80px', marginTop: '10px' }}
            />
          )}
          <button onClick={handleAddOrUpdateProduct}>
            {editingId ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Size</th>
            <th>Price (GHS)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.image ? <img src={p.image} alt="" width="50" /> : '—'}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.size}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className={styles.editBtn} onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
