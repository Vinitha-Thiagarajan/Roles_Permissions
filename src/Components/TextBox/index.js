import React from "react";
import PropTypes from "prop-types";
import "./styles.scss"
const TextBox = ({ value, setValue, placeHolder}) => {
    return (
       <input type="text" className="customInput" value={value} onChange={(e)=>setValue(e.target.value)}  placeHolder={placeHolder}/>
    );

}
TextBox.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
}
export default TextBox;