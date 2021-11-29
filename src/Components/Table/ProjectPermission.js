
import { useState, useEffect, Fragment } from "react";
import React from "react";
import { roles, projects } from "../../utils/mockdata";
import SelectedElement from "../Select/SelectedElement";
import Dropdown from "../../UI/Dropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import './Table.css';

const ProjectPermission = (props) => {
    const [project, setProject] = useState([]);
    const [selected, setSelected] = React.useState('');

    const EventHandler = (event) => {
        setSelected(event.target.value);
    };

    useEffect(() => {
        if (props.project_name && props.project_name != '') {
            const SelectedValue = roles.filter((e) => e.project_name == props.project_name)
            setProject(SelectedValue)
        }
    }, [props.project_name])

    return (
        <Fragment>
            <td>
                <select onChange={EventHandler}>
                    <Dropdown project={project} />
                </select>
            </td>
            <td>
                <div className="permissioncontrol">
                    <SelectedElement name={selected} />
                </div>
            </td>
            <td style={{textAlign:"center"}}>
                <FontAwesomeIcon icon={faSave} color={"#259d1e"} className="facursorPoint" />
                <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
            </td>
        </Fragment>
    )


}
export default ProjectPermission;