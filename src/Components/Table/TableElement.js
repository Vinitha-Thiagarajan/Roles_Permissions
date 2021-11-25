import './Table.css';
import {Fragment,useState,useEffect} from 'react';

import Dropdown from '../../UI/Dropdown';
import projects from '../../project';
import React from "react";
const TableElement = props => {
    const [name , setName] = useState('');
  
    useEffect(()=>{
        if(props.name && props.name!='')
        {
        const SelectedValue = projects.filter((e)=>e.id==props.index)
        setName(SelectedValue[0].name)
    }
    },[props.name]) 

    return (<Fragment>
                <tbody><tr><td>{props.name}</td>
                <td>{name}</td>
               <Dropdown project_name={name}/>
                </tr>
                </tbody>
                </Fragment>
)

        
}

export default TableElement;