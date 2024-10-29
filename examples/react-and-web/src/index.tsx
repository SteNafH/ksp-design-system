import React from 'react';
import { createRoot } from 'react-dom/client';
import { KspButton } from '@stenafh/ksp-components';

function App() {
  return <KspButton autoSubmit={5} onKspClick={() => console.log('react')} />;
}

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
