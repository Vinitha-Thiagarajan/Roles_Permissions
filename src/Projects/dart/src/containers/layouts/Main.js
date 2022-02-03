import React,{useEffect,useState} from "react";
import { Header, Sidebar, Footer } from "../../components/common";
import {
  useLocation
} from "react-router-dom";
const Main = ({ children }) => {
 let location = useLocation();
 const [page, setPage] = useState("Dashboard Overview")
 useEffect(()=>{
  if(location && location.pathname){
    if (location.pathname.indexOf("/dart/traceability_charts") > -1) {
      setPage("Traceability Charts");
    }
    else if (location.pathname.indexOf("/dart/anamaly_content") > -1){
      setPage("Anomaly Content");

    } else if (location.pathname.indexOf("/dart/audit_log") > -1){
      setPage("Audit Log");
    }
    else{
      setPage("Dashboard Overview")
    }
  }
 },[location])
  return (
    <div className="app">
      <div className="app-left">
        <Sidebar />
      </div>
      <div className="app-right">
        <Header name={page} />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};
export default Main;
