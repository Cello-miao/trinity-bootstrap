import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductModal from './ProductModal';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete product');
      }
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleModalSuccess = () => {
    fetchProducts();
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Products</h2>
        <button className="btn-add" onClick={handleAdd}>
          + Add Product
        </button>
      </div>
      {products.length === 0 ? (
        <p className="no-products">No products available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>€{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        product={editingProduct}
      />
    </div>
  );
}

export default ProductList;
