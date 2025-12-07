import { createBrowserRouter } from "react-router";
import Landing from "../pages/Landing";
import AboutUs from "../pages/AboutUs";
import News from "../pages/News";
import Certificates from "../pages/Certificates";
import Gallery from "../pages/Gallery";

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
]);