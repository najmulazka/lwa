import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/pages/landingPage.jsx';
import LoginUser from './components/pages/loginUser.jsx';
import Booking from './components/pages/booking.jsx';
import DashboardUser from './components/pages/dashboardUser.jsx';
import LandingJobUser from './components/pages/landingJobUser.jsx';
import LinkedinProfileUser from './components/pages/linkedinProfileUser.jsx';
import DashboardAdmin from './components/pages/dashboardAdmin.jsx';
import TestimoniAdmin from './components/pages/testimoniAdmin.jsx';
import FaqAdmin from './components/pages/faqAdmin.jsx';
import LoginAdmin from './components/pages/loginAdmin.jsx';
import CallbackPage from './components/pages/callbackPage.jsx';

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
    path: '/callback',
    element: <CallbackPage />,
  },
  {
    path: '/booking',
    element: <Booking />,
  },
  {
    path: '/user',
    element: <DashboardUser />,
  },
  {
    path: '/user/landing-job',
    element: <LandingJobUser />,
  },
  {
    path: '/user/linkedin-profile',
    element: <LinkedinProfileUser />,
  },
  {
    path: '/login-admin',
    element: <LoginAdmin />,
  },
  {
    path: '/admin',
    element: <DashboardAdmin />,
  },
  {
    path: '/admin/testimoni',
    element: <TestimoniAdmin />,
  },
  {
    path: '/admin/faq',
    element: <FaqAdmin/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
