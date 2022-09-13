import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import {
  AuthenticationContext,
  AuthorizationContext,
} from "@common/components/Auth";
import Dashboard, {
  AdminNotAuthorized,
  AdminNotFound,
} from "./dashboard/Dashboard";
import { useAdminRoutes } from "../adminRoutes";
import HomePage from "./home/HomePage";
import DashboardPage from "./dashboard/DashboardPage";
import { Role } from "../api/generated";

const useAuth = () => {
  return {
    ...React.useContext(AuthenticationContext),
    ...React.useContext(AuthorizationContext),
  };
};

interface RequireAuthProps {
  allowedRoles: Role[];
}
const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { loggedIn, loggedInUserRoles, isLoaded } = useAuth();
  const paths = useAdminRoutes();

  /* eslint-disable prettier/prettier */
  // eslint-disable-next-line no-nested-ternary
  return isLoaded && loggedInUserRoles?.find((role) => allowedRoles.includes(role))
    ? <Outlet />
    : loggedIn
      ? <Navigate to={`${paths.home()}/unauthorized`} replace />
      : <Navigate to={paths.home()} replace />;
  /* eslint-enable prettier/prettier */
};

const App = () => {
  const paths = useAdminRoutes();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home()} element={<Dashboard />}>
          {/* public routes */}
          <Route index element={<HomePage />} />
          <Route path="unauthorized" element={<AdminNotAuthorized />} />

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={[Role.Admin]} />}>
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<AdminNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
