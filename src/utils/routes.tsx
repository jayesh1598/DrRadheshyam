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
    path: "/videos",
    Component: VideoGallery,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: () => (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/news",
    Component: () => (
      <ProtectedRoute>
        <NewsManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/gallery",
    Component: () => (
      <ProtectedRoute>
        <GalleryManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/videos",
    Component: () => (
      <ProtectedRoute>
        <VideoManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/certificates",
    Component: () => (
      <ProtectedRoute>
        <CertificatesManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/banners",
    Component: () => (
      <ProtectedRoute>
        <BannersManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/about",
    Component: () => (
      <ProtectedRoute>
        <AboutManager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/settings",
    Component: () => (
      <ProtectedRoute>
        <SiteSettingsManager />
      </ProtectedRoute>
    ),
  },
]);
