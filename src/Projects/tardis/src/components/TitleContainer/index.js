import React, {Fragment} from "react";
import "./TitleContainer.scss";
import InputButton from "../InputText/InputWithButton";
import Button from "../Button/Button";
import { Images } from "../../assets/images";
import { SearchBar } from "../../assets/constant"
import { useDispatch,useSelector } from 'react-redux';
import { SourceRecords } from '../../../../../reducers/configuration/actions'
import { fullscreen} from '../../utils'
import {SetFullScreen} from "../../../../../reducers/user/actions"

const TitleContainer = props => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.user);
  
  const SearchFilter = (text) => {
    if(props.name === "Source Configuration")
    {
      dispatch(SourceRecords({search:text}))
    }
  }
  const SearchField = (text) =>{
    if(SearchBar.indexOf(text.name) > -1)
    return (
      <InputButton
          placeholder={"Search"}
          id ={"tablesearch"}
          btnclass={"searchbtn"}
          ButtonClick={text => SearchFilter(text)}
          btnimg={Images.Search}
        />
    )
    else
    return null
  }
  return (
    <div className="container-title">
      <div className="title-left">
        {props.onBack ?
        <Fragment>
        <Button
          class={"backoption centeralign"}
          label={"Back"}
          leftimg={Images.Back}
          onClick={() => {props.onBack()}}
        />
        <div className="title-divder centeralign">
          <span />
        </div>
        </Fragment>:null}
        <Button
          class={`title centeralign ${props.name}`}
          label={props.name}
          leftimg={props.img}
          onClick={() => {}}
        />
      </div>
      
      <div className="centeralign">
      {props.children?props.children:null}
        {/* <SearchField name={props.name}/> */}
        <Button
          class={"fullscreenicon"}
          leftimg={userdata.fullscreen?Images.minimize :Images.Fullscreen}
          svg={true}
          onClick={() => {
            fullscreen((e)=>{
              dispatch(SetFullScreen(e))
            });
          }}
        />
        {/* <div className="cursorpointer">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div> */}
      </div>
    </div>
  );
};


export default TitleContainer;