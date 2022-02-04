import React, { useState, useEffect } from 'react';
import './TagInput.scss';
import { alert } from '../../utils'
import { Images } from "../../assets/images";


const TagInput = (props) => {
    const {GroupList,id} = props;
    let slacklist =  props.groups? props.groups.map((e,i)=>{return e.name}):[];
    let slacklistid =  props.groups? props.groups.map((e,i)=>{return e.id}):[];
    const [tags, SetTags] = useState(slacklist);
    const [tagsID, SetTagsID] = useState(slacklistid);
    const [status, setStatus] = useState(false)
    const handleDelete = (i) => {
        SetTags(tags.filter((id) => id !== i))
        let findid = GroupList.filter((e)=>{return e.name == i});
        SetTagsID(tagsID.filter((tag) => tag !== findid[0].id))
        
    }
    
    const handleAddition = () => {
        let value = document.getElementById(`addgroup-${id}`).value;
        let slack =tags;
        let ids = tagsID;
        if(slack.indexOf(value) === -1){
         ids.push(value);
         let findname = GroupList.filter((e)=>{return e.id == value});
         slack.push(findname[0].name);
          SetTags(slack);
          SetTagsID(ids)
          setStatus(!status);
          document.getElementById(`addgroup-${id}`).value = "";
        }
        else{
          alert("error","Please enter the vaild slack channel!!")
        }
    }
    useEffect(()=>{
        if(props.reset)
        {
            SetTags(props.groups? props.groups.map((e,i)=>{return e.name}):[]);
            SetTagsID(props.groups? props.groups.map((e,i)=>{return e.id}):[]);
        
        }
    },[props.reset])
    const checkgp =(e) =>{
        let check =tags.filter((item,i)=>{return e.name === item});
        if(check.length>0)
        return false;
        else
        return true;
      }
    return (
     <div className="slackrow" style={props.style?props.style:{}}>
      {tags&&tags.map((e, i) => {
        return <div className="slackchannel" key={`slackchannel-${i}`}>{e}{e!=="Default"?<img src={Images.close} onClick={()=>{handleDelete(e)}} alt=""/>:null}</div>
      })}
    <select id={`addgroup-${id}`} className="customselect select190" onChange={() => { handleAddition()  }}>
        <option value="">Please select a group to add</option>
        {GroupList && GroupList.filter((item,i)=>{return checkgp(item)}).map((e,i)=>{
        return(
            <option key={i} value={e.id}>{e.name}</option>
        )
        })}
        
    </select>
      <input type="hidden" value={JSON.stringify(tagsID.map((e)=>{return parseInt(e)}))} name={`groupIds-${id}`}/>
      </div>
    );
}

export default TagInput;