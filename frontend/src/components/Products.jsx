import { useState, useEffect } from 'react';
import api from '../api';

function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', sku: '', price: '', quantity: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('fetching products list...');
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      });
      fetchProducts(); 
      setFormData({ name: '', sku: '', price: '', quantity: '' }); 
      alert("Product added successfully!");
    } catch (error) {
      alert("Error: " + (error.response?.data?.detail || "Could not add product"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        alert("Error deleting product");
      }
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
        <h3>Add New Product</h3>
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required style={{ margin: '5px' }} />
        <input type="text" name="sku" placeholder="SKU/Code" value={formData.sku} onChange={handleChange} required style={{ margin: '5px' }} />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required step="0.01" style={{ margin: '5px' }} />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required style={{ margin: '5px' }} />
        <button type="submit" style={{ margin: '5px', padding: '5px 15px' }}>Add Product</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No products found.</td></tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleDelete(product.id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;