import React from "react";
import "./style.css";

const CardHeader = ({ name, iconColor, icon, chart }) => {
  return (
    <div className="card-header-box">
      <div className="card-header-left">
        <span
          className="card-header-left-icon"
          style={{ background: iconColor ? iconColor : "#e0e3fa" }}
        >
          <img alt="" src={icon} />
        </span>
        <span className="card-header-left-text">{name}</span>
      </div>
      <div className="card-header-right">
        {chart && <>
            <div className="legend">
              <div className="boxone"></div>Date
            </div>
            {/* <div className="legendtwo">
              <div className="dotted-line"></div>Variance
              </div> */}
          </>}
      </div>
    </div>
  );
};

export default CardHeader;
