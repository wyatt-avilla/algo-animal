import { useEffect, useState } from 'react'
// importing WorkspaceIDEGame component with correct capitalization
import WorkspaceIDEGame from './WorkspaceIDEgame.jsx'

function App() {
  const [msg, setMsg] = useState('');
  
  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);
  
  return (
    <div>
      <h1>WorkspaceIDEgame.jsx</h1>
      <WorkspaceIDEGame />
    </div>
  );
}

export default App;
