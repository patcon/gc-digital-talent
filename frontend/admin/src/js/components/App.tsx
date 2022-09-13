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
import { useAdminRoutes } from "../adminRoutes";
import { Role } from "../api/generated";

import { AdminNotAuthorized, AdminNotFound } from "./dashboard/Dashboard";

const HomePage = React.lazy(() => import("./home/HomePage"));
const Dashboard = React.lazy(() => import("./dashboard/Dashboard"));
const DashboardPage = React.lazy(() => import("./dashboard/DashboardPage"));

/** Users */
const UserPage = React.lazy(() => import("./user/UserPage"));
const CreateUser = React.lazy(() => import("./user/CreateUser"));
const UpdateUser = React.lazy(() => import("./user/UpdateUser"));
const ViewUser = React.lazy(() => import("./user/ViewUser"));

/** Classifications */
const ClassificationPage = React.lazy(
  () => import("./classification/ClassificationPage"),
);
const CreateClassification = React.lazy(
  () => import("./classification/CreateClassification"),
);
const UpdateClassification = React.lazy(
  () => import("./classification/UpdateClassification"),
);

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
  return isLoaded && loggedInUserRoles?.find((role) => allowedRoles.includes(role as Role))
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
            <Route path="users">
              <Route index element={<UserPage />} />
              <Route path="create" element={<CreateUser />} />
              <Route path=":userId" element={<ViewUser />} />
              <Route path=":userId/edit" element={<UpdateUser />} />
            </Route>
            <Route path="settings">
              <Route path="classifications">
                <Route index element={<ClassificationPage />} />
                <Route path="create" element={<CreateClassification />} />
                <Route
                  path=":classificationId/edit"
                  element={<UpdateClassification />}
                />
              </Route>
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<AdminNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
