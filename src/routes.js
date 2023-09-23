import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import Page404 from "./pages/Page404";

import DashboardPage from "./pages/DashboardPage";
import HrmPage from "./pages/HrmPage";
import AddStockPage from "./pages/AddStockPage";
import AccountPage from "./pages/AccountsPage";
import BillingPage from "./pages/BillingPage";
import ReportingPage from "./pages/ReportingPage";
import SettingPage from "./pages/SettingPage";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardPage /> },
        { path: "user", element: <HrmPage /> },
        { path: "add-stock", element: <AddStockPage /> },
        { path: "accounts", element: <AccountPage /> },
        { path: "billing", element: <BillingPage /> },
        { path: "reporting", element: <ReportingPage /> },
        { path: "setting", element: <SettingPage /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
