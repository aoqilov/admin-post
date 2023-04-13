import React, { Suspense } from "react";
import { Layout } from "components";
import { Route, Routes } from "react-router-dom";
import { authRoutes, privateRoutes } from "./index";
import { useSelector } from "react-redux";
import { get } from "lodash";
import Notfound from "../pages/not found";

const appRoutes = (routes) => {
  return routes.map((route, idx) => (
    <React.Fragment key={idx}>
      <Route
        key={idx}
        path={route.path}
        element={<Suspense fallback="LOADING...">{route.element}</Suspense>}
      />
      {route.children && appRoutes(route.children)}
    </React.Fragment>
  ));
};

const routesWrapper = () => {
  const { isAuthenticated } = useSelector((state) => get(state, "auth"));
  return (
    <Routes>
      <Route path="*" element={<Notfound />} />
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          {appRoutes(privateRoutes)}
        </Route>
      ) : (
        appRoutes(authRoutes)
      )}
    </Routes>
  );
};

export default routesWrapper;
