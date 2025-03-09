import { scan } from "react-scan"; // must be imported before React and React DOM
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { StrictMode } from 'react';

// TODO install an extension instead
scan({
  enabled: false,
  trackUnnecessaryRenders: true
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
