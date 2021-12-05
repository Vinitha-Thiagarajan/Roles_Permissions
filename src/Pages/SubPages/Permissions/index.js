import React, { useState } from "react";
import "./styles.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faWrench, faTrash, faFilter ,faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const Premissions = props => {

    return (
        <div>
            <table className='myTable myTable-horizontal'>
                <thead>
                    <tr>
                        <th>Icon </th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><FontAwesomeIcon icon={faEye} /></td>
                        <td>View</td>
                        <td>
                            <div className="min-container">
                                <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                                <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faEdit} /></td>
                        <td>Edit</td>
                        <td>
                            <div className="min-container">
                                <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                                <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faWrench} /></td>
                        <td>Settings</td>
                        <td>
                            <div className="min-container">
                                <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                                <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faTrash} /></td>
                        <td>Delete</td>
                        <td>
                            <div className="min-container">
                                <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                                <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faFilter} /></td>
                        <td>Filter</td>
                        <td>
                            <div className="min-container">
                                <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                                <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                        </td>
                    </tr>


                </tbody>
            </table>
        </div>
    );
}

export default Premissions;
