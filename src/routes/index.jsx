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
// page
const Page = lazy(() => import("pages/pagge/index"));
const PageCreate = lazy(() => import("pages/pagge/components/create"));
const PageUpdate = lazy(() => import("pages/pagge/components/pupdate"));

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
    path: "blocked",
    element: <Blocked />,
  },
  {
    path: "about",
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
    path: "banner",
    element: <Banner />,
  },
  {
    path: "poost",
    element: <Poost />,
  },
  {
    path: "pages",
    element: <Page />,
    children: [
      {
        path: "pages/create",
        element: <PageCreate />,
      },
      {
        path: "pages/update/:id",
        element: <PageUpdate />,
      },
    ],
  },
];

export { authRoutes, privateRoutes };
