import React, { Fragment, useState } from "react";
import { projects } from '../../../utils/mockdata';
import "./styles.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import TextBox from "../../../Components/TextBox";
import Module from "../../../Components/Module";
import Button from "../../../Components/Button"
const Projects = props => {
    const [value, setValue] = useState("");
    const [listvalue, setListValue] = useState([]);
    const [selectedProject, setSelectedProject] = useState(false);
    const [actionProject, setActionProject] = useState(false);

    return (
        <div className="projectContainer">
            <div className="formContainer">
                <h5>Create Project</h5>
                <div>
                    <div>
                        <TextBox value={value} placeHolder="Project Name" setValue={setValue} />
                    </div>
                    <div>
                        <Module projectname={value} listvalue={listvalue} setListValue={setListValue} />
                    </div>
                    <div className="saveBtn">
                        <Button text={"Submit"} OnClickBtn={() => { }} image={faSave} />
                    </div>
                </div>
            </div>
            <div>
                <h5>Projects List</h5>
                <div className="tableTitle">
                    <div>Project Name</div>
                    <div>Actions</div>
                </div>
                <div>
                    {projects.map((result, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="headingList">
                                    <div className="title" onClick={() => { setSelectedProject(result.id) }}>{result.name}</div>
                                    <div>
                                        <div className="min-container">
                                            <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                                            <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                                        </div>
                                    </div>
                                </div>
                                {selectedProject == result.id && <div className="contentHolder">
                                    <div className="content contenttitle">
                                        <div>Module Name</div>
                                        <div>Actions</div>
                                    </div>
                                    {result.modulelist.map((module, mindex) => {
                                        return (
                                            <div className="content" key={mindex}>
                                                <div>{module.name}</div>
                                                <div>
                                                    <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                                                    <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div> || ""}
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Projects;
