import React, { Fragment,useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Button from "../../Components/Button";
import {Dummy_Name, roles, projects} from "../../utils/mockdata"
import TextBox from "../../Components/TextBox";
import "./Styles.scss";
import { faEdit,faSave, faTrashAlt, faEye,faWrench,faTrash,faFilter,faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'

import "./Roles.scss";
const EditRole = props => {
    const [roleproject, setroleproject] = useState([]);
    const [value, setValue] = useState("");
    const [selected, setSelected] = useState(true);
    const [update, setUpdate] = useState(false)
    

    
    useEffect(() => {
        const result = [];
        const map = new Map();
        setroleproject(result);
        setUpdate(!update)
    }, [roles])
  
  
    
    return (
        
             
                <div className="min_container">
                    <div className="adjust_width">
             <div >Project Name:</div>
             <TextBox value={props.Name} setValue={setValue}>{props.Name}</TextBox>
             
                    
             <div>Module list:</div>
            
             <div className="formContainer">
             {selected != "" && <div className="moduleWrapper">
                        <div className="headingmodule" >
                            <div className="mTitle">Module Name</div>
                            <div className="mStatus">isEnable</div>
                            <div className="mPermission">
                                <div>
                                    <span><FontAwesomeIcon icon={faEye} /></span>
                                    <span><FontAwesomeIcon icon={faEdit} /></span>
                                    <span><FontAwesomeIcon icon={faWrench} /></span>
                                    <span><FontAwesomeIcon icon={faTrash} /></span>
                                    <span><FontAwesomeIcon icon={faFilter} /></span>
                                </div>
                            </div>
                        </div>
                        {roles.filter((rec) => rec.name == props.Name)[0].moduleList.map((module, mindex) => {
                            
                            return (
                                <div className="modulelist" key={mindex}>
                                    <div className="mTitle">{module.name}</div>
                                    <div className="mStatus">
                                    <div className="form-check form-switch" >
                                                    <input className="form-check-input" defaultChecked={module.isenable} type="checkbox" name={`${module.name.replace(/\s/g, '')}_${mindex}`} id={`${module.name.replace(/\s/g, '')}_${mindex}`} />
                                                    <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                                                </div>
                                                </div>
                                    <div className="mPermission">
                                                {Object.values(module.permission).map((rec, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div key={index}>
                                                                {rec == "true" ? <div className="form-check">
                                                        <input className="form-check-input" defaultChecked={true} type="checkbox" value="" name={`${rec}_${module.name.replace(/\s/g, '')}_${index}`} id={`${rec}_${module.name.replace(/\s/g, '')}_${index}`} />
                                                        <label className="form-check-label" for="flexCheckDefault">

                                                        </label>
                                                    </div>:<div className="form-check">
                                                        <input className="form-check-input" defaultChecked={false} type="checkbox" value="" name={`${rec}_${module.name.replace(/\s/g, '')}_${index}`} id={`${rec}_${module.name.replace(/\s/g, '')}_${index}`} />
                                                        <label className="form-check-label" for="flexCheckDefault">

                                                        </label>
                                                    </div>}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                </div>
                            )
                        })}
                    </div> || ""}
                    </div>
                    <div className="click_button">
                 <Button className="button" text="Update" OnClickBtn={()=>{}} />
             </div>
                    </div> 
             </div>
       
       
    );
}

export default EditRole;
