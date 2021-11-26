
import {useState,useEffect,Fragment} from "react";
import React from "react";
import roles from "../../datas/roles";
import projects from "../../datas/projects";
import SelectedElement from "../Select/SelectedElement";
import Dropdown from "../../UI/Dropdown";


import './Table.css';

const ProjectPermission =(props) =>
{   const [project , setProject] = useState([]);
    const [selected , setSelected] = React.useState('');

    const EventHandler = (event) =>{
        setSelected(event.target.value);
    };
  
    useEffect(()=>{
        if(props.project_name && props.project_name!='')
        {
        const SelectedValue = roles.filter((e)=>e.project_name==props.project_name)
        setProject(SelectedValue)
    }
    },[props.project_name]) 

        return(
            <Fragment>
                <td>
               <select onChange={EventHandler}>
                 <Dropdown project={project}/>
               </select>
                </td>
                <SelectedElement name={selected}/>
            </Fragment>
        )
    

}
export default ProjectPermission;