import React from "react";
import "./AccessBlock.scss"
import { useHistory } from "react-router-dom";
const AccsssBlock = () => {
    let history = useHistory();
    const onBackHandler = () => {
        history.push("/tardis/dashboard");
    };
    return (
        <div className="nfcontainer">
            <div className="pagenotfound">
                <div className="statuscode">550</div>
                <div className="labletxt">Permission Denied</div>
                <div className="cellholder"><div className="goback" onClick={()=>onBackHandler()}>GO BACK HOME</div></div>
            </div>
        </div>
    );
};

export default AccsssBlock;