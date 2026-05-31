import { useState, useEffect } from 'react';
import api from '../api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    lowStockProducts: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, customersRes, ordersRes] = await Promise.all([
        api.get('/products'),
        api.get('/customers'),
        api.get('/orders')
      ]);

      const products = productsRes.data;
      console.log("fetched data successfully", productsRes.data);
      const lowStock = products.filter(p => p.quantity < 10); 

      setStats({
        totalProducts: products.length,
        totalCustomers: customersRes.data.length,
        totalOrders: ordersRes.data.length,
        lowStockProducts: lowStock
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Dashboard Summary</h2>
      
      {/* Overview Cards */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', justifyContent: 'center' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', minWidth: '150px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#555' }}>Total Products</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{stats.totalProducts}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', minWidth: '150px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#555' }}>Total Customers</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{stats.totalCustomers}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', minWidth: '150px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
          <h3 style={{ color: '#555' }}>Total Orders</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{stats.totalOrders}</p>
        </div>
      </div>

      {/* Low Stock Warnings */}
      <h3 style={{ textAlign: 'center', color: '#555' }}>Low Stock Products (Quantity &lt; 10)</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#ffeaea' }}>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Quantity Left</th>
          </tr>
        </thead>
        <tbody>
          {stats.lowStockProducts.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>All products are well stocked!</td></tr>
          ) : (
            stats.lowStockProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td style={{ color: 'red', fontWeight: 'bold' }}>{p.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;