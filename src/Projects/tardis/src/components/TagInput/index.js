import React, { useState, useEffect } from 'react';
import './TagInput.scss';
import { alert } from '../../utils'
import { Images } from "../../assets/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

const TagInput = (props) => {
    const {edit,id} = props;
    let slacklist =  props.slackChannels? props.slackChannels.split(","):[];
    const [tags, SetTags] = useState(slacklist);
    const [status, setStatus] = useState(false)
    const handleDelete = (i) => {
        SetTags(tags.filter((tag) => tag !== i))
        props.onChange && props.onChange(tags)
    }
    
    const handleAddition = () => {
        let value = '#'+document.getElementById(`add-slack-${id}`).value;
        let slack =tags;
        if(slack.indexOf(value) === -1 && value !== "#" && !hasWhiteSpace(value)){
          slack.push(value);
          SetTags(slack);
          setStatus(!status);
          document.getElementById(`add-slack-${id}`).value = "";
          props.onChange && props.onChange(slack)
        }
        else{
          alert("error","Please enter the vaild slack channel!!")
        }
    }
    useEffect(()=>{
        if(props.reset)
        {
            SetTags(props.slackChannels? props.slackChannels.split(","):[]);
        }
    },[props.reset])
   
    return (
     <div className="slackrow" style={props.style?props.style:{}}>
      {tags.map((e, i) => {
        return <div className="slackchannel" key={`slackchannel-${i}`}>{e}{edit?<img src={Images.close} onClick={()=>{handleDelete(e)}} alt=""/>:null}</div>
      })}
      {edit?<div className="slackchanneladd" >#<input type="text" style={props.inputstyle? props.inputstyle:{width: 100}} id={`add-slack-${id}`} placeholder={props.placeholder?props.placeholder:"Slack Channel"} /><FontAwesomeIcon icon={faCheckCircle} color={"#3976eb"} onClick={()=>{handleAddition()}} /></div>:null}
      <input type="hidden" value={`${tags.join(",")}`} name="slackChannels"/>
      </div>
    );
}

export default TagInput;