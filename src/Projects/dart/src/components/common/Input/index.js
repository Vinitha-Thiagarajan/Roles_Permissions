import React, { Fragment, useState, useEffect } from "react";
import "./style.scss";

const Input = ({
  title,
  values,
  color
}) => {

  return (
    <div className="text-holder-audit">
      <Fragment>
        <div className="drop-title" style={{color:color}}>{title}</div>
        <div className="textbox">
            {Object.keys(values).map((rec,index)=>
                <div key={index}><span>{`${rec} : `}</span>{`${values[rec]}`}</div>
            )}
        </div>
      </Fragment>
    </div>
  );
};

export default Input;
