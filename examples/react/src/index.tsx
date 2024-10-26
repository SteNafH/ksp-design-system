import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@stenafh/ksp-components-react';

function App() {
  return <Button />;
}

const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
