import React, {useState, useEffect} from "react"
import { slugToText } from "../../utils"
import "./NumberInput.css"

const NumberInput = ({ data,dvalue }) => {
  const [value, setValue] = useState("")
  useEffect(() => {
    setValue(dvalue);
  }, [dvalue])
  let id = data.name,
    label = slugToText(data.name),
    required = data.required,
    min,
    max,
    placeholder,
    readOnly
  const onhandleChange=(e,i)=>{
    setValue(e)
  }
  return (
    <>
     {data.label &&<label for={id} className="textInput__label">
      {data.label}
    </label>}
      <input
        id={data.id}
        name={id}
        className="numberInput"
        type="number"
        value={value}
        required={required}
        disabled={!data.isedit}
        min={0}
        max={max}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(e) => {
          onhandleChange(Number(e.target.value), data.i )
        }}
      />
      {data.description && <div className="desc">Info: {data.description}</div>}
    </>
  )
}

export default NumberInput
