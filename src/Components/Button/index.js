import React, {useState} from "react";
import PropTypes from "prop-types";
import "./styles.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({text, OnClickBtn, image }) => {
    
    return (
     <div className="customaddBtn" onClick={() => { OnClickBtn() }}>
        {image && <FontAwesomeIcon icon={image} style={{ marginRight: 7 }} /> || ""} {text}
      </div>
    );

}
Button.propTypes = {
    text: PropTypes.string.isRequired,
    OnClickBtn: PropTypes.func.isRequired,
    image: PropTypes.any
}
export default Button;