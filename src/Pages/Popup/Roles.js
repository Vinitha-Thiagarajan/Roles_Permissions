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
        <div>
            <div className="rolesheading">Create Roles</div>
             <div>
                 <select onChange={handleUChange}>
                    {Dummy_Name.map((rec,index)=>{
                        return <option key={index}>{rec.name}</option>
                    })}
                 </select>
             </div>
             <div>
                 <select onChange={handlePChange}>
                    {projects.map((rec,index)=>{
                        return <option key={"project"+index}>{rec.name}</option>
                    })}
                 </select>
             </div>
             <div>
                 <select onChange={handleRChange}>
                    {roleslist.map((rec,index)=>{
                        return <option key={"roles"+index}>{rec.name}</option>
                    })}
                 </select>
             </div>
             <div>
                 <Button text="Save" OnClickBtn={()=>{}} />
             </div>
        </div>
    );
}

export default Roles;
