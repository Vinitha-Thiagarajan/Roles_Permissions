
import {useState,useEffect,Fragment} from "react";
import React from "react";
import Value from "./Value";
import roles from "../../inputs";
import projects from "../../project";

import './Table.css';

const ProjectPermission =(props) =>
{   const [project , setProject] = useState('');
  
    useEffect(()=>{
        if(props.name && props.name!='')
        {
        const SelectedValue = roles.filter((e)=>e.project_name==projects.name)
        setProject(SelectedValue[0])
        console.log(SelectedValue)
    }
    },[props.name]) 

        return(
            <Fragment>

            </Fragment>
        )
    

}
export default ProjectPermission;