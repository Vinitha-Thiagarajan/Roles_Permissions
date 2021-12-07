import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Button from "../../Components/Button";
import {Dummy_Name, roles, projects} from "../../utils/mockdata"

import "./Roles.scss"
const Roles = props => {
    const [user, setUser] = useState("");
    const [project, setProject] = useState("")
    const [rolesval, setRoles] = useState("");
    const [roleslist, setRolesList] = useState([]);
    const [update, setUpdate] = useState(false)
    const handlePChange=(e)=>{
        let selProject= e.target.value;
        setProject(selProject);
        const SelectedValue = roles.filter((e) => e.project_name == selProject)
        setRolesList(SelectedValue);
    }
    const handleUChange =(e)=>{
        setUser(e.target.value)
    }
    const handleRChange =(e)=>{
        setRoles(e.target.value)
    }
    return (
        <div className="background">
            
             <div className="adjust_width">
             <div className="rolesheading">Group/User</div>
                 <select class="form-select" onChange={handleUChange}>
                    {Dummy_Name.map((rec,index)=>{
                        return <option key={index}>{rec.name}</option>
                    })}
                 </select>
                 <div className="label">User names</div>
             </div>
             <div className="adjust_width" >
             <div className="rolesheading">Project</div>
                 <select class="form-select" onChange={handlePChange}>
                    {projects.map((rec,index)=>{
                        return <option key={"project"+index}>{rec.name}</option>
                    })}
                 </select>
                 <div className="label">Project Names</div>
             </div>
             <div className="adjust_width">
             <div className="rolesheading">Roles</div>
                 <select class="form-select" onChange={handleRChange}>
                    {roleslist.map((rec,index)=>{
                        return <option key={"roles"+index}>{rec.name}</option>
                    })}
                 </select>
                 <div className="label">List of Roles</div>
             </div>
             <div className="saveButton">
                 <Button className="button" text="Save" OnClickBtn={()=>{}} />
             </div>
        </div>
    );
}

export default Roles;
