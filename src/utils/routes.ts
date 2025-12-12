import { createBrowserRouter, RouteObject } from "react-router";
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

// Protected route wrapper component
const AdminRoute = ({ Component }: { Component: React.ComponentType }) => {
  return (
    <ProtectedRoute>
      <Component />
    </ProtectedRoute>
  );
};

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
    Component: () => <AdminRoute Component={AdminDashboard} />,
  },
  {
    path: "/admin/news",
    Component: () => <AdminRoute Component={NewsManager} />,
  },
  {
    path: "/admin/gallery",
    Component: () => <AdminRoute Component={GalleryManager} />,
  },
  {
    path: "/admin/certificates",
    Component: () => <AdminRoute Component={CertificatesManager} />,
  },
  {
    path: "/admin/banners",
    Component: () => <AdminRoute Component={BannersManager} />,
  },
  {
    path: "/admin/about",
    Component: () => <AdminRoute Component={AboutManager} />,
  },
] as RouteObject[]);