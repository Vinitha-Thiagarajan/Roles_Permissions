import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss"
import TextBox from "../TextBox"
import Button from "../Button"
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Module = ({ listvalue, setListValue, projectname }) => {
    const [value, setValue] = useState("");
    const [update, setUpdate] = useState(false);
    const MultiAdd = () => {
        if (projectname) {
            let collection = listvalue;
            collection.push(value);
            setListValue(collection);
            setUpdate(!update)
        }
    }

    return (
        <div>
            <div className="d-flex flex-row align-items-center">
                <TextBox value={value} placeHolder="Module Name" setValue={setValue} />
                <Button text={"Add Module"} OnClickBtn={() => { MultiAdd() }} image={faPlusCircle} />
            </div>
            <ul>
                {listvalue.map((rec, index) => {
                    return (
                        <li key={index}>{rec}</li>
                    )
                })}
            </ul>
        </div>
    );

}
Module.propTypes = {
    listvalue: PropTypes.string.isRequired,
    setListValue: PropTypes.func.isRequired,
}
export default Module;