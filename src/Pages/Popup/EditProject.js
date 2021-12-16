import React, { Fragment,useState,useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Button from "../../Components/Button";
import {Dummy_Name, roles, projects} from "../../utils/mockdata"
import TextBox from "../../Components/TextBox";

import { faEdit, faTrashAlt, faEye,faWrench,faTrash,faFilter,faCheck,faTimes } from '@fortawesome/free-solid-svg-icons'
import "./Table.css";
import "./Roles.scss";
const EditProject = props => {
    const [project, setProject] = useState([]);
    const [value, setValue] = useState("");


    useEffect(() => {
        if (props.Name && props.Name != '') {
            const SelectedValue = roles.filter((e) => e.project_name == props.Name)
            setProject(SelectedValue)
        }
    }, [props.Name])

    const Delete = () => {
        
        if(window.confirm("Are you sure want to delete?"))
        {
       }
      }
    
     
    
    return (
        <div className="background">
            
             <div className="adjust_width">
             <div className="rolesheading">Project Name:</div>
             <TextBox value={props.Name} setValue={setValue}>{props.Name}</TextBox>
             
             
                    
             </div>
             <div className="adjust_width" >
                    
           <>
                    <div className="rolesheading">
                    <div className="space">Module List:</div></div>
                   <tr>
            <td colSpan={3} style={{ padding: 0 }}>
                <div className="tableexpand1">
                    
                    {roles.filter((e) => e.project_name == props.Name)[0].moduleList.map((module, mindex) => {
                        return (
                            <div className="content1">
                                <TextBox value={module.name} placeHolder="Project Name" setValue={module.name} />
                                
                                <FontAwesomeIcon onClick={() => Delete()} icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                                </div>
                            
                        )
                    })} 
                </div>
            </td>
        </tr></> 
               
             
             <div>
                    {projects.map((result, index) => {
                        return (
                            <Fragment key={index}>
                               
                                {props.Id == result.id && 
                                    <div >
                    
                                </div> || ""}
                            </Fragment>
                        )
                    })}
                </div>
             </div>
            
             <div className="saveButton">
                 <Button className="button" text="update" OnClickBtn={()=>{}} />
             </div>
             
        </div>
    );
}

export default EditProject;
