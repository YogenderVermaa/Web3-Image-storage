import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoute.jsx";
import Layout from "../Layout.jsx";
import LayoutWithoutHeader from "../LayoutN.jsx";
import PageLoader from "../components/PageLoader.jsx";

const Wallet = lazy(() => import("../pages/Wallet.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const Upload = lazy(() => import("../pages/Upload.jsx"));
const HowWeWork = lazy(() => import("../pages/Work.jsx"));

const withSuspense = (element) => (
  <Suspense fallback={<PageLoader />}>{element}</Suspense>
);

export const routes = createBrowserRouter([
  {
    element: <LayoutWithoutHeader />,
    children: [{ path: "/", element: withSuspense(<Wallet />) }],
  },
  {
    element: <Layout />,
    children: [
      { path: "/home", element: <ProtectedRoute>{withSuspense(<HowWeWork />)}</ProtectedRoute> },
      { path: "/upload-image", element: <ProtectedRoute>{withSuspense(<Upload />)}</ProtectedRoute> },
      { path: "/gallery", element: <ProtectedRoute>{withSuspense(<Home />)}</ProtectedRoute> },
    ],
  },
  {
    path: "*",
    element: (
      <LayoutWithoutHeader>
        <h1>404 Not Found</h1>
      </LayoutWithoutHeader>
    ),
  },
]);
