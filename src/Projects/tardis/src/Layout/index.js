import React, { Fragment } from "react";
import "./main.scss";
import { Header, Bottom, Aside } from "../components";
import { useSelector } from "react-redux";

function Layout(props) {
    const userdata = useSelector(state => state.user);
    const {fullscreen} = userdata;
    return (
        <Fragment>
            <div className="tardis-container">
                <Header />
                <main id="maincontent" className={fullscreen?"fullscreen":""}>
                    {props.children}
                </main>
                <Bottom />
                <Aside />
            </div>
            <div id="snackbar"></div>
        </Fragment>
    );
}

export default Layout;
