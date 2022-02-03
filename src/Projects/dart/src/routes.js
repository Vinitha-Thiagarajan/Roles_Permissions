import React from "react";
import { Route, Switch } from "react-router-dom";
import TraceabilityFlow from "./containers/views/TraceabilityFlow";
import Overview from "./containers/views/Overview";
import Anamaly from "./containers/views/AnamalyContent";
import TraceabilityChart from "./containers/views/TraceabilityChart";
import AuditLog from "./containers/views/AuditLog";

const Routes = () => {
  return (
      <Switch>
        <Route exact path="/dart/dashboard" component={Overview} />
        <Route
          exact
          path="/dart/traceability_flow/:traceId"
          component={TraceabilityFlow}
        />
        <Route
          exact
          path="/dart/anamaly_content"
          component={Anamaly}
        />
        <Route
          exact
          path="/dart/traceability_charts/:traceId"
          component={TraceabilityChart}
        />
        <Route
          exact
          path="/dart/traceability_charts"
          component={TraceabilityChart}
        />
         <Route
          exact
          path="/dart/audit_log"
          component={AuditLog}
        />
      </Switch>
  );
};
export default Routes;
