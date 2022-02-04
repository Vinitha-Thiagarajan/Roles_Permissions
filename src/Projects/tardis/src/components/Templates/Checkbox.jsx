import React, { useState } from "react"
import { slugToText } from "../../utils"
import "./Checkbox.scss"

const Checkbox = ({ data, dispatch }) => {
  const [check, setCheck] = useState(data.value)
  let id = data.name,
    label = slugToText(data.name),
    required = data.required
  const onhandleChange = (e, i) => {
    let arrvalue = check.split(",");
    if(arrvalue.indexOf(e) > -1){
      arrvalue = arrvalue.filter((item)=>item != e);
      setCheck(arrvalue.join(","))
    }
    else{
      arrvalue.push(e)
      setCheck(arrvalue.join(","))
    }
  }
  return (
    <>
    {data.label &&<label for={id} className="textInput__label">
      {data.label}
    </label>}
    <div className="t-holder">
      <input type="hidden"  id={id} name={id} value={check} />
      {data.options.map((option, i) => (
        <div key={i} className="t-checkcontainer">
          <input
            id={option+i}
            className="checkbox"
            type="checkbox"
            checked={check.indexOf(option) >-1}
            required={required}
            onChange={(e) => {
              onhandleChange(option, data.i)
            }}
          />
          <label for={option+i}>{option}</label>
        </div>
      ))}

    </div>
    </>
  )
}

export default Checkbox
