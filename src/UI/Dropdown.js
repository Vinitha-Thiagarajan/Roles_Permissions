import * as React from "react";
import '../Components/Table/Table.css';

const Dropdown = props => {
    return (
        <>
            <option>Select roles--</option>
            {props.project.map((result) => (<option>{result.name}</option>))}
        </>
    );
}

export default Dropdown;