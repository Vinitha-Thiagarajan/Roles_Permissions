import React, { useState } from "react";
import "./InputText.scss";

const InputButton = props => {
  const [text, setText] = useState("");
  const TextChange = e => {
    setText(e.target.value);
  };
  return (
    <div className="buttonwrapper">
      <input
        type="text"
        id={props.id}
        placeholder={props.placeholder}
        onChange={e => {
          TextChange(e);
        }}
        onKeyDown={() => {
          //props.ButtonClick(text);
        }}
      />
      <div
        className={props.btnclass}
        onClick={() => {
          props.ButtonClick(text);
        }}
      >
        <img alt="" src={props.btnimg} />
      </div>
    </div>
  );
};

export default InputButton;
