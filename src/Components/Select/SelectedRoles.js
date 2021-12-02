
import { useState, useEffect, Fragment } from "react";
import React from "react";
import Value from "./Value";
import {roles} from "../../utils/mockdata";
import { faCogs, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faWrench, faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';

import "bootstrap/dist/css/bootstrap.min.css";

import CheckSwitch from "../../UI/Switch/CheckSwitch";
import '../Table/NewTable.css';

const SelectedRoles = (props) => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (props.name && props.name != '') {
            const SelectedValue = roles.filter((e) => e.project_name == props.name)
            setProject(SelectedValue)
        }
    }, [props.name])
    if(props.name=='Projects' || props.name==''){
        return <div className="alert"><p>please enter project name!!!</p></div>
    }

    return (
        <Fragment>
            
            <table className='myNewTable myNewTable-horizontal'>
                
      <thead>
      <tr>
          <th>Name </th>
          <th>Status</th>
          <th>Actions</th>
          
      </tr>
  </thead>
  <tbody>
      {project && project.map((e) => {
      return (<><tr>
              <td>{e.name}</td>
              <td>
              <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                                        <label className="form-check-label" for="flexSwitchCheckDefault"> </label>
                               </div> 
                </td>
              <td>
              <div className="min-container">
                                    <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                            <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                                    </div>
                          </td>
                          
                                
                                </tr></>
                          )})}
      
      </tbody>
        </table>
            
        </Fragment>
    )
      }



export default SelectedRoles;