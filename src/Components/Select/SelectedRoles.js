
import { useState, useEffect, Fragment } from "react";
import React from "react";
import Value from "./Value";
import {roles} from "../../utils/mockdata";
import { faCogs, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faWrench, faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';


import CheckSwitch from "../../UI/Switch/CheckSwitch";
import '../Table/Table.css';

const SelectedRoles = (props) => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        if (props.name && props.name != '') {
            const SelectedValue = roles.filter((e) => e.project_name == props.name)
            setProject(SelectedValue)
        }
    }, [props.name])
    if(props.name=='None' || props.name==''){
        return <div className="alert"><p>please enter project name!!!</p></div>
    }

    return (
        <Fragment>
            
            <table className='myTable myTable-horizontal'>
                
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
                <CheckSwitch/>
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