import { useEffect, useState } from 'react';
import './App.css';
// importing WorkspaceIDEGame component with correct capitalization
import WorkspaceIDEGame from './WorkspaceIDEgame.jsx';
import Homepage from './Homepage.jsx';
import HIW from './HIW.jsx';
import Shop from './Shop.jsx';

function App() {
  const [msg, setMsg] = useState('');
  
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);
  
  return (
    <div style={{
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <div style = {{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh'
      }}>
        <h1 style = {{
          marginBottom: '2px'
        }}>Algo Animal</h1>
        <section style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center'
        }}>
          <Homepage />
        </section>
      </div>
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        width: '80vw',
        height: '100vh',
        gap: '10px',
        margin: '0 auto',
        alignItems: 'center'
      }}>
        <HIW />
        <Shop />
      </div>
    </div>
  );
}

export default App;
