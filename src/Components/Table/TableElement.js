import './Table.css';
import React, { useState, useEffect } from "react";
import { roles } from "../../utils/mockdata";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEye, faEdit, faWrench, faTrash, faFilter, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const TableElement = props => {
    return (
        <tbody>
            <UserList {...props} />
        </tbody>
    )
}

const UserList = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [project, setProject] = useState([]);
    const [selected, setSelected] = useState('');
    const [modulelist, setModulelist] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (props.project && props.project != '') {
            const SelectedValue = roles.filter((e) => e.project_name == props.project)
            setProject(SelectedValue)
        }
    }, [props.project])
    const toggleExpander = (e) => {
        setExpanded(!expanded)
    }
    const EventHandler = (event) => {
        setSelected(event.target.value);
        let roleslocal = event.target.value;
        let module = roles.filter((e) => e.project_name == props.project && e.name == roleslocal)[0].moduleList;
        setModulelist(module);
        setUpdate(!update)
    };
    return [
        <tr>
            <td>{props.name}</td>
            <td>
                <div className="roledetails">
                    <select className="dashboardSelect" onChange={EventHandler}>
                    <option>Select roles--</option>
                    {project.map((result) => (<option>{result.name}</option>))}
                    </select>
                    {selected && <div className="viewlink" onClick={() => toggleExpander()}>Click to { expanded ? 'close':'expand details'}</div> }
                </div>
            </td>
            <td style={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faSave} color={"#259d1e"} className="facursorPoint" />
                <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
            </td>
        </tr>,
        expanded && <tr>
            <td colSpan={3} style={{ padding: 0 }}>
                <div className="tableexpand">
                    <div className="contenttitle">
                        <div className="ctitle">Module Name</div>
                        <div className="cstatus">isEnable</div>
                        <div className="cpermission">
                            <div>
                                <span><FontAwesomeIcon icon={faEye} /></span>
                                <span><FontAwesomeIcon icon={faEdit} /></span>
                                <span><FontAwesomeIcon icon={faWrench} /></span>
                                <span><FontAwesomeIcon icon={faTrash} /></span>
                                <span><FontAwesomeIcon icon={faFilter} /></span>
                            </div>
                        </div>
                    </div>
                    {modulelist.map((module, mindex) => {
                        return (
                            <div className="content">
                                <div className="ctitle">{module.name}</div>
                                <div className="cstatus">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" checked={module.isenable} type="checkbox" name={`${module.name.replace(/\s/g, '')}_${mindex}`} id={`${module.name.replace(/\s/g, '')}_${mindex}`} />
                                        <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                                    </div>
                                </div>
                                <div className="cpermission">
                                    {Object.values(module.permission).map((rec, index) => {
                                        return (
                                            <div key={index}>
                                                {rec == "true"? <div className="correcticon"><FontAwesomeIcon size={"sm"} icon={faCheck} color={"#fff"} /></div>
                                                :<div className="timesicon"><FontAwesomeIcon size={"sm"} icon={faTimes} color={"#fff"} /></div>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </td>
        </tr>
    ]
}

export default TableElement;