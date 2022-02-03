import React from "react";
import "./style.css";
import Bars from "../../../resources/images/bars.svg";
import User from "../../../resources/images/user.svg";
import Usermanual from "../../../resources/images/usermanual.svg";
import Folder from "../../../resources/images/folder.svg";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ name }) => {
  const { traceId } = useParams();
  const traceability = useSelector((state) => state.traceability);
  const { traceabilityFlow } = traceability;
  return (
    <div className="header">
      <div className="header-left">
        <p className="header-title">
          <span className="header-title-icon">
            <img alt="" src={Bars} />
          </span>
          {name}
          {traceId && traceabilityFlow && traceabilityFlow.pipeline ? (
            <span className={"traceid-header"}>
              {" "}
              <img alt="" src={Folder} /> {traceabilityFlow.pipeline} -{" "}
              {traceId}
            </span>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="header-right">
        <ul className="header-right-ul">
          <li className="header-right-ul-li">
            <a target="_blank" href="https://docs.google.com/document/d/1YmZYA4B_EF8Ot2hkfGexjPEYa8x936p_GO5Z5pHLZws/edit?usp=sharing" className="header-right-ul-li-bell">
              <img alt="" src={Usermanual} />
            </a>
          </li>
          <li className="header-right-ul-li">
            <a className="header-right-ul-li-user cursor-arrow">
              <img alt="" src={User} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
