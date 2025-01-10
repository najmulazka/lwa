import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/pages/landingPage.jsx';
import LoginUser from '../components/pages/loginUser.jsx';
import RegisterUser from '../components/pages/registerUser.jsx';
import Booking from '../components/pages/booking.jsx';
import DreamJobUser from '../components/pages/dreamJobUser.jsx';
import DashboardUser from '../components/pages/dashboardUser.jsx';
import LandingJobUser from '../components/pages/landingJobUser.jsx';
import LinkedinProfileUser from '../components/pages/linkedinProfileUser.jsx';
import Profession from '../components/pages/professionUser.jsx';
import DashboardAdmin from '../components/pages/admin/dashboardAdmin.jsx';
import TestimoniAdmin from '../components/pages/admin/testimoniAdmin.jsx';
import FaqAdmin from '../components/pages/admin/faqAdmin.jsx';
import LoginAdmin from '../components/pages/admin/loginAdmin.jsx';
import CallbackPage from '../components/pages/callbackPage.jsx';
import LandingJobAdmin from '../components/pages/admin/landingJobAdmin.jsx';
import LinkedinProfileAdmin from '../components/pages/admin/linkdinProfileAdmin.jsx';
import { Protected, ProtectedUser } from '../utils/protected.js';

export const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route
          path="/user/dream-job"
          element={
            <ProtectedUser>
              <DreamJobUser />
            </ProtectedUser>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedUser>
              <DashboardUser />
            </ProtectedUser>
          }
        />
        <Route
          path="/user/landing-job"
          element={
            <ProtectedUser>
              <LandingJobUser />
            </ProtectedUser>
          }
        />
        <Route
          path="/user/linkedin-profile"
          element={
            <ProtectedUser>
              <LinkedinProfileUser />
            </ProtectedUser>
          }
        />
        <Route
          path="/user/profession"
          element={
            <ProtectedUser>
              <Profession />
            </ProtectedUser>
          }
        />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route
          path="/admin"
          element={
            <Protected>
              <DashboardAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/testimoni"
          element={
            <Protected>
              <TestimoniAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/faq"
          element={
            <Protected>
              <FaqAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/landing-job"
          element={
            <Protected>
              <LandingJobAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/linkedin-profile"
          element={
            <Protected>
              <LinkedinProfileAdmin />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
// createBrowserRouter([
//   { path: '/', element: <LandingPage /> },
//   { path: '/login', element: <LoginUser /> },
//   { path: '/callback', element: <CallbackPage /> },
//   { path: '/booking', element: <Booking /> },
//   { path: '/user', element: <DashboardUser /> },
//   { path: '/user/landing-job', element: <LandingJobUser /> },
//   { path: '/user/linkedin-profile', element: <LinkedinProfileUser /> },
//   { path: '/login-admin', element: <LoginAdmin /> },
//   { path: '/admin', element: <DashboardAdmin /> },
//   { path: '/admin/testimoni', element: <TestimoniAdmin /> },
//   { path: '/admin/faq', element: <FaqAdmin /> },
//   { path: '/admin/landing-job', element: <LandingJobAdmin /> },
//   { path: '/admin/linkedin-profile', element: <LinkedinProfileAdmin /> },
// ]);

export default RouterList;
