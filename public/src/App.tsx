import { useState } from 'react';
import ProjectDetail from './ProjectDetail';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* Header / Logos */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '2rem 0' }}>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} alt="Vite Logo" style={{ height: 40 }} />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} alt="React Logo" style={{ height: 40 }} />
        </a>
      </div>

      <h1>My Blockchain Portfolio</h1>

      {/* Optional counter to test React state */}
      <div style={{ margin: '1rem 0' }}>
        <button onClick={() => setCount(count + 1)}>
          Count is {count}
        </button>
      </div>

      {/* Project Detail Component */}
      <ProjectDetail />
    </div>
  );
}