import React, { useState, useEffect, Fragment } from "react";
import "./style.css";
import moment from "moment";
import { useOktaAuth } from "@okta/okta-react";
import Main from "../../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import Anomaly from "../../../resources/images/Anomaly.svg";
import SearchImg from "../../../resources/images/searchicon.svg";
import Close from "../../../resources/images/searchclear.svg";
import { CardHeader } from "../../../components/common";
import {
    getAnamoly
} from "../../../../../../reducers/Anamoly/anamoly.actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    
function GetReverseOrder(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  
const InputSearch = (props) => {
    const anamoly = useSelector((state) => state.anamoly);
  
    let data = anamoly.pipelineSet;

    const { Search, Clear, setValue, value } = props;
    const dispatch = useDispatch();

    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
            Search(value);
        }
    };

    const _onChange = (e) => {
        setValue(e.target.value);
    };
    useEffect(() => {
        if (anamoly.search) {
            setValue(anamoly.search);
        }
    }, []);
   

    return (
        <Fragment>
            <Autocomplete
                id="custom-input-demo"
                options={
                    value != ""
                        ? data
                            .filter(
                                (e) => e.toLowerCase().indexOf(value.toLowerCase()) > -1
                            )
                            .map((e) => e)
                        : data.map((e) => e)
                }
                onChange={(event, value) => {
                    setValue(value);
                    Search(value);
                }}
                value={value}
                renderInput={(params) => (
                    <div className="search" ref={params.InputProps.ref}>
                        <div className="row searchcontainer">
                            <img src={SearchImg} className="searchimg" />
                            <input type="text" {...params.inputProps} value={value} onKeyDown={(e) => _handleKeyDown(e)}
                                onChange={(e) => _onChange(e)} placeholder="Search" />
                            <img src={Close} className="searchclear" onClick={() => {
                                setValue("");
                                Clear();
                            }} />
                        </div>
                    </div>
                )}
            />
        </Fragment>
    );
};
const Anamaly = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const anamoly = useSelector((state) => state.anamoly);
    const [value, setValue] = useState("");
    const [update, setUpdate] = useState(false)
    const [recordlist, setrecordlist] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAnamoly(false, authState?.accessToken))
    }, [authState, oktaAuth]);
    useEffect(() => {
        setrecordlist(anamoly.records)
    }, [anamoly]);
    const SortOrder = (sort, type) => {
        if(sort =="up"){
           if(type =="date"){
                let sortorder = recordlist.sort(GetSortOrder("date"));
                setrecordlist(sortorder);
            }
            else if(type =="desc"){
                let sortorder = recordlist.sort(GetSortOrder("insightDetails"));
                setrecordlist(sortorder);
            }
        }
        else{
           if(type =="date"){
                let sortorder = recordlist.sort(GetReverseOrder("date"));
                setrecordlist(sortorder);
            }
            else if(type =="desc"){
                let sortorder = recordlist.sort(GetReverseOrder("insightDetails"));
                setrecordlist(sortorder);
            }
        }
        setUpdate(!update)
    }
    const Search = (val) => {
        if (val.length < 1) return false;
        dispatch(getAnamoly(val, authState?.accessToken))
        setValue(val);
    };
    const Clear = () => {
        dispatch(getAnamoly(false, authState?.accessToken))
        setValue("");
    };

    return (
        <Main>
            <div className="anomaly">
                {/* {!anamoly.loading ? ( */}
                    <InputSearch
                        value={value}
                        setValue={setValue}
                        Search={Search}
                        Clear={Clear}
                    />
                {/* ) : null} */}
                {!anamoly.errors && !anamoly.loading && anamoly && recordlist.length >0 ? (
                    <>
                        <div className="section">
                            <div className="row">
                                <div className="col">
                                    <CardHeader
                                        name={"Anomaly Detection"}
                                        iconColor={"#FBF5F5"}
                                        icon={Anomaly}
                                    />
                                    <div className="section-content">
                                        <table class="table table-custom">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="datecol" style={{width:120}}><div className="sortcontainer">CREATED DATE <Sort onClick={(e) => { SortOrder(e, "date") }} /></div></th>
                                                    <th scope="col">DESCRIPTION</th>
                                                    <th scope="col"><div className="sortcontainer">DETAILED DESCRIPTION <Sort onClick={(e) => { SortOrder(e, "desc") }} /></div></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    recordlist && recordlist.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td scope="row" className="daterow">{moment(item.date).format("DD/MM/YYYY")}</td>
                                                                <td>{item.insight} </td>
                                                                <td>{item.insightDetails}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : <div />}
                {!anamoly.errors && !anamoly.loading && anamoly && recordlist && recordlist.length == 0 ? (
                    <p className={"error"}>No Data Found!</p>
                ) : <p></p>}
                {anamoly.loading && <div className="loader">Loading...</div>}
                {!anamoly.loading && anamoly.errors && <p className={"error"}>{anamoly.errors}</p>}
            </div>
        </Main>
    );
};
const Sort = (props) => {
    const [sort, setSort] = useState("up")
    return (
        <div className="sort">
            {sort == "up"?<div onClick={() => { setSort("down");props.onClick("up"); }}> <FontAwesomeIcon icon={faSortAmountUp} /></div>:
            <div onClick={() => { props.onClick("down");setSort("up") }}> <FontAwesomeIcon icon={faSortAmountDown} /></div>}
        </div>
    )
}
export default Anamaly;
