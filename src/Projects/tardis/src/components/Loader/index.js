import React from "react";
import './Loader.scss'

const Loader = props => {
    return (
        <div className="loader-container">
            <div  className={`loading-spinner ${props.small? 'small':'big'}`}/>
        </div>
    );
};

export default Loader;
