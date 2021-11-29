
import { useState, useEffect, Fragment } from "react";
import React from "react";
import Value from "./Value";
import {roles} from "../../utils/mockdata";

import '../Table/Table.css';

const SelectedRoles = (props) => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (props.name && props.name != '') {
            const SelectedValue = roles.filter((e) => e.project_name == props.name)
            setProject(SelectedValue)
        }
    }, [props.name])
    
    return (
        <Fragment>
            
            <table className='myTable myTable-horizontal'>
                
      <thead>
      <tr>
          <th>Name </th>
          <th>Actions</th>
      </tr>
  </thead>
  <tbody>
      {project && project.map((e) => {
      return (<><tr>
              <td>{e.name}</td>
              <td>
              <div className = "min-container">
                          <div className="edit_button">edit</div>
                          <div className="delete_button">delete</div>
                          </div>
                          </td></tr></>
                          )})}
      
      </tbody>
        </table>
            
        </Fragment>
    )
      }



export default SelectedRoles;