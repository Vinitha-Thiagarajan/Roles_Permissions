import React, { useEffect, Fragment } from "react";
import "./Header.scss";
import { array } from "../../assets/constant"
import { useSelector } from "react-redux";
import { IntialGen } from '../../utils'

const Profile = props => {
  const userdata = useSelector(state => state.user);
  const { user } = userdata;
  useEffect(() => {
    let arrset = array;
    if (user && user.groups) {
      let gplist = user && user.groups ? user.groups.map((e) => e.name) : [];
      if (gplist.indexOf("Configuration Admin") > -1) {

        arrset.forEach(function (a) {
          if (a.color === "#4a97ff")
            a.color = "#ffffff"
        });
      }
      var c = document.getElementById("ProfileCanvas");
      var ctx = c.getContext("2d");

      for (var i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.arc(
          c.width / 2,
          c.height / 2,
          60,
          array[i].startangle,
          array[i].endangle
        );
        ctx.strokeStyle = arrset ? arrset[i].color : array[i].color;
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    }
  }, [user]);


  return (
    <Fragment>
      <div className="profile centeralign">
        {/* <img alt="" src={props.img} /> */}
        <div className="avatar">
          {IntialGen(user)}
        </div>
        <span>{props.name}</span>
      </div>
      <canvas id="ProfileCanvas" width="220" height="260" />
    </Fragment>
  );
};

export default Profile;
