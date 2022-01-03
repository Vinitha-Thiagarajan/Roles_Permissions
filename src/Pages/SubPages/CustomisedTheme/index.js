import React, { useEffect, useState } from "react";

import { SketchPicker } from "react-color";

import TextBox from "../../../Components/TextBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faWrench,
  faTrash,
  faFilter,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const CustomisedTheme = (props) => {
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState(false);
  const [color, setColor] = useState("");

 

  useEffect(() => {
    const themeColor = localStorage.getItem("customColor");
    if (themeColor != null) {
      const par = JSON.parse(themeColor);
      setColor(par.Background);
      setValue(par.Font);
    }
  }, []);

  const Handler = () => {
    const custom = { Background: color, Font: value };
    localStorage.setItem("customColor", JSON.stringify(custom));
  };

  return (
    <div className="projectContainer">
      <div className="formContainer">
        <h5>Create Customised Themes</h5>
        <div>
          <div>
            <h4 className="title">Set Background</h4>
            <SketchPicker
              color={color}
              onChangeComplete={(color) => {
                setColor(color.hex);
              }}
            />

            <TextBox
              value={value}
              placeHolder="Font size"
              setValue={setValue}
            />
          </div>
          <div>
            <button onClick={Handler}>Change Theme</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomisedTheme;
