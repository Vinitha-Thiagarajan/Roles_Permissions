import React, { useState, useEffect, useCallback } from "react";
import './Aside.scss'
import { Images } from '../../assets/images'
import { menulist } from "../../assets/constant";
import SVG from 'react-inlinesvg';
import { useHistory } from "react-router-dom";
import { pagename,fullscreen } from "../../utils"
import { useDispatch, useSelector } from "react-redux";
import {SetFullScreen} from "../../../../../reducers/user/actions"

const Aside = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const [menu, SetMenu] = useState([]);
    const [selection, SetSelection] = useState("");
    const userdata = useSelector(state => state.user);
    const {permission,user} = userdata;
    const onSelection = useCallback((e) => {
        let menuCollection = menu;
        menuCollection.forEach(function (a) {
            if (a.name === e.name) a.selection = true;
            else a.selection = false;
        });
        if(permission.view && permission.view.indexOf("dataavailability")=== -1)
        {
            menuCollection = menuCollection.filter((e)=>{return e.name !== "Dashboard"});
        }
        if(permission.view && permission.view.indexOf("maintenancereason")=== -1)
        {
            menuCollection = menuCollection.filter((e)=>{return e.name !== "Maintenance" || e.name !==  "Trend Chart"});
        }
        let gplist = user && user.groups  ? user.groups.map((e)=>e.name): [];
        if(gplist.indexOf("Configuration Admin") ===-1){
            menuCollection = menuCollection.filter((e)=>{return e.name !== "Admin"});
        }
        SetMenu(menuCollection);
        SetSelection(e.name);
        if (e.path)
            history.push(e.path);
        document.body.style.overflowY = "auto";
    })
    useEffect(() => {
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
    },[user]);
    useEffect(() => {
        
        function handleChange() {
            let menuCollection = menulist;
            menuCollection.forEach(function (a) {
                if (a.name === pagename()) a.selection = true;
                else a.selection = false;
            });
            let gplist = user && user.groups  ? user.groups.map((e)=>e.name): [];
            if(gplist.indexOf("Configuration Admin") ===-1){
                menuCollection = menuCollection.filter((e)=>{return e.name !== "Admin"});
            }
            SetMenu(menuCollection);
            SetSelection(pagename());
        }
        var targetNode = document.getElementById('asidebar');
        var observer = new MutationObserver(function(){
            if(targetNode.style.display !== 'none'){
                handleChange()
            }
        });
        observer.observe(targetNode, { attributes: true });
        return () => {
            observer.disconnect();
        }
    }, [])
    return (
        <div className={`sidebar  ${userdata.fullscreen?"displayblock":"displaynone"}` } id="asidebar">
            <div className="sidemenuholder">
                <div onClick={()=>{  fullscreen((e)=>{
                            dispatch(SetFullScreen(e))
                        })}}>
                    <img alt="" src={Images.NavBar} className="autowidth" />
                </div>
                <div>
                    <img alt="" src={Images.profile} />
                </div>
                <div className={`fillwhite ${selection === "Profile" ? "selection" : ""}`} onClick={() => {
                                history.push("/tardis/profile")
                                SetSelection("Profile");
                            }}>
                    <img alt="" src={Images.Edit} className="autowidth" />
                </div>
                {menu &&
                    menu.map((item, index) => {
                        return (
                            <div key={`LeftMenu"${index}`} className={`fillwhite ${selection === item.name ? "selection" : ""}`} onClick={() => {
                                onSelection(item);
                            }}>
                                <SVG src={item.image} className={item.name === "File Manager" ? 'menufileimg' : "menuimg"} />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Aside;
