import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { useAdminRoutes } from "../adminRoutes";
import HomePage from "./home/HomePage";
import DashboardPage from "./dashboard/DashboardPage";

const App = () => {
  const paths = useAdminRoutes();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home()} element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
