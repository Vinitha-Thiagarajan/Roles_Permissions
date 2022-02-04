import React, { Fragment } from "react";
import ReactTooltip from 'react-tooltip';
import { Images } from "../../assets/images";

const Reset = props => {
    return (
        <Fragment>
            <a data-tip="Reset" style={Style.tooltip} >
                {props.isactive ?<span style={Style.dot} />:null}
                <img src={Images.reset} style={Style.img} alt="" onClick={() => props.onClick()} />
            </a>
            <ReactTooltip />
        </Fragment>
    );
};
const Style= {
    tooltip:{
        height: 45,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20,
        position: "relative"
    },
    img:{
        width:25
    },
    dot:{
        width: 7,
        height: 6,
        borderRadius: 6,
        backgroundColor: "red",
        marginRight: 3,
        marginTop: 1,
        position: "absolute",
        top: "0%",
        right: 0,
      }
}
export default Reset;
