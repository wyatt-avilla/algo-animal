import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Homepage';
import ShopPage from './ShopPage';
import Zoo from './Zoo'

function App() {
  const [msg, setMsg] = useState('');
  
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);
  
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '1rem',
          background: '#333',
          marginBottom: '1rem'
        }}>
          <Link to="/" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Home</Link>
          <Link to="/zoo" style={{ margin: '0 1rem', color: '#fff', textDecoration: 'none' }}>Zoo Layout</Link>
        </nav>
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/zoo" element={<Zoo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;