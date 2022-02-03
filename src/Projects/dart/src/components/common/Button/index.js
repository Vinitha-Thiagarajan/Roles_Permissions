import React from "react";
import "./style.css";
import Reset from "../../../resources/images/reset.svg";

const Button = ({ title, style, onClick, image }) => {
  return (
    <div className="button-container" style={style} onClick={onClick}>
      {image && <img className="attach" alt="" src={Reset} />}
      <span className="title">{title}</span>
    </div>
  );
};

export default Button;
