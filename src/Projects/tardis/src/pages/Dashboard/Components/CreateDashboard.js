import React, { useState, useEffect } from "react";
import { Images } from "../../../assets/images";
import {
    Button,
    DropDown,
    RadioBtn
} from "../../../components";
import "../Dashboard.scss";
import SVG from 'react-inlinesvg';

const AddSlack = props => {
    const [sourceList, SetSourceList] = useState([]);
    const { source,data } = props;
    useEffect(() => {
        if (source) {
            let result = [];
            source.forEach((e) => {
                result.push({source:e.source});
            })
            SetSourceList(result);
        }
    }, [source])
    useEffect(() => {
        if (data) {
            for (var x of Object.keys(data)) {
                try {document.getElementById(x).value = data[x];}
                catch (e) { }
              }
        }
    }, [data])
    const submit = () => {
        const form = document.getElementById("createdash")
        var data = Object.values(form).reduce((obj, field) => { obj[field.name ? field.name : "unnamed"] = field.value; return obj }, {});
        delete data.unnamed;
        data.isActive = (data.isActive === "True");
        data.logdateWindow = data.logdateWindow === "Please select"? "":data.logdateWindow;
        let source =JSON.parse(data.sources);
        source = source.map((e)=>{return e.source});
        data.sources = JSON.stringify(source);
        props.onSubmit(data)
    }

    return (
        <div className="modal-main1">
            <div className="modal-title">
                <div className="title-left centeralign">
                    <div className="detailimg centeralign">
                        <SVG className="slackadd" src={Images.Dashboard} />
                    </div>
                    {data?<span>Edit Dashboard</span>:<span>Create Dashboard</span>}
                </div>
                <div
                    className="title-close"
                    onClick={() => {
                        props.closepop();
                    }}
                >
                    <img alt="" src={Images.close} />
                </div>
            </div>
            <div className="modal-content">
                <form id="createdash" className="addform-container" autoComplete="off" >
                    <div className="controls">
                            <input name="id"  type="hidden" value={data?data.id:0}/>
                            <div>
                                <span>Dashboard Title</span>
                                <input type="text" name={"dashboardTitle"} id={"dashboardTitle"} autoComplete="off" className={"sourceadddropdown"} />
                            </div>
                            <div className="margintop20">
                                <span>Sources</span>
                                <DropDown
                                    id={"sources"}
                                    class={"options searchop"}
                                    label={"Source"}
                                    search={true}
                                    multi={true}
                                    displaynode={"source"}
                                    selec
                                    imguri={Images.dropdownarrow}
                                    onFilterselect={(list) => { }}
                                    options={sourceList}
                                    selectedValues={data?data.sources:false}
                                />
                            </div>
                            <div className="margintop20">
                                <span>Logdate</span>
                                <DropDown
                                    id={"logdateWindow"}
                                    class={"sourceadddropdown"}
                                    imguri={Images.arrowblack}
                                    value={data?data.logdateWindow:false}
                                    options={["Please select","Daily","Daily + previous day","Weekly","Monthly"]}
                                    onChange={(data) => { }}
                                />
                            </div>
                            <div className="isactive ">
                                <span>IsActive</span> <RadioBtn name="isActive" value={data?data.isActive?"True":"False":"True"} options={["True", "False"]} />
                            </div>
                        

                    </div>
                </form>
            </div>
            <Button class="modaladdbtn" label={data?"Update Dashboard":"Create Dashboard"} loading={props.isLoading} onClick={() => { submit() }} />
        </div>
    );
};

export default AddSlack;
