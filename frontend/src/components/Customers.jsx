import { useState, useEffect } from 'react';
import api from '../api';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ full_name: '', email: '', phone_number: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/customers', formData);
      fetchCustomers();
      setFormData({ full_name: '', email: '', phone_number: '' });
      alert("Customer added successfully!");
    } catch (error) {
      alert("Error: " + (error.response?.data?.detail || "Could not add customer"));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await api.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (error) {
        alert("Error deleting customer");
      }
    }
  };

  return (
    <div>
      <h2>Manage Customers</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
        <h3>Add New Customer</h3>
        <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required style={{ margin: '5px' }} />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={{ margin: '5px' }} />
        <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required style={{ margin: '5px' }} />
        <button type="submit" style={{ margin: '5px', padding: '5px 15px' }}>Add Customer</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No customers found.</td></tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.full_name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone_number}</td>
                <td>
                  <button onClick={() => handleDelete(customer.id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;