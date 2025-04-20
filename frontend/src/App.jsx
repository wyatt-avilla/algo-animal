import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Homepage from './Homepage'; // A1
import LoginTings from './LoginTings'; // AA1
import HubPage from './HubPage'; // B1
import ShopPage from './ShopPage'; // C1
import WorkspaceIDEgame from './WorkspaceIDEgame'; // D1
import Zoo from './Zoo'; // E1

function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  return (
    <Router>
      {/* Optional Nav Bar */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/hub">Hub</Link> |{" "}
        <Link to="/shop">Shop</Link> |{" "}
        <Link to="/ide">IDE</Link> |{" "}
        <Link to="/zoo">Zoo</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginTings />} />
        <Route path="/hub" element={<HubPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/ide" element={<WorkspaceIDEgame />} />
        <Route path="/zoo" element={<Zoo />} />
      </Routes>
    </Router>
  );
}

export default App;
