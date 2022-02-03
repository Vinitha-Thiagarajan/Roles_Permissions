import React, { useState, useEffect } from "react";
import "./style.css";
import { useHistory, useLocation, Link } from "react-router-dom";
import Overview from "../../../resources/images/overview.svg";
import TraceChart from "../../../resources/images/TraceChart.svg";
import Anomaly from "../../../resources/images/anomaly_content.svg";
import Logo from "../../../resources/images/logo.svg";
import AuditLog from "../../../resources/images/AuditLog.svg";

const Sidebar = () => {
  let history = useHistory();
  let location = useLocation();
  const [page, setPage] = useState("Dashboard Overview");
  useEffect(() => {
    if (location && location.pathname) {
      if (location.pathname.indexOf("/dart/traceability_charts") > -1) {
        setPage("Traceability Charts");
      }
      else if (location.pathname.indexOf("/dart/anamaly_content") > -1){
        setPage("Anomaly Content");

      } else if (location.pathname.indexOf("/dart/audit_log") > -1){
        setPage("Audit Log");
      } 
      else {
        setPage("Dashboard Overview");
      }
    }
  }, [location]);
  return (
    <div className={"sidebar"}>
      <div className="sidebar-logo">
        <span>
          <img alt="" src={Logo} />
        </span>
      </div>
      <div className="sidebar-menu">
        <ul className="sidebar-list">
          <li
            className={`sidebar-list-li ${
              page === "Dashboard Overview" ? "sidebar-list-li-active" : ""
            }`}
            onClick={() => {
              history.push("/dart/dashboard");
            }}
          >
            <Link to={"/dart/dashboard"} className="sidebar-list-li-a">
              <span>
                <img alt="" src={Overview} />
              </span>
              <span className="sidebar-list-li-name">Overview</span>
            </Link>
          </li>
          <li
            className={`sidebar-list-li  ${
              page === "Anomaly Content" ? "sidebar-list-li-active" : ""
            }`}
          >
            <Link to={"/dart/anamaly_content"} className="sidebar-list-li-a ">
              <span>
                <img alt="" src={Anomaly} />
              </span>
              <span className="sidebar-list-li-name">Anomaly Content</span>
            </Link>
          </li>
          <li
            className={`sidebar-list-li ${
              page === "Traceability Charts" ? "sidebar-list-li-active" : ""
            }`}
          >
            <Link to={"/dart/traceability_charts"} className="sidebar-list-li-a">
              <span>
                <img alt="" src={TraceChart} />
              </span>
              <span className="sidebar-list-li-name">Traceability Charts</span>
            </Link>
          </li>
          <li
            className={`sidebar-list-li  ${
              page === "Audit Log" ? "sidebar-list-li-active" : ""
            }`}
          >
            <Link to={"/dart/audit_log"} className="sidebar-list-li-a ">
              <span>
                <img alt="" src={AuditLog} />
              </span>
              <span className="sidebar-list-li-name">Audit Log</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
