import React  from "react";
import "./InputText.scss";


const FieldHolder = props => {
  return (
    <div className="field-holder">
        {props.lable?<span>{props.lable}</span>:null}
        {props.children}
    </div>   
  );
};

export default FieldHolder;