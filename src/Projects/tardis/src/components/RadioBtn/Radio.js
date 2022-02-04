import React from "react";
import "./RadioBtn.scss";

const Radio = props => {
  const handleClick = () => {
    props.handler(props.index);
  };
  return (
    <div className="radio-btn-group" onClick={() => handleClick()}>
      <div
        className={"radiobtn centeralign"}
        data-value={props.value}
      >
      {props.isChecked ? <div className="checked" />:null}
      </div>
      <label>{props.text}</label>
    </div>
  );
};

export default Radio;
