import React, {useState} from "react"
import { slugToText } from "../../utils"
import "./Dropdown.css"

const Dropdown = ({ data }) => {
  const [value, setValue] = useState(data.value)

  let id = data.name,
    label = slugToText(data.name),
    required = data.required
    const onhandleChange=(e,i)=>{
      setValue(e)
    }
  return (
    <>
       {label &&<label for={id} className="textInput__label">
      {label}
    </label>}
      <select
        id={id}
        name={id}
        className="tdropdown"
        value={value}
        required={required}
        onChange={(e) => {
          onhandleChange(e.target.value, data.i )
        }}>
        {data.options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      {data.description && <div className="desc">Info: {data.description}</div>}
    </>
  )
}

export default Dropdown
