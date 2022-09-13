import React from "react";
import ReactDOM from "react-dom";

import ContextContainer from "@common/components/context";
import { Messages } from "@common/components/LanguageRedirectContainer";
import { Toast } from "@common/components";
import App from "./components/App";
import * as adminFrench from "./lang/frCompiled.json";

ReactDOM.render(
  <>
    <ContextContainer messages={adminFrench as Messages}>
      <App />
    </ContextContainer>
    <Toast />
  </>,
  document.getElementById("app"),
);
