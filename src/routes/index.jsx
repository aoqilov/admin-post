import { lazy } from "react";

const Home = lazy(() => import("pages/home"));
const Registration = lazy(() => import("pages/auth/registration"));
const Login = lazy(() => import("pages/auth/login"));
const Blocked = lazy(() => import("pages/auth/blocked"));
const About = lazy(() => import("pages/about"));
const AboutUsers = lazy(() => import("pages/about/users"));
const AboutCompany = lazy(() => import("pages/about/company"));
const Contact = lazy(() => import("pages/contact"));
const Banner = lazy(() => import("pages/banner"));
const Poost = lazy(() => import("pages/post"));

const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/registration",
    element: <Registration />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blocked",
    element: <Blocked />,
  },
  {
    path: "/about",
    element: <About />,
    children: [
      {
        path: "users",
        element: <AboutUsers />,
      },
      {
        path: "company",
        element: <AboutUsers />,
      },
    ],
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "banner",
    element: <Banner />,
  },
  {
    path: "poost",
    element: <Poost />,
  },
];

export { authRoutes, privateRoutes };
