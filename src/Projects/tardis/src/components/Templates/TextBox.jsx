import React, {useState,useEffect} from "react"
import { slugToText } from "../../utils"
import "./TextBox.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const TextBox = ({ data,dvalue }) => {
  const [value, setValue] = useState("")
  useEffect(() => {
    setValue(dvalue);
  }, [dvalue])
  let id = data.name,
    label = slugToText(data.name),
    required = data.required,
    minLength,
    maxLength,
    description = data.description,
    readOnly
  const onhandleChange=(e,i)=>{
      setValue(e)
    }
  return (
    <>
      {label &&<label for={id} className="textInput__label">
        {label}
      </label>}
      <input
        id={data.id}
        name={id}
        className="textInput"
        type="text"
        value={value}
        disabled={!data.isedit}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={description}
        readOnly={readOnly}
        onChange={(e) => {
          onhandleChange(e.target.value, data.i )
        }}
      />
      {data.description && <div className="desc"><FontAwesomeIcon icon={faInfoCircle}  color={"#ccc"}/> {data.description}</div>}
    </>
  )
}

export default TextBox
