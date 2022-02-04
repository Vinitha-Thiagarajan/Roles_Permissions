import React ,{ useState,useEffect}from "react";
import "./Header.scss";
import Profile from "./Profile";
import DropDown from "../DropDown";
import Button from "../Button/Button";
import {Images} from "../../assets/images";
import { useHistory } from "react-router-dom";
import momenttz from 'moment-timezone';
import { connect, useSelector } from "react-redux";
import {TimeZone} from "../../../../../reducers/user/actions"
import { IntialGen } from '../../utils'

const Header = (props) => {
  const [tz, setTz] = useState("");
  const userdata = useSelector(state => state.user);
  const { timeZone , user} = userdata;
  let history = useHistory();
  useEffect(()=>{
    let currtz= timeZone;
    if(currtz != undefined && currtz != null && currtz !=""){
      let ctz = "(UTC " + momenttz.tz(currtz).format('Z') + ") " + currtz;
      setTz(ctz);
    }
    else{
      let ctz = "(UTC " + momenttz.tz("UTC").format('Z') + ") " + "UTC";
      props.TimeZone("UTC");
      setTz(ctz);
    }
  },[timeZone])
  const TimeZone=(val)=>{
    val = val.split(")");
    val = val[1].trim();
    let ctz = "(UTC " + momenttz.tz(val).format('Z') + ") " + val;
    props.TimeZone(val);
    setTz(ctz);
  }

  return (
    <section className="top-container">
      <div className="profilecontainer">
        <Profile
          img={Images.profile}
          name={user.username}
        />
        <div className="profilemenus">
          <Button
            class={"profilemenu centeralign"}
            label="Edit Profie"
            leftimg={Images.Edit}
            onClick={() => {history.push("/tardis/Profile")}}
          />
        </div>
      </div>
      <div className="righttopcontainer">
        {tz!==""?<DropDown
          id={"timedd"}
          class={"rttimezone centeralign"}
          value={tz}
          onChange={(data) => {TimeZone(data) }}
          imguri={Images.whitedownarrow}
          imgclass={"rttimezonearrow"}
          options={["(UTC +00:00) UTC","(UTC -04:00) US/Eastern","(UTC -05:00) US/Central","(UTC -07:00) US/Pacific","(UTC +05:30) Asia/Calcutta"]}
        />:null}
        <div className="rtnotify">
          {/* <img alt="" src={Images.Notification} /> */}
        </div>
        <div className="rtprofile">
          <div className="avatar">
            {IntialGen(user)}
          </div>
          {user.username?<DropDown
            id={"profiledd"}
            class={"rtholder centeralign"}
            label={user.username}
          />:null}
        </div>
      </div>
    </section>
  );
};

export default connect(
  null, {  TimeZone }
)(Header);
