import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/pages/landingPage.jsx';
import LoginUser from './components/pages/loginUser.jsx';
import Booking from './components/pages/booking.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginUser />,
  },
  {
    path: '/booking',
    element: <Booking />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
