import React from "react";
import "./Checkbox.scss";

const Checkbox = (props) => {
    return (
        <label className={`check-container ${props.class}`}>
            <input type="checkbox" className={props.class} name={props.name} />
            {props.label?<span>{props.label}</span>:null}
        </label>
    )
}
export default Checkbox;