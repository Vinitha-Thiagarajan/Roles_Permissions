import React, { Fragment, useState, useEffect } from "react";
import "./style.scss";

const FieldInput = ({
  title,
  value,
  onChangeValue,
  placeholder
}) => {

  return (
    <div className="fieldtext-holder-audit">
      <Fragment>
        <div className="drop-title">{title}</div>
        <div className="textbox">
            <input value={value} placeholder={placeholder} onChange={(e)=>{onChangeValue(e.target.value)}}/>
        </div>
      </Fragment>
    </div>
  );
};

export default FieldInput;
