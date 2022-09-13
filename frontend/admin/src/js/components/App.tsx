import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthenticationContext } from "@common/components/Auth";
import Dashboard from "./dashboard/Dashboard";
import { useAdminRoutes } from "../adminRoutes";
import HomePage from "./home/HomePage";
import DashboardPage from "./dashboard/DashboardPage";

const useAuth = () => {
  return React.useContext(AuthenticationContext);
};

const ProtectedRoute = () => {
  const { loggedIn } = useAuth();
  const paths = useAdminRoutes();

  if (!loggedIn) return <Navigate to={paths.home()} replace />;

  return <Outlet />;
};

const App = () => {
  const paths = useAdminRoutes();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home()} element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
