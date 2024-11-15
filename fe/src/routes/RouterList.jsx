import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../components/pages/landingPage.jsx';
import LoginUser from '../components/pages/loginUser.jsx';
import Booking from '../components/pages/booking.jsx';
import DashboardUser from '../components/pages/dashboardUser.jsx';
import LandingJobUser from '../components/pages/landingJobUser.jsx';
import LinkedinProfileUser from '../components/pages/linkedinProfileUser.jsx';
import DashboardAdmin from '../components/pages/admin/dashboardAdmin.jsx';
import TestimoniAdmin from '../components/pages/admin/testimoniAdmin.jsx';
import FaqAdmin from '../components/pages/admin/faqAdmin.jsx';
import LoginAdmin from '../components/pages/admin/loginAdmin.jsx';
import CallbackPage from '../components/pages/callbackPage.jsx';
import LandingJobAdmin from '../components/pages/admin/landingJobAdmin.jsx';
import LinkedinProfileAdmin from '../components/pages/admin/linkdinProfileAdmin.jsx';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginUser /> },
  { path: '/callback', element: <CallbackPage /> },
  { path: '/booking', element: <Booking /> },
  { path: '/user', element: <DashboardUser /> },
  { path: '/user/landing-job', element: <LandingJobUser /> },
  { path: '/user/linkedin-profile', element: <LinkedinProfileUser /> },
  { path: '/login-admin', element: <LoginAdmin /> },
  { path: '/admin', element: <DashboardAdmin /> },
  { path: '/admin/testimoni', element: <TestimoniAdmin /> },
  { path: '/admin/faq', element: <FaqAdmin /> },
  { path: '/admin/landing-job', element: <LandingJobAdmin /> },
  { path: '/admin/linkedin-profile', element: <LinkedinProfileAdmin /> },
]);

export default router;
