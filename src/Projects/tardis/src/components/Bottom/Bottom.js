import React, { useState, useEffect } from "react";
import "./Bottom.scss";
import Menu from "./Menu";
import { menulist } from "../../assets/constant";
import { useHistory } from "react-router-dom";
import { pagename } from "../../utils"
import {  useSelector } from "react-redux";

const Bottom = () => {
  let history = useHistory();
  const [menu, SetMenu] = useState([]);
  const [selection, SetSelection] = useState("");
  const userdata = useSelector(state => state.user);
  const { user} = userdata;
  const Selection = e => {
    let menuCollection = menu;
    menuCollection.forEach(function (a) {
        if (a.name === e.name) a.selection = true;
        else a.selection = false;
    });
    let gplist = user && user.groups? user.groups.map((e)=>e.name): [];
    if(gplist.indexOf("Configuration Admin") ===-1){
      menuCollection = menuCollection.filter((e)=>{return e.name !== "Admin"});
    }
    SetMenu(menuCollection);
    SetSelection(e.name);
    if(e.path)
    history.push(e.path);
  };

  useEffect(()=>{
   if(user.groups&& user.groups.length > 0){
      let menuCollection = menulist;
      menuCollection.forEach(function (a) {
          if (a.name ===  pagename()) a.selection = true;
          else a.selection = false;
      });
      let gplist = user && user.groups  ? user.groups.map((e)=>e.name): [];
      if(gplist.indexOf("Configuration Admin") ===-1){
        menuCollection = menuCollection.filter((e)=>{return e.name !== "Admin"});
      }
      SetMenu(menuCollection);
      SetSelection(pagename());
    }
  },[user])  
  
  return (
    <section className="bottom-container">
      <div className="sidemenu">
        {user.groups && menu &&
          menu.map((item, index) => {
            return (
              <Menu
                key={`Menu"${index}`}
                {...item}
                onSelection={e => {
                  Selection(e);
                }}
              />
            );
          })}
      </div>
    </section>
  );
};

export default Bottom;
