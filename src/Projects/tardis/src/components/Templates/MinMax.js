import React, {useState} from "react"
import { slugToText } from "../../utils"
import "./MinMax.scss"
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
const MinMax = ({ data }) => {
  const [value, setValue] = useState({ min: 2, max: 10 })

  let id = data.name,
    label = slugToText(data.name),
    required = data.required,
    min,
    max,
    placeholder,
    readOnly
  const onhandleChange=(e)=>{
    setValue(e.value)
  }
  return (
    <>
     {data.label &&<label for={id} className="textInput__label">
      {data.label}
    </label>}
    <InputRange
        maxValue={20}
        minValue={0}
        value={value}
        onChange={value => onhandleChange({ value })} />
    </>
  )
}

export default MinMax
