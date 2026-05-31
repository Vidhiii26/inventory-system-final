import { useState, useEffect } from 'react';
import api from '../api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ customer_id: '', product_id: '', quantity: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, productsRes, customersRes] = await Promise.all([
        api.get('/orders'),
        api.get('/products'),
        api.get('/customers')
      ]);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
      setCustomers(customersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/orders', {
        customer_id: parseInt(formData.customer_id),
        product_id: parseInt(formData.product_id),
        quantity: parseInt(formData.quantity)
      });
      fetchData(); // Sab kuch dobara fetch karein kyunki product ki quantity kam ho jayegi
      setFormData({ customer_id: '', product_id: '', quantity: '' });
      alert("Order placed successfully!");
    } catch (error) {
      alert("Error: " + (error.response?.data?.detail || "Could not place order"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await api.delete(`/orders/${id}`);
        fetchData();
      } catch (error) {
        alert("Error deleting order");
      }
    }
  };

  // Helper functions to show names instead of just IDs
  const getCustomerName = (id) => customers.find(c => c.id === id)?.full_name || id;
  const getProductName = (id) => products.find(p => p.id === id)?.name || id;

  return (
    <div>
      <h2>Manage Orders</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
        <h3>Create New Order</h3>
        
        <select name="customer_id" value={formData.customer_id} onChange={handleChange} required style={{ margin: '5px', padding: '5px' }}>
          <option value="">Select Customer</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
        </select>

        <select name="product_id" value={formData.product_id} onChange={handleChange} required style={{ margin: '5px', padding: '5px' }}>
          <option value="">Select Product</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name} (Stock: {p.quantity} | Price: ${p.price})</option>)}
        </select>

        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required min="1" style={{ margin: '5px' }} />
        
        <button type="submit" style={{ margin: '5px', padding: '5px 15px' }}>Place Order</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No orders found.</td></tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{getCustomerName(order.customer_id)}</td>
                <td>{getProductName(order.product_id)}</td>
                <td>{order.quantity}</td>
                <td>${order.total_amount}</td>
                <td>
                  <button onClick={() => handleDelete(order.id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;