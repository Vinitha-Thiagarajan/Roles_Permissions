import React  from "react";
import "./InputText.scss";


const InputWithLable = props => {
  const OnChange = (e) =>{
      props.OnChange(e.target.value)
  }
  return (
    <div className="input-lable">
        {props.lable?<span>{props.lable}</span>:null}
        {props.required?<span className="required">*</span>:null}
        <input type="text" onChange={(e)=>{OnChange(e)}}/>
    </div>   
  );
};

export default InputWithLable;
