import React  from "react";
import "./InputText.scss";


const Textarea = props => {
  const OnChange = (e) =>{
      props.OnChange(e.target.value)
  }
  return (
    <div className="textarea-lable">
        {props.lable?<span>{props.lable}</span>:null}
        {props.required?<span className="required">*</span>:null}
        <textarea rows={props.rows} cols={props.cols} onChange={(e)=>{OnChange(e)}}/>
    </div>   
  );
};

export default Textarea;
