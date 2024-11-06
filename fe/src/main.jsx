import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import RouterList from './routes/RouterList';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={RouterList} />
  </StrictMode>
);
