import React, { useState, useEffect } from "react";
import "./RadioBtn.scss";
import RadioBtn from "./Radio";
const RadioGroup = props => {
  const [selectedIndex, setIndex] = useState(-1);
  const [selectedValue, setValue] = useState("");
  const [options, setOption] = useState(props.options);

  useEffect(()=>{
    if(props.value)
    {
      let index=0;
      for(let x in props.options){
        if(props.value === props.options[x])
        {
          index=x;
        }
      }
      setIndex(parseInt(index));
      setValue(props.value);
    }
    else{
      setIndex(-1);
      setValue("");
    }
  },[props])

  const toggleRadioBtn = index => {
    if(!props.disabled){
    setIndex(index);
    setValue(options[index]);
    setOption(options);
    props.onChange && props.onChange(options[index])
    }
  };

  const allOptions = options.map((option, i) => {
    return (
      <RadioBtn
        key={i}
        isChecked={selectedIndex === i}
        text={option}
        value={option}
        index={i}
        handler={() => toggleRadioBtn(i)}
      />
    );
  });

  return <div className="radio-container">{allOptions}<input type="hidden" value={selectedValue} name={props.name}/></div>;
};

export default RadioGroup;
