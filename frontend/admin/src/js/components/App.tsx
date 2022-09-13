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
import { checkFeatureFlag } from "@common/helpers/runtimeVariable";
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

/** CMO Assets */
const CmoAssetPage = React.lazy(() => import("./cmoAsset/CmoAssetPage"));
const CreateCmoAsset = React.lazy(() => import("./cmoAsset/CreateCmoAsset"));
const UpdateCmoAsset = React.lazy(() => import("./cmoAsset/UpdateCmoAsset"));

/** Pool Candidates */
const PoolCandidatePage = React.lazy(
  () => import("./poolCandidate/PoolCandidatePage"),
);

/** Pools */
const PoolPage = React.lazy(() => import("./pool/PoolPage"));
const CreatePool = React.lazy(() => import("./pool/CreatePool"));
const EditPool = React.lazy(() => import("./pool/EditPool/EditPool"));
const ViewPool = React.lazy(() => import("./pool/ViewPool"));
const DeprecatedViewPool = React.lazy(
  () => import("./pool/deprecated/ViewPool"),
);
const DeprecatedUpdatePool = React.lazy(
  () => import("./pool/deprecated/UpdatePool"),
);
const DeprecatedCreatePool = React.lazy(
  () => import("./pool/deprecated/CreatePool"),
);

/** Departments */
const DepartmentPage = React.lazy(() => import("./department/DepartmentPage"));
const CreateDepartment = React.lazy(
  () => import("./department/CreateDepartment"),
);
const UpdateDepartment = React.lazy(
  () => import("./department/UpdateDepartment"),
);

/** Skill Families */
const SkillFamilyPage = React.lazy(
  () => import("./skillFamily/SkillFamilyPage"),
);
const CreateSkillFamily = React.lazy(
  () => import("./skillFamily/CreateSkillFamily"),
);
const UpdateSkillFamily = React.lazy(
  () => import("./skillFamily/UpdateSkillFamily"),
);

/** Skills */
const SkillPage = React.lazy(() => import("./skill/SkillPage"));
const CreateSkill = React.lazy(() => import("./skill/CreateSkill"));
const UpdateSkill = React.lazy(() => import("./skill/UpdateSkill"));

/** Search Requests */
const SearchRequestPage = React.lazy(
  () => import("./searchRequest/SearchRequestPage"),
);
const SingleSearchRequestPage = React.lazy(
  () => import("./searchRequest/SingleSearchRequestPage"),
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
                {/* eslint-disable-next-line prettier/prettier */}
                <Route path=":classificationId/edit" element={<UpdateClassification />} />
              </Route>
              <Route path="departments">
                <Route index element={<DepartmentPage />} />
                <Route path="create" element={<CreateDepartment />} />
                {/* eslint-disable-next-line prettier/prettier */}
                <Route path=":departmentId/edit" element={<UpdateDepartment />} />
              </Route>
              <Route path="skills">
                <Route index element={<SkillPage />} />
                <Route path="create" element={<CreateSkill />} />
                <Route path=":skillId/edit" element={<UpdateSkill />} />

                <Route path="families">
                  <Route index element={<SkillFamilyPage />} />
                  <Route path="create" element={<CreateSkillFamily />} />
                  {/* eslint-disable-next-line prettier/prettier */}
                  <Route path=":skillFamilyId/edit" element={<UpdateSkillFamily />} />
                </Route>
              </Route>
            </Route>

            <Route path="cmo-assets">
              <Route index element={<CmoAssetPage />} />
              <Route path="create" element={<CreateCmoAsset />} />
              <Route path=":cmoAssetId/edit" element={<UpdateCmoAsset />} />
            </Route>

            <Route path="talent-requests">
              <Route index element={<SearchRequestPage />} />
              <Route path=":requestId" element={<SingleSearchRequestPage />} />
            </Route>

            <Route path="pools">
              <Route index element={<PoolPage />} />
              {/* eslint-disable-next-line prettier/prettier */}
              <Route path=":poolId" element={
                  checkFeatureFlag("FEATURE_DIRECTINTAKE") ? (
                    <ViewPool />
                  ) : (
                    <DeprecatedViewPool />
                  )
                }
              />
              {/* eslint-disable-next-line prettier/prettier */}
              <Route path=":poolId/pool-candidates" element={<PoolCandidatePage />} />
              {/* eslint-disable-next-line prettier/prettier */}
              <Route path="create" element={
                  checkFeatureFlag("FEATURE_DIRECTINTAKE") ? (
                    <CreatePool />
                  ) : (
                    <DeprecatedCreatePool />
                  )
                }
              />
              {/* eslint-disable-next-line prettier/prettier */}
              <Route path=":poolId/edit" element={
                  checkFeatureFlag("FEATURE_DIRECTINTAKE") ? (
                    <EditPool />
                  ) : (
                    <DeprecatedUpdatePool />
                  )
                }
              />
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
