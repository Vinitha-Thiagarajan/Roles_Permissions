import React  from "react";
import "./InputText.scss";


const ProfileInput = props => {
  const OnChange = (e) =>{
      props.OnChange(e.target.value)
  }
  return (
    <div className="input-lable">
        {props.lable?<span>{props.lable}</span>:null}
        <div className="lable-text">
        {props.img?<div className="img-container"><img alt="" src={props.img} /></div>:null}
        <input type="text" id={props.id} disabled={true} value={props.value} onChange={(e)=>{OnChange(e)}}/>
        </div>
    </div>   
  );
};

export default ProfileInput;
