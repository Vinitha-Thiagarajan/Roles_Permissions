import React, { useState, useEffect } from "react";
import { projects, roles } from '../../../utils/mockdata';
import "./styles.scss"
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { confirmAlert } from "react-confirm-alert";
import TextBox from "../../../Components/TextBox";
import Button from "../../../Components/Button";
import Tabs from "../../../Components/Tabs";
import Modal from "../../../Components/Modal";
import EditRole from "../../Popup/EditRole";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faWrench, faSave, faTrash, faFilter, faEye, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
const Roles = props => {
    const [selected, setSelected] = useState('');
    const [module, setmodule] = useState([]);
    const [value, setValue] = useState("");
    const [roleproject, setroleproject] = useState([]);
    const [update, setUpdate] = useState(false);


    const projectHandler = (event) => {
        setSelected(event.target.value);
        let moduleList = projects.filter((rec) => rec.name == event.target.value)[0].modulelist;
        setmodule(moduleList);
    };
    useEffect(() => {
        const result = [];
        const map = new Map();
        for (const item of roles) {
            if (!map.has(item.project_name) && item.name != "Select roles--") {
                map.set(item.project_name, true);
                result.push(item);
            }
        }
        setroleproject(result);
        setUpdate(!update)
    }, [roles])

    return (
        <div className="rolesContainer">
            <div className="formContainer">
                <h5>Create Role</h5>
                <div>
                    <div>
                        <TextBox value={value} placeHolder="Role Name" setValue={setValue} />
                    </div>
                    <div className="selectWrapper">
                        <div className="selectContainer">
                            <select className="form-select" onChange={projectHandler} aria-label="Default select example">
                                <option selected>Select Project</option>
                                {projects.map((result, index) => (<option key={index}>{result.name}</option>))}
                            </select>
                        </div>
                    </div>
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
                        {module.map((module, mindex) => {
                            return (
                                <div className="modulelist" key={mindex}>
                                    <div className="mTitle">{module.name}</div>
                                    <div className="mStatus">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" name={`${module.name.replace(/\s/g, '')}_${mindex}`} id={`${module.name.replace(/\s/g, '')}_${mindex}`} />
                                            <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                                        </div>
                                    </div>
                                    <div className="mPermission">
                                        {["view", "edit", "update", "delete", "filter"].map((rec, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" name={`${rec}_${module.name.replace(/\s/g, '')}_${index}`} id={`${rec}_${module.name.replace(/\s/g, '')}_${index}`} />
                                                        <label className="form-check-label" for="flexCheckDefault">

                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div> || ""}
                    <div className="saveBtn">
                        <Button text={"Submit"} OnClickBtn={() => { }} image={faSave} />
                    </div>

                </div>
            </div>
            <div>
                <h5>Roles List</h5>
                {roleproject && roleproject.length > 0 && <Tabs>
                    {roleproject.map((result, index) => (
                        <div key={index} label={result.project_name}>
                            <RoleList list={roles} name={result.project_name} />
                        </div>))}
                </Tabs> || ""}
            </div>

        </div>
    );
}
const RoleList = (props) => {
    const [selectedRole, setSelectedRole] = useState(false);
    const [selected, setSelected] = useState('');
    const [open, setRoles] = React.useState(false);

    const Delete = () => {
        
        if(window.confirm("Are you sure want to delete?"))
        {
       }
      }
    

    const Title =() => {
        return(<>
        <div className ="min-container">
          <h3 className="title">Edit Roles</h3>
          <button className="button_change" onClick={handleClose}>X</button>
          </div>
          <hr></hr>
          </>
        )
      }

    const [edit,setEdit]= useState(false);
    const handleClose = () => setRoles(false);

    return (
        <div>
            <div className="tableTitle">
                <div>Role Name</div>
                <div>Actions</div>
            </div>
            {
                props.list.filter((rec) => rec.project_name == props.name).map((rec, index) => {
                    return (
                        <>
                            <div className="headingList" key={index}>
                                <div className="title" onClick={() => { setSelectedRole(rec.name) }}>{rec.name}</div>
                                <div>
                                    <div className="min-container">
                                        <div onClick={() => { setRoles(true) }}>
                                        <div onClick={() => { setSelectedRole(rec.name) }}>
                                        <FontAwesomeIcon onClick={() => { setEdit(rec.id) }} icon={faEdit} className="facursorPoint" />
                                        </div>
                                        </div>              
                                        <FontAwesomeIcon onClick={() => Delete()} icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                                      
                                    </div>
                                </div>
                            </div>
                            {selectedRole == rec.name && <div className="contentHolder">
                                <div className="content contenttitle">
                                    <div className="ctitle">Module Name</div>
                                    <div className="cstatus">isEnable</div>
                                    <div className="cpermission">
                                        <div>
                                            <span><FontAwesomeIcon icon={faEye} /></span>
                                            <span><FontAwesomeIcon icon={faEdit} /></span>
                                            <span><FontAwesomeIcon icon={faWrench} /></span>
                                            <span><FontAwesomeIcon icon={faTrash} /></span>
                                            <span><FontAwesomeIcon icon={faFilter} /></span>
                                        </div>
                                    </div>
                                </div>
                                {rec.moduleList.map((module, mindex) => {
                                    return (
                                        <div className="modulelist" key={mindex}>
                                            <div className="mTitle">{module.name}</div>
                                            <div className="mStatus">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" checked={module.isenable} type="checkbox" name={`${module.name.replace(/\s/g, '')}_${mindex}`} id={`${module.name.replace(/\s/g, '')}_${mindex}`} />
                                                    <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                                                </div>
                                            </div>
                                            <div className="mPermission">
                                                {Object.values(module.permission).map((rec, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div key={index}>
                                                                {rec == "true" ? <div className="correcticon"><FontAwesomeIcon size={"sm"} icon={faCheck} color={"#fff"} /></div>
                                                                    : <div className="timesicon"><FontAwesomeIcon size={"sm"} icon={faTimes} color={"#fff"} /></div>}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div> || ""}

                            {edit == rec.id && 
                                <Modal show={open} handleClose={handleClose} Title={Title}>
                                    
                                    <EditRole Name={rec.name} Id={rec.id} ModuleList={rec.modulelist}/>
                                    
                                </Modal> || ""}
                        </>
                    )

                })
            }
        </div>
    )
}
export default Roles;
