import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { Login, Orders, NotFound, ChangePassword } from "~/components/pages";
import MainLayout from "~/components/layouts/MainLayout";
import ErrorBoundary from "~/components/pages/ErrorBoundary";

const baseRouter = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const routerList = [
  {
    path: "/",
    element: <Orders />,
  },
];

const devRouter = routerList.map((router) => {
  return {
    ...router,
    element: <MainLayout>{router.element}</MainLayout>,
  };
});

const prodRouter = routerList.map((router) => {
  return {
    ...router,
    element: (
      <ErrorBoundary>
        <MainLayout>{router.element}</MainLayout>
      </ErrorBoundary>
    ),
  };
});

const routers =
  process.env.NODE_ENV === "development"
    ? [...baseRouter, ...devRouter]
    : [...baseRouter, ...prodRouter];

export default createBrowserRouter(routers);
