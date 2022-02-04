import React from "react";
import "./NotFound.scss"
import { useHistory } from "react-router-dom";
const NotFound = () => {
    let history = useHistory();
    const onBackHandler = () => {
        history.push("/tardis/dashboard");
    };
    return (
        <div className="nfcontainer">
            <div className="pagenotfound">
                <div className="statuscode">404</div>
                <div className="labletxt">PAGE NOT FOUND</div>
                <div className="cellholder"><div className="goback" onClick={()=>onBackHandler()}>GO BACK HOME</div></div>
            </div>
        </div>
    );
};

export default NotFound;