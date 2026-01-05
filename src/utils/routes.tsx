import { createBrowserRouter } from "react-router";
import Landing from "../pages/Landing";
import AboutUs from "../pages/AboutUs";
import News from "../pages/News";
import Certificates from "../pages/Certificates";
import Gallery from "../pages/Gallery";
import VideoGallery from "../pages/VideoGallery";
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import NewsManager from "../pages/admin/NewsManager";
import GalleryManager from "../pages/admin/GalleryManager";
import VideoManager from "../pages/admin/VideoManager";
import CertificatesManager from "../pages/admin/CertificatesManager";
import BannersManager from "../pages/admin/BannersManager";
import AboutManager from "../pages/admin/AboutManager";
import SiteSettingsManager from "../pages/admin/SiteSettingsManager";
import ServicesManager from "../pages/admin/ServicesManager";
import OverviewManager from "../pages/admin/OverviewManager";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/about",
    Component: AboutUs,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/news",
    Component: News,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/certificates",
    Component: Certificates,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/gallery",
    Component: Gallery,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/videos",
    Component: VideoGallery,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/dashboard",
    Component: () => (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/news",
    Component: () => (
      <ProtectedRoute>
        <NewsManager />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/gallery",
    Component: () => (
      <ProtectedRoute>
        <GalleryManager />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/videos",
    Component: () => (
      <ProtectedRoute>
        <VideoManager />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/certificates",
    Component: () => (
      <ProtectedRoute>
        <CertificatesManager />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/banners",
    Component: () => (
      <ProtectedRoute>
        <BannersManager />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/about",
    Component: () => (
      <ProtectedRoute>
        <AboutManager />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/settings",
    Component: () => (
      <ProtectedRoute>
        <SiteSettingsManager />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin/services",
    Component: () => (
      <ProtectedRoute>
        <ServicesManager />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
]);
