import 'react-toastify/dist/ReactToastify.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import { RouterProvider } from 'react-router-dom';
import RouterList from './routes/RouterList';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <RouterList />
    {/* <RouterProvider router={RouterList} /> */}
  </StrictMode>
);
