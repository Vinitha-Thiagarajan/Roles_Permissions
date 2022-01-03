import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import TextBox from "../../../Components/TextBox";

const CustomisedTheme = (props) => {
  const [value, setValue] = useState("14px");
  const [fontFamily, setfontFamily] = useState("sans-serif");
  const [color, setColor] = useState("#fff");
  const [containercolor, setContainercolor] = useState("#2c2d38;");
  const [txtcolor, setTxtcolor] = useState("");



  useEffect(() => {
    const themeColor = localStorage.getItem("customColor");
    if (themeColor != null) {
      const par = JSON.parse(themeColor);
      setColor(par.backgroundColor);
      setValue(par.fontSize);
      setfontFamily(par.fontFamily);
      setContainercolor(par.containerColor);
      setTxtcolor(par.textColor);
    }
  }, []);

  const Handler = () => {
    const custom = { backgroundColor: color, fontSize: value, fontFamily: fontFamily, containerColor: containercolor, textColor: txtcolor };
    document.documentElement.style.setProperty('--background-color', color);
    document.documentElement.style.setProperty('--fontstyle', value);
    document.documentElement.style.setProperty('--fontFamily', fontFamily);
    document.documentElement.style.setProperty('--container-color', containercolor);
    document.documentElement.style.setProperty('--color', txtcolor)
    localStorage.setItem("customColor", JSON.stringify(custom));
  };

  return (
    <div className="projectContainer">
      <div className="formContainer">
        <h5>Create Customised Themes</h5>
        <div>
          <div>
            <div>Background Color:</div>
            <SketchPicker
              color={color}
              onChangeComplete={(color) => {
                setColor(color.hex);
              }}
            />
            <div style={{height:20}}></div>
            <div>Container Color:</div>
            <SketchPicker
              color={containercolor}
              onChangeComplete={(color) => {
                setContainercolor(color.hex);
              }}
            />
             <div style={{height:20}}></div>
            <div>Text Color:</div>
            <SketchPicker
              color={txtcolor}
              onChangeComplete={(color) => {
                setTxtcolor(color.hex);
              }}
            />
             <div style={{height:20}}></div>
            <div>
              <div>Font Size:</div>
              <TextBox
                value={value}
                placeHolder="Font size"
                setValue={setValue}
              />
            </div>
            <div style={{height:20}}></div>
            <div>
              <div>Font Family:</div>
              <TextBox
                value={fontFamily}
                placeHolder="Font Family"
                setValue={setfontFamily}
              />
            </div>
          </div>
          <div style={{height:20}}></div>
          <div style={{ width: 200 }}>
            <div className="addBtn" onClick={Handler}>
              Update Themes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomisedTheme;
