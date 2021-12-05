import './Table.css';
import React, {useState} from "react";
import ProjectPermission from './ProjectPermission';
const TableElement = props => {
    const [name, setName] = useState('');
    return (
        <tbody>
            <tr>
                <td>{props.name}</td>
                <ProjectPermission project_name={props.project} />
            </tr>
        </tbody>
    )
}

export default TableElement;