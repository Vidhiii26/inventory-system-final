import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Customers from './components/Customers';
import Orders from './components/Orders';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #ccc' }}>
          <h1>Inventory & Order Management</h1>
          <nav style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>Dashboard</Link>
            <Link to="/products" style={{ textDecoration: 'none', color: 'blue' }}>Products</Link>
            <Link to="/customers" style={{ textDecoration: 'none', color: 'blue' }}>Customers</Link>
            <Link to="/orders" style={{ textDecoration: 'none', color: 'blue' }}>Orders</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;