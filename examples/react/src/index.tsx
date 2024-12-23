import React from 'react';
import { createRoot } from 'react-dom/client';
import { KspButton } from '@stenafh/ksp-components';

function App() {
  return <KspButton />;
}

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
