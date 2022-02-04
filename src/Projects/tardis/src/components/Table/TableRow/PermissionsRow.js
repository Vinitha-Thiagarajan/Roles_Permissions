import React, { Fragment } from "react";
import "../Table.scss";
import "./Row.scss";
import { Images } from "../../../assets/images";
import { showHide } from '../../../utils'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const Permissions = props => {
    const userdata = useSelector(state => state.user);
    const { user } = userdata;
    const { groups } = user;

    const showHideRow = (data) => {
        showHide(data, "file");
    };

    let history = useHistory();

    const RowSet = (props) => {
        return (
            <Fragment>
                <Row {...props.item} margin={props.margin} />
                <RowDetails {...props.item} margin={props.margin} />
            </Fragment>
        )
    }
    const Row = props => {
        return (
            <tr>
                <td className={props.margin ? "rowsubarrow" : "rowarrow"} onClick={() => {
                    showHideRow(props);
                }}>
                    <img alt=""
                        src={Images.downarrow}
                        className="downarr"
                        id={`downimage${props.id}`}
                    />
                </td>
                <td className="width200">{props.name}</td>
                <td></td>
            </tr>
        );
    };
    const RowDetails = props => {
        const Mapping = (data) => {
            return data.permissions.reduce(function (pv, cv) {
                let e = cv.split(" | ");
                pv[e[1]] = pv[e[1]] || [];
                pv[e[1]].push(e[2]);
                return pv;
            }, Object.create(null));
        }
        const Status =(e)=>{
            return e.reduce(function (pv, cv) {
                let status = cv.indexOf(" view ")>-1?"View":cv.indexOf(" add ")>-1?"Add":cv.indexOf(" change ")>-1?"Change":cv.indexOf(" delete ")>-1?"Delete":"";
                pv[status] = status
                return pv;
            }, Object.create(null));
        }
        return (
            <tr id={`hidden_row${props.id}`} className="hidden_row editcontent">
                <td colSpan="3" className="paddzero">
                    <table className="detailtable">
                        <tbody>
                            <tr>
                                <td colSpan="3">
                                    <div className="permissondetail">
                                        {
                                            Object.entries(Mapping(props)).map((e, i) => {
                                                return (
                                                    <div className="row" key={`row-${i}`}>
                                                        <div className="title">{e[0]}</div>
                                                        <div className="status">
                                                            {
                  
                                                                <Fragment>
                                                                <div className="item">{Status(e[1]).View ?<FontAwesomeIcon icon={faCheck} className="icontick"  /> : <FontAwesomeIcon icon={faTimes} className="iconclose"  />}View</div>
                                                                <div className="item">{Status(e[1]).Add  ?<FontAwesomeIcon icon={faCheck} className="icontick"  /> : <FontAwesomeIcon icon={faTimes} className="iconclose"  />}Add</div>
                                                                <div className="item">{Status(e[1]).Change  ?<FontAwesomeIcon icon={faCheck} className="icontick"  /> : <FontAwesomeIcon icon={faTimes} className="iconclose"  />}Change</div>
                                                                <div className="item">{Status(e[1]).Delete  ?<FontAwesomeIcon icon={faCheck} className="icontick"  /> : <FontAwesomeIcon icon={faTimes} className="iconclose"  />}Delete</div>
                                                                </Fragment>
                                                                
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })


                                        }
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        );
    };
    return (
        <tbody>
            {groups && groups.length > 0 ?
                groups.map((item, index) => {
                    return (
                        <RowSet key={`Details-${index}`} item={item} margin={false} />
                    );
                }) :
                <tr><td colSpan="3" className="norecord">No Data found!!</td></tr>
            }
        </tbody>
    );
};



export default Permissions;
