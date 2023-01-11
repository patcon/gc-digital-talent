import React, { createContext } from "react";
import { reactPlugin } from "../AppInsights/ReactPlugin";

const AppInsightsContext = createContext(reactPlugin);

const AppInsightsContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => (
  <AppInsightsContext.Provider value={reactPlugin}>
    {children}
  </AppInsightsContext.Provider>
);

export { AppInsightsContext, AppInsightsContextProvider };