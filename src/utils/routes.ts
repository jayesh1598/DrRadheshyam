import { createBrowserRouter } from "react-router";
import Landing from "../pages/Landing";
import AboutUs from "../pages/AboutUs";
import News from "../pages/News";
import Certificates from "../pages/Certificates";
import Gallery from "../pages/Gallery";
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import NewsManager from "../pages/admin/NewsManager";
import GalleryManager from "../pages/admin/GalleryManager";
import CertificatesManager from "../pages/admin/CertificatesManager";
import BannersManager from "../pages/admin/BannersManager";
import AboutManager from "../pages/admin/AboutManager";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/about",
    Component: AboutUs,
  },
  {
    path: "/news",
    Component: News,
  },
  {
    path: "/certificates",
    Component: Certificates,
  },
  {
    path: "/gallery",
    Component: Gallery,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/news",
    element: (
      <ProtectedRoute>
        <NewsManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/gallery",
    element: (
      <ProtectedRoute>
        <GalleryManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/certificates",
    element: (
      <ProtectedRoute>
        <CertificatesManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/banners",
    element: (
      <ProtectedRoute>
        <BannersManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/about",
    element: (
      <ProtectedRoute>
        <AboutManager />
      </ProtectedRoute>
    ),
  },
]);